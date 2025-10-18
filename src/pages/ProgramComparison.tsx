import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Star, Calculator, ArrowRight } from 'lucide-react';
import { programTiers } from '@/lib/programs';

const ProgramComparison = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
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
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-wellness-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Compare Our Programs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the program that best fits your needs and budget. All programs include physician-prescribed GLP-1 medications.
          </p>
          <Link to="/pricing-calculator">
            <Button className="bg-wellness-600 hover:bg-wellness-700">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Your Cost
            </Button>
          </Link>
        </div>
      </section>

      {/* Comparison Cards */}
      <section className="py-16 px-4 bg-gray-50" ref={contentRef}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programTiers.map((program, index) => (
              <Card
                key={program.id}
                className={`relative opacity-0 animate-on-scroll ${
                  program.popular ? 'border-2 border-wellness-600 shadow-xl' : ''
                }`}
              >
                {program.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-wellness-600 text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1 inline" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{program.name}</CardTitle>
                  <CardDescription className="text-base mb-6">
                    {program.shortDescription}
                  </CardDescription>

                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-wellness-700">
                      ${program.price.monthly}
                      <span className="text-lg font-normal text-gray-600">/month</span>
                    </div>
                    {program.price.consultation > 0 && (
                      <p className="text-sm text-gray-500">
                        + ${program.price.consultation} one-time consultation
                      </p>
                    )}
                    {program.price.consultation === 0 && (
                      <p className="text-sm text-green-600 font-medium">
                        Consultation fee waived!
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Included Features */}
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-3">What's Included</h4>
                    <ul className="space-y-2">
                      {program.features.included.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Not Included */}
                  {program.features.notIncluded && program.features.notIncluded.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-3">Not Included</h4>
                      <ul className="space-y-2">
                        {program.features.notIncluded.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <X className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-500">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Ideal For */}
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-3">Ideal For</h4>
                    <ul className="space-y-1">
                      {program.ideal_for.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                          <span className="text-wellness-600 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div className="pt-4 border-t">
                    <p className="text-xs text-gray-500">
                      <strong>Requirements:</strong> BMI ≥{program.requirements.minBMI}
                      {program.requirements.conditions && program.requirements.conditions.length > 0 && (
                        <>
                          {'. '}
                          {program.requirements.conditions[0]}
                        </>
                      )}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Link to="/" className="block">
                    <Button
                      className={`w-full ${
                        program.popular
                          ? 'bg-wellness-600 hover:bg-wellness-700'
                          : 'bg-gray-900 hover:bg-gray-800'
                      }`}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Medication Info */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Medication Costs & Insurance
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Medication Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <p className="font-medium">Semaglutide</p>
                    <p className="text-sm text-gray-500">Weekly injection</p>
                  </div>
                  <p className="font-semibold text-wellness-700">~$300/month</p>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <p className="font-medium">Tirzepatide</p>
                    <p className="text-sm text-gray-500">Weekly injection</p>
                  </div>
                  <p className="font-semibold text-wellness-700">~$500/month</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Liraglutide</p>
                    <p className="text-sm text-gray-500">Daily injection</p>
                  </div>
                  <p className="font-semibold text-wellness-700">~$450/month</p>
                </div>
                <p className="text-xs text-gray-500 pt-4">
                  *Prices shown are without insurance. Actual costs may vary.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Insurance Coverage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="font-medium mb-1">Commercial Insurance</p>
                    <p className="text-sm text-gray-600">Many plans cover 60-80% of medication costs</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Medicare</p>
                    <p className="text-sm text-gray-600">Coverage varies; typically 20-40% covered</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Medicaid</p>
                    <p className="text-sm text-gray-600">State-dependent; 30-60% average coverage</p>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t">
                  <p className="text-sm text-gray-700">
                    We'll help verify your coverage and find the most affordable option during your consultation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/pricing-calculator">
              <Button size="lg" className="bg-wellness-600 hover:bg-wellness-700">
                <Calculator className="w-5 h-5 mr-2" />
                Get Your Personalized Estimate
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Common Questions
          </h2>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I switch programs later?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Yes! You can upgrade or downgrade your program at any time. We'll prorate the difference and apply it to your next billing cycle.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's included in the consultation?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Your initial consultation includes a comprehensive health assessment, review of medical history, discussion of weight loss goals, and determination of the best treatment plan for you.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you accept payment plans?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Yes! We offer flexible payment options including monthly billing, 3-month, 6-month, and 12-month plans with savings. HSA/FSA cards are also accepted.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What if I'm not eligible for medication?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  If medication isn't appropriate for you, we'll discuss alternative options and provide a full refund of any program fees paid (consultation fee may apply).
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Have more questions?</p>
            <Link to="/resources/weight-loss-faq">
              <Button variant="outline">
                View Full FAQ
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-wellness-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-wellness-50">
            Schedule your consultation today and take the first step toward your weight loss goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="bg-white text-wellness-600 hover:bg-gray-100">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/pricing-calculator">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-wellness-700">
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Costs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProgramComparison;
