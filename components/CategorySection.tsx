'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Sparkles, Sun, Droplet, Wind, ShieldAlert, Heart, Scissors, Smile, Layers } from 'lucide-react';

export function CategorySection() {
  const { setActiveCategoryFilter, setCurrentView, products } = useStore();

  const categories = [
    { name: 'Serums', label: 'Face Serums', count: products.filter(p => p.category === 'Serums').length, icon: Sparkles, desc: 'Targeted actives & elixirs' },
    { name: 'Moisturizers', label: 'Moisturizers', count: products.filter(p => p.category === 'Moisturizers').length, icon: Droplet, desc: 'Ceramide creams & barrier gels' },
    { name: 'Sunscreens', label: 'Sunscreens', count: products.filter(p => p.category === 'Sunscreens').length, icon: Sun, desc: 'Ultra-light zero-cast SPF 50' },
    { name: 'Face Wash', label: 'Face Wash', count: products.filter(p => p.category === 'Face Wash').length, icon: Wind, desc: 'Gentle BHA & clarifying foam' },
    { name: 'Toners', label: 'Pure Hydrosols', count: products.filter(p => p.category === 'Toners').length, icon: Droplet, desc: 'Kannauj steam-distilled mist' },
    { name: 'Face Masks', label: 'Ubtan & Clay', count: products.filter(p => p.category === 'Face Masks').length, icon: Layers, desc: 'Sandalwood & turmeric glow' },
    { name: 'Lip Care', label: 'Lip Treatments', count: products.filter(p => p.category === 'Lip Care').length, icon: Smile, desc: 'Desi ghee & peptide butters' },
    { name: 'Haircare', label: 'Hair Vitalizers', count: products.filter(p => p.category === 'Haircare').length, icon: Scissors, desc: 'Bhringraj & rosemary infusions' },
    { name: 'Body Care', label: 'Body Soufflés', count: products.filter(p => p.category === 'Body Care').length, icon: Heart, desc: 'Whipped shea & cardamom' },
  ];

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategoryFilter(categoryName);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-[#FCFBF9] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-900/80 mb-2">
              Curated Formulations
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 tracking-tight">
              Shop by Botanical Category
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveCategoryFilter('All');
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-3 sm:mt-0 text-sm font-semibold text-stone-900 hover:text-amber-800 transition-colors underline underline-offset-4"
          >
            View All Categories ({products.length} Products)
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className="group p-5 bg-white rounded-xl border border-stone-200 hover:border-stone-900 transition-all text-left flex flex-col justify-between hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-lg bg-stone-50 group-hover:bg-stone-900 flex items-center justify-center transition-colors mb-4">
                  <Icon className="w-5 h-5 text-stone-700 group-hover:text-amber-200 transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-900 group-hover:text-stone-950 transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-[12px] text-stone-500 mt-0.5 line-clamp-1">{cat.desc}</p>
                  <span className="text-[11px] font-medium text-amber-900/80 mt-2 inline-block">
                    {cat.count} items →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
