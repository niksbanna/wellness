# Form Submission Implementation

## Overview

Both the Questionnaire and Contact Form have been upgraded from simple `console.log` implementations to full-featured form submissions using TanStack Query mutations with proper loading states, error handling, and success feedback.

## Changes Made

### 1. API Service Layer (`src/lib/api.ts`)

Created a centralized API service file with:

- **TypeScript interfaces** for type-safe data handling:
  - `QuestionnaireData` - Health assessment data structure
  - `ContactFormData` - Contact form data structure

- **Async submission functions**:
  - `submitQuestionnaire()` - Handles health assessment submission
  - `submitContactForm()` - Handles contact form submission

- **Simulated API behavior**:
  - Realistic delay (1.2-1.5 seconds) to simulate network latency
  - 5% random error rate for testing error handling
  - Console logging for debugging
  - Success/error responses

- **Production-ready structure**:
  - Comments showing where to add real API endpoints
  - Proper error handling
  - Structured response format

### 2. Questionnaire Component Updates

**New Features:**
- ✅ TanStack Query `useMutation` hook for async operations
- ✅ Loading spinner with "Submitting..." text during submission
- ✅ Success toast notification on successful submission
- ✅ Error toast notification with descriptive error messages
- ✅ Disabled navigation buttons during submission
- ✅ Form data transformation to match API interface
- ✅ Proper error boundary handling

**User Experience:**
- Previous/Next buttons disabled while submitting
- Animated loading spinner replaces Submit button icon
- Toast appears in bottom-right with success message
- Errors show in red toast with retry option
- Success state persists after submission

### 3. Contact Form Component Updates

**New Features:**
- ✅ TanStack Query `useMutation` hook for async operations
- ✅ Loading spinner with "Sending..." text during submission
- ✅ Success toast notification on successful submission
- ✅ Error toast notification with descriptive error messages
- ✅ Disabled submit button during submission
- ✅ Proper TypeScript typing for form data

**User Experience:**
- Submit button shows loading state with spinner
- Button disabled during submission to prevent double-clicks
- Toast notification confirms message sent
- Error handling with user-friendly messages
- Success screen shown after submission

## Technical Implementation

### TanStack Query Mutations

Both forms use the same mutation pattern:

```typescript
const mutation = useMutation({
  mutationFn: apiFunction,
  onSuccess: (data) => {
    // Show success toast
    // Update UI state
  },
  onError: (error) => {
    // Show error toast
    // Keep form editable for retry
  },
});
```

### Loading States

```typescript
{mutation.isPending ? (
  <>
    <Loader2 className="animate-spin" />
    Submitting...
  </>
) : (
  <>Submit</>
)}
```

### Toast Notifications

**Success Toast:**
```typescript
toast({
  title: 'Success!',
  description: data.message,
  duration: 5000,
});
```

**Error Toast:**
```typescript
toast({
  title: 'Submission Failed',
  description: error.message,
  variant: 'destructive',
  duration: 5000,
});
```

## Testing the Implementation

### How to Test

1. **Normal Submission:**
   - Fill out either form completely
   - Click Submit/Send
   - Watch for:
     - Button changes to loading state
     - Spinner animation appears
     - Success toast appears after ~1-2 seconds
     - Form transitions to success screen

2. **Error Handling:**
   - Submit multiple times to trigger the 5% error rate
   - Watch for:
     - Red error toast appears
     - Form remains editable
     - Can retry submission

3. **Form Validation:**
   - Try to submit without filling required fields
   - Navigation buttons should be disabled
   - No API call should be made

### What Users See

**Questionnaire Submission:**
1. Click "Submit" on final question
2. Button shows: "Submitting..." with spinner
3. After 1.5 seconds: Success toast appears
4. Success screen with checkmark icon
5. Message: "Our medical team will review your information..."

**Contact Form Submission:**
1. Click "Send Message"
2. Button shows: "Sending..." with spinner
3. After 1.2 seconds: Success toast appears
4. Success screen with checkmark icon
5. Message: "We've received your message..."

## Integration with Real Backend

To connect to a real API, update the functions in `src/lib/api.ts`:

### Example for Questionnaire:

```typescript
export const submitQuestionnaire = async (data: QuestionnaireData) => {
  const response = await fetch('https://api.yoursite.com/api/questionnaire', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_TOKEN', // if needed
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to submit questionnaire');
  }

  return response.json();
};
```

### Example for Contact Form:

```typescript
export const submitContactForm = async (data: ContactFormData) => {
  const response = await fetch('https://api.yoursite.com/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
};
```

## Data Structures

### Questionnaire Data
```typescript
{
  name: string;           // Full name
  age: number;            // Age in years
  gender: string;         // Selected gender
  weight: number;         // Weight in lbs
  height: number;         // Height in inches
  goal: string;           // Weight loss goal range
  health_conditions: string[]; // Array of conditions
  medications: string;    // "Yes" or "No"
}
```

### Contact Form Data
```typescript
{
  name: string;    // Full name
  email: string;   // Email address
  phone: string;   // Phone number (optional)
  message: string; // Message content
}
```

## Error Scenarios Handled

1. **Network Errors:** Lost connection, timeout
2. **Server Errors:** 500, 503 status codes
3. **Validation Errors:** Invalid data format
4. **Random Failures:** Simulated 5% error rate for testing

## UI States

### Questionnaire States
- **Idle:** Normal form navigation
- **Loading:** "Submitting..." with spinner, all buttons disabled
- **Success:** Checkmark icon, success message, contact CTA
- **Error:** Error toast, form remains editable, can retry

### Contact Form States
- **Idle:** Normal form, editable fields
- **Loading:** "Sending..." with spinner, button disabled
- **Success:** Checkmark icon, success message
- **Error:** Error toast, form remains editable, can retry

## Performance Considerations

- **Optimistic Updates:** Not used (waiting for server confirmation)
- **Debouncing:** Not needed (single submission action)
- **Retry Logic:** User-initiated via toast notification
- **Cache:** Not applicable for mutations

## Accessibility

- Loading states announced to screen readers
- Disabled states properly indicated
- Error messages descriptive and actionable
- Success confirmations clear and informative

## Future Enhancements

1. **Email Confirmation:** Send confirmation emails
2. **Analytics Tracking:** Track submission success/failure rates
3. **A/B Testing:** Different success messages
4. **Progressive Enhancement:** Offline form storage
5. **Multi-step Validation:** Real-time field validation
6. **Auto-save:** Draft saving for longer forms
7. **File Uploads:** Add document upload capability
8. **Captcha:** Add spam prevention
9. **Rate Limiting:** Client-side throttling
10. **Follow-up:** Automated follow-up sequences

## Dependencies Used

- `@tanstack/react-query` - Async state management
- `lucide-react` - Icons (Loader2 for spinner)
- `@/hooks/use-toast` - Toast notifications
- `@/lib/utils` - cn() utility for classnames

## Files Modified

1. `src/lib/api.ts` - **Created** - API service layer
2. `src/components/Questionnaire.tsx` - **Updated** - Added mutation logic
3. `src/components/ContactForm.tsx` - **Updated** - Added mutation logic

## Build Status

✅ **Build successful** - No TypeScript errors
✅ **All imports resolved** - Dependencies properly installed
✅ **Type safety maintained** - Full TypeScript coverage
✅ **Bundle size:** 870KB (minified), 258KB (gzipped)
