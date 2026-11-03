'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, Sparkles, Shield, Flame, Droplets, Sun, Moon } from 'lucide-react';

export function SkinConcernSection() {
  const { setActiveConcernFilter, setActiveCategoryFilter, setCurrentView } = useStore();

  const concerns = [
    {
      name: 'Dark Spots & Pigmentation',
      title: 'Dark Spots & Pigmentation',
      desc: 'Target stubborn sun melasma and post-acne marks with Kashmiri Saffron and 2% Alpha Arbutin.',
      icon: Sparkles,
      color: 'bg-amber-50 text-amber-900 border-amber-200'
    },
    {
      name: 'Acne & Pimples',
      title: 'Acne & Active Pimples',
      desc: 'Decongest clogged pores and dissolve blackheads with 2% Encapsulated Salicylic Acid & Australian Tea Tree.',
      icon: Flame,
      color: 'bg-rose-50 text-rose-900 border-rose-200'
    },
    {
      name: 'Barrier Repair & Dry Skin',
      title: 'Barrier Repair & Dry Skin',
      desc: 'Restore lipid matrix and soothe stinging, tight skin with bio-identical 5 ceramides and cica.',
      icon: Shield,
      color: 'bg-emerald-50 text-emerald-900 border-emerald-200'
    },
    {
      name: 'Oily & Open Pores',
      title: 'Oily T-Zone & Enlarged Pores',
      desc: 'Balance excess midday sebum and minimize visible pores with high-purity 10% Niacinamide & Zinc PCA.',
      icon: Droplets,
      color: 'bg-cyan-50 text-cyan-900 border-cyan-200'
    },
    {
      name: 'Dullness & Glow',
      title: 'Dullness & Uneven Tone',
      desc: 'Revitalize tired, pollution-fatigued skin with Kannauj Damask Rose hydrosol and antioxidant botanicals.',
      icon: Sun,
      color: 'bg-orange-50 text-orange-900 border-orange-200'
    },
    {
      name: 'Anti-Aging & Fine Lines',
      title: 'Elasticity & Cellular Renewal',
      desc: 'Boost collagen synthesis and strengthen skin bounce with peptide complexes and Bhringraj infusions.',
      icon: Moon,
      color: 'bg-indigo-50 text-indigo-900 border-indigo-200'
    }
  ];

  const handleSelectConcern = (concernName: string) => {
    setActiveConcernFilter(concernName);
    setActiveCategoryFilter('All');
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-[#FCFBF9] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-900/80 mb-2">
            Targeted Solutions
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 tracking-tight text-balance">
            Shop by Skin Concern
          </h2>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            Formulated specifically for the structural thickness, melanin density, and reactive tendencies of Indian skin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concerns.map(c => {
            const Icon = c.icon;
            return (
              <button
                key={c.name}
                onClick={() => handleSelectConcern(c.name)}
                className="group p-6 bg-white rounded-xl border border-stone-200 hover:border-stone-900 text-left transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-stone-50 group-hover:bg-stone-900 flex items-center justify-center transition-colors mb-4">
                    <Icon className="w-6 h-6 text-stone-800 group-hover:text-amber-200 transition-colors" />
                  </div>
                  <h3 className="text-lg font-serif font-medium text-stone-900 group-hover:text-stone-700 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-900 group-hover:text-amber-800 transition-colors">
                  <span>View Formulations</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
