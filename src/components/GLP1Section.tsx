
import React, { useRef, useEffect } from 'react';
import { Pill, Leaf, Users, ActivitySquare, HeartPulse, Sparkles } from 'lucide-react';
import AnimatedSplash from './AnimatedSplash';
import { cn } from '@/lib/utils';

const GLP1Section = () => {
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

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const features = [
    {
      icon: <Pill className="text-wellness-600" size={24} />,
      title: "Personalized GLP-1 Medication",
      description: "Customized dosages of Semaglutide or Tirzepatide prescriptions tailored to your specific health profile and goals."
    },
    {
      icon: <HeartPulse className="text-wellness-600" size={24} />,
      title: "Sustainable Results",
      description: "Achieve lasting weight loss without developing long-term medication dependency through our comprehensive approach."
    },
    {
      icon: <Leaf className="text-wellness-600" size={24} />,
      title: "Nutritional Guidance",
      description: "Expert nutritional education tailored to complement your GLP-1 therapy for optimal results."
    },
    {
      icon: <ActivitySquare className="text-wellness-600" size={24} />,
      title: "Complete Online Care",
      description: "100% online consultations and convenient check-ins scheduled around your lifestyle."
    },
    {
      icon: <Users className="text-wellness-600" size={24} />,
      title: "Community Support",
      description: "Connect with experienced coaches and others on the same journey in our thriving community."
    },
    {
      icon: <Sparkles className="text-wellness-600" size={24} />,
      title: "Future of Health",
      description: "Access cutting-edge weight management therapies backed by the latest medical research and technology."
    }
  ];

  return (
    <section 
      id="glp1-therapy" 
      ref={sectionRef}
      className="relative py-24 px-4 bg-white overflow-hidden"
    >
      {/* Background decorations */}
      <AnimatedSplash 
        size="lg" 
        className="right-[-10%] top-[20%]" 
        color="hsl(var(--primary) / 0.08)" 
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-wellness-100 text-wellness-800 opacity-0 animate-on-scroll">
            GLP-1 Therapy
          </span>
          
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight opacity-0 animate-on-scroll">
            Discover The New Path to <span className="text-wellness-600">Sustainable</span> Weight Loss with GLP-1
          </h2>
          
          <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/70 opacity-0 animate-on-scroll">
            Experience the transformative power of GLP-1 therapies combined with comprehensive nutritional education and ongoing support—the future of personalized health management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={cn(
                "glass p-6 rounded-2xl shadow-elevation opacity-0 animate-on-scroll hover:shadow-elevation-md transition-all duration-300 transform hover:-translate-y-1",
                index % 2 === 0 ? "bg-wellness-50/50" : "bg-white"
              )}
            >
              <div className="w-12 h-12 rounded-full bg-wellness-100 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              
              <p className="text-foreground/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center opacity-0 animate-on-scroll">
          <a href="#questionnaire" className="btn-primary inline-flex items-center gap-2">
            Begin Your GLP-1 Journey
          </a>
        </div>
      </div>
    </section>
  );
};

export default GLP1Section;
