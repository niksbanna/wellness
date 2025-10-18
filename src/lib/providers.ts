import { Provider } from '@/types/provider';

// Mock provider data - in production, this would come from an API
export const providers: Provider[] = [
  {
    id: '1',
    name: 'Dr. Emily Chen',
    title: 'Medical Director',
    credentials: 'MD, Board Certified in Internal Medicine & Obesity Medicine',
    specialties: ['Weight Loss Medicine', 'Metabolic Health', 'GLP-1 Therapy'],
    bio: 'Dr. Chen is a board-certified physician specializing in medical weight loss and metabolic health. With over 15 years of experience, she has helped thousands of patients achieve sustainable weight loss through personalized treatment plans combining medication, nutrition, and lifestyle modifications.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 287,
    yearsExperience: 15,
    languages: ['English', 'Mandarin'],
    availability: {
      '2024-11-25': [
        { time: '09:00 AM', available: true },
        { time: '10:00 AM', available: false },
        { time: '11:00 AM', available: true },
        { time: '02:00 PM', available: true },
        { time: '03:00 PM', available: true },
        { time: '04:00 PM', available: false },
      ],
      '2024-11-26': [
        { time: '09:00 AM', available: true },
        { time: '10:00 AM', available: true },
        { time: '11:00 AM', available: false },
        { time: '02:00 PM', available: true },
        { time: '03:00 PM', available: true },
      ],
    },
    acceptingNewPatients: true,
  },
  {
    id: '2',
    name: 'Dr. Michael Rodriguez',
    title: 'Senior Physician',
    credentials: 'MD, Board Certified in Family Medicine & Obesity Medicine',
    specialties: ['Weight Management', 'Diabetes Care', 'Preventive Medicine'],
    bio: 'Dr. Rodriguez brings 12 years of experience in family medicine and obesity care. He takes a holistic approach to weight loss, addressing underlying health conditions and creating comprehensive care plans tailored to each patient\'s unique needs.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 213,
    yearsExperience: 12,
    languages: ['English', 'Spanish'],
    availability: {
      '2024-11-25': [
        { time: '09:00 AM', available: false },
        { time: '10:00 AM', available: true },
        { time: '11:00 AM', available: true },
        { time: '01:00 PM', available: true },
        { time: '02:00 PM', available: false },
        { time: '03:00 PM', available: true },
      ],
      '2024-11-26': [
        { time: '10:00 AM', available: true },
        { time: '11:00 AM', available: true },
        { time: '01:00 PM', available: true },
        { time: '02:00 PM', available: true },
      ],
    },
    acceptingNewPatients: true,
  },
  {
    id: '3',
    name: 'Sarah Williams',
    title: 'Registered Dietitian',
    credentials: 'RD, CDN, Certified Diabetes Educator',
    specialties: ['Nutrition Counseling', 'Meal Planning', 'Behavioral Support'],
    bio: 'Sarah is a registered dietitian with specialized training in weight management and diabetes education. She works closely with our medical team to provide personalized nutrition counseling and ongoing support for sustainable lifestyle changes.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 192,
    yearsExperience: 8,
    languages: ['English'],
    availability: {
      '2024-11-25': [
        { time: '10:00 AM', available: true },
        { time: '11:00 AM', available: true },
        { time: '01:00 PM', available: true },
        { time: '02:00 PM', available: true },
        { time: '03:00 PM', available: false },
        { time: '04:00 PM', available: true },
      ],
      '2024-11-26': [
        { time: '09:00 AM', available: true },
        { time: '10:00 AM', available: true },
        { time: '11:00 AM', available: true },
        { time: '01:00 PM', available: false },
        { time: '02:00 PM', available: true },
      ],
    },
    acceptingNewPatients: true,
  },
  {
    id: '4',
    name: 'Dr. Jennifer Park',
    title: 'Physician',
    credentials: 'MD, Board Certified in Internal Medicine',
    specialties: ['Weight Loss Medicine', 'Hypertension Management', 'Preventive Care'],
    bio: 'Dr. Park is passionate about helping patients achieve their health goals through evidence-based medical weight loss programs. She specializes in managing obesity-related conditions and optimizing metabolic health.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 156,
    yearsExperience: 10,
    languages: ['English', 'Korean'],
    availability: {
      '2024-11-25': [
        { time: '09:00 AM', available: true },
        { time: '10:00 AM', available: true },
        { time: '11:00 AM', available: false },
        { time: '02:00 PM', available: true },
        { time: '03:00 PM', available: true },
      ],
      '2024-11-26': [
        { time: '09:00 AM', available: false },
        { time: '10:00 AM', available: true },
        { time: '11:00 AM', available: true },
        { time: '01:00 PM', available: true },
      ],
    },
    acceptingNewPatients: true,
  },
];

export const getProviderById = (id: string): Provider | undefined => {
  return providers.find(p => p.id === id);
};

export const getAvailableProviders = (): Provider[] => {
  return providers.filter(p => p.acceptingNewPatients);
};

export const searchProviders = (query: string): Provider[] => {
  const lowercaseQuery = query.toLowerCase();
  return providers.filter(p =>
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.specialties.some(s => s.toLowerCase().includes(lowercaseQuery)) ||
    p.title.toLowerCase().includes(lowercaseQuery)
  );
};
