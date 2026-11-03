'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, Sparkles, Shield, Droplets, Leaf } from 'lucide-react';

export function HeroSection() {
  const { setCurrentView, setActiveCategoryFilter } = useStore();

  const handleShopNow = () => {
    setActiveCategoryFilter('All');
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuiz = () => {
    setCurrentView('routine-quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#FBF9F5] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-amber-900/80 uppercase">
              <span>Pure Botanical Chemistry</span>
              <span aria-hidden="true">·</span>
              <span>Formulated for Indian Skin</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-stone-900 leading-[1.12] tracking-tight text-balance">
              Your Skin Deserves Pure Botanical Science.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl font-normal">
              Infused with genuine GI-tagged Kashmiri Saffron, 5-ceramide barrier restoration complexes, and ultra-light zero-cast SPF filters. Scientifically crafted to thrive in India&apos;s heat, humidity, and high UV climate.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={handleShopNow}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold tracking-wide rounded-full transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <span>Shop Bestsellers</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleStartQuiz}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-900 text-sm font-semibold tracking-wide rounded-full border border-stone-300 transition-all hover:border-stone-400"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Take Skin Routine Quiz</span>
              </button>
            </div>

            {/* Quick Micro Proof Bar */}
            <div className="pt-4 flex items-center gap-6 text-xs text-stone-500 font-medium">
              <div>
                <strong className="text-stone-900 font-bold block text-sm">4.9 ★</strong>
                <span>12,000+ Indian reviews</span>
              </div>
              <div className="h-7 w-[1px] bg-stone-200" />
              <div>
                <strong className="text-stone-900 font-bold block text-sm">100%</strong>
                <span>Zero white-cast guarantee</span>
              </div>
              <div className="h-7 w-[1px] bg-stone-200" />
              <div>
                <strong className="text-stone-900 font-bold block text-sm">48h</strong>
                <span>Express dispatch across India</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] shadow-2xl bg-stone-100">
              {/* Main Campaign Image */}
              <img
                src="/images/hero_campaign.jpg"
                alt="Radiant Indian woman with glowing glass skin holding Kashmiri saffron serum bottle"
                className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Editorial Caption Tag */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-white/40 shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-900">
                    Featured Ritual
                  </span>
                  <p className="text-sm font-semibold text-stone-900">Kashmiri Kumkumadi Miraculous Elixir</p>
                  <p className="text-xs text-stone-600">26 Ayurvedic Herbs · Handpicked Mongra Saffron</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-400 line-through">₹2,499</span>
                  <p className="text-sm font-bold text-stone-900 tabular-nums">₹1,899</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Certifications Strip */}
      <div className="border-t border-stone-200/80 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Authentic Ayurveda</h4>
                <p className="text-xs text-stone-500">AYUSH Certified Actives</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5 text-stone-800" />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Clinical Efficacy</h4>
                <p className="text-xs text-stone-500">Bio-Identical Ceramides & BHA</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-stone-800" />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Zero White Cast</h4>
                <p className="text-xs text-stone-500">Tested on Indian Fitzpatrick III-VI</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Fast India Delivery</h4>
                <p className="text-xs text-stone-500">Free Express Air above ₹799</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
