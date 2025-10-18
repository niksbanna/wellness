// API service functions for form submissions

export interface QuestionnaireData {
  name: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  goal: string;
  health_conditions: string[];
  medications: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Simulate API delay for realistic UX
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Submit health questionnaire
export const submitQuestionnaire = async (data: QuestionnaireData): Promise<{ success: boolean; message: string }> => {
  // Simulate API call
  await delay(1500);

  // In production, replace with actual API call:
  // const response = await fetch('/api/questionnaire', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // return response.json();

  // Simulate occasional errors for testing
  if (Math.random() < 0.05) {
    throw new Error('Failed to submit questionnaire. Please try again.');
  }

  console.log('Questionnaire submitted:', data);

  return {
    success: true,
    message: 'Your health assessment has been submitted successfully. Our team will review it and contact you within 24-48 hours.',
  };
};

// Submit contact form
export const submitContactForm = async (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
  // Simulate API call
  await delay(1200);

  // In production, replace with actual API call:
  // const response = await fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // return response.json();

  // Simulate occasional errors for testing
  if (Math.random() < 0.05) {
    throw new Error('Failed to send message. Please try again.');
  }

  console.log('Contact form submitted:', data);

  return {
    success: true,
    message: 'Thank you for contacting us! We\'ll get back to you within 1 business day.',
  };
};
