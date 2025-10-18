import React from 'react';
import MemberNav from '@/components/MemberNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Video, Clock, User, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Appointments = () => {
  // Mock data - replace with actual API calls
  const upcomingAppointments = [
    {
      id: '1',
      date: '2024-11-25',
      time: '10:00 AM - 10:30 AM',
      type: 'Follow-up Consultation',
      provider: 'Dr. Emily Chen',
      meetingLink: 'https://meet.example.com/abc123',
      notes: 'Discuss progress and adjust medication if needed.',
    },
    {
      id: '2',
      date: '2024-12-15',
      time: '2:00 PM - 2:30 PM',
      type: 'Nutrition Counseling',
      provider: 'Sarah Williams, RD',
      meetingLink: 'https://meet.example.com/def456',
    },
  ];

  const pastAppointments = [
    {
      id: '3',
      date: '2024-10-20',
      time: '10:00 AM - 10:30 AM',
      type: 'Follow-up Consultation',
      provider: 'Dr. Emily Chen',
      summary: 'Reviewed lab results. Patient showing excellent progress with 10lb weight loss. Continue current dosage.',
    },
    {
      id: '4',
      date: '2024-09-15',
      time: '3:00 PM - 3:30 PM',
      type: 'Initial Consultation',
      provider: 'Dr. Emily Chen',
      summary: 'Initial assessment completed. Started on GLP-1 therapy at 0.25mg weekly. Reviewed diet and exercise plan.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MemberNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">
              Appointments
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your consultations and follow-up visits
            </p>
          </div>
          <Button className="bg-wellness-600 hover:bg-wellness-700">
            <Plus className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">
              <Calendar className="mr-2 h-4 w-4" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="past">
              <Clock className="mr-2 h-4 w-4" />
              Past Appointments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-wellness-100 p-3 rounded-full">
                          <Video className="h-6 w-6 text-wellness-600" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{appointment.type}</CardTitle>
                          <CardDescription className="mt-1">
                            <User className="inline h-4 w-4 mr-1" />
                            {appointment.provider}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">Scheduled</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Date</p>
                          <p className="text-sm text-gray-600">{appointment.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Time</p>
                          <p className="text-sm text-gray-600">{appointment.time}</p>
                        </div>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800">{appointment.notes}</p>
                      </div>
                    )}

                    <div className="flex items-center space-x-3 pt-2">
                      <Button className="bg-wellness-600 hover:bg-wellness-700">
                        <Video className="mr-2 h-4 w-4" />
                        Join Video Call
                      </Button>
                      <Button variant="outline">Reschedule</Button>
                      <Button variant="outline">Cancel</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Upcoming Appointments
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Schedule your next consultation to continue your wellness journey.
                  </p>
                  <Button className="bg-wellness-600 hover:bg-wellness-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Now
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {pastAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <Video className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{appointment.type}</CardTitle>
                        <CardDescription className="mt-1">
                          <User className="inline h-4 w-4 mr-1" />
                          {appointment.provider}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-gray-100 text-gray-700">
                      Completed
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Date</p>
                        <p className="text-sm text-gray-600">{appointment.date}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Time</p>
                        <p className="text-sm text-gray-600">{appointment.time}</p>
                      </div>
                    </div>
                  </div>

                  {appointment.summary && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-sm text-gray-900 mb-2">
                        Visit Summary
                      </h4>
                      <p className="text-sm text-gray-700">{appointment.summary}</p>
                    </div>
                  )}

                  <div className="flex items-center space-x-3 pt-2">
                    <Button variant="outline">Download Summary</Button>
                    <Button variant="outline">Request Follow-up</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card className="mt-8 bg-gradient-to-r from-wellness-50 to-wellness-100 border-wellness-200">
          <CardContent className="py-6">
            <div className="flex items-start space-x-4">
              <div className="bg-wellness-600 rounded-full p-3">
                <Video className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-wellness-900 mb-2">
                  Telehealth Appointments
                </h3>
                <p className="text-sm text-wellness-800">
                  All appointments are conducted via secure video call. You'll receive a reminder
                  email 24 hours before your appointment with a link to join. Make sure you're in
                  a quiet, private location with good internet connection.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Appointments;
