
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen w-full">
      <Navbar />

      {/* Breadcrumb and back button */}
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
            How It Works
          </h1>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl">
            Our comprehensive four-step process is designed to provide you with personalized, physician-guided weight loss support every step of the way.
          </p>
        </div>
      </div>

      <HowItWorks />

      {/* Additional detailed information */}
      <section className="py-16 px-4 bg-wellness-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">
            Why Our Process Works
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-subtle">
              <h3 className="text-xl font-semibold mb-3 text-wellness-700">
                Medical Expertise
              </h3>
              <p className="text-foreground/70">
                All treatment plans are reviewed and approved by licensed physicians who understand the complex relationship between metabolism, hormones, and weight management.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-subtle">
              <h3 className="text-xl font-semibold mb-3 text-wellness-700">
                Personalized Approach
              </h3>
              <p className="text-foreground/70">
                We don't believe in one-size-fits-all solutions. Your treatment plan is tailored to your unique health profile, lifestyle, and weight loss goals.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-subtle">
              <h3 className="text-xl font-semibold mb-3 text-wellness-700">
                Evidence-Based Treatment
              </h3>
              <p className="text-foreground/70">
                We use FDA-approved medications and treatment protocols backed by clinical research to ensure safe and effective weight loss outcomes.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-subtle">
              <h3 className="text-xl font-semibold mb-3 text-wellness-700">
                Ongoing Support
              </h3>
              <p className="text-foreground/70">
                Weight loss is a journey. Our medical team provides continuous monitoring and adjusts your treatment plan to ensure long-term success.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/" className="btn-primary">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;
