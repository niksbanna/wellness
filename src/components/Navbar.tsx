
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 md:px-8",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-subtle" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          <span className="bg-wellness-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-xl">W</span>
          <span className="font-display font-semibold text-xl text-foreground">Wellness</span>
        </a>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="text-foreground/80 hover:text-wellness-700 transition-colors">How It Works</a>
          <a href="#journey" className="text-foreground/80 hover:text-wellness-700 transition-colors">Your Journey</a>
          <a href="#testimonials" className="text-foreground/80 hover:text-wellness-700 transition-colors">Success Stories</a>
          <a href="#contact" className="btn-primary">Get Started</a>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 pt-20 px-6 transform transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-6">
          <a 
            href="#how-it-works" 
            className="text-foreground text-lg py-2 border-b border-border"
            onClick={() => setMobileMenuOpen(false)}
          >
            How It Works
          </a>
          <a 
            href="#journey" 
            className="text-foreground text-lg py-2 border-b border-border"
            onClick={() => setMobileMenuOpen(false)}
          >
            Your Journey
          </a>
          <a 
            href="#testimonials" 
            className="text-foreground text-lg py-2 border-b border-border"
            onClick={() => setMobileMenuOpen(false)}
          >
            Success Stories
          </a>
          <a 
            href="#contact" 
            className="btn-primary text-center mt-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
