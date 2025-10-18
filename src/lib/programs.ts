import { ProgramTier, PricingFactors, PricingEstimate } from '@/types/program';

export const programTiers: ProgramTier[] = [
  {
    id: 'basic',
    name: 'Basic Program',
    shortDescription: 'Essential weight loss support with medical supervision',
    price: {
      monthly: 99,
      consultation: 149,
    },
    features: {
      included: [
        'Initial medical consultation',
        'Prescription weight loss medication',
        'Monthly virtual check-ins',
        'Basic nutrition guidance',
        'Medication monitoring',
        'Email support',
        'Access to resource library',
      ],
      notIncluded: [
        'Dietitian consultations',
        'Exercise programming',
        'Mental health support',
        'Priority support',
      ],
    },
    ideal_for: [
      'Self-motivated individuals',
      'Those with existing health knowledge',
      'Budget-conscious patients',
      'People needing basic medical supervision',
    ],
    requirements: {
      minBMI: 27,
      conditions: ['May require weight-related health condition if BMI < 30'],
    },
  },
  {
    id: 'standard',
    name: 'Standard Program',
    shortDescription: 'Comprehensive support with nutrition and lifestyle coaching',
    price: {
      monthly: 199,
      consultation: 149,
    },
    features: {
      included: [
        'Initial medical consultation',
        'Prescription weight loss medication',
        'Bi-weekly virtual check-ins',
        'Monthly dietitian consultation',
        'Personalized meal plans',
        'Exercise recommendations',
        'Medication monitoring & adjustments',
        'Priority email & chat support',
        'Progress tracking tools',
        'Access to resource library',
        'Group support sessions',
      ],
      notIncluded: [
        'Mental health counseling',
        'Personal training sessions',
        'Lab work (may be additional)',
      ],
    },
    ideal_for: [
      'Those seeking comprehensive support',
      'People needing nutrition guidance',
      'Individuals with busy schedules',
      'Patients wanting regular accountability',
    ],
    requirements: {
      minBMI: 27,
    },
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium Program',
    shortDescription: 'All-inclusive concierge care with dedicated support team',
    price: {
      monthly: 349,
      consultation: 0, // Waived for premium
    },
    features: {
      included: [
        'Initial medical consultation (no fee)',
        'Prescription weight loss medication',
        'Weekly virtual check-ins',
        'Bi-weekly dietitian consultations',
        'Monthly mental health counseling',
        'Personalized meal & exercise plans',
        'Dedicated care coordinator',
        '24/7 priority support',
        'Lab work included',
        'Medication monitoring & adjustments',
        'Body composition analysis',
        'Progress tracking & analytics',
        'Access to all resources & webinars',
        'Private support community',
        'Maintenance planning',
      ],
    },
    ideal_for: [
      'Those wanting white-glove service',
      'People with complex health needs',
      'Individuals seeking holistic care',
      'Patients wanting maximum support',
    ],
    requirements: {
      minBMI: 27,
    },
  },
];

// Medication costs (monthly estimates without insurance)
const medicationCosts = {
  semaglutide: 300,
  tirzepatide: 500,
  liraglutide: 450,
};

// Insurance coverage estimates
const insuranceCoverageRates = {
  commercial: 0.7, // 70% coverage
  medicare: 0.3, // 30% coverage (varies)
  medicaid: 0.5, // 50% coverage (varies)
  none: 0,
};

export const calculatePricing = (factors: PricingFactors): PricingEstimate => {
  const program = programTiers.find(p => p.id === factors.programTier);
  if (!program) throw new Error('Invalid program tier');

  // Base program fee
  const programFee = program.price.monthly;

  // Consultation fee (one-time)
  const consultationFee = program.price.consultation;

  // Medication cost
  const medicationType = factors.medicationType || 'semaglutide';
  let medicationCost = medicationCosts[medicationType];

  // Apply insurance coverage to medication
  let insuranceCoverage = 0;
  if (factors.hasInsurance && factors.insuranceType && factors.insuranceType !== 'none') {
    const coverageRate = insuranceCoverageRates[factors.insuranceType];
    insuranceCoverage = medicationCost * coverageRate;
    medicationCost = medicationCost * (1 - coverageRate);
  }

  // Monthly total
  const monthlyTotal = programFee + medicationCost;

  // Total for duration
  const totalDuration = (monthlyTotal * factors.duration) + consultationFee;

  // Calculate savings for longer commitments
  let savings = 0;
  if (factors.duration === 6) {
    savings = monthlyTotal * 0.5; // Half month free
  } else if (factors.duration === 12) {
    savings = monthlyTotal * 1.5; // 1.5 months free
  }

  return {
    monthlyTotal,
    consultationFee,
    medicationCost,
    programFee,
    totalUpfront: consultationFee,
    totalDuration: totalDuration - savings,
    savings,
    insuranceCoverage,
  };
};

export const getBMICategory = (bmi: number): { category: string; eligible: boolean; description: string } => {
  if (bmi < 18.5) {
    return {
      category: 'Underweight',
      eligible: false,
      description: 'Medical weight loss programs are not recommended for individuals who are underweight.',
    };
  } else if (bmi >= 18.5 && bmi < 25) {
    return {
      category: 'Normal Weight',
      eligible: false,
      description: 'You have a healthy BMI. Medical weight loss programs are typically for BMI ≥27.',
    };
  } else if (bmi >= 25 && bmi < 27) {
    return {
      category: 'Overweight',
      eligible: false,
      description: 'You may be eligible if you have weight-related health conditions. Schedule a consultation to discuss.',
    };
  } else if (bmi >= 27 && bmi < 30) {
    return {
      category: 'Overweight',
      eligible: true,
      description: 'You may be eligible for our programs, especially if you have weight-related health conditions.',
    };
  } else if (bmi >= 30 && bmi < 35) {
    return {
      category: 'Obesity Class I',
      eligible: true,
      description: 'You are likely eligible for all our weight loss programs.',
    };
  } else if (bmi >= 35 && bmi < 40) {
    return {
      category: 'Obesity Class II',
      eligible: true,
      description: 'You are eligible for all our weight loss programs. Medical supervision is highly recommended.',
    };
  } else {
    return {
      category: 'Obesity Class III',
      eligible: true,
      description: 'You are eligible for all programs. We recommend our Premium Program for comprehensive support.',
    };
  }
};

export const calculateBMI = (weightLbs: number, heightInches: number): number => {
  // BMI = (weight in pounds / (height in inches)²) × 703
  return (weightLbs / (heightInches * heightInches)) * 703;
};

export const getRecommendedProgram = (bmi: number, hasHealthConditions: boolean, needsSupport: 'low' | 'medium' | 'high'): ProgramTier => {
  // Premium for high BMI or high support needs
  if (bmi >= 35 || needsSupport === 'high') {
    return programTiers[2]; // Premium
  }

  // Standard for most cases (most popular)
  if (needsSupport === 'medium' || hasHealthConditions) {
    return programTiers[1]; // Standard
  }

  // Basic for self-motivated, lower BMI
  return programTiers[0]; // Basic
};
