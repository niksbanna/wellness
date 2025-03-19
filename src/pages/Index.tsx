
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Journey from '@/components/Journey';
import GLP1Section from '@/components/GLP1Section';
import Questionnaire from '@/components/Questionnaire';
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQSection';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import TrustSection from '@/components/TrustSection';

const Index = () => {
  // Initialize intersection observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      fadeElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <Hero />
      <GLP1Section />
      <HowItWorks />
      <TrustSection />
      <Journey />
      <Testimonials />
      <Questionnaire />
      <FAQSection />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
