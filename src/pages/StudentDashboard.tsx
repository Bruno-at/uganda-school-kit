import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/components/auth/AuthProvider';
import { Navigate } from 'react-router-dom';
import { BookOpen, Trophy, Calendar, Bell, TrendingUp, Clock, CheckCircle, FileText } from 'lucide-react';

const subjects = [
  { name: 'Mathematics', grade: 'A', score: 92, trend: 'up' },
  { name: 'English Language', grade: 'A-', score: 88, trend: 'up' },
  { name: 'Physics', grade: 'B+', score: 85, trend: 'stable' },
  { name: 'Chemistry', grade: 'B+', score: 83, trend: 'up' },
  { name: 'Biology', grade: 'A', score: 90, trend: 'up' },
  { name: 'History', grade: 'B', score: 79, trend: 'down' },
];

const assignments = [
  { title: 'Math Problem Set 12', subject: 'Mathematics', due: '2026-03-12', status: 'pending' },
  { title: 'English Essay: Climate Change', subject: 'English', due: '2026-03-14', status: 'pending' },
  { title: 'Physics Lab Report', subject: 'Physics', due: '2026-03-10', status: 'submitted' },
  { title: 'Chemistry Worksheet', subject: 'Chemistry', due: '2026-03-09', status: 'graded', grade: 'A-' },
];

const announcements = [
  { title: 'Mid-term exams start March 20th', date: '2026-03-08', priority: 'high' },
  { title: 'Science Fair registration open', date: '2026-03-07', priority: 'medium' },
  { title: 'Football team tryouts this Friday', date: '2026-03-06', priority: 'low' },
];

export default function StudentDashboard() {
  const { user, role, loading } = useAuth();

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><p className="text-muted-foreground">Loading...</p></div>;
  if (!user) return <Navigate to="/" />;

  const gpa = (subjects.reduce((sum, s) => sum + s.score, 0) / subjects.length / 25).toFixed(2);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.email?.split('@')[0]}! 👋</h1>
        <p className="text-muted-foreground mt-1">Here's your academic overview for this term.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold text-foreground">{gpa}</p>
            <p className="text-xs text-muted-foreground">Current GPA</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <BookOpen className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold text-foreground">{subjects.length}</p>
            <p className="text-xs text-muted-foreground">Subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Clock className="h-8 w-8 mx-auto text-accent-foreground mb-2" />
            <p className="text-2xl font-bold text-foreground">{assignments.filter(a => a.status === 'pending').length}</p>
            <p className="text-xs text-muted-foreground">Pending Tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Trophy className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold text-foreground">95%</p>
            <p className="text-xs text-muted-foreground">Attendance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Grades */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> Academic Progress</CardTitle>
            <CardDescription>Current term grades</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjects.map((s) => (
              <div key={s.name} className="flex items-center gap-4">
                <span className="w-36 text-sm font-medium text-foreground truncate">{s.name}</span>
                <Progress value={s.score} className="flex-1" />
                <Badge variant={s.score >= 90 ? 'default' : s.score >= 80 ? 'secondary' : 'outline'}>{s.grade}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-primary" /> Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {announcements.map((a, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/50 border">
                <div className="flex items-start gap-2">
                  <Badge variant={a.priority === 'high' ? 'destructive' : a.priority === 'medium' ? 'default' : 'outline'} className="text-[10px] mt-0.5">
                    {a.priority}
                  </Badge>
                  <div>
                    <p className="text-sm font-medium text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Assignments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Assignments</CardTitle>
          <CardDescription>Your upcoming and recent assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assignments.map((a, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  {a.status === 'graded' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : a.status === 'submitted' ? (
                    <Clock className="h-5 w-5 text-blue-500" />
                  ) : (
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.subject} · Due: {a.due}</p>
                  </div>
                </div>
                <Badge variant={a.status === 'graded' ? 'default' : a.status === 'submitted' ? 'secondary' : 'outline'}>
                  {a.status === 'graded' ? `Graded: ${a.grade}` : a.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
