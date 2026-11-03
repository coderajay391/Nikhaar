'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { X, Lock, Mail, User, ShieldCheck, Sparkles } from 'lucide-react';

export function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login, setCurrentView } = useStore();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    login(email.trim(), 'customer');
  };

  const handleDemoCustomer = () => {
    login('aanya.sen@example.com', 'customer');
  };

  const handleDemoAdmin = () => {
    login('admin@aurabotanica.in', 'admin');
    setCurrentView('admin');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-900">
              NIKHAAR India
            </p>
            <h3 className="text-xl font-serif font-bold text-stone-900">
              {mode === 'login' ? 'Welcome Back' : 'Create VIP Account'}
            </h3>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/70 text-xs space-y-2">
          <p className="font-semibold text-amber-950 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Instant Demo Sign-In (No registration needed):</span>
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleDemoCustomer}
              className="flex-1 py-1.5 px-2.5 bg-white border border-amber-300 hover:bg-amber-100 text-amber-950 font-semibold rounded-lg text-[11px] transition-colors"
            >
              Sign In as Customer
            </button>
            <button
              type="button"
              onClick={handleDemoAdmin}
              className="flex-1 py-1.5 px-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg text-[11px] transition-colors flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Sign In as Admin</span>
            </button>
          </div>
        </div>

        {/* Traditional Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Diya Sengupta"
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
          >
            {mode === 'login' ? 'Sign In to NIKHAAR' : 'Create Free Account'}
          </button>
        </form>

        <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100">
          {mode === 'login' ? (
            <p>
              Don&apos;t have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-stone-900 font-bold hover:underline"
              >
                Create VIP Account
              </button>
            </p>
          ) : (
            <p>
              Already a member?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-stone-900 font-bold hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
