import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Insert Departments
    const { data: depts } = await supabase.from('departments').upsert([
      { name: 'Artificial Intelligence & Data Science', code: 'AIDS' },
      { name: 'Computer Science & Engineering', code: 'CSE' },
      { name: 'Electronics & Communication Engineering', code: 'ECE' },
      { name: 'Mechanical Engineering', code: 'MECH' }
    ], { onConflict: 'code', ignoreDuplicates: true }).select();

    const aidsDept = depts?.find(d => d.code === 'AIDS');
    const cseDept = depts?.find(d => d.code === 'CSE');

    // Insert Faculty
    const { data: faculty } = await supabase.from('faculty').upsert([
      { name: 'Dr. Priya Sharma', email: 'priya.sharma@college.edu', department_id: aidsDept?.id },
      { name: 'Prof. Rajesh Kumar', email: 'rajesh.kumar@college.edu', department_id: aidsDept?.id },
      { name: 'Dr. Anita Desai', email: 'anita.desai@college.edu', department_id: aidsDept?.id },
      { name: 'Prof. Vikram Singh', email: 'vikram.singh@college.edu', department_id: cseDept?.id },
      { name: 'Dr. Meera Patel', email: 'meera.patel@college.edu', department_id: cseDept?.id },
      { name: 'Prof. Arjun Reddy', email: 'arjun.reddy@college.edu', department_id: cseDept?.id },
      { name: 'Dr. Sneha Agarwal', email: 'sneha.agarwal@college.edu', department_id: aidsDept?.id },
      { name: 'Prof. Karthik Menon', email: 'karthik.menon@college.edu', department_id: cseDept?.id },
      { name: 'Dr. Lakshmi Iyer', email: 'lakshmi.iyer@college.edu', department_id: aidsDept?.id },
      { name: 'Prof. Arun Verma', email: 'arun.verma@college.edu', department_id: cseDept?.id }
    ], { onConflict: 'email', ignoreDuplicates: true }).select();

    const facultyMap = Object.fromEntries(faculty?.map(f => [f.email, f.id]) || []);

    // Insert Courses
    const { data: courses } = await supabase.from('courses').upsert([
      { name: 'Deep Learning', code: 'AIDS501', credits: 4, semester: 5, hours: 45, department_id: aidsDept?.id, instructor_id: facultyMap['priya.sharma@college.edu'] },
      { name: 'Cloud Computing', code: 'AIDS502', credits: 4, semester: 5, hours: 45, department_id: aidsDept?.id, instructor_id: facultyMap['rajesh.kumar@college.edu'] },
      { name: 'Big Data Analytics', code: 'AIDS503', credits: 3, semester: 5, hours: 40, department_id: aidsDept?.id, instructor_id: facultyMap['anita.desai@college.edu'] },
      { name: 'Natural Language Processing', code: 'AIDS504', credits: 4, semester: 5, hours: 45, department_id: aidsDept?.id, instructor_id: facultyMap['sneha.agarwal@college.edu'] },
      { name: 'Computer Vision', code: 'AIDS505', credits: 3, semester: 5, hours: 40, department_id: aidsDept?.id, instructor_id: facultyMap['lakshmi.iyer@college.edu'] }
    ], { onConflict: 'code', ignoreDuplicates: true }).select();

    // Create 25 students with realistic data
    const studentEmails = [
      'aarav.kumar@student.edu', 'diya.sharma@student.edu', 'arjun.patel@student.edu',
      'ananya.singh@student.edu', 'ishaan.reddy@student.edu', 'aanya.gupta@student.edu',
      'vivaan.nair@student.edu', 'sara.iyer@student.edu', 'aditya.menon@student.edu',
      'kiara.krishnan@student.edu', 'aryan.desai@student.edu', 'navya.agarwal@student.edu',
      'reyansh.shah@student.edu', 'aadhya.verma@student.edu', 'vihaan.joshi@student.edu',
      'myra.kapoor@student.edu', 'atharv.rao@student.edu', 'anvi.kulkarni@student.edu',
      'kabir.malhotra@student.edu', 'pari.bhatt@student.edu', 'shivansh.pandey@student.edu',
      'riya.chopra@student.edu', 'dhruv.saxena@student.edu', 'saanvi.bhardwaj@student.edu',
      'arnav.sinha@student.edu'
    ];

    const { data: authUsers } = await supabase.auth.admin.listUsers();
    const existingEmails = new Set(authUsers.users.map(u => u.email));
    
    const newStudents = [];
    for (let i = 0; i < studentEmails.length; i++) {
      if (!existingEmails.has(studentEmails[i])) {
        const { data } = await supabase.auth.admin.createUser({
          email: studentEmails[i],
          password: 'Student@123',
          email_confirm: true,
          user_metadata: {
            name: studentEmails[i].split('@')[0].split('.').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ')
          }
        });
        if (data.user) newStudents.push(data.user.id);
      }
    }

    // Wait for profiles to be created by trigger
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update profiles with student details
    const { data: profiles } = await supabase.from('profiles').select('*');
    
    if (profiles) {
      for (let i = 0; i < profiles.length; i++) {
        const profile = profiles[i];
        await supabase.from('profiles').update({
          roll_no: `AIDS${2020 + Math.floor(i / 5)}${String(i + 1).padStart(3, '0')}`,
          branch: 'Artificial Intelligence & Data Science',
          semester: 5,
          batch: '2020-2024',
          cgpa: 7.5 + Math.random() * 2,
          attendance_percent: 75 + Math.random() * 20,
          phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          dob: new Date(2002 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
          blood_group: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'][Math.floor(Math.random() * 8)],
          address: `${Math.floor(Math.random() * 500) + 1} ${['MG Road', 'Park Street', 'Brigade Road', 'Residency Road'][Math.floor(Math.random() * 4)]}, Bangalore`,
          parent_contact: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`
        }).eq('id', profile.id);

        // Create enrollments for each student
        if (courses) {
          for (const course of courses) {
            await supabase.from('enrollments').insert({
              student_id: profile.id,
              course_id: course.id,
              progress: Math.floor(Math.random() * 40) + 60
            });

            // Create marks
            const internal = Math.floor(Math.random() * 30) + 50;
            await supabase.from('marks').insert({
              student_id: profile.id,
              course_id: course.id,
              internal,
              grade: internal >= 80 ? 'A+' : internal >= 70 ? 'A' : internal >= 60 ? 'B+' : 'B'
            });

            // Create attendance records (last 30 days)
            for (let day = 0; day < 30; day++) {
              const date = new Date();
              date.setDate(date.getDate() - day);
              await supabase.from('attendance_records').insert({
                student_id: profile.id,
                course_id: course.id,
                date: date.toISOString().split('T')[0],
                status: Math.random() > 0.2 ? 'present' : 'absent'
              });
            }
          }
        }

        // Create fees
        await supabase.from('fees').insert({
          student_id: profile.id,
          total_fee: 150000,
          paid: 100000,
          pending: 50000,
          due_date: new Date(2025, 11, 31).toISOString().split('T')[0]
        });
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Sample data inserted successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Seed error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});