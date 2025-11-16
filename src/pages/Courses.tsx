import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Enrollment {
  progress: number;
  courses: {
    name: string;
    code: string;
    credits: number;
    hours: number;
    faculty: {
      name: string;
    };
  };
}

const Courses = () => {
  const { profile } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!profile?.id) return;

      const { data } = await supabase
        .from('enrollments')
        .select(`
          progress,
          courses:courses (
            name,
            code,
            credits,
            hours,
            faculty:instructor_id (
              name
            )
          )
        `)
        .eq('student_id', profile.id);

      if (data) setEnrollments(data as any);
      setLoading(false);
    };

    fetchCourses();
  }, [profile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-4 md:p-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">My Courses</h1>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">Track your enrolled courses and progress</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2"
      >
        {enrollments.map((enrollment, index) => (
          <motion.div key={index} variants={item}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg md:text-xl break-words">{enrollment.courses?.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{enrollment.courses?.code}</p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">{enrollment.courses?.credits} Credits</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{enrollment.courses?.faculty?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{enrollment.courses?.hours}hrs</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium">Course Progress</span>
                    <span className="text-muted-foreground">{enrollment.progress}%</span>
                  </div>
                  <Progress value={enrollment.progress || 0} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {enrollments.length === 0 && (
        <Card className="p-8 text-center">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No courses enrolled</h3>
          <p className="text-muted-foreground text-sm">You haven't enrolled in any courses yet.</p>
        </Card>
      )}
    </motion.div>
  );
};

export default Courses;