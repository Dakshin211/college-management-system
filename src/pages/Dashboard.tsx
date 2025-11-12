import { motion } from 'framer-motion';
import { Users, BookOpen, FileText, DollarSign, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  {
    title: 'Total Students',
    value: '1,234',
    change: '+12%',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    title: 'Active Courses',
    value: '24',
    change: '+3',
    icon: BookOpen,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
  },
  {
    title: 'Avg. Attendance',
    value: '87%',
    change: '+5%',
    icon: TrendingUp,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30',
  },
  {
    title: 'Fee Collection',
    value: '₹2.4M',
    change: '+18%',
    icon: DollarSign,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
  },
];

const recentActivities = [
  {
    title: 'New Student Admission',
    description: 'John Smith enrolled in Computer Science',
    time: '2 hours ago',
    icon: Users,
  },
  {
    title: 'Exam Results Published',
    description: 'Semester 5 results are now available',
    time: '5 hours ago',
    icon: Award,
  },
  {
    title: 'Course Update',
    description: 'Advanced Mathematics syllabus updated',
    time: '1 day ago',
    icon: BookOpen,
  },
  {
    title: 'Fee Payment Received',
    description: 'Payment of ₹50,000 from Sarah Johnson',
    time: '2 days ago',
    icon: DollarSign,
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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's what's happening with your institution today.
        </p>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={item}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 font-medium">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <activity.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
