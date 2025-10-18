import React, { useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Star,
  Calendar,
  Languages,
  Award,
  CheckCircle,
  ArrowLeft,
  Video,
  Clock
} from 'lucide-react';
import { getProviderById } from '@/lib/providers';

const ProviderProfile = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const navigate = useNavigate();
  const provider = providerId ? getProviderById(providerId) : null;
  const contentRef = useRef<HTMLDivElement>(null);

  // Animation on mount
  useEffect(() => {
    if (!provider) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('animate-fade-up');
                el.classList.remove('opacity-0');
              }, i * 100);
            });
          }
        });
      },
      observerOptions
    );

    const currentContent = contentRef.current;
    if (currentContent) {
      observer.observe(currentContent);
    }

    return () => {
      if (currentContent) {
        observer.unobserve(currentContent);
      }
    };
  }, [provider]);

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

  // Mock reviews
  const reviews = [
    {
      id: '1',
      author: 'Sarah M.',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Dr. Chen is amazing! She really takes the time to understand your situation and creates a personalized plan. I\'ve lost 25 pounds in 3 months.',
    },
    {
      id: '2',
      author: 'John D.',
      rating: 5,
      date: '1 month ago',
      comment: 'Very professional and knowledgeable. The virtual appointments are so convenient and she always follows up.',
    },
    {
      id: '3',
      author: 'Maria L.',
      rating: 4,
      date: '2 months ago',
      comment: 'Great experience overall. Helpful and encouraging. Would recommend to anyone starting their weight loss journey.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow pt-24 pb-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto" ref={contentRef}>
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/providers')}
            className="mb-6 opacity-0 animate-on-scroll"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Directory
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Provider Header */}
              <Card className="opacity-0 animate-on-scroll">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-32 h-32 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h1 className="text-3xl font-display font-bold mb-2">
                        {provider.name}
                      </h1>
                      <p className="text-lg text-gray-600 mb-3">{provider.credentials}</p>

                      {/* Rating */}
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 font-semibold text-lg">{provider.rating}</span>
                          <span className="ml-2 text-gray-500">
                            ({provider.reviewCount} reviews)
                          </span>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-wellness-600" />
                          <span>{provider.yearsExperience} years experience</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Languages className="w-4 h-4 text-wellness-600" />
                          <span>{provider.languages.join(', ')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Video className="w-4 h-4 text-wellness-600" />
                          <span>Virtual Consultations</span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      {provider.acceptingNewPatients && (
                        <Badge className="bg-green-100 text-green-700 mt-4">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Accepting New Patients
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* About */}
              <Card className="opacity-0 animate-on-scroll">
                <CardHeader>
                  <CardTitle>About {provider.name.split(' ')[1]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{provider.bio}</p>
                </CardContent>
              </Card>

              {/* Specialties */}
              <Card className="opacity-0 animate-on-scroll">
                <CardHeader>
                  <CardTitle>Specialties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {provider.specialties.map((specialty, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-wellness-100 text-wellness-700 text-sm py-2 px-3"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card className="opacity-0 animate-on-scroll">
                <CardHeader>
                  <CardTitle>Patient Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id}>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{review.author}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        {review.id !== reviews[reviews.length - 1].id && (
                          <Separator className="mt-6" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <Card className="sticky top-24 opacity-0 animate-on-scroll">
                <CardHeader>
                  <CardTitle>Book an Appointment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-wellness-50 border border-wellness-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-wellness-700 mb-2">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">Virtual Consultation</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      30-minute video appointment
                    </p>
                  </div>

                  <Link to={`/schedule/${provider.id}`}>
                    <Button className="w-full bg-wellness-600 hover:bg-wellness-700">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Appointment
                    </Button>
                  </Link>

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Appointment Types</p>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Initial Consultation</li>
                        <li>• Follow-up Visit</li>
                        <li>• Nutrition Counseling</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 mb-1">What to Expect</p>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Review medical history</li>
                        <li>• Discuss weight loss goals</li>
                        <li>• Personalized treatment plan</li>
                        <li>• Prescription if appropriate</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Insurance Info */}
              <Card className="opacity-0 animate-on-scroll">
                <CardHeader>
                  <CardTitle className="text-lg">Insurance & Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  <p>We accept most major insurance plans and offer self-pay options.</p>
                  <Button variant="link" className="p-0 h-auto text-wellness-600">
                    View accepted insurance plans
                  </Button>
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

export default ProviderProfile;
