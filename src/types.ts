export type AuthMode = 'signin' | 'signup' | 'forgot' | 'mfa' | 'authenticated';

export type SocialProvider = 'google' | 'github' | 'apple';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: string;
  lastLogin: string;
  is2FAEnabled: boolean;
  activeSessions: number;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
  mfaCode?: string;
  general?: string;
}

export interface PasswordRequirements {
  minLength: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  hasUppercase: boolean;
}
