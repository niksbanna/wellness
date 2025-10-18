import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, Clock, Video, Mail, Download, Home } from 'lucide-react';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  if (!bookingData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">No Booking Found</h1>
            <Button onClick={() => navigate('/providers')} className="bg-wellness-600 hover:bg-wellness-700">
              Browse Providers
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { provider, date, time, type, confirmationNumber } = bookingData;

  const getAppointmentTypeName = (type: string) => {
    switch (type) {
      case 'initial_consultation':
        return 'Initial Consultation';
      case 'follow_up':
        return 'Follow-up Visit';
      case 'nutrition_counseling':
        return 'Nutrition Counseling';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow pt-24 pb-16 px-4 bg-gradient-to-br from-wellness-50 to-white">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Appointment Confirmed!
            </h1>
            <p className="text-xl text-gray-600">
              Your telehealth appointment has been successfully scheduled
            </p>
          </div>

          {/* Confirmation Details */}
          <Card className="mb-6">
            <CardContent className="p-8">
              {/* Confirmation Number */}
              <div className="bg-wellness-50 border-2 border-wellness-200 rounded-lg p-4 mb-6 text-center">
                <p className="text-sm text-wellness-700 font-medium mb-1">
                  Confirmation Number
                </p>
                <p className="text-2xl font-bold text-wellness-900 font-mono">
                  {confirmationNumber}
                </p>
              </div>

              {/* Provider Info */}
              <div className="flex items-start space-x-4 mb-6 pb-6 border-b">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{provider.name}</h3>
                  <p className="text-gray-600">{provider.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{provider.credentials}</p>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-wellness-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-wellness-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Date</p>
                    <p className="text-lg font-semibold">{date}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-wellness-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-wellness-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Time</p>
                    <p className="text-lg font-semibold">{time}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-wellness-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Video className="w-5 h-5 text-wellness-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Appointment Type</p>
                    <p className="text-lg font-semibold">{getAppointmentTypeName(type)}</p>
                    <p className="text-sm text-gray-500 mt-1">Virtual Video Consultation</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="mb-6">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">What Happens Next?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-wellness-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Confirmation Email</p>
                    <p className="text-sm text-gray-600">
                      You'll receive a confirmation email with all appointment details within the next few minutes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-wellness-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Pre-Appointment Reminder</p>
                    <p className="text-sm text-gray-600">
                      24 hours before your appointment, we'll send you a reminder email with the video call link.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-wellness-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Prepare for Your Visit</p>
                    <p className="text-sm text-gray-600">
                      Review your medical history and list any questions you'd like to discuss with your provider.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-wellness-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Join Your Appointment</p>
                    <p className="text-sm text-gray-600">
                      On the day of your appointment, click the video link in your email to join the call.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full h-14"
              onClick={() => window.print()}
            >
              <Download className="mr-2 h-5 w-5" />
              Save Confirmation
            </Button>
            <Link to="/" className="w-full">
              <Button className="w-full h-14 bg-wellness-600 hover:bg-wellness-700">
                <Home className="mr-2 h-5 w-5" />
                Return to Home
              </Button>
            </Link>
          </div>

          {/* Help Section */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Need to Make Changes?
                  </h3>
                  <p className="text-sm text-blue-800 mb-3">
                    If you need to reschedule or cancel your appointment, please contact us at least
                    24 hours in advance.
                  </p>
                  <div className="space-y-1 text-sm text-blue-800">
                    <p>📧 Email: appointments@wellnessrx.com</p>
                    <p>📞 Phone: (800) 555-1234</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Requirements */}
          <Card className="mt-6 bg-gray-50">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Technical Requirements for Video Call</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>A computer, tablet, or smartphone with a camera and microphone</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Stable internet connection (minimum 1 Mbps recommended)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>A quiet, private location for your consultation</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Updated web browser (Chrome, Firefox, Safari, or Edge)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;
