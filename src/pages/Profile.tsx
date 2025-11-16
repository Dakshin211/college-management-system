import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Calendar, MapPin, Award, TrendingUp, Users, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const { profile } = useAuth();

  const academicInfo = [
    { label: 'CGPA', value: profile?.cgpa?.toFixed(2) || 'N/A', icon: Award },
    { label: 'Attendance', value: `${profile?.attendance_percent?.toFixed(1)}%` || 'N/A', icon: TrendingUp },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-4 md:p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary via-accent to-primary" />
          <CardContent className="pt-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16 sm:-mt-12">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-background">
                <AvatarFallback className="text-2xl sm:text-4xl bg-primary text-primary-foreground">
                  {profile?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left mt-4 sm:mt-0">
                <h2 className="text-2xl sm:text-3xl font-bold">{profile?.name}</h2>
                <p className="text-muted-foreground text-sm sm:text-base">{profile?.branch}</p>
                <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start text-xs sm:text-sm">
                  <span className="text-muted-foreground">Roll No: {profile?.roll_no}</span>
                  <span className="text-muted-foreground">• Semester {profile?.semester}</span>
                  <span className="text-muted-foreground">• Batch {profile?.batch}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4 sm:mt-0">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2"
      >
        {academicInfo.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground break-all">{profile?.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{profile?.phone || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Date of Birth</p>
                  <p className="text-sm text-muted-foreground">
                    {profile?.dob ? new Date(profile.dob).toLocaleDateString() : 'Not provided'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground break-words">{profile?.address || 'Not provided'}</p>
                </div>
              </div>
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
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Emergency Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Parent Contact</p>
                  <p className="text-sm text-muted-foreground">{profile?.parent_contact || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Blood Group</p>
                  <p className="text-sm text-muted-foreground">{profile?.blood_group || 'Not provided'}</p>
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg mt-4">
                <p className="text-xs text-muted-foreground">
                  Emergency contact information is kept confidential and used only in case of emergencies.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;