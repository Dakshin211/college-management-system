import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';

const attendanceData = {
  totalClasses: 120,
  attended: 104,
  absent: 16,
  percentage: 86.7,
};

const recentAttendance = [
  { date: '2025-11-10', subject: 'Mathematics', status: 'Present' },
  { date: '2025-11-09', subject: 'Physics', status: 'Present' },
  { date: '2025-11-08', subject: 'Chemistry', status: 'Absent' },
  { date: '2025-11-07', subject: 'English', status: 'Present' },
  { date: '2025-11-06', subject: 'Computer Science', status: 'Present' },
];

const Attendance = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">Attendance Tracker</h1>
        <p className="text-muted-foreground mt-2">Monitor and manage attendance records</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{attendanceData.totalClasses}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Classes Attended</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{attendanceData.attended}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{attendanceData.percentage}%</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAttendance.map((record, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold">{record.subject}</h4>
                      <p className="text-sm text-muted-foreground">{record.date}</p>
                    </div>
                    <Badge
                      variant={record.status === 'Present' ? 'default' : 'destructive'}
                    >
                      {record.status}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Attendance;
