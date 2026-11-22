import React, { useState } from 'react';
import { LogOut, ShieldCheck, UserCheck, Key, Laptop, CheckCircle2, Copy, Check, Sparkles, ExternalLink, Activity } from 'lucide-react';
import { UserProfile } from '../types';

interface Props {
  user: UserProfile;
  onSignOut: () => void;
}

export const AuthenticatedView: React.FC<Props> = ({ user, onSignOut }) => {
  const [copiedToken, setCopiedToken] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'security'>('overview');

  const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFseCBNb3JnYW4iLCJpYXQiOjE1MTYyMzkwMjJ9';

  const handleCopyToken = () => {
    navigator.clipboard.writeText(mockToken);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white dark:bg-zinc-900 dark:border dark:border-zinc-800 shadow-xl space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{user.name}</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-300 dark:text-zinc-400">{user.email}</p>
            </div>
          </div>

          <button
            type="button"
            id="authenticated-signout-btn"
            onClick={onSignOut}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-xs">
          <div>
            <span className="text-[11px] text-slate-400 block">Role</span>
            <span className="font-semibold text-white">{user.role}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">2FA Status</span>
            <span className="font-semibold text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Protected
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Security Score</span>
            <span className="font-semibold text-indigo-300">100% Secure</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-zinc-800/80 rounded-xl">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 shadow-sm'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100'
          }`}
        >
          Session Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('sessions')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === 'sessions'
              ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 shadow-sm'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100'
          }`}
        >
          Active Devices
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === 'security'
              ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 shadow-sm'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100'
          }`}
        >
          Security Key
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-500" />
              <span>Authentication Verification Successful</span>
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-zinc-400">
              Session ID: #849201
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
            Your login request was verified through zero-trust token validation. All user rights and API scopes are granted for your active workspace session.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-zinc-400">
              <span>Last Login Time:</span>
              <span className="font-mono text-slate-900 dark:text-zinc-200">{user.lastLogin}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-zinc-400">
              <span>IP Location:</span>
              <span className="font-mono text-slate-900 dark:text-zinc-200">192.168.1.104 (TLS 1.3)</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-zinc-400">
              <span>Browser Agent:</span>
              <span className="font-mono text-slate-900 dark:text-zinc-200">Chrome (v126.0)</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
            <Laptop className="w-4 h-4 text-indigo-500" />
            <span>Active Device Sessions ({user.activeSessions})</span>
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-zinc-800 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Laptop className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-zinc-100">MacBook Pro 16" (This Device)</p>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400">San Francisco, USA • Active now</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                Current
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-zinc-100">iPhone 15 Pro</p>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400">San Francisco, USA • 2 hours ago</p>
                </div>
              </div>
              <button type="button" className="text-xs text-rose-500 hover:underline cursor-pointer">
                Revoke
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-500" />
              <span>JWT Bearer Auth Token</span>
            </h3>
            <button
              type="button"
              onClick={handleCopyToken}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              {copiedToken ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Token</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 text-slate-300 text-[11px] font-mono break-all leading-relaxed">
            {mockToken}
          </div>
        </div>
      )}

      {/* Return Button */}
      <button
        type="button"
        id="return-to-login-view-btn"
        onClick={onSignOut}
        className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-800/80 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        <span>Return to Login Screen</span>
      </button>
    </div>
  );
};
