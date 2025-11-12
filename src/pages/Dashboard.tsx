import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, FileText, TrendingUp, Clock, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const [studentData] = useState({
    name: 'John Doe',
    course: 'Computer Science',
    semester: '5th Semester',
    rollNo: 'CS2021045',
    attendance: 87,
    cgpa: 8.5,
  });

  const enrolledCourses = [
    { code: 'CS501', name: 'Data Structures', credits: 4, progress: 65, instructor: 'Dr. Smith' },
    { code: 'CS502', name: 'Database Systems', credits: 4, progress: 72, instructor: 'Prof. Johnson' },
    { code: 'CS503', name: 'Web Development', credits: 3, progress: 58, instructor: 'Dr. Williams' },
    { code: 'CS504', name: 'Operating Systems', credits: 4, progress: 80, instructor: 'Prof. Brown' },
  ];

  const upcomingClasses = [
    { subject: 'Data Structures', time: '09:00 AM', room: 'Lab 201', type: 'Practical' },
    { subject: 'Database Systems', time: '11:00 AM', room: 'Room 305', type: 'Theory' },
    { subject: 'Web Development', time: '02:00 PM', room: 'Lab 102', type: 'Practical' },
  ];

  const recentGrades = [
    { subject: 'Algorithm Design', marks: 85, grade: 'A', type: 'Mid-term' },
    { subject: 'Computer Networks', marks: 78, grade: 'B+', type: 'Assignment' },
    { subject: 'Software Engineering', marks: 92, grade: 'A+', type: 'Project' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 text-primary-foreground shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {studentData.name}!</h1>
            <p className="text-primary-foreground/90 text-lg">
              {studentData.course} • {studentData.semester}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-primary-foreground/80 mb-1">Roll Number</div>
            <div className="text-2xl font-bold">{studentData.rollNo}</div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="hover:shadow-lg transition-all border-2 hover:border-primary/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Overall Attendance
                </CardTitle>
                <Calendar className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{studentData.attendance}%</div>
              <Progress value={studentData.attendance} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {studentData.attendance >= 75 ? '✓ Meeting requirements' : '⚠ Below requirements'}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-all border-2 hover:border-success/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Current CGPA
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{studentData.cgpa}</div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-success/10 text-success">Excellent</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Keep up the great work!</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-all border-2 hover:border-accent/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Enrolled Courses
                </CardTitle>
                <BookOpen className="h-5 w-5 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{enrolledCourses.length}</div>
              <div className="text-sm text-muted-foreground">
                {enrolledCourses.reduce((sum, course) => sum + course.credits, 0)} Total Credits
              </div>
              <p className="text-xs text-muted-foreground mt-2">This semester</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* My Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                My Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrolledCourses.map((course, index) => (
                  <motion.div
                    key={course.code}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-4 rounded-lg border hover:border-primary/50 transition-all hover:shadow-md"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{course.name}</h4>
                        <p className="text-sm text-muted-foreground">{course.code} • {course.instructor}</p>
                      </div>
                      <Badge variant="outline">{course.credits} Credits</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Course Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Schedule & Recent Grades */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Today's Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingClasses.map((classItem, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex-shrink-0 w-16 text-center">
                        <div className="text-sm font-semibold text-primary">{classItem.time}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{classItem.subject}</h4>
                        <p className="text-xs text-muted-foreground">{classItem.room}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">{classItem.type}</Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Recent Grades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentGrades.map((grade, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div>
                        <h4 className="font-medium text-sm">{grade.subject}</h4>
                        <p className="text-xs text-muted-foreground">{grade.type}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{grade.marks}</div>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            grade.marks >= 90 ? 'bg-success/10 text-success' : 
                            grade.marks >= 75 ? 'bg-info/10 text-info' : 
                            'bg-warning/10 text-warning'
                          }`}
                        >
                          {grade.grade}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
