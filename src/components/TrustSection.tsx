
import React, { useRef, useEffect } from 'react';
import { Shield, BadgeCheck, Award, Scale, Trophy } from 'lucide-react';
import AnimatedSplash from './AnimatedSplash';
import { cn } from '@/lib/utils';

const TrustSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (sectionRef.current) {
            sectionRef.current.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('animate-fade-up');
                el.classList.remove('opacity-0');
              }, i * 100);
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

  const trustReasons = [
    {
      icon: <Shield className="text-wellness-600" size={24} />,
      title: "Licensed Medical Professionals",
      description: "Our team consists of board-certified physicians specializing in weight management and GLP-1 therapies."
    },
    {
      icon: <BadgeCheck className="text-wellness-600" size={24} />,
      title: "FDA-Approved Medications",
      description: "We only prescribe FDA-approved GLP-1 medications like Semaglutide and Tirzepatide with proven clinical results."
    },
    {
      icon: <Award className="text-wellness-600" size={24} />,
      title: "Evidence-Based Approach",
      description: "Our GLP-1 protocols are based on the latest medical research and clinical studies for optimal efficacy and safety."
    },
    {
      icon: <Scale className="text-wellness-600" size={24} />,
      title: "Proven Track Record",
      description: "Over 10,000 patients have successfully achieved their weight loss goals through our GLP-1 therapy program."
    }
  ];

  return (
    <section 
      id="why-trust-us" 
      ref={sectionRef}
      className="relative py-24 px-4 bg-wellness-50 overflow-hidden"
    >
      {/* Background decorations */}
      <AnimatedSplash 
        size="lg" 
        className="left-[-20%] top-[30%]" 
        color="hsl(var(--primary) / 0.1)" 
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-wellness-100 text-wellness-800 opacity-0 animate-on-scroll">
            Our Commitment
          </span>
          
          <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold tracking-tight opacity-0 animate-on-scroll">
            Why People Trust Our GLP-1 Program
          </h2>
          
          <p className="mt-4 max-w-2xl mx-auto text-foreground/70 opacity-0 animate-on-scroll">
            Thousands have chosen our medically-supervised GLP-1 approach for sustainable weight management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {trustReasons.map((reason, index) => (
            <div 
              key={index} 
              className="glass p-6 rounded-2xl shadow-elevation opacity-0 animate-on-scroll hover:shadow-elevation-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-wellness-100 flex items-center justify-center flex-shrink-0">
                  {reason.icon}
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {reason.title}
                  </h3>
                  
                  <p className="text-foreground/70">
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-display font-bold mb-4 opacity-0 animate-on-scroll">
              Real Results With GLP-1 Therapy
            </h3>
            
            <p className="text-foreground/70 mb-6 opacity-0 animate-on-scroll">
              Our patients consistently achieve significant weight loss with our comprehensive GLP-1 program that combines medication with nutritional guidance and lifestyle support.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center opacity-0 animate-on-scroll">
                <span className="font-medium">Average Weight Loss</span>
                <span className="text-wellness-700 font-bold">15-20% of body weight</span>
              </div>
              
              <div className="flex justify-between items-center opacity-0 animate-on-scroll">
                <span className="font-medium">Success Rate</span>
                <span className="text-wellness-700 font-bold">92%</span>
              </div>
              
              <div className="flex justify-between items-center opacity-0 animate-on-scroll">
                <span className="font-medium">Patient Satisfaction</span>
                <span className="text-wellness-700 font-bold">4.9/5</span>
              </div>
            </div>
            
            <a href="#questionnaire" className="btn-primary inline-flex items-center gap-2 opacity-0 animate-on-scroll">
              Start Your GLP-1 Journey
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
          </div>
          
          <div className="order-1 md:order-2 opacity-0 animate-on-scroll">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-glass-strong">
                <div className="flex">
                  <div className="m-auto p-1">
                    <div className="relative rounded-xl overflow-hidden h-80">
                      <span className="absolute top-2 left-2 bg-wellness-100 text-wellness-800 px-2 py-1 rounded-lg text-xs font-medium z-10">GLP-1 treatment</span>
                      <img 
                        src="https://plus.unsplash.com/premium_photo-1664885647772-6544c7677f1d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        alt="Woman GLP-1 treatment"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                  {/* <div className="w-1/2 p-1">
                    <div className="relative rounded-xl overflow-hidden h-80">
                      <span className="absolute top-2 left-2 bg-wellness-100 text-wellness-800 px-2 py-1 rounded-lg text-xs font-medium z-10">After</span>
                      <img 
                        src="https://images.unsplash.com/photo-1609243273475-38eb4762170b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                        alt="Woman after GLP-1 treatment"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div> */}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  45 lbs lost in 6 months with GLP-1 therapy
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 p-4 bg-wellness-100 rounded-xl shadow-elevation">
                <div className="flex items-center gap-2">
                  <Trophy className="text-wellness-600" size={24} />
                  <p className="text-sm font-semibold text-wellness-800">Clinically Proven Results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
