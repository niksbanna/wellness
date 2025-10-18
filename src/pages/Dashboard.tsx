import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MemberNav from '@/components/MemberNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  TrendingDown,
  Calendar,
  FlaskConical,
  Pill,
  ArrowRight,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const { member } = useAuth();

  // Mock data - replace with actual API calls
  const weightData = [
    { date: '2024-01', weight: 185 },
    { date: '2024-02', weight: 182 },
    { date: '2024-03', weight: 178 },
    { date: '2024-04', weight: 175 },
  ];

  const weightLoss = member?.currentWeight && member?.targetWeight
    ? ((185 - member.currentWeight) / (185 - member.targetWeight)) * 100
    : 0;

  const upcomingAppointments = [
    {
      id: '1',
      date: '2024-11-25',
      time: '10:00 AM',
      type: 'Follow-up Consultation',
      provider: 'Dr. Emily Chen',
    },
  ];

  const recentLabs = [
    {
      id: '1',
      date: '2024-10-15',
      type: 'Comprehensive Metabolic Panel',
      status: 'completed' as const,
    },
  ];

  const medications = [
    {
      id: '1',
      name: 'Semaglutide',
      dosage: '0.5mg',
      nextRefill: '2024-11-20',
      refillsRemaining: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MemberNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Welcome back, {member?.firstName}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's your wellness journey at a glance
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
              <TrendingDown className="h-4 w-4 text-wellness-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{member?.currentWeight} lbs</div>
              <p className="text-xs text-green-600 mt-1">
                -10 lbs from start
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
              <TrendingDown className="h-4 w-4 text-wellness-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(weightLoss)}%</div>
              <Progress value={weightLoss} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
              <Calendar className="h-4 w-4 text-wellness-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Nov 25</div>
              <p className="text-xs text-muted-foreground mt-1">
                10:00 AM with Dr. Chen
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">
                {member?.subscriptionStatus}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Next billing: Dec 15
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weight Progress Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Weight Progress</CardTitle>
              <CardDescription>Your weight journey over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[140, 190]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981' }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4">
                <Link to="/progress">
                  <Button variant="outline" className="w-full">
                    View Detailed Progress
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/progress">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingDown className="mr-2 h-4 w-4" />
                  Log Weight
                </Button>
              </Link>
              <Link to="/appointments">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </Button>
              </Link>
              <Link to="/medications">
                <Button variant="outline" className="w-full justify-start">
                  <Pill className="mr-2 h-4 w-4" />
                  Request Refill
                </Button>
              </Link>
              <Link to="/labs">
                <Button variant="outline" className="w-full justify-start">
                  <FlaskConical className="mr-2 h-4 w-4" />
                  View Lab Results
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Items */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Upcoming Appointments
                <Calendar className="h-5 w-5 text-wellness-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((apt) => (
                    <div key={apt.id} className="border-l-4 border-wellness-600 pl-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{apt.type}</h4>
                        <Badge variant="outline">Upcoming</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {apt.date} at {apt.time}
                      </p>
                      <p className="text-sm text-muted-foreground">{apt.provider}</p>
                    </div>
                  ))}
                  <Link to="/appointments">
                    <Button variant="link" className="p-0 h-auto">
                      View all appointments
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No upcoming appointments</p>
              )}
            </CardContent>
          </Card>

          {/* Recent Labs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Labs
                <FlaskConical className="h-5 w-5 text-wellness-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentLabs.length > 0 ? (
                <div className="space-y-4">
                  {recentLabs.map((lab) => (
                    <div key={lab.id} className="border-l-4 border-green-500 pl-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{lab.type}</h4>
                        <Badge className="bg-green-100 text-green-700">
                          {lab.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{lab.date}</p>
                    </div>
                  ))}
                  <Link to="/labs">
                    <Button variant="link" className="p-0 h-auto">
                      View all lab results
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No recent lab results</p>
              )}
            </CardContent>
          </Card>

          {/* Medications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Medications
                <Pill className="h-5 w-5 text-wellness-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {medications.length > 0 ? (
                <div className="space-y-4">
                  {medications.map((med) => (
                    <div key={med.id} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{med.name}</h4>
                        <Badge variant="outline">{med.dosage}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Next refill: {med.nextRefill}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {med.refillsRemaining} refills remaining
                      </p>
                    </div>
                  ))}
                  <Link to="/medications">
                    <Button variant="link" className="p-0 h-auto">
                      Manage medications
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No active medications</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
