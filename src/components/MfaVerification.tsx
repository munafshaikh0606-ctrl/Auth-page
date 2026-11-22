import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, ArrowLeft, ArrowRight, Smartphone, KeyRound, Sparkles, AlertCircle } from 'lucide-react';
import { FormErrors } from '../types';

interface Props {
  email: string;
  onMfaSuccess: () => void;
  onNavigate: (mode: 'signin') => void;
}

export const MfaVerification: React.FC<Props> = ({ email, onMfaSuccess, onNavigate }) => {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [method, setMethod] = useState<'authenticator' | 'sms'>('authenticator');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(45);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (errors.mfaCode) setErrors({});

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const newCode = [...code];
    pasted.split('').forEach((char, i) => {
      if (i < 6) newCode[i] = char;
    });
    setCode(newCode);

    const nextIndex = Math.min(pasted.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const fillDemoCode = () => {
    setCode(['8', '4', '9', '2', '0', '1']);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');

    if (fullCode.length < 6) {
      setErrors({ mfaCode: 'Please enter all 6 digits of your code' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      setIsLoading(false);
      onMfaSuccess();
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <button
        type="button"
        id="back-to-signin-mfa-btn"
        onClick={() => onNavigate('signin')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to login</span>
      </button>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Two-Factor Auth</span>
          </span>

          <button
            type="button"
            onClick={fillDemoCode}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            title="Auto-fill sample 2FA passcode"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Fill Code (849201)</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          Security Check
        </h1>
        <p className="mt-1.5 text-sm text-slate-600 dark:text-zinc-400">
          Enter the 6-digit passcode sent to your device for account <strong className="text-slate-900 dark:text-zinc-200">{email}</strong>.
        </p>
      </div>

      {/* Verification method toggles */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-zinc-800/60 rounded-xl">
        <button
          type="button"
          onClick={() => setMethod('authenticator')}
          className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            method === 'authenticator'
              ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 shadow-sm'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Authenticator App</span>
        </button>
        <button
          type="button"
          onClick={() => setMethod('sms')}
          className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            method === 'sms'
              ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 shadow-sm'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>SMS Passcode</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 6 Digit PIN Boxes */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 text-center">
            {method === 'authenticator'
              ? 'Enter 6-digit code from your Authenticator app'
              : 'Enter 6-digit SMS code sent to your phone'}
          </label>

          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-11 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-xl bg-white dark:bg-zinc-900 border text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 transition-all ${
                  errors.mfaCode
                    ? 'border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-200 dark:border-zinc-800 focus:ring-slate-900/20 dark:focus:ring-zinc-400/20 focus:border-slate-900 dark:focus:border-zinc-300'
                }`}
              />
            ))}
          </div>

          {errors.mfaCode && (
            <p className="text-xs text-rose-500 font-medium flex items-center justify-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.mfaCode}
            </p>
          )}
        </div>

        <button
          type="submit"
          id="mfa-submit-btn"
          disabled={isLoading}
          className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-slate-800 dark:hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-zinc-100 transition-all shadow-sm active:scale-[0.99] disabled:opacity-70 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/80 dark:border-zinc-900/80 border-t-transparent rounded-full animate-spin" />
              <span>Verifying code...</span>
            </>
          ) : (
            <>
              <span>Verify & Continue</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </form>

      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-zinc-400 pt-2 border-t border-slate-200 dark:border-zinc-800">
        <span>Resend code option</span>
        <button
          type="button"
          onClick={() => setResendTimer(45)}
          disabled={resendTimer > 0}
          className="font-semibold text-slate-900 dark:text-zinc-200 hover:underline disabled:opacity-50 cursor-pointer"
        >
          {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Send new code'}
        </button>
      </div>
    </div>
  );
};
