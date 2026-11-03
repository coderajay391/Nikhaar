'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/ProductCard';
import { ArrowRight } from 'lucide-react';

export function BestsellersSection() {
  const { products, setCurrentView, setActiveCategoryFilter } = useStore();
  const [activeTab, setActiveTab] = useState<'All' | 'Serums' | 'Moisturizers' | 'Sunscreens'>('All');

  const filteredProducts = products.filter(p => {
    if (activeTab === 'All') return true;
    return p.category === activeTab;
  }).slice(0, 6);

  const handleViewAll = () => {
    setActiveCategoryFilter(activeTab);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-[#FBF9F5] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-900/80 mb-2">
              Loved Across India
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 tracking-tight">
              Iconic Bestsellers
            </h2>
          </div>

          {/* Interactive Filter Tabs (Button elements conforming to §1.A) */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg overflow-x-auto">
            {(['All', 'Serums', 'Moisturizers', 'Sunscreens'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                {tab === 'All' ? 'All Bestsellers' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-900 text-sm font-semibold tracking-wide rounded-full transition-all shadow-sm hover:border-stone-400"
          >
            <span>Explore All {activeTab === 'All' ? 'Formulations' : activeTab}</span>
            <ArrowRight className="w-4 h-4 text-stone-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
