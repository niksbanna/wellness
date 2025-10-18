
import React, { useRef, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import AnimatedSplash from './AnimatedSplash';

const faqs = [
  {
    question: "What are GLP-1 medications?",
    answer: "GLP-1 medications (like Semaglutide and Tirzepatide) are FDA-approved prescription drugs that mimic the hormone GLP-1, which regulates appetite and insulin secretion. They work by reducing hunger, increasing feelings of fullness, and slowing down digestion, making it easier to eat less and lose weight in a sustainable way."
  },
  {
    question: "How do I know if GLP-1 therapy is right for me?",
    answer: "GLP-1 therapy may be appropriate for adults with a BMI over 30, or over 27 with weight-related health conditions. Our medical professionals will evaluate your health history, current medications, and weight-loss goals during your initial consultation to determine if GLP-1 therapy is suitable for you."
  },
  {
    question: "How much weight can I expect to lose?",
    answer: "Clinical trials show that patients using GLP-1 medications like Semaglutide lose an average of 15-20% of their body weight over 68 weeks. Individual results vary based on dosage, adherence to nutritional guidance, and lifestyle factors. Our program is designed to help you achieve sustainable results through medication and comprehensive support."
  },
  {
    question: "Are there any side effects?",
    answer: "Common side effects of GLP-1 medications may include nausea, diarrhea, vomiting, and constipation, particularly when starting treatment or increasing dosage. These effects are typically mild to moderate and tend to decrease over time. Our medical team will monitor you closely and adjust your treatment plan as needed to minimize side effects."
  },
  {
    question: "How long do I need to take GLP-1 medication?",
    answer: "Treatment duration varies based on individual goals and response. Some patients may benefit from 6-12 months of therapy, while others might require longer-term treatment. Our program is designed to help you develop sustainable habits, potentially reducing or eliminating medication dependency over time. Your physician will regularly assess your progress and adjust recommendations accordingly."
  },
  {
    question: "Is the program covered by insurance?",
    answer: "While some insurance plans cover GLP-1 medications for weight management, coverage varies. Our team can help you understand potential coverage options, but many patients choose our program for its comprehensive care even if self-paying. We strive to make treatment accessible through competitive pricing and various payment options."
  },
  {
    question: "How do online consultations work?",
    answer: "Our 100% online care model includes secure video consultations with licensed physicians who will evaluate your health history, discuss your goals, and determine appropriate treatment. Follow-up appointments are conducted virtually, and prescriptions are sent electronically to your preferred pharmacy. Our digital platform also allows for regular check-ins and messaging with your care team."
  },
  {
    question: "What support do I receive beyond medication?",
    answer: "Our comprehensive approach includes personalized nutritional guidance, lifestyle recommendations, regular check-ins with medical providers, and access to a community of peers and experienced coaches. This multi-faceted support system ensures you develop sustainable habits for long-term weight management success."
  }
];

const FAQSection = () => {
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

  return (
    <section 
      id="faq" 
      ref={sectionRef}
      className="relative py-24 px-4 bg-wellness-50"
    >
      {/* Background decorations */}
      <AnimatedSplash 
        size="md" 
        className="left-[-5%] bottom-[10%]" 
        color="hsl(var(--primary) / 0.1)" 
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-wellness-100 text-wellness-800 opacity-0 animate-on-scroll">
            Your Questions Answered
          </span>
          
          <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold tracking-tight opacity-0 animate-on-scroll">
            Frequently Asked Questions
          </h2>
          
          <p className="mt-4 max-w-2xl mx-auto text-foreground/70 opacity-0 animate-on-scroll">
            Get answers to common questions about our GLP-1 weight loss program, medication, and support services.
          </p>
        </div>

        <div className="glass rounded-2xl shadow-elevation p-6 md:p-8 opacity-0 animate-on-scroll">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/30 last:border-0">
                <AccordionTrigger className="text-lg font-medium py-4 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pb-4 pt-0">
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 text-center opacity-0 animate-on-scroll">
          <p className="mb-4 text-foreground/70">Still have questions? We're here to help.</p>
          <a href="#contact" className="btn-secondary inline-flex">
            Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
