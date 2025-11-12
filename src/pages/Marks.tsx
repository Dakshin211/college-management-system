import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const marksData = [
  { subject: 'Mathematics', internal: 85, external: 78 },
  { subject: 'Physics', internal: 76, external: 82 },
  { subject: 'Chemistry', internal: 88, external: 85 },
  { subject: 'English', internal: 92, external: 88 },
  { subject: 'Computer Sc.', internal: 90, external: 92 },
];

const progressData = [
  { month: 'Jan', average: 72 },
  { month: 'Feb', average: 75 },
  { month: 'Mar', average: 78 },
  { month: 'Apr', average: 81 },
  { month: 'May', average: 85 },
  { month: 'Jun', average: 87 },
];

const Marks = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">Marks & Results</h1>
        <p className="text-muted-foreground mt-2">View academic performance and results</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marksData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="internal" fill="hsl(var(--primary))" name="Internal" />
                  <Bar dataKey="external" fill="hsl(var(--accent))" name="External" />
                </BarChart>
              </ResponsiveContainer>
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
              <CardTitle>Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="average"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    name="Average Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Detailed Marks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marksData.map((subject, index) => (
                <motion.div
                  key={subject.subject}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold">{subject.subject}</h4>
                    <p className="text-sm text-muted-foreground">
                      Total: {subject.internal + subject.external} / 200
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Internal</p>
                      <p className="font-semibold">{subject.internal}/100</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">External</p>
                      <p className="font-semibold">{subject.external}/100</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Marks;
