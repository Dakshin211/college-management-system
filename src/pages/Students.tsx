import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const mockStudents = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', course: 'Computer Science', year: '3rd', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', course: 'Electrical Engineering', year: '2nd', status: 'Active' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', course: 'Mechanical Engineering', year: '4th', status: 'Active' },
  { id: 4, name: 'David Brown', email: 'david@example.com', course: 'Civil Engineering', year: '1st', status: 'Active' },
  { id: 5, name: 'Emma Davis', email: 'emma@example.com', course: 'Computer Science', year: '2nd', status: 'Inactive' },
  { id: 6, name: 'Frank Wilson', email: 'frank@example.com', course: 'Electronics', year: '3rd', status: 'Active' },
];

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students] = useState(mockStudents);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">Students Management</h1>
        <p className="text-muted-foreground mt-2">Manage and view all student information</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students by name, email, or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>
                      <Badge
                        variant={student.status === 'Active' ? 'default' : 'secondary'}
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Students;
