
import React, { useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import AnimatedSplash from './AnimatedSplash';
import { cn } from '@/lib/utils';

const benefits = [
  "Personalized medical assessment",
  "FDA-approved prescription medications",
  "Ongoing physician support",
  "Pharmacy delivery or pickup options",
  "Detailed progress tracking",
  "Lifestyle and nutrition guidance"
];

const Journey = () => {
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

  return (
    <section 
      id="journey" 
      ref={sectionRef}
      className="relative py-24 px-4 bg-wellness-50"
    >
      {/* Background decorations */}
      <AnimatedSplash 
        size="md" 
        className="left-[-10%] bottom-[10%]" 
        color="hsl(var(--primary) / 0.15)" 
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-wellness-100 text-wellness-800 opacity-0 animate-on-scroll">
              Your Transformation
            </span>
            
            <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold tracking-tight opacity-0 animate-on-scroll">
              A Medically-Guided Journey to a Healthier You
            </h2>
            
            <p className="mt-4 text-foreground/70 opacity-0 animate-on-scroll">
              Our approach combines the latest medical advances with personalized care to help you achieve lasting weight loss results under the guidance of licensed physicians.
            </p>
            
            <div className="mt-8 space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 opacity-0 animate-on-scroll"
                >
                  <CheckCircle className="text-wellness-600 mt-0.5 flex-shrink-0" size={20} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            
            <a 
              href="#questionnaire" 
              className="mt-8 inline-flex btn-primary items-center gap-2 opacity-0 animate-on-scroll"
            >
              Start Your Journey <ArrowRight size={18} />
            </a>
          </div>
          
          <div className="relative opacity-0 animate-on-scroll">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-glass-strong">
              <img 
                src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Person enjoying their wellness journey"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating statistics */}
            <div className="glass absolute top-8 -left-4 md:-left-10 p-4 rounded-xl shadow-elevation rotate-[-3deg] animate-float" style={{animationDelay: '0.3s'}}>
              <div className="flex flex-col gap-1">
                <p className="text-xs text-foreground/70">Success Rate</p>
                <p className="text-2xl font-display font-bold text-wellness-700">92%</p>
                <div className="w-full bg-gray-200 h-1.5 rounded-full mt-1">
                  <div className="bg-wellness-600 h-1.5 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="glass absolute bottom-12 -right-4 md:-right-10 p-4 rounded-xl shadow-elevation rotate-[3deg] animate-float" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-wellness-500 rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h6"></path><path d="M22 12h-6"></path><path d="M12 2v6"></path><path d="M12 22v-6"></path><path d="m4.93 4.93 4.24 4.24"></path><path d="m14.83 14.83 4.24 4.24"></path><path d="m14.83 9.17 4.24-4.24"></path><path d="m4.93 19.07 4.24-4.24"></path></svg>
                </div>
                <div>
                  <p className="text-sm font-medium">Avg. Weight Loss</p>
                  <p className="text-xs text-foreground/70">18% in 6 months</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
