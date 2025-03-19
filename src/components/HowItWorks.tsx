
import React, { useEffect, useRef } from 'react';
import { Clipboard, Stethoscope, Pill, UserCheck } from 'lucide-react';
import AnimatedSplash from './AnimatedSplash';
import { cn } from '@/lib/utils';

const steps = [
  {
    icon: Clipboard,
    title: "Complete Questionnaire",
    description: "Answer comprehensive questions about your health history, lifestyle, and weight loss goals to help our physicians understand your unique needs.",
    delay: 0
  },
  {
    icon: Stethoscope,
    title: "Physician Review",
    description: "Our licensed physicians review your information to determine if prescription medication is appropriate for your weight loss journey.",
    delay: 150
  },
  {
    icon: Pill,
    title: "Personalized Prescription",
    description: "Receive a personalized treatment plan and prescription sent directly to your local pharmacy, tailored to your specific health profile.",
    delay: 300
  },
  {
    icon: UserCheck,
    title: "Ongoing Support",
    description: "Get continuous monitoring and support from our medical team to track progress, adjust your plan as needed, and ensure you're on the right path.",
    delay: 450
  }
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (sectionRef.current) {
            sectionRef.current.querySelectorAll('.animate-on-scroll').forEach((el) => {
              el.classList.add('animate-fade-up');
              el.classList.remove('opacity-0');
            });
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background decorations */}
      <AnimatedSplash 
        size="lg" 
        className="right-[-30%] top-[0%]" 
        color="hsl(var(--primary) / 0.1)" 
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-wellness-100 text-wellness-800 opacity-0 animate-on-scroll">
            Simple Four-Step Process
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold tracking-tight opacity-0 animate-on-scroll">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/70 opacity-0 animate-on-scroll">
            Our physician-guided approach combines medical expertise with personalized care to help you achieve sustainable weight loss.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative bg-white rounded-xl p-6 shadow-subtle border border-border/50 opacity-0 animate-on-scroll card-hover"
              style={{ animationDelay: `${step.delay}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-wellness-100 flex items-center justify-center text-wellness-600 mb-4">
                <step.icon size={24} />
              </div>
              
              <div className="absolute top-6 right-6 flex items-center justify-center w-6 h-6 rounded-full bg-wellness-100 text-wellness-800 text-sm font-medium">
                {index + 1}
              </div>
              
              <h3 className="text-xl font-display font-semibold mb-2">{step.title}</h3>
              <p className="text-foreground/70 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#questionnaire" 
            className="btn-primary inline-flex items-center gap-2 opacity-0 animate-on-scroll"
          >
            Start Your Assessment
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
