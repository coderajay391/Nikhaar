'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Sparkles, Check, ShoppingBag, ArrowRight } from 'lucide-react';

export function GlassSkinFeature() {
  const { products, addToCart, setIsCartDrawerOpen } = useStore();
  const [isBundleAdded, setIsBundleAdded] = useState(false);

  // Products for the 3-step ritual
  const mist = products.find(p => p.id === 'prod-5'); // Rosewater
  const oil = products.find(p => p.id === 'prod-1');  // Kumkumadi
  const cream = products.find(p => p.id === 'prod-2'); // Ceramides

  const handleAddBundle = () => {
    if (mist) addToCart(mist, mist.sizes[0], 1);
    if (oil) addToCart(oil, oil.sizes[0], 1);
    if (cream) addToCart(cream, cream.sizes[0], 1);

    setIsBundleAdded(true);
    setTimeout(() => {
      setIsBundleAdded(false);
      setIsCartDrawerOpen(true);
    }, 1200);
  };

  return (
    <section className="py-16 lg:py-24 bg-[#F7F5F0] border-b border-stone-200/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: High-end Still Photography Showcase */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-xl bg-stone-200">
              <img
                src="/images/glass_skin_collection.jpg"
                alt="Ayurvedic glass skin ritual collection featuring Kannauj damask rosewater, saffron oil, and ceramide cream"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-stone-900/90 text-amber-200 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-md backdrop-blur-sm">
                Curated Ritual
              </div>
            </div>
          </div>

          {/* Right: Step-by-Step Ritual Routine & Bundle CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>3-Step Ayurvedic Ritual</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 tracking-tight leading-tight">
              The Glass Skin Ritual for South Asian Skin.
            </h2>

            <p className="text-sm text-stone-600 leading-relaxed font-normal">
              A meticulously sequenced 3-phase ritual designed to restore cellular hydration, balance epidermal pH, and impart an incandescent, lit-from-within glow without greasiness.
            </p>

            {/* 3 Step Sequence */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">Pure Kannauj Rosewater Hydrosol</h4>
                  <p className="text-xs text-stone-500">Steam-distilled floral water resets skin pH to 5.5 and preps pores.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">Kashmiri Kumkumadi Miraculous Oil</h4>
                  <p className="text-xs text-stone-500">3 drops of saffron elixir target hyperpigmentation and nourish cell walls.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">Barrier Restore 5-Ceramide Cream</h4>
                  <p className="text-xs text-stone-500">Locks in botanicals with bio-identical lipids, preventing moisture loss.</p>
                </div>
              </div>
            </div>

            {/* Bundle Price & Add to Bag */}
            <div className="pt-4 border-t border-stone-200">
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <span className="text-xs text-stone-500 uppercase tracking-wider block">Complete 3-Piece Set</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-stone-900 tabular-nums">₹3,199</span>
                    <span className="text-sm text-stone-400 line-through tabular-nums">₹3,998</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded">
                  Save 20% (₹799 OFF)
                </span>
              </div>

              <button
                onClick={handleAddBundle}
                disabled={isBundleAdded}
                className={`w-full py-3.5 px-6 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                  isBundleAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 text-white shadow-md'
                }`}
              >
                {isBundleAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Bundle Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-amber-200" />
                    <span>Add Full 3-Step Ritual to Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
