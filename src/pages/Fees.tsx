import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface FeeData {
  total_fee: number;
  paid: number;
  pending: number;
  due_date: string;
}

const Fees = () => {
  const { profile } = useAuth();
  const [feeData, setFeeData] = useState<FeeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFees = async () => {
      if (!profile?.id) return;

      const { data } = await supabase
        .from('fees')
        .select('*')
        .eq('student_id', profile.id)
        .single();

      if (data) setFeeData(data);
      setLoading(false);
    };

    fetchFees();
  }, [profile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-4 md:p-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Fee Management</h1>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">Track your fee payments and dues</p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Fee</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold">₹{feeData?.total_fee.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-green-600">₹{feeData?.paid.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-destructive">₹{feeData?.pending.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Due: {feeData?.due_date ? new Date(feeData.due_date).toLocaleDateString() : 'N/A'}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <CardTitle>Fee Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-muted/50">
                <div className="flex-1">
                  <p className="font-medium text-sm md:text-base">Tuition Fee</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Semester 5 - Academic Year 2024-25</p>
                </div>
                <Badge variant={feeData && feeData.pending > 0 ? 'destructive' : 'default'} className="shrink-0 self-start sm:self-center">
                  {feeData && feeData.pending > 0 ? 'Pending' : 'Paid'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {!feeData && (
        <Card className="p-8 text-center">
          <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No fee records</h3>
          <p className="text-muted-foreground text-sm">Your fee information will appear here once available.</p>
        </Card>
      )}
    </motion.div>
  );
};

export default Fees;