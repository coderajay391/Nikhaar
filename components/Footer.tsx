'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Heart
} from 'lucide-react';

export function Footer() {
  const { setCurrentView, showToast, setActiveCategoryFilter } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;

    setSubscribed(true);
    showToast('Welcome to the NIKHAAR Circle! Your ₹250 welcome voucher has been emailed.', 'success');
    setNewsletterEmail('');
  };

  const navTo = (view: any, cat = 'All') => {
    setActiveCategoryFilter(cat);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#181615] text-stone-300 border-t border-stone-800 text-xs">
      {/* Newsletter Section */}
      <div className="border-b border-stone-800 py-12 bg-[#1C1A19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-md">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join the Botanical Circle</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                Receive ₹250 Off Your First Luxury Ritual
              </h3>
              <p className="text-stone-400 mt-1 leading-relaxed">
                Be the first to know about seasonal Kashmiri saffron harvests, dermatologist skin masterclasses, and private festive sales.
              </p>
            </div>

            <div className="w-full md:w-auto">
              {subscribed ? (
                <div className="p-3 bg-emerald-950/80 border border-emerald-700/80 rounded-xl text-emerald-300 flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Check your inbox for code &quot;WELCOME250&quot;!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="px-4 py-3 bg-stone-900 border border-stone-700 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 text-xs flex-1"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-white hover:bg-stone-100 text-stone-900 font-bold uppercase tracking-wider rounded-lg transition-colors shrink-0 flex items-center justify-center gap-2"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <h2 className="text-2xl font-serif font-bold tracking-[0.2em] uppercase text-white">
              NIKHAAR
            </h2>
            <p className="text-stone-400 leading-relaxed max-w-sm">
              India&apos;s clean luxury skincare sanctuary. Powered by authentic GI-tagged Kashmiri Saffron, bio-identical ceramides, and clinically proven actives crafted for Indian skin in Indian weather.
            </p>
            <div className="pt-2 text-stone-400 space-y-1">
              <p>Registered Office: Peninsula Business Park, Lower Parel, Mumbai</p>
              <p>Care: care@aurabotanica.in · Toll Free: 1800-209-AURA</p>
            </div>
          </div>

          {/* Shop Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Apothecary
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => navTo('shop', 'Serums')} className="hover:text-white transition-colors">
                  Face Serums
                </button>
              </li>
              <li>
                <button onClick={() => navTo('shop', 'Moisturizers')} className="hover:text-white transition-colors">
                  Barrier Creams
                </button>
              </li>
              <li>
                <button onClick={() => navTo('shop', 'Sunscreens')} className="hover:text-white transition-colors">
                  Zero-Cast SPF 50
                </button>
              </li>
              <li>
                <button onClick={() => navTo('shop', 'Toners')} className="hover:text-white transition-colors">
                  Damask Rose Mists
                </button>
              </li>
              <li>
                <button onClick={() => navTo('shop', 'Face Masks')} className="hover:text-white transition-colors">
                  Royal Ubtan Masks
                </button>
              </li>
              <li>
                <button onClick={() => navTo('shop', 'Haircare')} className="hover:text-white transition-colors">
                  Bhringraj Hair Vitalizer
                </button>
              </li>
            </ul>
          </div>

          {/* Skin Concerns */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Skin Concerns
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => navTo('shop')} className="hover:text-white transition-colors">
                  Dark Spots & Pigmentation
                </button>
              </li>
              <li>
                <button onClick={() => navTo('shop')} className="hover:text-white transition-colors">
                  Active Acne & Blemishes
                </button>
              </li>
              <li>
                <button onClick={() => navTo('shop')} className="hover:text-white transition-colors">
                  Barrier Repair & Stinging
                </button>
              </li>
              <li>
                <button onClick={() => navTo('shop')} className="hover:text-white transition-colors">
                  Oily T-Zone & Open Pores
                </button>
              </li>
              <li>
                <button onClick={() => navTo('routine-quiz')} className="text-amber-300 font-semibold hover:underline">
                  Take Skin Routine Quiz →
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => navTo('order-tracking')} className="hover:text-white transition-colors">
                  Track BlueDart Order
                </button>
              </li>
              <li>
                <button onClick={() => navTo('about')} className="hover:text-white transition-colors">
                  Our Story & Heritage
                </button>
              </li>
              <li>
                <button onClick={() => navTo('faqs')} className="hover:text-white transition-colors">
                  FAQs & Sizing Guides
                </button>
              </li>
              <li>
                <button onClick={() => navTo('policies')} className="hover:text-white transition-colors">
                  Shipping & 15-Day Returns
                </button>
              </li>
              <li>
                <button onClick={() => navTo('contact')} className="hover:text-white transition-colors">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => navTo('admin')} className="text-stone-500 hover:text-stone-300">
                  Operations CMS
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Badges & Regulatory strip */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-stone-400 uppercase tracking-wider">Accepted in India:</span>
            <span className="bg-stone-800 text-stone-300 px-2.5 py-1 rounded">UPI (GPay / PhonePe)</span>
            <span className="bg-stone-800 text-stone-300 px-2.5 py-1 rounded">RuPay</span>
            <span className="bg-stone-800 text-stone-300 px-2.5 py-1 rounded">Visa / Mastercard</span>
            <span className="bg-stone-800 text-stone-300 px-2.5 py-1 rounded">Net Banking</span>
            <span className="bg-stone-800 text-stone-300 px-2.5 py-1 rounded">Cash on Delivery</span>
          </div>

          <div>
            <span>Currency: <strong>INR (₹)</strong> · All 28 States & 8 UTs</span>
          </div>
        </div>

        {/* Legal Copyright */}
        <div className="mt-8 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-600">
          <p>© {new Date().getFullYear()} NIKHAAR Cosmeceuticals Pvt. Ltd. All rights reserved.</p>
          <p>GSTIN: 27AABCA1234F1Z8 · AYUSH License: AYU-MH-2024-9921</p>
        </div>
      </div>
    </footer>
  );
}
