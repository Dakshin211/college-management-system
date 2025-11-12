import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Award, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Profile = () => {
  const [profile] = useState({
    name: 'John Doe',
    email: 'john.doe@sthorizon.edu',
    phone: '+91 98765 43210',
    rollNo: 'CS2021045',
    course: 'Computer Science',
    semester: '5th Semester',
    batch: '2021-2025',
    dob: 'January 15, 2003',
    address: '123 Main Street, Mumbai, Maharashtra',
    bloodGroup: 'O+',
    parentContact: '+91 98765 12345',
  });

  const academicInfo = [
    { label: 'Current CGPA', value: '8.5', icon: Award },
    { label: 'Attendance', value: '87%', icon: Calendar },
    { label: 'Credits Earned', value: '92/120', icon: BookOpen },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-2">View and manage your personal information</p>
      </div>

      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="shadow-xl border-2">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-32 w-32 border-4 border-primary/20">
                <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary to-accent text-primary-foreground">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-3xl font-bold">{profile.name}</h2>
                  <p className="text-lg text-muted-foreground">{profile.course}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default" className="text-sm">
                    {profile.rollNo}
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    {profile.semester}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    Batch {profile.batch}
                  </Badge>
                </div>
              </div>

              <Button variant="outline" size="lg" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Academic Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {academicInfo.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all border-2 hover:border-primary/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <item.icon className="h-8 w-8 text-primary" />
                  <div className="text-3xl font-bold">{item.value}</div>
                </div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{profile.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                    <p className="font-medium">{profile.dob}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{profile.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Emergency Contact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Parent/Guardian Contact</p>
                  <p className="font-medium text-lg">{profile.parentContact}</p>
                </div>
                
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Blood Group</p>
                  <Badge variant="destructive" className="text-lg font-bold">
                    {profile.bloodGroup}
                  </Badge>
                </div>

                <Card className="bg-info/5 border-info/20">
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">
                      In case of emergency, the college administration will contact the provided 
                      parent/guardian number. Please ensure this information is always up to date.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;
