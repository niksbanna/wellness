
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Send, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedSplash from './AnimatedSplash';

// Question types for our questionnaire
type QuestionType = {
  id: string;
  question: string;
  type: 'text' | 'radio' | 'checkbox' | 'number';
  options?: string[];
  placeholder?: string;
  required?: boolean;
};

// The questionnaire questions
const questions: QuestionType[] = [
  {
    id: 'name',
    question: 'What is your name?',
    type: 'text',
    placeholder: 'Enter your full name',
    required: true,
  },
  {
    id: 'age',
    question: 'What is your age?',
    type: 'number',
    placeholder: 'Enter your age',
    required: true,
  },
  {
    id: 'gender',
    question: 'What is your gender?',
    type: 'radio',
    options: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
    required: true,
  },
  {
    id: 'weight',
    question: 'What is your current weight? (in lbs)',
    type: 'number',
    placeholder: 'Enter your weight in pounds',
    required: true,
  },
  {
    id: 'height',
    question: 'What is your height? (in inches)',
    type: 'number',
    placeholder: 'Enter your height in inches',
    required: true,
  },
  {
    id: 'goal',
    question: 'What is your weight loss goal?',
    type: 'radio',
    options: ['5-10 lbs', '10-20 lbs', '20-40 lbs', '40+ lbs'],
    required: true,
  },
  {
    id: 'health_conditions',
    question: 'Do you have any of the following health conditions? (Select all that apply)',
    type: 'checkbox',
    options: [
      'High blood pressure',
      'Diabetes',
      'Heart disease',
      'Thyroid issues',
      'Sleep apnea',
      'None of the above'
    ],
    required: true,
  },
  {
    id: 'medications',
    question: 'Are you currently taking any medications?',
    type: 'radio',
    options: ['Yes', 'No'],
    required: true,
  },
];

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Form validation
  const isCurrentQuestionAnswered = () => {
    const question = questions[currentQuestion];
    const answer = answers[question.id];
    
    if (!question.required) return true;
    
    if (question.type === 'checkbox') {
      return answer && Array.isArray(answer) && answer.length > 0;
    }
    
    return answer !== undefined && answer !== '';
  };

  // Handle form navigation
  const nextQuestion = () => {
    if (isCurrentQuestionAnswered()) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Handle answer updates
  const handleAnswer = (value: any) => {
    const question = questions[currentQuestion];
    setAnswers({
      ...answers,
      [question.id]: value
    });
  };

  const handleCheckboxChange = (option: string) => {
    const question = questions[currentQuestion];
    let currentAnswers = answers[question.id] || [];
    
    if (currentAnswers.includes(option)) {
      currentAnswers = currentAnswers.filter((item: string) => item !== option);
    } else {
      currentAnswers = [...currentAnswers, option];
    }
    
    // If "None of the above" is selected, clear other selections
    if (option === 'None of the above') {
      if (currentAnswers.includes(option)) {
        currentAnswers = ['None of the above'];
      }
    } else {
      // If another option is selected, remove "None of the above"
      currentAnswers = currentAnswers.filter((item: string) => item !== 'None of the above');
    }
    
    setAnswers({
      ...answers,
      [question.id]: currentAnswers
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Questionnaire submitted:", answers);
    setSubmitted(true);
  };

  // Animation and scroll handling
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

  // Render the current question based on its type
  const renderQuestionInput = () => {
    const question = questions[currentQuestion];
    
    switch (question.type) {
      case 'text':
        return (
          <input 
            type="text"
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={question.placeholder}
            className="w-full px-4 py-3 rounded-lg border border-border focus:border-wellness-500 focus:ring-2 focus:ring-wellness-200 outline-none transition-all"
          />
        );
      
      case 'number':
        return (
          <input 
            type="number"
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(parseInt(e.target.value, 10) || '')}
            placeholder={question.placeholder}
            className="w-full px-4 py-3 rounded-lg border border-border focus:border-wellness-500 focus:ring-2 focus:ring-wellness-200 outline-none transition-all"
          />
        );
      
      case 'radio':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label 
                key={option} 
                className={cn(
                  "flex items-center p-4 border rounded-lg cursor-pointer transition-all",
                  answers[question.id] === option
                    ? "border-wellness-500 bg-wellness-50 ring-2 ring-wellness-200"
                    : "border-border hover:border-wellness-300"
                )}
              >
                <input 
                  type="radio"
                  name={question.id}
                  checked={answers[question.id] === option}
                  onChange={() => handleAnswer(option)}
                  className="sr-only"
                />
                <div className={cn(
                  "w-5 h-5 rounded-full border flex items-center justify-center mr-3 transition-all",
                  answers[question.id] === option
                    ? "border-wellness-500 bg-wellness-500"
                    : "border-border"
                )}>
                  {answers[question.id] === option && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label 
                key={option} 
                className={cn(
                  "flex items-center p-4 border rounded-lg cursor-pointer transition-all",
                  answers[question.id]?.includes(option)
                    ? "border-wellness-500 bg-wellness-50 ring-2 ring-wellness-200"
                    : "border-border hover:border-wellness-300"
                )}
              >
                <input 
                  type="checkbox"
                  name={question.id}
                  checked={answers[question.id]?.includes(option) || false}
                  onChange={() => handleCheckboxChange(option)}
                  className="sr-only"
                />
                <div className={cn(
                  "w-5 h-5 rounded border-2 flex items-center justify-center mr-3 transition-all",
                  answers[question.id]?.includes(option)
                    ? "border-wellness-500 bg-wellness-500"
                    : "border-border"
                )}>
                  {answers[question.id]?.includes(option) && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  )}
                </div>
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section 
      id="questionnaire" 
      ref={sectionRef}
      className="relative py-24 px-4"
    >
      {/* Background decorations */}
      <AnimatedSplash 
        size="lg" 
        className="left-[-20%] bottom-[0%]" 
        color="hsl(var(--primary) / 0.1)" 
      />
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-wellness-100 text-wellness-800 opacity-0 animate-on-scroll">
            Start Your Journey
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold tracking-tight opacity-0 animate-on-scroll">
            Health Assessment
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/70 opacity-0 animate-on-scroll">
            Answer a few questions to help our physicians understand your unique needs and create a personalized weight loss plan.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-elevation border border-border/50 overflow-hidden opacity-0 animate-on-scroll">
          {!submitted ? (
            <div className="p-6 md:p-8">
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-gray-100 rounded-full mb-8">
                <div 
                  className="h-1.5 bg-wellness-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-2">
                  {questions[currentQuestion].question}
                </h3>
                <p className="text-sm text-foreground/60">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
              </div>
              
              <div className="mb-8">
                {renderQuestionInput()}
              </div>
              
              <div className="flex justify-between">
                <button 
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className={cn(
                    "flex items-center gap-2 btn-secondary",
                    currentQuestion === 0 && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <ArrowLeft size={18} /> Previous
                </button>
                
                <button 
                  onClick={nextQuestion}
                  disabled={!isCurrentQuestionAnswered()}
                  className={cn(
                    "flex items-center gap-2",
                    currentQuestion === questions.length - 1 ? "btn-primary" : "btn-primary",
                    !isCurrentQuestionAnswered() && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {currentQuestion === questions.length - 1 ? (
                    <>
                      Submit <Send size={18} />
                    </>
                  ) : (
                    <>
                      Next <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-wellness-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={32} className="text-wellness-600" />
              </div>
              <h3 className="text-2xl font-display font-semibold mb-2">
                Thank You for Completing the Assessment
              </h3>
              <p className="text-foreground/70 mb-6">
                Our medical team will review your information and reach out to you shortly with a personalized weight loss plan.
              </p>
              <p className="text-sm text-foreground/50 mb-8">
                Please check your email for confirmation and next steps.
              </p>
              <a href="#contact" className="btn-primary inline-flex">
                Contact Us For More Information
              </a>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center text-sm text-foreground/60 opacity-0 animate-on-scroll">
          Your information is secure and will only be used for medical assessment purposes. 
          <a href="#" className="text-wellness-600 hover:text-wellness-700 ml-1">Privacy Policy</a>
        </div>
      </div>
    </section>
  );
};

export default Questionnaire;
