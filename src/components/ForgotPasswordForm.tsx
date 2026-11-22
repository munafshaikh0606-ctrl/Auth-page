import React, { useState, useEffect } from 'react';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { FormErrors } from '../types';

interface Props {
  onNavigate: (mode: 'signin') => void;
}

export const ForgotPasswordForm: React.FC<Props> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
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
      setIsSubmitted(true);
      setResendCountdown(30);
    }, 1200);
  };

  const handleResend = () => {
    if (resendCountdown > 0 || isLoading) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setResendCountdown(30);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Back to sign in header button */}
      <button
        type="button"
        id="back-to-signin-top-btn"
        onClick={() => onNavigate('signin')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to sign in</span>
      </button>

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          Reset password
        </h1>
        <p className="mt-1.5 text-sm text-slate-600 dark:text-zinc-400">
          Enter the email associated with your account and we'll send a secure password reset link.
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <label htmlFor="forgot-email" className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
              Your registered email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="forgot-email"
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

          <button
            type="submit"
            id="send-reset-link-btn"
            disabled={isLoading}
            className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-slate-800 dark:hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-zinc-100 transition-all shadow-sm active:scale-[0.99] disabled:opacity-70 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/80 dark:border-zinc-900/80 border-t-transparent rounded-full animate-spin" />
                <span>Sending reset link...</span>
              </>
            ) : (
              <>
                <span>Send Reset Link</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-500 text-white shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-100">
                Check your inbox
              </h3>
              <p className="text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed">
                We sent a password recovery link to{' '}
                <strong className="font-semibold text-emerald-950 dark:text-white">{email}</strong>.
                Please check your inbox and follow the instructions.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-between text-xs">
            <span className="text-emerald-800 dark:text-emerald-300">Didn't receive code?</span>
            <button
              type="button"
              id="resend-reset-email-btn"
              onClick={handleResend}
              disabled={resendCountdown > 0 || isLoading}
              className="inline-flex items-center gap-1.5 font-semibold text-emerald-900 dark:text-emerald-100 hover:underline disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : 'Resend Email'}
            </button>
          </div>
        </div>
      )}

      <div className="text-center pt-2">
        <button
          type="button"
          id="back-to-signin-bottom-btn"
          onClick={() => onNavigate('signin')}
          className="text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:underline cursor-pointer"
        >
          Return to sign in
        </button>
      </div>
    </div>
  );
};
