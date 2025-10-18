
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <span className="bg-wellness-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-base">W</span>
              <span className="font-display font-semibold text-lg text-foreground">Wellness</span>
            </div>
            
            <p className="text-foreground/70 mb-6">
              Transforming lives through physician-guided weight loss solutions that are safe, effective, and sustainable.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/60 hover:text-wellness-600 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-wellness-600 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-wellness-600 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-wellness-600 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/how-it-works" className="text-foreground/70 hover:text-wellness-600 transition-colors">How It Works</Link></li>
              <li><Link to="/providers" className="text-foreground/70 hover:text-wellness-600 transition-colors">Our Providers</Link></li>
              <li><Link to="/success-stories" className="text-foreground/70 hover:text-wellness-600 transition-colors">Success Stories</Link></li>
              <li><Link to="/resources" className="text-foreground/70 hover:text-wellness-600 transition-colors">Resource Library</Link></li>
              <li><a href="#contact" className="text-foreground/70 hover:text-wellness-600 transition-colors">Contact Us</a></li>
              <li><Link to="/login" className="text-foreground/70 hover:text-wellness-600 transition-colors">Member Login</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/resources/weight-loss-faq" className="text-foreground/70 hover:text-wellness-600 transition-colors">Weight Loss FAQ</Link></li>
              <li><Link to="/resources/understanding-glp1-medications" className="text-foreground/70 hover:text-wellness-600 transition-colors">GLP-1 Medications Guide</Link></li>
              <li><Link to="/resources/nutrition-guide-weight-loss" className="text-foreground/70 hover:text-wellness-600 transition-colors">Nutrition Guidelines</Link></li>
              <li><Link to="/resources/exercise-recommendations-beginners" className="text-foreground/70 hover:text-wellness-600 transition-colors">Exercise Guide</Link></li>
              <li><Link to="/resources/mental-health-weight-loss-journey" className="text-foreground/70 hover:text-wellness-600 transition-colors">Mental Health & Weight Loss</Link></li>
              <li><Link to="/resources" className="text-foreground/70 hover:text-wellness-600 transition-colors font-semibold">View All Resources →</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-foreground/70 mb-4">
              Get the latest updates, tips, and success stories delivered to your inbox.
            </p>
            
            <form className="space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-border focus:border-wellness-500 focus:ring-2 focus:ring-wellness-200 outline-none transition-all"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-full bg-wellness-600 flex items-center justify-center text-white hover:bg-wellness-700 transition-colors"
                >
                  <Mail size={18} />
                </button>
              </div>
              
              <p className="text-xs text-foreground/50">
                By subscribing, you agree to our 
                <a href="#" className="text-wellness-600 hover:text-wellness-700 mx-1">Privacy Policy</a>
                and to receive marketing communications from us.
              </p>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-foreground/60">
              &copy; {currentYear} Wellness. All rights reserved.
            </p>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-foreground/60 hover:text-wellness-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-foreground/60 hover:text-wellness-600 transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-foreground/60 hover:text-wellness-600 transition-colors">Cookie Policy</a>
            </div>
          </div>
          
          <p className="mt-6 text-xs text-foreground/50 text-center">
            The information provided on this website is for general informational purposes only and is not intended as, and shall not be understood or construed as, professional medical advice. Always consult with a physician regarding any medical treatment or prescription medication.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
