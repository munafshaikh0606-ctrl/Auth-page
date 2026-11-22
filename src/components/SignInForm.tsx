import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Sparkles, KeyRound } from 'lucide-react';
import { FormErrors, SocialProvider } from '../types';
import { SocialAuthButtons } from './SocialAuthButtons';

interface Props {
  onSignInSuccess: (email: string, requiresMfa: boolean) => void;
  onNavigate: (mode: 'signup' | 'forgot') => void;
  onSocialAuth: (provider: SocialProvider) => void;
  demoAccount: { email: string; name: string };
}

export const SignInForm: React.FC<Props> = ({
  onSignInSuccess,
  onNavigate,
  onSocialAuth,
  demoAccount,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [enableMfaDemo, setEnableMfaDemo] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const fillDemo = () => {
    setEmail(demoAccount.email);
    setPassword('DemoPass123!');
    setErrors({});
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      onSignInSuccess(email, enableMfaDemo);
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Form Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
            <KeyRound className="w-3.5 h-3.5 text-slate-900 dark:text-zinc-100" />
            <span>Secure Auth</span>
          </span>

          <button
            type="button"
            onClick={fillDemo}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            title="Auto-fill with sample credentials for rapid preview"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Auto-fill Demo</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
          Enter your credentials to access your secure account workspace.
        </p>
      </div>

      {errors.general && (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-3 text-xs text-rose-700 dark:text-rose-300">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
          <span>{errors.general}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Email Field */}
        <div className="space-y-1.5">
          <label htmlFor="signin-email" className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="signin-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="alex.morgan@example.com"
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

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="signin-password" className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
              Password
            </label>
            <button
              type="button"
              id="forgot-password-link"
              onClick={() => onNavigate('forgot')}
              className="text-xs font-semibold text-slate-900 dark:text-zinc-200 hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="signin-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="••••••••••••"
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
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Options Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              id="remember-me-checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 dark:border-zinc-700 text-slate-900 focus:ring-slate-900 cursor-pointer"
            />
            <span className="text-xs font-medium text-slate-700 dark:text-zinc-300">
              Remember this device
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200">
            <input
              type="checkbox"
              id="mfa-demo-checkbox"
              checked={enableMfaDemo}
              onChange={(e) => setEnableMfaDemo(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 dark:border-zinc-700 text-slate-900 focus:ring-slate-900 cursor-pointer"
            />
            <span>Test 2FA step</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          id="signin-submit-btn"
          disabled={isLoading}
          className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-slate-800 dark:hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-zinc-100 transition-all shadow-sm active:scale-[0.99] disabled:opacity-70 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/80 dark:border-zinc-900/80 border-t-transparent rounded-full animate-spin" />
              <span>Verifying credentials...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </form>

      {/* Social Logins */}
      <SocialAuthButtons onSocialAuth={onSocialAuth} isLoading={isLoading} />

      {/* Footer link to Sign Up */}
      <div className="pt-2 text-center text-xs text-slate-600 dark:text-zinc-400">
        Don't have an account yet?{' '}
        <button
          type="button"
          id="go-to-signup-btn"
          onClick={() => onNavigate('signup')}
          className="font-semibold text-slate-900 dark:text-zinc-100 hover:underline cursor-pointer ml-1"
        >
          Create free account
        </button>
      </div>
    </div>
  );
};
