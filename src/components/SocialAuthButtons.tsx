import React, { useState } from 'react';
import { SocialProvider } from '../types';

interface Props {
  onSocialAuth: (provider: SocialProvider) => void;
  isLoading?: boolean;
}

export const SocialAuthButtons: React.FC<Props> = ({ onSocialAuth, isLoading }) => {
  const [activeProvider, setActiveProvider] = useState<SocialProvider | null>(null);

  const handleAuth = (provider: SocialProvider) => {
    if (isLoading) return;
    setActiveProvider(provider);
    onSocialAuth(provider);
    setTimeout(() => {
      setActiveProvider(null);
    }, 1500);
  };

  return (
    <div className="space-y-3">
      <div className="relative my-4 flex items-center justify-center">
        <div className="w-full border-t border-slate-200 dark:border-zinc-800" />
        <span className="absolute bg-white dark:bg-zinc-900 px-3 text-xs font-medium text-slate-500 dark:text-zinc-400 whitespace-nowrap">
          Or continue with
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        <button
          type="button"
          id="social-auth-google"
          onClick={() => handleAuth('google')}
          disabled={isLoading}
          className="relative inline-flex items-center justify-center px-3 py-2.5 text-xs font-medium text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-slate-950 dark:focus:ring-zinc-300 transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer whitespace-nowrap"
        >
          {activeProvider === 'google' ? (
            <span className="inline-block w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span className="ml-2 font-medium">Google</span>
        </button>

        <button
          type="button"
          id="social-auth-github"
          onClick={() => handleAuth('github')}
          disabled={isLoading}
          className="relative inline-flex items-center justify-center px-3 py-2.5 text-xs font-medium text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-slate-950 dark:focus:ring-zinc-300 transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer whitespace-nowrap"
        >
          {activeProvider === 'github' ? (
            <span className="inline-block w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          )}
          <span className="ml-2 font-medium">GitHub</span>
        </button>

        <button
          type="button"
          id="social-auth-apple"
          onClick={() => handleAuth('apple')}
          disabled={isLoading}
          className="relative inline-flex items-center justify-center px-3 py-2.5 text-xs font-medium text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-slate-950 dark:focus:ring-zinc-300 transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer whitespace-nowrap"
        >
          {activeProvider === 'apple' ? (
            <span className="inline-block w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.13c.64-.78 1.08-1.85.96-2.93-.93.04-2.08.62-2.74 1.4-.59.68-1.1 1.77-.96 2.83 1.04.08 2.11-.52 2.74-1.3" />
            </svg>
          )}
          <span className="ml-2 font-medium">Apple</span>
        </button>
      </div>
    </div>
  );
};
