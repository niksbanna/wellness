export interface Provider {
  id: string;
  name: string;
  title: string;
  credentials: string;
  specialties: string[];
  bio: string;
  image: string;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  languages: string[];
  availability: {
    [key: string]: TimeSlot[];
  };
  acceptingNewPatients: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface AppointmentBooking {
  providerId: string;
  providerName: string;
  date: string;
  time: string;
  type: 'initial_consultation' | 'follow_up' | 'nutrition_counseling';
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  reason: string;
}
