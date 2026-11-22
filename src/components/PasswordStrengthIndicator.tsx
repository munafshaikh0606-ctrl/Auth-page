import React from 'react';
import { Check, X } from 'lucide-react';
import { PasswordRequirements } from '../types';

interface Props {
  password: string;
}

export const checkPasswordStrength = (password: string): { requirements: PasswordRequirements; score: number } => {
  const requirements: PasswordRequirements = {
    minLength: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
  };

  let score = 0;
  if (requirements.minLength) score += 1;
  if (requirements.hasNumber) score += 1;
  if (requirements.hasSpecialChar) score += 1;
  if (requirements.hasUppercase) score += 1;

  return { requirements, score };
};

export const PasswordStrengthIndicator: React.FC<Props> = ({ password }) => {
  if (!password) return null;

  const { requirements, score } = checkPasswordStrength(password);

  const getLabelAndColor = () => {
    switch (score) {
      case 0:
      case 1:
        return { label: 'Weak password', color: 'bg-rose-500', textColor: 'text-rose-500' };
      case 2:
        return { label: 'Fair password', color: 'bg-amber-500', textColor: 'text-amber-500' };
      case 3:
        return { label: 'Good password', color: 'bg-blue-500', textColor: 'text-blue-500' };
      case 4:
        return { label: 'Strong password', color: 'bg-emerald-500', textColor: 'text-emerald-500' };
      default:
        return { label: 'Weak', color: 'bg-slate-300', textColor: 'text-slate-400' };
    }
  };

  const { label, color, textColor } = getLabelAndColor();

  return (
    <div className="mt-2 space-y-2 text-xs transition-all duration-200">
      <div className="flex items-center justify-between">
        <span className="text-slate-500 dark:text-zinc-400 font-medium">Strength:</span>
        <span className={`font-semibold ${textColor}`}>{label}</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 h-1.5">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-full rounded-full transition-all duration-300 ${
              step <= score ? color : 'bg-slate-200 dark:bg-zinc-800'
            }`}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-1 text-[11px] text-slate-600 dark:text-zinc-400">
        <div className="flex items-center gap-1.5">
          {requirements.minLength ? (
            <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />
          ) : (
            <X className="w-3 h-3 text-slate-400 dark:text-zinc-600" />
          )}
          <span>At least 8 characters</span>
        </div>
        <div className="flex items-center gap-1.5">
          {requirements.hasUppercase ? (
            <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />
          ) : (
            <X className="w-3 h-3 text-slate-400 dark:text-zinc-600" />
          )}
          <span>One uppercase letter</span>
        </div>
        <div className="flex items-center gap-1.5">
          {requirements.hasNumber ? (
            <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />
          ) : (
            <X className="w-3 h-3 text-slate-400 dark:text-zinc-600" />
          )}
          <span>At least one number</span>
        </div>
        <div className="flex items-center gap-1.5">
          {requirements.hasSpecialChar ? (
            <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />
          ) : (
            <X className="w-3 h-3 text-slate-400 dark:text-zinc-600" />
          )}
          <span>Special character</span>
        </div>
      </div>
    </div>
  );
};
