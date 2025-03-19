
import React, { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedSplash from './AnimatedSplash';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    text: "I've struggled with my weight for years, trying every diet and exercise program out there. This medical approach finally gave me the boost I needed. The physician was caring, attentive, and created a plan that worked with my body chemistry. I've lost 42 pounds and feel better than I have in decades!",
    stars: 5,
    location: "Denver, CO",
    weightLost: "42 lbs",
    duration: "6 months"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    text: "The medically-supervised approach made all the difference. Instead of generic advice, I received a treatment plan tailored specifically to my metabolism and health needs. The prescription medication helped control my appetite, and the ongoing support kept me accountable. I'm down 35 pounds and my blood pressure has normalized.",
    stars: 5,
    location: "Phoenix, AZ",
    weightLost: "35 lbs",
    duration: "5 months"
  },
  {
    id: 3,
    name: "Jennifer Lee",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    text: "I was hesitant to try a prescription approach for weight loss, but after years of struggling, I decided to give it a chance. The questionnaire was thorough, the doctor consultation was informative, and the medication has been a game-changer. I've lost 28 pounds so far, and for the first time, I feel in control of my eating habits.",
    stars: 5,
    location: "Chicago, IL",
    weightLost: "28 lbs",
    duration: "4 months"
  },
  {
    id: 4,
    name: "David Wilson",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    text: "At 62, I thought significant weight loss might not be possible for me anymore. But the medical team developed a plan that considered my age and health conditions. The prescription helped me lose weight safely, and the regular check-ins ensured my health was monitored throughout. I've lost 30 pounds and feel 20 years younger.",
    stars: 5,
    location: "Boston, MA",
    weightLost: "30 lbs",
    duration: "7 months"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

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

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  // Reset animation when testimonial changes
  useEffect(() => {
    if (testimonialRef.current) {
      testimonialRef.current.classList.remove('animate-fade-up');
      void testimonialRef.current.offsetWidth; // Trigger reflow
      testimonialRef.current.classList.add('animate-fade-up');
    }
  }, [currentIndex]);

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="relative py-24 px-4"
    >
      {/* Background decorations */}
      {/* <AnimatedSplash 
        size="lg" 
        className="right-[-20%] top-[20%]" 
        color="hsl(var(--primary) / 0.1)" 
      /> */}
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-wellness-100 text-wellness-800 opacity-0 animate-on-scroll">
            Success Stories
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold tracking-tight opacity-0 animate-on-scroll">
            Transformations From Real People
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/70 opacity-0 animate-on-scroll">
            Hear from individuals who have successfully achieved their weight loss goals with our physician-guided approach.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial card */}
          <div 
            ref={testimonialRef}
            className="bg-white rounded-2xl shadow-elevation border border-border/50 p-6 md:p-8 relative z-10 opacity-0 animate-on-scroll"
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="md:w-1/3 flex flex-col items-center md:items-start">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-semibold mb-1">{testimonials[currentIndex].name}</h3>
                <p className="text-sm text-foreground/60 mb-3">{testimonials[currentIndex].location}</p>
                
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < testimonials[currentIndex].stars ? "currentColor" : "none"}
                      className={i < testimonials[currentIndex].stars ? "text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                
                <div className="bg-wellness-50 rounded-lg p-3 w-full">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-foreground/70">Results:</span>
                    <span className="text-sm font-semibold text-wellness-700">{testimonials[currentIndex].weightLost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-foreground/70">Duration:</span>
                    <span className="text-sm font-semibold text-wellness-700">{testimonials[currentIndex].duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <div className="mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" className="text-wellness-200">
                    <path fill="currentColor" d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                
                <p className="text-foreground leading-relaxed mb-6">
                  {testimonials[currentIndex].text}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={cn(
                          "w-2.5 h-2.5 rounded-full transition-all duration-300",
                          index === currentIndex ? "bg-wellness-600 scale-125" : "bg-wellness-200"
                        )}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={prevTestimonial}
                      className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-wellness-50 transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-wellness-50 transition-colors"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonial background decorations */}
          <div className="absolute top-8 -right-4 w-32 h-32 bg-wellness-100 rounded-full opacity-50 blur-xl -z-10"></div>
          <div className="absolute bottom-12 -left-8 w-40 h-40 bg-wellness-100 rounded-full opacity-50 blur-xl -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
