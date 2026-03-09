import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/components/auth/AuthProvider';
import { Navigate } from 'react-router-dom';
import { Users, Calendar, MessageSquare, TrendingUp, Clock, DollarSign, Bell, CheckCircle } from 'lucide-react';

const childGrades = [
  { subject: 'Mathematics', grade: 'A', score: 92, teacher: 'Mr. Okello' },
  { subject: 'English', grade: 'A-', score: 88, teacher: 'Ms. Nakamura' },
  { subject: 'Physics', grade: 'B+', score: 85, teacher: 'Dr. Ssemakula' },
  { subject: 'Chemistry', grade: 'B+', score: 83, teacher: 'Ms. Achieng' },
];

const attendanceData = [
  { month: 'January', present: 20, absent: 1, total: 21 },
  { month: 'February', present: 18, absent: 2, total: 20 },
  { month: 'March', present: 6, absent: 0, total: 6 },
];

const upcomingEvents = [
  { title: 'Parent-Teacher Conference', date: '2026-03-15', type: 'meeting' },
  { title: 'Mid-term Exams Begin', date: '2026-03-20', type: 'academic' },
  { title: 'Science Exhibition', date: '2026-03-28', type: 'event' },
  { title: 'Easter Holiday Starts', date: '2026-04-02', type: 'holiday' },
];

const feesSummary = {
  total: 2500000,
  paid: 1875000,
  balance: 625000,
  currency: 'UGX',
  nextDue: '2026-04-01',
};

export default function ParentPortal() {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><p className="text-muted-foreground">Loading...</p></div>;
  if (!user) return <Navigate to="/" />;

  const totalPresent = attendanceData.reduce((s, m) => s + m.present, 0);
  const totalDays = attendanceData.reduce((s, m) => s + m.total, 0);
  const attendanceRate = ((totalPresent / totalDays) * 100).toFixed(1);
  const feesPaidPercent = (feesSummary.paid / feesSummary.total) * 100;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Parent Portal 👨‍👩‍👧</h1>
        <p className="text-muted-foreground mt-1">Monitor your child's progress, attendance, and school activities.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold text-foreground">3.48</p>
            <p className="text-xs text-muted-foreground">Child's GPA</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
            <p className="text-2xl font-bold text-foreground">{attendanceRate}%</p>
            <p className="text-xs text-muted-foreground">Attendance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <DollarSign className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold text-foreground">{feesPaidPercent.toFixed(0)}%</p>
            <p className="text-xs text-muted-foreground">Fees Paid</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Calendar className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold text-foreground">{upcomingEvents.length}</p>
            <p className="text-xs text-muted-foreground">Upcoming Events</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Academic Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Academic Performance</CardTitle>
            <CardDescription>Current term subject grades</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {childGrades.map((g) => (
              <div key={g.subject} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{g.subject}</span>
                  <span className="text-muted-foreground">{g.teacher}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={g.score} className="flex-1" />
                  <Badge variant={g.score >= 90 ? 'default' : 'secondary'}>{g.grade}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Fees */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-primary" /> Fee Summary</CardTitle>
            <CardDescription>Term 1, 2026</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Fees</span>
                <span className="font-medium text-foreground">{formatCurrency(feesSummary.total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-medium text-green-600">{formatCurrency(feesSummary.paid)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Balance</span>
                <span className="font-bold text-destructive">{formatCurrency(feesSummary.balance)}</span>
              </div>
              <Progress value={feesPaidPercent} className="mt-2" />
              <p className="text-xs text-muted-foreground">Next payment due: {feesSummary.nextDue}</p>
            </div>

            {/* Attendance */}
            <div className="pt-4 border-t">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" /> Monthly Attendance
              </h4>
              {attendanceData.map((m) => (
                <div key={m.month} className="flex items-center justify-between text-sm py-1">
                  <span className="text-muted-foreground">{m.month}</span>
                  <span className="text-foreground">{m.present}/{m.total} days <Badge variant="outline" className="ml-2 text-[10px]">{((m.present/m.total)*100).toFixed(0)}%</Badge></span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /> Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-3">
            {upcomingEvents.map((e, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                <Calendar className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">{e.title}</p>
                  <p className="text-xs text-muted-foreground">{e.date}</p>
                </div>
                <Badge variant="outline" className="ml-auto text-[10px]">{e.type}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
