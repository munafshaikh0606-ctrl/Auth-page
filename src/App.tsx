import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Shield, CheckCircle2, Info } from 'lucide-react';
import { AuthMode, SocialProvider, UserProfile } from './types';
import { SignInForm } from './components/SignInForm';
import { SignUpForm } from './components/SignUpForm';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { MfaVerification } from './components/MfaVerification';
import { AuthenticatedView } from './components/AuthenticatedView';
import { BrandHero } from './components/BrandHero';

export default function App() {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [pendingUserEmail, setPendingUserEmail] = useState('');

  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: 'usr_849201',
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Senior System Architect',
    lastLogin: 'Today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    is2FAEnabled: true,
    activeSessions: 2,
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const handleSignInSuccess = (email: string, requiresMfa: boolean) => {
    setPendingUserEmail(email);
    if (requiresMfa) {
      showToast('Credentials verified. Please enter your 2FA passcode.');
      setMode('mfa');
    } else {
      setCurrentUser((prev) => ({
        ...prev,
        email,
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        lastLogin: 'Just now',
      }));
      showToast('Successfully signed in! Welcome back.');
      setMode('authenticated');
    }
  };

  const handleSignUpSuccess = (email: string, name: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      email,
      name,
      lastLogin: 'Just now',
    }));
    showToast(`Account created for ${name}! Welcome aboard.`);
    setMode('authenticated');
  };

  const handleMfaSuccess = () => {
    setCurrentUser((prev) => ({
      ...prev,
      email: pendingUserEmail || prev.email,
      lastLogin: 'Just now',
    }));
    showToast('2FA verification complete. Access granted!');
    setMode('authenticated');
  };

  const handleSocialAuth = (provider: SocialProvider) => {
    const providerNames: Record<SocialProvider, string> = {
      google: 'Google SSO',
      github: 'GitHub OAuth',
      apple: 'Apple ID',
    };
    showToast(`Authenticating via ${providerNames[provider]}...`);
    setTimeout(() => {
      setCurrentUser((prev) => ({
        ...prev,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        email: `user@${provider}-auth.io`,
        lastLogin: 'Just now',
      }));
      showToast(`Connected via ${providerNames[provider]}!`);
      setMode('authenticated');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors duration-200 flex flex-col justify-between font-sans antialiased select-none">
      {/* Top Bar Navigation */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setMode('signin')}>
          <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold">
            <Shield className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="font-bold text-slate-900 dark:text-zinc-100 text-base tracking-tight">
            ApexAuth
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick mode switches */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-slate-200/60 dark:bg-zinc-800 text-xs font-semibold">
            <button
              type="button"
              id="top-signin-tab"
              onClick={() => setMode('signin')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                mode === 'signin'
                  ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 shadow-sm'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              id="top-signup-tab"
              onClick={() => setMode('signup')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 shadow-sm'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            id="theme-toggle-btn"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>
      </header>

      {/* Main Toast Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xl border border-slate-800 dark:border-zinc-200 text-xs font-semibold flex items-center gap-2.5 pointer-events-none"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Layout Container */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-1 flex items-center justify-center">
        {mode === 'authenticated' ? (
          <motion.div
            key="authenticated-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            <AuthenticatedView user={currentUser} onSignOut={() => setMode('signin')} />
          </motion.div>
        ) : (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            {/* Left Column: Brand Hero Banner (Hidden on small mobile, visible on desktop) */}
            <div className="hidden lg:block lg:col-span-6 h-[580px]">
              <BrandHero />
            </div>

            {/* Right Column: Form Container */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="w-full bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-zinc-800/80 shadow-xl shadow-slate-200/50 dark:shadow-none">
                <AnimatePresence mode="wait">
                  {mode === 'signin' && (
                    <motion.div
                      key="signin"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SignInForm
                        onSignInSuccess={handleSignInSuccess}
                        onNavigate={(target) => setMode(target)}
                        onSocialAuth={handleSocialAuth}
                        demoAccount={{ email: currentUser.email, name: currentUser.name }}
                      />
                    </motion.div>
                  )}

                  {mode === 'signup' && (
                    <motion.div
                      key="signup"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SignUpForm
                        onSignUpSuccess={handleSignUpSuccess}
                        onNavigate={(target) => setMode(target)}
                        onSocialAuth={handleSocialAuth}
                      />
                    </motion.div>
                  )}

                  {mode === 'forgot' && (
                    <motion.div
                      key="forgot"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ForgotPasswordForm onNavigate={(target) => setMode(target)} />
                    </motion.div>
                  )}

                  {mode === 'mfa' && (
                    <motion.div
                      key="mfa"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MfaVerification
                        email={pendingUserEmail || currentUser.email}
                        onMfaSuccess={handleMfaSuccess}
                        onNavigate={(target) => setMode(target)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-slate-500 dark:text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-200/60 dark:border-zinc-800/60">
        <p>© 2026 ApexAuth Inc. All rights reserved.</p>

        <div className="flex items-center gap-4">
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:underline">
            Privacy Policy
          </a>
          <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:underline">
            Terms of Service
          </a>
          <a href="#security" onClick={(e) => e.preventDefault()} className="hover:underline">
            Security Overview
          </a>
        </div>
      </footer>
    </div>
  );
}
