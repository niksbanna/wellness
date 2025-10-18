export interface ProgramTier {
  id: string;
  name: string;
  shortDescription: string;
  price: {
    monthly: number;
    consultation: number;
    medication?: string;
  };
  features: {
    included: string[];
    notIncluded?: string[];
  };
  ideal_for: string[];
  requirements: {
    minBMI: number;
    conditions?: string[];
  };
  popular?: boolean;
}

export interface PricingFactors {
  bmi: number;
  hasInsurance: boolean;
  insuranceType?: 'commercial' | 'medicare' | 'medicaid' | 'none';
  medicationType?: 'semaglutide' | 'tirzepatide' | 'liraglutide';
  programTier: 'basic' | 'standard' | 'premium';
  duration: 3 | 6 | 12;
}

export interface PricingEstimate {
  monthlyTotal: number;
  consultationFee: number;
  medicationCost: number;
  programFee: number;
  totalUpfront: number;
  totalDuration: number;
  savings?: number;
  insuranceCoverage?: number;
}
