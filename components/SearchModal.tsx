'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export function SearchModal() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    setSelectedProductId,
    setCurrentView
  } = useStore();

  const [query, setQuery] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.concern.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(query.toLowerCase())
      )
    : products.slice(0, 4); // show trending if empty query

  const handleSelectProduct = (id: string) => {
    setSelectedProductId(id);
    setIsSearchOpen(false);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by ingredient, category (e.g. Saffron, Ceramides, SPF, Acne)..."
            className="flex-1 text-sm sm:text-base font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-5 py-3 bg-stone-50 border-b border-stone-100 flex items-center gap-2 overflow-x-auto text-xs text-stone-600">
          <span className="font-semibold text-stone-400 uppercase text-[10px]">Trending:</span>
          {['Kumkumadi Saffron', 'Ceramide Cream', 'SPF 50 Gel', 'Niacinamide', 'Kannauj Rose'].map(term => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 bg-white border border-stone-200 rounded-md hover:border-stone-900 transition-colors whitespace-nowrap"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-stone-100">
          {results.length === 0 ? (
            <div className="py-12 text-center text-xs text-stone-500">
              No matching formulations found for &quot;{query}&quot;. Try searching for &quot;serum&quot; or &quot;sunscreen&quot;.
            </div>
          ) : (
            results.map(prod => (
              <div
                key={prod.id}
                onClick={() => handleSelectProduct(prod.id)}
                className="py-3 px-3 hover:bg-stone-50 rounded-xl cursor-pointer flex items-center justify-between transition-colors gap-3"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-12 h-12 object-cover rounded-lg border border-stone-200"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                      {prod.category} · {prod.concern}
                    </span>
                    <h4 className="text-sm font-semibold text-stone-900 line-clamp-1">{prod.name}</h4>
                    <p className="text-xs text-stone-500 line-clamp-1">{prod.shortDescription}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-bold text-stone-900 tabular-nums">
                    ₹{prod.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-amber-800 font-semibold block flex items-center gap-1 justify-end">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
