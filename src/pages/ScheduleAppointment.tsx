import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  Video,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { getProviderById } from '@/lib/providers';
import { cn } from '@/lib/utils';
import { format, addDays } from 'date-fns';

// Simulated API function
const bookAppointment = async (data: any) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  if (Math.random() < 0.05) {
    throw new Error('Failed to book appointment. Please try again.');
  }
  return { success: true, confirmationNumber: 'APT-' + Math.random().toString(36).substr(2, 9).toUpperCase() };
};

const ScheduleAppointment = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const provider = providerId ? getProviderById(providerId) : null;

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<string>('initial_consultation');
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    reason: '',
  });

  const mutation = useMutation({
    mutationFn: bookAppointment,
    onSuccess: (data) => {
      navigate('/booking-confirmation', {
        state: {
          provider,
          date: selectedDate ? format(selectedDate, 'MMMM dd, yyyy') : '',
          time: selectedTime,
          type: appointmentType,
          confirmationNumber: data.confirmationNumber,
        },
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Booking Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  if (!provider) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Provider Not Found</h1>
            <Button onClick={() => navigate('/providers')} className="bg-wellness-600 hover:bg-wellness-700">
              Back to Directory
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Generate available dates (next 14 days)
  const availableDates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

  // Get time slots for selected date
  const getTimeSlots = () => {
    if (!selectedDate) return [];
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    return provider.availability[dateKey] || [];
  };

  const timeSlots = getTimeSlots();

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: 'Missing Information',
        description: 'Please select a date and time.',
        variant: 'destructive',
      });
      return;
    }

    mutation.mutate({
      providerId: provider.id,
      providerName: provider.name,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
      type: appointmentType,
      ...formData,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow pt-24 pb-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(`/providers/${provider.id}`)}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Provider Profile
          </Button>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors',
                        step >= s
                          ? 'bg-wellness-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      )}
                    >
                      {s}
                    </div>
                    <span className="text-sm mt-2 text-gray-600">
                      {s === 1 && 'Select Date & Time'}
                      {s === 2 && 'Appointment Type'}
                      {s === 3 && 'Your Information'}
                    </span>
                  </div>
                  {s < 3 && (
                    <div
                      className={cn(
                        'w-16 h-1 transition-colors',
                        step > s ? 'bg-wellness-600' : 'bg-gray-200'
                      )}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {step === 1 && 'Select Date & Time'}
                    {step === 2 && 'Choose Appointment Type'}
                    {step === 3 && 'Enter Your Information'}
                  </CardTitle>
                  <CardDescription>
                    {step === 1 && 'Choose a date and available time slot'}
                    {step === 2 && 'Select the type of consultation you need'}
                    {step === 3 && 'Provide your contact information'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Step 1: Date & Time Selection */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <Label className="text-base mb-4 block">Select Date</Label>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) =>
                            date < new Date() ||
                            !availableDates.some(d =>
                              format(d, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                            )
                          }
                          className="rounded-md border"
                        />
                      </div>

                      {selectedDate && timeSlots.length > 0 && (
                        <div>
                          <Label className="text-base mb-4 block">Select Time</Label>
                          <div className="grid grid-cols-3 gap-3">
                            {timeSlots.map((slot) => (
                              <Button
                                key={slot.time}
                                variant={selectedTime === slot.time ? 'default' : 'outline'}
                                disabled={!slot.available}
                                onClick={() => setSelectedTime(slot.time)}
                                className={cn(
                                  selectedTime === slot.time && 'bg-wellness-600 hover:bg-wellness-700'
                                )}
                              >
                                {slot.time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedDate && timeSlots.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          No available time slots for this date. Please select another date.
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 2: Appointment Type */}
                  {step === 2 && (
                    <RadioGroup value={appointmentType} onValueChange={setAppointmentType}>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="initial_consultation" id="initial" className="mt-1" />
                          <Label htmlFor="initial" className="cursor-pointer flex-1">
                            <div className="font-semibold mb-1">Initial Consultation</div>
                            <div className="text-sm text-gray-600">
                              First-time visit to discuss your health goals and create a personalized weight loss plan
                            </div>
                            <div className="text-sm font-semibold text-wellness-600 mt-2">30 minutes</div>
                          </Label>
                        </div>

                        <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="follow_up" id="followup" className="mt-1" />
                          <Label htmlFor="followup" className="cursor-pointer flex-1">
                            <div className="font-semibold mb-1">Follow-up Visit</div>
                            <div className="text-sm text-gray-600">
                              Check-in on your progress, adjust medications, and address any concerns
                            </div>
                            <div className="text-sm font-semibold text-wellness-600 mt-2">20 minutes</div>
                          </Label>
                        </div>

                        <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="nutrition_counseling" id="nutrition" className="mt-1" />
                          <Label htmlFor="nutrition" className="cursor-pointer flex-1">
                            <div className="font-semibold mb-1">Nutrition Counseling</div>
                            <div className="text-sm text-gray-600">
                              Work with our dietitian on meal planning and nutrition strategies
                            </div>
                            <div className="text-sm font-semibold text-wellness-600 mt-2">45 minutes</div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  )}

                  {/* Step 3: Patient Information */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.patientName}
                          onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.patientEmail}
                          onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.patientPhone}
                          onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                          placeholder="(555) 123-4567"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="reason">Reason for Visit (Optional)</Label>
                        <Textarea
                          id="reason"
                          value={formData.reason}
                          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                          placeholder="Tell us briefly what you'd like to discuss"
                          rows={4}
                        />
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-6 pt-6 border-t">
                    {step > 1 && (
                      <Button
                        variant="outline"
                        onClick={() => setStep(step - 1)}
                        disabled={mutation.isPending}
                      >
                        Back
                      </Button>
                    )}

                    {step < 3 ? (
                      <Button
                        onClick={() => setStep(step + 1)}
                        disabled={
                          (step === 1 && (!selectedDate || !selectedTime)) ||
                          (step === 2 && !appointmentType)
                        }
                        className={cn(
                          'bg-wellness-600 hover:bg-wellness-700',
                          step === 1 && 'ml-auto'
                        )}
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={
                          !formData.patientName ||
                          !formData.patientEmail ||
                          !formData.patientPhone ||
                          mutation.isPending
                        }
                        className="bg-wellness-600 hover:bg-wellness-700 ml-auto"
                      >
                        {mutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Booking...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Confirm Booking
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Appointment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Provider Info */}
                  <div className="flex items-start space-x-3">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{provider.name}</p>
                      <p className="text-sm text-gray-600">{provider.title}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    {/* Date */}
                    <div className="flex items-center space-x-3 text-sm">
                      <CalendarIcon className="w-5 h-5 text-wellness-600" />
                      <div>
                        <p className="text-gray-600">Date</p>
                        <p className="font-medium">
                          {selectedDate ? format(selectedDate, 'MMMM dd, yyyy') : 'Not selected'}
                        </p>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-center space-x-3 text-sm">
                      <Clock className="w-5 h-5 text-wellness-600" />
                      <div>
                        <p className="text-gray-600">Time</p>
                        <p className="font-medium">{selectedTime || 'Not selected'}</p>
                      </div>
                    </div>

                    {/* Type */}
                    <div className="flex items-center space-x-3 text-sm">
                      <Video className="w-5 h-5 text-wellness-600" />
                      <div>
                        <p className="text-gray-600">Type</p>
                        <p className="font-medium">
                          {appointmentType === 'initial_consultation' && 'Initial Consultation'}
                          {appointmentType === 'follow_up' && 'Follow-up Visit'}
                          {appointmentType === 'nutrition_counseling' && 'Nutrition Counseling'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-wellness-50 border border-wellness-200 rounded-lg p-4 mt-4">
                    <p className="text-sm text-wellness-800">
                      You'll receive a confirmation email with a video call link 24 hours before your appointment.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ScheduleAppointment;
