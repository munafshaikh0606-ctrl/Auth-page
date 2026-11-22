import React from 'react';
import { Shield, Lock, KeyRound, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const BrandHero: React.FC = () => {
  return (
    <div className="relative overflow-hidden h-full rounded-3xl bg-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between dark:bg-zinc-950 dark:border dark:border-zinc-800 shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none" />

      {/* Top Brand Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white text-slate-950 flex items-center justify-center font-bold text-lg shadow-md">
          <Shield className="w-5 h-5 fill-slate-950 text-slate-950 stroke-[2.5]" />
        </div>
        <div>
          <span className="font-bold text-base tracking-tight text-white block">ApexAuth</span>
          <span className="text-[11px] font-medium text-slate-400 block -mt-0.5">Enterprise Identity Cloud</span>
        </div>
      </div>

      {/* Hero Quote & Features */}
      <div className="relative z-10 my-8 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur border border-white/15 text-indigo-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Next-Gen Security Infrastructure</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
          Zero-trust authentication engineered for speed and precision.
        </h2>

        {/* Feature Pill Grid */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Bank-Grade Encryption</h4>
              <p className="text-[11px] text-slate-400">End-to-end TLS 1.3 with SOC2 Type II compliance.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Passkeys & Multi-Factor 2FA</h4>
              <p className="text-[11px] text-slate-400">Biometric WebAuthn and OTP verification.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Instant SSO Sync</h4>
              <p className="text-[11px] text-slate-400">Seamless OAuth integration with Google, GitHub, and Apple.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Trust Footer */}
      <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 overflow-hidden">
            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar" referrerPolicy="no-referrer" />
            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Avatar" referrerPolicy="no-referrer" />
            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Avatar" referrerPolicy="no-referrer" />
          </div>
          <span className="text-[11px] font-medium text-slate-300">Loved by 50k+ developers</span>
        </div>

        <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> 99.99% Uptime
        </span>
      </div>
    </div>
  );
};
