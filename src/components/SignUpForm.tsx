import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { FormErrors, SocialProvider } from '../types';
import { PasswordStrengthIndicator, checkPasswordStrength } from './PasswordStrengthIndicator';
import { SocialAuthButtons } from './SocialAuthButtons';

interface Props {
  onSignUpSuccess: (email: string, name: string) => void;
  onNavigate: (mode: 'signin') => void;
  onSocialAuth: (provider: SocialProvider) => void;
}

export const SignUpForm: React.FC<Props> = ({
  onSignUpSuccess,
  onNavigate,
  onSocialAuth,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const fillDemo = () => {
    setFullName('Sarah Vance');
    setEmail('sarah.vance@company.io');
    setPassword('SecureVance#2026');
    setConfirmPassword('SecureVance#2026');
    setAcceptTerms(true);
    setErrors({});
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Work email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const { score } = checkPasswordStrength(password);
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (score < 2) {
      newErrors.password = 'Please create a stronger password';
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!acceptTerms) {
      newErrors.terms = 'You must accept the Terms and Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      setIsLoading(false);
      onSignUpSuccess(email, fullName);
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      {/* Form Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Instant Access</span>
          </span>

          <button
            type="button"
            onClick={fillDemo}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            title="Auto-fill sample sign-up data"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Fill Sample Data</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          Create account
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
          Join thousands of developers and teams securing their workspace.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
        {/* Full Name */}
        <div className="space-y-1">
          <label htmlFor="signup-fullname" className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
            Full name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
              <User className="w-4 h-4" />
            </div>
            <input
              id="signup-fullname"
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
              }}
              placeholder="Sarah Vance"
              className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-zinc-900 border text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                errors.fullName
                  ? 'border-rose-500 focus:ring-rose-500/20'
                  : 'border-slate-200 dark:border-zinc-800 focus:ring-slate-900/20 dark:focus:ring-zinc-400/20 focus:border-slate-900 dark:focus:border-zinc-300'
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label htmlFor="signup-email" className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
            Work email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="sarah.vance@company.io"
              className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-zinc-900 border text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? 'border-rose-500 focus:ring-rose-500/20'
                  : 'border-slate-200 dark:border-zinc-800 focus:ring-slate-900/20 dark:focus:ring-zinc-400/20 focus:border-slate-900 dark:focus:border-zinc-300'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label htmlFor="signup-password" className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="Create strong password"
              className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-white dark:bg-zinc-900 border text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                errors.password
                  ? 'border-rose-500 focus:ring-rose-500/20'
                  : 'border-slate-200 dark:border-zinc-800 focus:ring-slate-900/20 dark:focus:ring-zinc-400/20 focus:border-slate-900 dark:focus:border-zinc-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <PasswordStrengthIndicator password={password} />

          {errors.password && (
            <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1 pt-1">
          <label htmlFor="signup-confirm-password" className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
            Confirm password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="signup-confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }}
              placeholder="Repeat password"
              className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-zinc-900 border text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                errors.confirmPassword
                  ? 'border-rose-500 focus:ring-rose-500/20'
                  : 'border-slate-200 dark:border-zinc-800 focus:ring-slate-900/20 dark:focus:ring-zinc-400/20 focus:border-slate-900 dark:focus:border-zinc-300'
              }`}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              id="accept-terms-checkbox"
              checked={acceptTerms}
              onChange={(e) => {
                setAcceptTerms(e.target.checked);
                if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
              }}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-zinc-700 text-slate-900 focus:ring-slate-900 cursor-pointer"
            />
            <span className="text-xs text-slate-600 dark:text-zinc-400">
              I agree to the{' '}
              <a href="#terms" onClick={(e) => e.preventDefault()} className="font-semibold text-slate-900 dark:text-zinc-200 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" onClick={(e) => e.preventDefault()} className="font-semibold text-slate-900 dark:text-zinc-200 underline">
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.terms && (
            <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.terms}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          id="signup-submit-btn"
          disabled={isLoading}
          className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-slate-800 dark:hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-zinc-100 transition-all shadow-sm active:scale-[0.99] disabled:opacity-70 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/80 dark:border-zinc-900/80 border-t-transparent rounded-full animate-spin" />
              <span>Creating your account...</span>
            </>
          ) : (
            <>
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </form>

      {/* Social Logins */}
      <SocialAuthButtons onSocialAuth={onSocialAuth} isLoading={isLoading} />

      {/* Footer link to Sign In */}
      <div className="pt-1 text-center text-xs text-slate-600 dark:text-zinc-400">
        Already have an account?{' '}
        <button
          type="button"
          id="go-to-signin-btn"
          onClick={() => onNavigate('signin')}
          className="font-semibold text-slate-900 dark:text-zinc-100 hover:underline cursor-pointer ml-1"
        >
          Sign in instead
        </button>
      </div>
    </div>
  );
};
