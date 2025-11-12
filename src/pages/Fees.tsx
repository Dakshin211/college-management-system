import { motion } from 'framer-motion';
import { DollarSign, CreditCard, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const feesSummary = {
  totalFees: 150000,
  paidAmount: 100000,
  pendingAmount: 50000,
  dueDate: '2025-01-15',
};

const feeHistory = [
  { id: 1, date: '2024-08-15', amount: 50000, type: 'Tuition Fee', status: 'Paid' },
  { id: 2, date: '2024-09-10', amount: 25000, type: 'Lab Fee', status: 'Paid' },
  { id: 3, date: '2024-10-05', amount: 25000, type: 'Library Fee', status: 'Paid' },
  { id: 4, date: '2025-01-15', amount: 50000, type: 'Semester Fee', status: 'Pending' },
];

const Fees = () => {
  const paymentPercentage = (feesSummary.paidAmount / feesSummary.totalFees) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">Fee Management</h1>
        <p className="text-muted-foreground mt-2">Track and manage fee payments</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{feesSummary.totalFees.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">For current academic year</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
              <CreditCard className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₹{feesSummary.paidAmount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{paymentPercentage.toFixed(0)}% completed</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
              <Clock className="h-5 w-5 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">
                ₹{feesSummary.pendingAmount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Due by {feesSummary.dueDate}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Payment Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment completion</span>
                <span className="font-medium">{paymentPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={paymentPercentage} className="h-3" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Paid: ₹{feesSummary.paidAmount.toLocaleString()}
                </span>
                <span className="text-muted-foreground">
                  Remaining: ₹{feesSummary.pendingAmount.toLocaleString()}
                </span>
              </div>
            </div>
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
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feeHistory.map((payment, index) => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold">{payment.type}</h4>
                    <p className="text-sm text-muted-foreground">{payment.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">₹{payment.amount.toLocaleString()}</span>
                    <Badge variant={payment.status === 'Paid' ? 'default' : 'secondary'}>
                      {payment.status}
                    </Badge>
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

export default Fees;
