# Member Portal Documentation

## Overview

The wellness platform now includes a fully functional authenticated member portal that connects the marketing site to an actual care experience.

## Features Implemented

### 1. Authentication System
- **Login Page** (`/login`)
  - Email/password authentication
  - Remember me functionality
  - Forgot password link
  - Redirect to dashboard after successful login

- **Auth Context** (`src/contexts/AuthContext.tsx`)
  - Centralized authentication state management
  - Session persistence with localStorage
  - Login/logout functionality
  - Protected route support

### 2. Member Dashboard (`/dashboard`)
The main hub showing:
- **Progress Overview Cards**
  - Current weight and goal progress
  - Next appointment information
  - Subscription status

- **Weight Progress Chart**
  - Interactive line chart showing weight over time
  - Visual progress tracking

- **Quick Actions**
  - Log weight
  - Schedule appointment
  - Request refill
  - View lab results

- **Upcoming Items**
  - Appointments summary
  - Recent lab results
  - Active medications

### 3. Progress Tracking (`/progress`)
- **Weight Loss Statistics**
  - Total weight loss
  - Average loss per month
  - Current weight with last updated date

- **Interactive Charts**
  - Weight trend over time
  - Waist circumference tracking
  - Area charts with gradients

- **Progress Logging Form**
  - Date picker
  - Weight input
  - Waist circumference
  - Optional notes

- **Progress History**
  - Recent measurements with comparisons
  - Visual progress indicators

- **Milestone Tracker**
  - Next goal display
  - Progress bar to next milestone

### 4. Lab Results (`/labs`)
- **Completed Labs Tab**
  - Expandable lab result cards
  - Detailed test results table with:
    - Test name
    - Result value
    - Reference range
    - Status (normal/high/low)
  - Provider notes
  - PDF download option

- **Upcoming Tests Tab**
  - Scheduled lab appointments
  - Lab location information
  - Important instructions (fasting, etc.)
  - Schedule appointment CTA

- **Visual Status Indicators**
  - Color-coded results (green/orange/blue)
  - Status badges
  - Icons for different test states

### 5. Medications & Refills (`/medications`)
- **Active Medications**
  - Medication details (name, dosage, frequency)
  - Prescribing provider
  - Medication instructions
  - Refills remaining count

- **Refill Management**
  - Next scheduled refill date
  - One-click refill requests
  - Refill confirmation dialog
  - Auto-refill toggle

- **Refill History**
  - Past refill records
  - Delivery status tracking
  - Tracking numbers
  - Pharmacy information

### 6. Appointments (`/appointments`)
- **Upcoming Appointments**
  - Video consultation details
  - Date and time
  - Provider information
  - Join video call button
  - Reschedule/cancel options

- **Past Appointments**
  - Completed visit history
  - Visit summaries
  - Download summary option
  - Request follow-up

- **Telehealth Information**
  - Instructions for video calls
  - Preparation tips

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Marketing homepage |
| `/login` | Public | Member login page |
| `/dashboard` | Protected | Main member dashboard |
| `/progress` | Protected | Weight tracking and progress |
| `/labs` | Protected | Lab results and tests |
| `/medications` | Protected | Medication and refill management |
| `/appointments` | Protected | Appointment scheduling and history |

## Components

### Core Components
- `MemberNav` - Member portal navigation with user menu
- `ProtectedRoute` - Route wrapper requiring authentication
- `AuthContext` - Global authentication state

### UI Components (Shadcn)
All standard Shadcn UI components are available and styled consistently.

## Data Structure

### Member Type
```typescript
interface Member {
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
```

### Progress Data
```typescript
interface ProgressData {
  date: string;
  weight: number;
  waist?: number;
  notes?: string;
}
```

### Lab Result
```typescript
interface LabResult {
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
```

### Medication
```typescript
interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedDate: string;
  nextRefillDate: string;
  refillsRemaining: number;
  autoRefill: boolean;
}
```

## Getting Started

### Development
```bash
npm run dev
```

### Testing Login
Currently using mock authentication. Any email/password will work:
- Email: any@example.com
- Password: any password

The system will create a mock session for user "Sarah Johnson".

### Building
```bash
npm run build
```

## Next Steps for Production

1. **Backend Integration**
   - Replace mock authentication with real API
   - Connect to actual database
   - Implement real session management

2. **Security Enhancements**
   - Add JWT token handling
   - Implement secure session storage
   - Add CSRF protection
   - Enable 2FA

3. **Features to Add**
   - Messaging with care team
   - Document uploads
   - Payment/billing section
   - Profile settings page
   - Notification preferences

4. **Performance Optimization**
   - Implement code splitting
   - Add lazy loading for routes
   - Optimize bundle size
   - Add caching strategies

5. **Testing**
   - Add unit tests
   - Add integration tests
   - Add E2E tests with Playwright

## File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx          # Authentication state
├── types/
│   └── member.ts                # TypeScript interfaces
├── components/
│   ├── MemberNav.tsx            # Member portal navigation
│   ├── ProtectedRoute.tsx       # Auth guard component
│   └── [marketing components]   # Existing components
├── pages/
│   ├── Login.tsx                # Login page
│   ├── Dashboard.tsx            # Main dashboard
│   ├── Progress.tsx             # Progress tracking
│   ├── Labs.tsx                 # Lab results
│   ├── Medications.tsx          # Medication management
│   ├── Appointments.tsx         # Appointments
│   └── Index.tsx                # Marketing homepage
└── App.tsx                      # Main app with routing
```

## Design System

The member portal maintains consistency with the marketing site:
- Color palette: wellness-600 as primary color
- Typography: Same font-display family
- Components: Shadcn UI with custom styling
- Responsive: Mobile-first design with tablet and desktop breakpoints

## Mobile Experience

All portal pages are fully responsive with:
- Mobile-optimized navigation
- Touch-friendly interactions
- Responsive charts and tables
- Bottom navigation on mobile (Dashboard, Progress, Labs, Medications)
