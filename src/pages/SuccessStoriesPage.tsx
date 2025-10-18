
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { ArrowLeft, Star, TrendingDown, Calendar, Award } from 'lucide-react';

const SuccessStoriesPage = () => {
  const stats = [
    {
      icon: TrendingDown,
      value: "35+",
      label: "Average Weight Loss (lbs)"
    },
    {
      icon: Calendar,
      value: "5.5",
      label: "Average Duration (months)"
    },
    {
      icon: Award,
      value: "94%",
      label: "Success Rate"
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Average Rating"
    }
  ];

  return (
    <div className="min-h-screen w-full">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-24 pb-8 px-4 bg-gradient-to-b from-wellness-50 to-white">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-wellness-600 hover:text-wellness-700 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
            Success Stories
          </h1>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl">
            Real people, real results. Discover how our physician-guided weight loss program has transformed lives and helped individuals achieve their health goals.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-wellness-50 rounded-xl p-6 text-center border border-wellness-100"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-wellness-100 flex items-center justify-center text-wellness-600">
                    <stat.icon size={24} />
                  </div>
                </div>
                <div className="text-3xl font-display font-bold text-wellness-700 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Component */}
      <Testimonials />

      {/* Additional Success Stories Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">
            More Inspiring Transformations
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-wellness-50 rounded-xl p-6 border border-wellness-100">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-wellness-200 flex items-center justify-center text-2xl font-bold text-wellness-700">
                  LM
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Lisa M.</h3>
                  <p className="text-sm text-foreground/60">Seattle, WA</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground/70 text-sm">
                  "The personalized care and medical supervision made me feel safe throughout my weight loss journey. Lost 38 pounds in 6 months!"
                </p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Weight Lost:</span>
                <span className="font-semibold text-wellness-700">38 lbs</span>
              </div>
            </div>

            <div className="bg-wellness-50 rounded-xl p-6 border border-wellness-100">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-wellness-200 flex items-center justify-center text-2xl font-bold text-wellness-700">
                  RC
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Robert C.</h3>
                  <p className="text-sm text-foreground/60">Miami, FL</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground/70 text-sm">
                  "After trying countless diets, this medical approach finally worked. The prescription medication helped control my cravings effectively."
                </p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Weight Lost:</span>
                <span className="font-semibold text-wellness-700">45 lbs</span>
              </div>
            </div>

            <div className="bg-wellness-50 rounded-xl p-6 border border-wellness-100">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-wellness-200 flex items-center justify-center text-2xl font-bold text-wellness-700">
                  KT
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Karen T.</h3>
                  <p className="text-sm text-foreground/60">Austin, TX</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground/70 text-sm">
                  "The ongoing support and regular check-ins kept me accountable. I appreciate the holistic approach to my health and wellness."
                </p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Weight Lost:</span>
                <span className="font-semibold text-wellness-700">32 lbs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-wellness-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Start Your Own Success Story?
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Join thousands of satisfied members who have transformed their lives with our physician-guided weight loss program.
          </p>
          <Link to="/" className="btn-primary">
            Begin Your Journey Today
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SuccessStoriesPage;
