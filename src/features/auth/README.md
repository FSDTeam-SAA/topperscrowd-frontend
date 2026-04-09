# Authentication System

This directory contains all authentication-related components, pages, and hooks for the Thorian application.

## Architecture Overview

### File Structure

```
src/
├── app/auth/
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── forgot-password/page.tsx
│   ├── verify-email/page.tsx
│   ├── change-password/page.tsx
│   └── page.tsx (redirects to login)
├── features/auth/
│   ├── components/
│   │   ├── AuthFormComponents.tsx (reusable form inputs)
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   ├── VerifyEmailForm.tsx
│   │   └── ChangePasswordForm.tsx
│   └── hooks/
│       └── useAuth.ts (authentication context hook)
```

## Pages & Routes

### 1. Login Page (`/auth/login`)

- **Purpose**: User login authentication
- **Fields**: Email, Password, Remember Me checkbox
- **Actions**:
  - Login (navigates to home)
  - Forgot Password (navigates to forgot password)
  - Sign Up link (navigates to signup)

### 2. Sign Up Page (`/auth/signup`)

- **Purpose**: New user registration
- **Fields**: First Name, Last Name, Email, Create Password, Confirm Password
- **Validations**:
  - All fields required
  - Password must match confirmation
  - Email format validation
- **Actions**:
  - Sign Up (navigates to verify email)
  - Log In link (navigates to login)

### 3. Forgot Password Page (`/auth/forgot-password`)

- **Purpose**: Password recovery initiation
- **Fields**: Email Address
- **Actions**:
  - Send OTP (navigates to verify email)
  - Back to Login link

### 4. Verify Email Page (`/auth/verify-email`)

- **Purpose**: Email verification via OTP
- **Features**:
  - 6-digit OTP input with auto-focus
  - Countdown timer (2:59)
  - Resend OTP button (disabled during countdown)
- **Actions**:
  - Verify (navigates to change password)
  - Resend OTP

### 5. Change Password Page (`/auth/change-password`)

- **Purpose**: Set new password after verification
- **Fields**: Create New Password, Confirm New Password
- **Validations**:
  - Passwords must match
  - Minimum 8 characters
- **Actions**:
  - Change Password (navigates to login)
  - Back to Login link

## Authentication Flow

```
START
  ↓
[Login] ← → [Sign Up]
  ↓          ↓
  │      [Verify Email] ← [Forgot Password]
  │          ↓                    ↓
  │      [Change Password]   [Verify Email]
  │          ↓                    ↓
  └─────→ [HOME] ← [Change Password]
```

## Components

### Reusable Form Components (`AuthFormComponents.tsx`)

- **AuthInput**: Text/Email/Password input with optional password toggle
- **AuthCheckbox**: Checkbox for "Remember me"
- **AuthButton**: Styled submit button
- **AuthLink**: Link text with button-styled link

### Forms

Each form component:

- Manages its own state
- Includes error handling
- Has loading states
- Implements form validation
- Routes to appropriate next page on success

## Authentication Hook (`useAuth`)

```typescript
const { user, isLoading, login, signup, logout } = useAuth();
```

**Features**:

- Global authentication state management
- Session persistence check
- User context access throughout the app
- Login/Signup/Logout methods

## Styling

All authentication pages follow a consistent design:

- **Background**: Dark theme (#0f172a)
- **Container**: Centered 496px width form
- **Colors**: Indigo buttons (#4f46e5), white text, gray placeholders
- **Typography**: Times New Roman for headers, Poppins for body
- **Form Elements**: Bordered inputs with focus states

## API Integration

Currently, all API calls are stubbed with TODO comments. To integrate with backend:

1. Replace `// TODO` comments with actual API endpoints
2. Update endpoints in these files:
   - `LoginForm.tsx` - `/api/auth/login`
   - `SignupForm.tsx` - `/api/auth/signup`
   - `ForgotPasswordForm.tsx` - `/api/auth/forgot-password`
   - `VerifyEmailForm.tsx` - `/api/auth/verify-email`
   - `ChangePasswordForm.tsx` - `/api/auth/change-password`
   - `useAuth.ts` - `/api/auth/me` and `/api/auth/logout`

## Form Validation

Each form implements client-side validation:

- Required field checks
- Email format validation
- Password strength requirements
- Password confirmation matching
- OTP length validation (6 digits)

## State Management

Currently uses:

- React `useState` for form state
- Context API (AuthContext) for global auth state

Future improvements can integrate Redux or Zustand.

## Accessibility

Forms include:

- Proper label associations
- Error messages for validation
- Keyboard navigation
- Tab order management

## Testing

To test the authentication flow:

1. **Login**: Navigate to `/auth/login`
   - Enter any email/password
   - Check "Remember me"
   - Click "Log In"

2. **Sign Up**: Navigate to `/auth/signup`
   - Fill all fields
   - Passwords must match
   - Click "Sign Up"

3. **Forgot Password**: Navigate to `/auth/forgot-password`
   - Enter email
   - Click "Send OTP"

4. **Verify Email**: Navigate to `/auth/verify-email`
   - Enter 6-digit OTP
   - Watch countdown timer
   - Can resend after timer ends

5. **Change Password**: Navigate to `/auth/change-password`
   - Enter new password
   - Confirm password
   - Click "Change Password"

## Security Considerations

- Passwords are sent to backend (HTTPS assumed)
- OTP timing out after 3 minutes
- No password stored in local storage
- Session tokens managed server-side
- CSRF protection should be implemented

## Next Steps

1. Connect to actual backend API
2. Implement session management
3. Add OAuth providers (Google, GitHub)
4. Add rate limiting for login attempts
5. Implement two-factor authentication
6. Add email verification workflow
7. Add password strength indicator
