'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Sparkles, Check, ArrowRight, RotateCcw, ShoppingBag } from 'lucide-react';

export function SkinQuizModal() {
  const { setCurrentView, products, addToCart, setIsCartDrawerOpen } = useStore();

  const [step, setStep] = useState<number>(1);
  const [skinType, setSkinType] = useState<string>('Combination');
  const [climate, setClimate] = useState<string>('High Coastal Humidity (Mumbai, Chennai, Kolkata)');
  const [primaryConcern, setPrimaryConcern] = useState<string>('Dullness & Dark Spots');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Recommended products based on quiz answers
  const recommendedSerum = primaryConcern === 'Acne & Active Pimples'
    ? products.find(p => p.id === 'prod-4') || products[0]
    : products.find(p => p.id === 'prod-1') || products[0];

  const recommendedMoisturizer = products.find(p => p.id === 'prod-2') || products[1];
  const recommendedSunscreen = products.find(p => p.id === 'prod-3') || products[2];

  const handleAddAllRecommendations = () => {
    addToCart(recommendedSerum, recommendedSerum.sizes[0], 1);
    addToCart(recommendedMoisturizer, recommendedMoisturizer.sizes[0], 1);
    addToCart(recommendedSunscreen, recommendedSunscreen.sizes[0], 1);
    setIsCartDrawerOpen(true);
    setCurrentView('shop');
  };

  const handleReset = () => {
    setStep(1);
    setIsCompleted(false);
  };

  return (
    <div className="bg-[#FCFBF9] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Ayurvedic & Clinical Diagnostic</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Discover Your 3-Step Indian Skin Ritual
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-lg mx-auto">
            Answer 3 quick questions about your skin texture and Indian climate to receive an accurate, dermatologist-reviewed daily regimen.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-10 shadow-sm">
          {!isCompleted ? (
            <div className="space-y-8">
              {/* Progress Steps Indicator */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Step {step} of 3
                </span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map(st => (
                    <span
                      key={st}
                      className={`h-1.5 rounded-full transition-all ${
                        st === step ? 'w-8 bg-stone-900' : st < step ? 'w-4 bg-emerald-600' : 'w-4 bg-stone-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step 1: Skin Type */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-semibold text-stone-900">
                    1. How does your skin feel 2 hours after washing your face?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      { label: 'Oily & Shiny all over', val: 'Oily', desc: 'Frequent breakouts, visible enlarged pores' },
                      { label: 'Oily T-Zone with normal cheeks', val: 'Combination', desc: 'Midday nose shine, balanced cheeks' },
                      { label: 'Tight, dry, or slightly flaky', val: 'Dry', desc: 'Needs immediate heavy moisturizer' },
                      { label: 'Red, stinging, or sensitized', val: 'Sensitive', desc: 'Easily irritated by new products' }
                    ].map(opt => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => {
                          setSkinType(opt.val);
                          setStep(2);
                        }}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          skinType === opt.val
                            ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                            : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                        }`}
                      >
                        <span className="text-sm font-bold block">{opt.label}</span>
                        <span className="text-xs opacity-75 mt-1 block">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Climate */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-semibold text-stone-900">
                    2. Which Indian climate describes your current living environment?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      { label: 'High Coastal Humidity', val: 'Humidity', desc: 'Mumbai, Kolkata, Chennai, Goa — sweat & excess oil' },
                      { label: 'Dry Extreme Weather / AC', val: 'Dry Climate', desc: 'Delhi NCR, Punjab, Bengaluru AC offices — dehydrated skin' },
                      { label: 'Intense Sun & High UV', val: 'High UV', desc: 'Rajasthan, Gujarat, Deccan plateau — prone to tanning' },
                      { label: 'Moderate / Mountainous', val: 'Moderate', desc: 'Pune, Dehradun, Hills — balanced weather' }
                    ].map(opt => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => {
                          setClimate(opt.val);
                          setStep(3);
                        }}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          climate === opt.val
                            ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                            : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                        }`}
                      >
                        <span className="text-sm font-bold block">{opt.label}</span>
                        <span className="text-xs opacity-75 mt-1 block">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Main Goal */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-semibold text-stone-900">
                    3. What is your #1 skincare goal right now?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      { label: 'Fade Dark Spots & Reveal Glow', val: 'Dullness & Dark Spots', desc: 'Clear stubborn pigmentation & attain glass skin' },
                      { label: 'Clear Acne & Unclog Pores', val: 'Acne & Active Pimples', desc: 'Banish blackheads & regulate midday sebum' },
                      { label: 'Repair Damaged Skin Barrier', val: 'Barrier Repair', desc: 'Heal stinging, irritation & moisture depletion' },
                      { label: 'Anti-Aging & Firmness', val: 'Anti-Aging', desc: 'Boost cellular elasticity & smooth fine lines' }
                    ].map(opt => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => {
                          setPrimaryConcern(opt.val);
                          setIsCompleted(true);
                        }}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          primaryConcern === opt.val
                            ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                            : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                        }`}
                      >
                        <span className="text-sm font-bold block">{opt.label}</span>
                        <span className="text-xs opacity-75 mt-1 block">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Back button if step > 1 */}
              {step > 1 && (
                <div className="pt-4 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="text-xs font-semibold text-stone-500 hover:text-stone-900"
                  >
                    ← Back to Previous Question
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-950 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Diagnostic Complete: Formulated for {skinType} Skin under {climate} conditions.</span>
                </div>
                <button
                  onClick={handleReset}
                  className="text-emerald-800 font-bold hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake
                </button>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                  Your Prescribed 3-Step Daily Ritual
                </h3>
                <p className="text-xs text-stone-500 mb-6">
                  Sequenced for maximum cellular bioavailability and zero pores congestion.
                </p>

                <div className="space-y-4">
                  {/* Step 1 Serum */}
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-stone-200 bg-stone-50">
                    <span className="w-7 h-7 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      1
                    </span>
                    <img src={recommendedSerum.image} alt={recommendedSerum.name} className="w-14 h-14 object-cover rounded-lg border border-stone-200" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">Active Treatment</span>
                      <h4 className="text-sm font-bold text-stone-900 truncate">{recommendedSerum.name}</h4>
                      <p className="text-xs text-stone-500">{recommendedSerum.shortDescription}</p>
                    </div>
                    <span className="font-bold text-stone-900 tabular-nums text-sm">₹{recommendedSerum.price}</span>
                  </div>

                  {/* Step 2 Moisturizer */}
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-stone-200 bg-stone-50">
                    <span className="w-7 h-7 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      2
                    </span>
                    <img src={recommendedMoisturizer.image} alt={recommendedMoisturizer.name} className="w-14 h-14 object-cover rounded-lg border border-stone-200" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">Lipid Barrier Lock</span>
                      <h4 className="text-sm font-bold text-stone-900 truncate">{recommendedMoisturizer.name}</h4>
                      <p className="text-xs text-stone-500">{recommendedMoisturizer.shortDescription}</p>
                    </div>
                    <span className="font-bold text-stone-900 tabular-nums text-sm">₹{recommendedMoisturizer.price}</span>
                  </div>

                  {/* Step 3 Sunscreen */}
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-stone-200 bg-stone-50">
                    <span className="w-7 h-7 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      3
                    </span>
                    <img src={recommendedSunscreen.image} alt={recommendedSunscreen.name} className="w-14 h-14 object-cover rounded-lg border border-stone-200" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">Photostable Shield</span>
                      <h4 className="text-sm font-bold text-stone-900 truncate">{recommendedSunscreen.name}</h4>
                      <p className="text-xs text-stone-500">{recommendedSunscreen.shortDescription}</p>
                    </div>
                    <span className="font-bold text-stone-900 tabular-nums text-sm">₹{recommendedSunscreen.price}</span>
                  </div>
                </div>
              </div>

              {/* Bundle Checkout Box */}
              <div className="p-6 bg-stone-100 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-stone-500 uppercase tracking-wider block">Bundle Price (Save 15%):</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-stone-900 tabular-nums">
                      ₹{Math.round((recommendedSerum.price + recommendedMoisturizer.price + recommendedSunscreen.price) * 0.85).toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-400 line-through tabular-nums">
                      ₹{(recommendedSerum.price + recommendedMoisturizer.price + recommendedSunscreen.price).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleAddAllRecommendations}
                  className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-200" />
                  <span>Add Prescribed Routine to Bag</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
