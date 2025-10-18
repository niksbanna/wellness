export interface Member {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  joinDate: string;
  subscriptionStatus: 'active' | 'paused' | 'cancelled';
  currentWeight?: number;
  targetWeight?: number;
  height?: number;
}

export interface ProgressData {
  date: string;
  weight: number;
  waist?: number;
  notes?: string;
}

export interface LabResult {
  id: string;
  date: string;
  type: string;
  status: 'pending' | 'completed' | 'requires_review';
  results?: {
    name: string;
    value: string;
    unit: string;
    range: string;
    status: 'normal' | 'high' | 'low';
  }[];
  pdfUrl?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedDate: string;
  nextRefillDate: string;
  refillsRemaining: number;
  autoRefill: boolean;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  type: 'initial_consultation' | 'follow_up' | 'lab_review';
  provider: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingLink?: string;
}
