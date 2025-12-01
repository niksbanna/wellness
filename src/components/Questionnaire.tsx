
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedSplash from './AnimatedSplash';
import { useMutation } from '@tanstack/react-query';
import { submitQuestionnaire, QuestionnaireData } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

// Question types for our questionnaire
type QuestionType = {
  id: string;
  question: string;
  type: 'text' | 'radio' | 'checkbox' | 'number' | 'email' | 'tel';
  options?: string[];
  placeholder?: string;
  required?: boolean;
};

// Validation helper functions
const validateEmail = (email: string): string | null => {
  if (!email || email.trim() === '') {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

const validatePhone = (phone: string): string | null => {
  if (!phone || phone.trim() === '') {
    return 'Phone number is required';
  }
  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return 'Please enter a valid phone number (10-15 digits)';
  }
  return null;
};

const validateName = (name: string): string | null => {
  if (!name || name.trim() === '') {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (name.trim().length > 100) {
    return 'Name must be less than 100 characters';
  }
  // Check for only valid name characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(name.trim())) {
    return 'Name can only contain letters, spaces, hyphens, and apostrophes';
  }
  return null;
};

const validateAge = (age: number | string): string | null => {
  if (age === '' || age === undefined || age === null) {
    return 'Age is required';
  }
  const ageNum = typeof age === 'string' ? parseInt(age, 10) : age;
  if (isNaN(ageNum)) {
    return 'Please enter a valid age';
  }
  if (ageNum < 18) {
    return 'You must be at least 18 years old';
  }
  if (ageNum > 120) {
    return 'Please enter a valid age (up to 120 years)';
  }
  return null;
};

const validateWeight = (weight: number | string): string | null => {
  if (weight === '' || weight === undefined || weight === null) {
    return 'Weight is required';
  }
  const weightNum = typeof weight === 'string' ? parseFloat(weight) : weight;
  if (isNaN(weightNum)) {
    return 'Please enter a valid weight';
  }
  if (weightNum < 50) {
    return 'Weight must be at least 50 lbs';
  }
  if (weightNum > 1000) {
    return 'Weight must be less than 1000 lbs';
  }
  return null;
};

const validateHeight = (height: number | string): string | null => {
  if (height === '' || height === undefined || height === null) {
    return 'Height is required';
  }
  const heightNum = typeof height === 'string' ? parseFloat(height) : height;
  if (isNaN(heightNum)) {
    return 'Please enter a valid height';
  }
  if (heightNum < 24) {
    return 'Height must be at least 24 inches (2 feet)';
  }
  if (heightNum > 96) {
    return 'Height must be less than 96 inches (8 feet)';
  }
  return null;
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
    id: 'email',
    question: 'What is your email address?',
    type: 'email',
    placeholder: 'Enter your email address',
    required: true,
  },
  {
    id: 'phone',
    question: 'What is your phone number?',
    type: 'tel',
    placeholder: 'Enter your phone number',
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
  const [answers, setAnswers] = useState<Record<string, string | number | string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  // TanStack Query mutation for form submission
  const mutation = useMutation({
    mutationFn: submitQuestionnaire,
    onSuccess: (data) => {
      setSubmitted(true);
      toast({
        title: 'Success!',
        description: data.message,
        duration: 5000,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Submission Failed',
        description: error.message || 'An error occurred while submitting your assessment. Please try again.',
        variant: 'destructive',
        duration: 5000,
      });
    },
  });

  // Validate the current question's answer
  const validateCurrentAnswer = (): string | null => {
    const question = questions[currentQuestion];
    const answer = answers[question.id];

    switch (question.id) {
      case 'name':
        return validateName(answer as string);
      case 'email':
        return validateEmail(answer as string);
      case 'phone':
        return validatePhone(answer as string);
      case 'age':
        return validateAge(answer as number | string);
      case 'weight':
        return validateWeight(answer as number | string);
      case 'height':
        return validateHeight(answer as number | string);
      case 'gender':
      case 'goal':
      case 'medications':
        if (!answer || (typeof answer === 'string' && answer.trim() === '')) {
          return 'Please select an option';
        }
        return null;
      case 'health_conditions':
        if (!answer || !Array.isArray(answer) || answer.length === 0) {
          return 'Please select at least one option';
        }
        return null;
      default:
        return null;
    }
  };

  // Form validation - check if current question is answered and valid
  const isCurrentQuestionAnswered = () => {
    const question = questions[currentQuestion];
    const answer = answers[question.id];
    
    if (!question.required) return true;
    
    if (question.type === 'checkbox') {
      return answer && Array.isArray(answer) && answer.length > 0;
    }
    
    return answer !== undefined && answer !== '';
  };

  // Check if current answer is valid (no validation errors)
  const isCurrentAnswerValid = (): boolean => {
    return validateCurrentAnswer() === null;
  };

  // Handle form navigation
  const nextQuestion = () => {
    const error = validateCurrentAnswer();
    if (error) {
      setValidationError(error);
      return;
    }
    
    setValidationError(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setValidationError(null);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Handle answer updates
  const handleAnswer = (value: string | number | string[]) => {
    const question = questions[currentQuestion];
    setAnswers({
      ...answers,
      [question.id]: value
    });
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError(null);
    }
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
    // Clear validation error when user makes a selection
    if (validationError) {
      setValidationError(null);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // Transform answers to match API interface
    const questionnaireData: QuestionnaireData = {
      name: answers.name || '',
      email: answers.email || '',
      phone: answers.phone || '',
      age: answers.age || 0,
      gender: answers.gender || '',
      weight: answers.weight || 0,
      height: answers.height || 0,
      goal: answers.goal || '',
      health_conditions: answers.health_conditions || [],
      medications: answers.medications || '',
    };

    mutation.mutate(questionnaireData);
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

  // Render the current question based on its type
  const renderQuestionInput = () => {
    const question = questions[currentQuestion];
    const inputErrorClass = validationError 
      ? "border-red-500 focus:border-red-500 focus:ring-red-200" 
      : "border-border focus:border-wellness-500 focus:ring-wellness-200";
    
    switch (question.type) {
      case 'text':
        return (
          <input 
            type="text"
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={question.placeholder}
            className={cn(
              "w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all",
              inputErrorClass
            )}
          />
        );
      
      case 'email':
        return (
          <input 
            type="email"
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={question.placeholder}
            className={cn(
              "w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all",
              inputErrorClass
            )}
          />
        );
      
      case 'tel':
        return (
          <input 
            type="tel"
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={question.placeholder}
            className={cn(
              "w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all",
              inputErrorClass
            )}
          />
        );
      
      case 'number':
        return (
          <input 
            type="number"
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(parseInt(e.target.value, 10) || '')}
            placeholder={question.placeholder}
            className={cn(
              "w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all",
              inputErrorClass
            )}
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
            {question.options?.map((option) => {
              const answerArray = Array.isArray(answers[question.id]) ? answers[question.id] as string[] : [];
              return (
                <label
                  key={option}
                  className={cn(
                    "flex items-center p-4 border rounded-lg cursor-pointer transition-all",
                    answerArray.includes(option)
                      ? "border-wellness-500 bg-wellness-50 ring-2 ring-wellness-200"
                      : "border-border hover:border-wellness-300"
                  )}
                >
                  <input
                    type="checkbox"
                    name={question.id}
                    checked={answerArray.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                    className="sr-only"
                  />
                  <div className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center mr-3 transition-all",
                    answerArray.includes(option)
                      ? "border-wellness-500 bg-wellness-500"
                      : "border-border"
                  )}>
                    {answerArray.includes(option) && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    )}
                  </div>
                  <span>{option}</span>
                </label>
              );
            })}
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
                {/* Validation error message */}
                {validationError && (
                  <div className="flex items-center gap-2 mt-2 text-red-600">
                    <AlertCircle size={16} />
                    <span className="text-sm">{validationError}</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0 || mutation.isPending}
                  className={cn(
                    "flex items-center gap-2 btn-secondary",
                    (currentQuestion === 0 || mutation.isPending) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <ArrowLeft size={18} /> Previous
                </button>

                <button
                  onClick={nextQuestion}
                  disabled={mutation.isPending}
                  className={cn(
                    "flex items-center gap-2",
                    currentQuestion === questions.length - 1 ? "btn-primary" : "btn-primary",
                    mutation.isPending && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : currentQuestion === questions.length - 1 ? (
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
