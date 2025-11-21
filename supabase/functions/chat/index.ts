import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
    if (!GROQ_API_KEY) throw new Error("GROQ_API_KEY is not configured");

    // Create Supabase client for data access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get user profile and data from authorization header
    const authHeader = req.headers.get('Authorization')
    let userProfile = null
    let enrollments = null
    let marks = null
    let fees = null
    let attendanceRecords = null
    
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '')
      const { data: { user } } = await supabase.auth.getUser(token)
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()
        
        userProfile = profile

        if (profile?.id) {
          // Fetch enrollments with course details
          const { data: enrollmentData } = await supabase
            .from('enrollments')
            .select('*, courses(name, code, credits)')
            .eq('student_id', profile.id)
          enrollments = enrollmentData

          // Fetch marks with course details
          const { data: marksData } = await supabase
            .from('marks')
            .select('*, courses(name, code)')
            .eq('student_id', profile.id)
          marks = marksData

          // Fetch fees
          const { data: feesData } = await supabase
            .from('fees')
            .select('*')
            .eq('student_id', profile.id)
            .single()
          fees = feesData

          // Fetch recent attendance
          const { data: attendanceData } = await supabase
            .from('attendance_records')
            .select('*, courses(name)')
            .eq('student_id', profile.id)
            .order('date', { ascending: false })
            .limit(10)
          attendanceRecords = attendanceData
        }
      }
    }

    // Check if this is a quick reply question
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase()
    
    // Handle default questions with direct DB responses
    if (lastMessage?.includes('what are my courses') || lastMessage?.includes('my courses')) {
      if (!enrollments || enrollments.length === 0) {
        return new Response(JSON.stringify({ 
          content: "You don't have any enrolled courses yet." 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        })
      }
      const coursesList = enrollments.map(e => 
        `• ${e.courses.name} (${e.courses.code}) - ${e.courses.credits} credits`
      ).join('\n')
      return new Response(JSON.stringify({ 
        content: `Here are your enrolled courses:\n\n${coursesList}` 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    if (lastMessage?.includes('show my attendance') || lastMessage?.includes('my attendance')) {
      if (!userProfile) {
        return new Response(JSON.stringify({ 
          content: "I couldn't fetch your attendance data." 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        })
      }
      const present = attendanceRecords?.filter(r => r.status === 'present').length || 0
      const total = attendanceRecords?.length || 0
      return new Response(JSON.stringify({ 
        content: `Your attendance summary:\n\nOverall Attendance: ${userProfile.attendance_percent?.toFixed(1)}%\nRecent classes: ${present}/${total} attended\n\nRecent records:\n${attendanceRecords?.slice(0, 5).map(r => 
          `• ${r.courses.name} - ${r.status === 'present' ? '✓' : '✗'} (${new Date(r.date).toLocaleDateString()})`
        ).join('\n') || 'No records'}` 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    if (lastMessage?.includes('check my marks') || lastMessage?.includes('my marks')) {
      if (!marks || marks.length === 0) {
        return new Response(JSON.stringify({ 
          content: "No marks available yet." 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        })
      }
      const marksList = marks.map(m => 
        `• ${m.courses.name} (${m.courses.code}): ${m.internal || 'N/A'} marks - Grade: ${m.grade || 'Pending'}`
      ).join('\n')
      return new Response(JSON.stringify({ 
        content: `Your marks:\n\n${marksList}\n\nCGPA: ${userProfile?.cgpa || 'N/A'}` 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    if (lastMessage?.includes('fee status') || lastMessage?.includes('fees')) {
      if (!fees) {
        return new Response(JSON.stringify({ 
          content: "No fee information available." 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        })
      }
      return new Response(JSON.stringify({ 
        content: `Your fee status:\n\nTotal Fee: ₹${fees.total_fee}\nPaid: ₹${fees.paid || 0}\nPending: ₹${fees.pending}\n${fees.due_date ? `Due Date: ${new Date(fees.due_date).toLocaleDateString()}` : ''}` 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const systemPrompt = `You are an intelligent academic assistant for Horizon Institute of Technology students. You can help with:
- Subject doubts and explanations (Math, Physics, Computer Science, AI, Data Science, Deep Learning, Cloud Computing, etc.)
- Problem-solving and step-by-step solutions
- Conceptual understanding of topics
- Study tips and learning strategies
- College management system queries
- General academic guidance

${userProfile ? `Current Student Information:
- Name: ${userProfile.name}
- Roll No: ${userProfile.roll_no}
- Branch: ${userProfile.branch}
- Semester: ${userProfile.semester}
- CGPA: ${userProfile.cgpa}
- Attendance: ${userProfile.attendance_percent}%
` : ''}

When students ask about their courses, attendance, marks, or fees, provide helpful information based on their profile data above.

Provide clear, accurate, and helpful responses. When explaining complex topics, break them down into simple steps. For math problems, show your work.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("Groq API error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI API error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
