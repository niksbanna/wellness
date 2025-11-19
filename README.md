# Wellness Platform

A modern telehealth platform for medical weight loss programs, featuring a public marketing site and authenticated member portal.

## ✨ Features

- 🏥 **Member Portal** - Dashboard, progress tracking, lab results, medications, and appointments
- 📊 **Interactive Tools** - BMI calculator, pricing estimator, program comparison
- 👨‍⚕️ **Provider Directory** - Browse and schedule appointments with healthcare providers
- 📚 **Resource Library** - Educational content about weight loss and wellness
- 🔐 **Authentication** - Secure login with protected routes
- 📱 **Responsive Design** - Works seamlessly on mobile, tablet, and desktop

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Bun or npm

### Installation

```bash
git clone https://github.com/niksbanna/wellness.git
cd wellness
bun install
```

### Development

```bash
bun run dev
```

Open [http://localhost:8080](http://localhost:8080)

### Build

```bash
bun run build
bun run preview
```

## 🧪 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Shadcn UI, Tailwind CSS, Radix UI
- **Forms**: React Hook Form, Zod
- **Data**: TanStack Query
- **Charts**: Recharts
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Shadcn UI components
│   └── ...             # Feature components
├── contexts/           # React contexts (Auth)
├── hooks/              # Custom hooks
├── lib/                # Utilities and data
├── pages/              # Route pages
├── types/              # TypeScript types
└── App.tsx             # Main app with routing
```

## 🗺️ Key Routes

**Public**: `/`, `/login`, `/providers`, `/resources`, `/program-comparison`, `/pricing-calculator`

**Member Portal** (protected): `/dashboard`, `/progress`, `/labs`, `/medications`, `/appointments`

## 🧪 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Shadcn UI, Tailwind CSS, Radix UI
- **Forms**: React Hook Form, Zod
- **Data**: TanStack Query
- **Charts**: Recharts
- **Icons**: Lucide React

## 📁 Project Structure

## 🎨 Design System

### Color Palette
- **Wellness Theme** - Custom color scale (50-950) for brand consistency
- **Semantic Colors** - Primary, secondary, destructive, muted, accent
- **State Colors** - Success, warning, error states
- **Glassmorphism** - Backdrop blur effects and glass shadows

### Typography
- **Font Display** - SF Pro Display (Apple's system font)
- **Font Sans** - Inter as fallback
- **Responsive Sizing** - Fluid typography with mobile-first approach

### Animations
Custom keyframe animations:
- `fade-in`, `fade-up`, `fade-down` - Entry animations
- `float` - Floating elements
- `pulse-gentle` - Subtle pulsing
- `blur-in` - Blur to focus transitions
- `accordion-down`, `accordion-up` - Accordion animations

### Components
50+ pre-built Shadcn UI components including:
- Forms (Input, Select, Checkbox, Radio, Textarea, etc.)
- Overlays (Dialog, Sheet, Drawer, Popover, Tooltip)
- Data Display (Card, Table, Badge, Avatar, Progress)
- Navigation (Tabs, Breadcrumb, Pagination, Menubar)
- Feedback (Toast, Alert, Alert Dialog)

## 📱 Responsive Design

- **Mobile-First** - Optimized for mobile devices
- **Breakpoints** - sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1400px)
- **Touch Optimized** - Large tap targets and swipe gestures
- **Adaptive Layouts** - Different layouts for mobile, tablet, and desktop
- **Responsive Charts** - Data visualizations adapt to screen size

## 💡 Key Business Features

### Program Tiers
**Basic Program** ($99/month + $149 consultation)
- Essential medical supervision
- Monthly check-ins
- Basic nutrition guidance
- Email support

**Standard Program** ($199/month + $149 consultation) - Most Popular
- Bi-weekly check-ins
- Monthly dietitian consultation
- Personalized meal plans
- Priority support
- Group sessions

**Premium Program** ($349/month, consultation waived)
- Weekly check-ins
- Bi-weekly dietitian consultations
- Monthly mental health counseling
- Dedicated care coordinator
- 24/7 priority support
- Lab work included

### Pricing Calculator
- BMI calculation and eligibility check
- Insurance coverage estimation
- Medication cost breakdown (Semaglutide, Tirzepatide, Liraglutide)
- Duration-based savings (6-month and 12-month commitments)
- Real-time cost estimation

### Provider Directory
- Searchable provider database
- Specialty filtering (Endocrinology, Bariatrics, etc.)
- Location-based search
- Provider ratings and reviews
- Detailed provider profiles with credentials
- Availability calendar
- Insurance verification

### Resource Library
Categories:
- Weight Loss Medications (GLP-1, Semaglutide, Tirzepatide)
- Nutrition & Diet
- Exercise & Fitness
- Mental Health & Mindfulness
- Medical Information
- Wellness & Lifestyle

## 🔄 State Management Patterns

### Authentication Flow
1. User enters credentials on `/login`
2. AuthContext validates and creates session
3. User data stored in localStorage
4. ProtectedRoute HOC guards member portal routes
5. Automatic redirect to dashboard on success

### Data Fetching
- TanStack Query for server state
- Automatic caching and refetching
- Optimistic updates for better UX
- Error handling and retry logic

### Form Handling
- React Hook Form for form state
- Zod schemas for validation
- Field-level validation
- Custom error messages
- Accessible form components

## 🚧 Development Roadmap

### Phase 1: Foundation ✅
- [x] Marketing website
- [x] Component library setup
- [x] Responsive design
- [x] Basic routing

### Phase 2: Member Portal ✅
- [x] Authentication system
- [x] Dashboard with analytics
- [x] Progress tracking
- [x] Lab results viewer
- [x] Medication management
- [x] Appointment scheduling

### Phase 3: Backend Integration (Planned)
- [ ] Real authentication API
- [ ] Database integration
- [ ] Payment processing
- [ ] Video consultation integration
- [ ] Electronic health records (EHR) integration
- [ ] Prescription management system

### Phase 4: Advanced Features (Planned)
- [ ] Real-time chat with care team
- [ ] Mobile app (React Native)
- [ ] Wearable device integration
- [ ] Advanced analytics and reporting
- [ ] AI-powered insights
- [ ] Telemedicine video calls
- [ ] Document upload and management
- [ ] Billing and insurance claims

## 🧪 Testing Strategy

### Unit Tests (To Be Implemented)
- Component testing with React Testing Library
- Hook testing
- Utility function tests
- Form validation tests

### Integration Tests (To Be Implemented)
- User flow testing
- API integration testing
- Authentication flow testing
- Form submission testing

### E2E Tests (To Be Implemented)
- Playwright for end-to-end testing
- Critical user journeys
- Cross-browser testing
- Mobile responsive testing

## 🔒 Security Considerations

### Current Implementation
- Client-side session management
- Protected routes
- Form validation
- XSS prevention through React

### Production Requirements
- JWT token authentication
- HTTPS only
- HIPAA compliance measures
- Data encryption at rest and in transit
- Secure API endpoints
- Rate limiting
- CSRF protection
- Content Security Policy
- Regular security audits
- Penetration testing
- PHI (Protected Health Information) handling

## ⚡ Performance Optimizations

### Current
- Vite for fast development builds
- Code splitting with React Router
- Lazy loading components
- Optimized images
- Tailwind CSS purging
- Tree shaking

### Planned
- Image optimization with WebP
- CDN for static assets
- Service workers for offline support
- Bundle size analysis
- Performance monitoring
- Lighthouse score optimization

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

## 📚 Documentation

- [Member Portal Guide](MEMBER_PORTAL.md)
- [Form Submissions](FORM_SUBMISSIONS.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) - Component library
- [Vite](https://vitejs.dev/) - Build tool
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

Built with ❤️ for better health outcomes • [niksbanna](https://github.com/niksbanna)
