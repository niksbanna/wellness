
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import AnimatedSplash from './AnimatedSplash';

const Hero = () => {
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
              }, i * 150);
            });
          }
        }
      },
      { threshold: 0.1 }
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
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 overflow-hidden"
    >
      {/* Decorative background elements */}
      <AnimatedSplash 
        size="lg" 
        className="left-[-20%] top-[10%]" 
        color="hsl(var(--primary) / 0.2)" 
      />
      <AnimatedSplash 
        size="md" 
        className="right-[-10%] bottom-[20%]" 
        color="hsl(var(--primary) / 0.15)" 
        variant="accent" 
      />
      
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-8 items-center">
        <div className="z-10 order-2 md:order-1">
          <div className="flex flex-col gap-6 max-w-xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-wellness-100 text-wellness-800 opacity-0 animate-on-scroll">
              GLP-1 Weight Management Program
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-tight opacity-0 animate-on-scroll">
              Transform Your Life with <span className="text-gradient">GLP-1 Therapy</span>
            </h1>
            
            <p className="text-lg text-foreground/80 opacity-0 animate-on-scroll">
              Experience the power of physician-prescribed GLP-1 medications like Semaglutide and Tirzepatide, combined with personalized support for sustainable weight loss.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2 opacity-0 animate-on-scroll">
              <a href="#questionnaire" className="btn-primary flex items-center justify-center gap-2">
                Start Your GLP-1 Assessment <ArrowRight size={18} />
              </a>
              <a href="#how-it-works" className="btn-secondary flex items-center justify-center">
                Learn How GLP-1 Works
              </a>
            </div>
            
            <div className="flex items-center gap-4 mt-4 opacity-0 animate-on-scroll">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-wellness-200 flex items-center justify-center text-wellness-600 font-medium"
                  >
                    {['J', 'M', 'S', 'K'][i-1]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-foreground/70">
                <span className="font-medium text-foreground">2,500+</span> people started their GLP-1 journey this month
              </p>
            </div>
          </div>
        </div>
        
        <div className="relative md:h-[600px] order-1 md:order-2 animate-fade-in" style={{animationDelay: '0.3s'}}>
          <div className="relative z-10 h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-glass-strong">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80" 
                  alt="Woman feeling confident and healthy after GLP-1 therapy"
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full bg-green-400"></span>
                      <span className="text-sm font-medium">GLP-1 Success Story</span>
                    </div>
                    <h3 className="text-xl font-medium">Sarah M.</h3>
                    <p className="text-sm text-white/80">Lost 42 pounds in 6 months with our GLP-1 therapy program</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating UI Elements */}
            <div className="glass absolute top-8 -left-4 md:-left-12 p-4 rounded-xl rotate-[-6deg] animate-float" style={{animationDelay: '0.5s'}}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div>
                  <p className="text-sm font-medium">GLP-1 Support</p>
                  <p className="text-xs text-foreground/70">Licensed Physicians</p>
                </div>
              </div>
            </div>
            
            <div className="glass absolute bottom-20 -right-4 md:-right-12 p-4 rounded-xl rotate-[4deg] animate-float" style={{animationDelay: '0.8s'}}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-wellness-500 rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>
                </div>
                <div>
                  <p className="text-sm font-medium">92% Success Rate</p>
                  <p className="text-xs text-foreground/70">With GLP-1 Therapy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-70 animate-fade-in" style={{animationDelay: '1.2s'}}>
        <p className="text-sm mb-2">Scroll to discover GLP-1 therapy</p>
        <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-foreground/40 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
