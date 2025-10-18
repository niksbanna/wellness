
import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedSplash from './AnimatedSplash';
import { useMutation } from '@tanstack/react-query';
import { submitContactForm, ContactFormData } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  // TanStack Query mutation for form submission
  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: (data) => {
      setSubmitted(true);
      toast({
        title: 'Message Sent!',
        description: data.message,
        duration: 5000,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to Send',
        description: error.message || 'An error occurred while sending your message. Please try again.',
        variant: 'destructive',
        duration: 5000,
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const contactData: ContactFormData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    mutation.mutate(contactData);
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

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative py-24 px-4 bg-wellness-50"
    >
      {/* Background decorations */}
      <AnimatedSplash 
        size="md" 
        className="right-[10%] bottom-[10%]" 
        color="hsl(var(--primary) / 0.15)" 
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-wellness-100 text-wellness-800 opacity-0 animate-on-scroll">
            Get In Touch
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold tracking-tight opacity-0 animate-on-scroll">
            Start Your Transformation Today
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/70 opacity-0 animate-on-scroll">
            Have questions about our medically-supervised weight loss program? Reach out to our team for more information.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white rounded-2xl shadow-elevation border border-border/50 p-6 md:p-8 opacity-0 animate-on-scroll">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-1">
                    Full Name
                  </label>
                  <input 
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border focus:border-wellness-500 focus:ring-2 focus:ring-wellness-200 outline-none transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-1">
                    Email Address
                  </label>
                  <input 
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border focus:border-wellness-500 focus:ring-2 focus:ring-wellness-200 outline-none transition-all"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground/80 mb-1">
                    Phone Number
                  </label>
                  <input 
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:border-wellness-500 focus:ring-2 focus:ring-wellness-200 outline-none transition-all"
                    placeholder="Enter your phone number (optional)"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-1">
                    Message
                  </label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:border-wellness-500 focus:ring-2 focus:ring-wellness-200 outline-none transition-all"
                    placeholder="Tell us about your weight loss goals or questions"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className={cn(
                    "btn-primary w-full flex items-center justify-center gap-2",
                    mutation.isPending && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>
                
                <p className="text-xs text-center text-foreground/50">
                  By submitting this form, you agree to our 
                  <a href="#" className="text-wellness-600 hover:text-wellness-700 mx-1">Privacy Policy</a>
                  and
                  <a href="#" className="text-wellness-600 hover:text-wellness-700 mx-1">Terms of Service</a>.
                </p>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-wellness-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={32} className="text-wellness-600" />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-2">
                  Thank You for Contacting Us
                </h3>
                <p className="text-foreground/70">
                  We've received your message and will get back to you as soon as possible.
                </p>
              </div>
            )}
          </div>
          
          <div className="opacity-0 animate-on-scroll">
            <div className="bg-white rounded-2xl shadow-elevation border border-border/50 p-6 md:p-8 mb-8">
              <h3 className="text-xl font-display font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-wellness-100 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-wellness-600" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Email</p>
                    <p className="font-medium">contact@wellnessrx.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-wellness-100 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-wellness-600" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Phone</p>
                    <p className="font-medium">(800) 555-1234</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-wellness-100 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-wellness-600" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Address</p>
                    <p className="font-medium">123 Wellness Blvd, Suite 500</p>
                    <p>San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-elevation border border-border/50 p-6 md:p-8">
              <h3 className="text-xl font-display font-semibold mb-4">Hours of Operation</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Monday - Friday</span>
                  <span className="font-medium">8:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Saturday</span>
                  <span className="font-medium">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-foreground/70 text-sm">
                  For urgent inquiries outside of business hours, 
                  please call our 24/7 support line at (800) 555-5678.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
