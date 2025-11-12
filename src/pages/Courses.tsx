import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const courses = [
  {
    id: 1,
    name: 'Advanced Mathematics',
    code: 'MATH301',
    instructor: 'Dr. Sarah Johnson',
    students: 45,
    duration: '60 hours',
    status: 'Active',
    progress: 75,
  },
  {
    id: 2,
    name: 'Data Structures',
    code: 'CS201',
    instructor: 'Prof. John Smith',
    students: 52,
    duration: '48 hours',
    status: 'Active',
    progress: 60,
  },
  {
    id: 3,
    name: 'Digital Electronics',
    code: 'ECE301',
    instructor: 'Dr. Emily Brown',
    students: 38,
    duration: '45 hours',
    status: 'Active',
    progress: 85,
  },
  {
    id: 4,
    name: 'Thermodynamics',
    code: 'ME202',
    instructor: 'Prof. Michael Davis',
    students: 41,
    duration: '50 hours',
    status: 'Active',
    progress: 45,
  },
  {
    id: 5,
    name: 'Database Systems',
    code: 'CS302',
    instructor: 'Dr. Lisa Anderson',
    students: 48,
    duration: '55 hours',
    status: 'Active',
    progress: 70,
  },
  {
    id: 6,
    name: 'Control Systems',
    code: 'EE401',
    instructor: 'Prof. Robert Wilson',
    students: 36,
    duration: '52 hours',
    status: 'Active',
    progress: 55,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};

const Courses = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">Courses</h1>
        <p className="text-muted-foreground mt-2">Browse and manage course information</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {courses.map((course) => (
          <motion.div key={course.id} variants={item}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <Badge>{course.status}</Badge>
                </div>
                <CardTitle className="mt-4 group-hover:text-primary transition-colors">
                  {course.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{course.code}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{course.students} students enrolled</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>{course.instructor}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-primary"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Courses;
