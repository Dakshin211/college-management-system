import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Mark {
  internal: number;
  grade: string;
  courses: {
    name: string;
    code: string;
    credits: number;
  };
}

const Marks = () => {
  const { profile } = useAuth();
  const [marks, setMarks] = useState<Mark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarks = async () => {
      if (!profile?.id) return;

      const { data } = await supabase
        .from('marks')
        .select(`
          internal,
          grade,
          courses:courses (
            name,
            code,
            credits
          )
        `)
        .eq('student_id', profile.id);

      if (data) setMarks(data as any);
      setLoading(false);
    };

    fetchMarks();
  }, [profile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getGradeColor = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'bg-green-500';
    if (grade === 'B+' || grade === 'B') return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-4 md:p-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Academic Performance</h1>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">View your marks and grades</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Overall CGPA
              </CardTitle>
              <div className="text-3xl md:text-4xl font-bold">{profile?.cgpa?.toFixed(2)}</div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Marks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marks.map((mark, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm md:text-base break-words">{mark.courses?.name}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">{mark.courses?.code}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Internal</p>
                      <p className="text-lg md:text-xl font-bold">{mark.internal}/100</p>
                    </div>
                    <Badge className={`${getGradeColor(mark.grade)} text-white shrink-0`}>
                      {mark.grade}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {marks.length === 0 && (
        <Card className="p-8 text-center">
          <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No marks available</h3>
          <p className="text-muted-foreground text-sm">Your marks will appear here once they are published.</p>
        </Card>
      )}
    </motion.div>
  );
};

export default Marks;