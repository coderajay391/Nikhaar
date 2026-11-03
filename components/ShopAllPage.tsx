'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/ProductCard';
import { Filter, X, SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react';

export function ShopAllPage() {
  const {
    products,
    activeCategoryFilter,
    setActiveCategoryFilter,
    activeConcernFilter,
    setActiveConcernFilter
  } = useStore();

  const [selectedSkinType, setSelectedSkinType] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(3000);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('popularity');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const categories = ['All', 'Serums', 'Moisturizers', 'Sunscreens', 'Face Wash', 'Toners', 'Face Masks', 'Lip Care', 'Haircare', 'Body Care'];
  const concerns = [
    'All',
    'Acne & Pimples',
    'Dark Spots & Pigmentation',
    'Barrier Repair & Dry Skin',
    'Oily & Open Pores',
    'Anti-Aging & Fine Lines',
    'Dullness & Glow'
  ];
  const skinTypes = ['All', 'Oily & Combination', 'Dry to Very Dry', 'Sensitive Skin', 'All Skin Types'];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (activeCategoryFilter !== 'All' && p.category !== activeCategoryFilter) return false;
      // Concern filter
      if (activeConcernFilter !== 'All' && p.concern !== activeConcernFilter) return false;
      // Skin Type filter
      if (selectedSkinType !== 'All' && p.skinType !== selectedSkinType && p.skinType !== 'All Skin Types') return false;
      // Price filter
      if (p.price > priceRange) return false;
      // Rating filter
      if (minRating > 0 && p.rating < minRating) return false;
      // In stock
      if (inStockOnly && !p.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.badge === 'New Launch' ? 1 : 0) - (a.badge === 'New Launch' ? 1 : 0);
      // default popularity
      return b.reviewsCount - a.reviewsCount;
    });
  }, [products, activeCategoryFilter, activeConcernFilter, selectedSkinType, priceRange, minRating, inStockOnly, sortBy]);

  const activeFilterCount =
    (activeCategoryFilter !== 'All' ? 1 : 0) +
    (activeConcernFilter !== 'All' ? 1 : 0) +
    (selectedSkinType !== 'All' ? 1 : 0) +
    (priceRange < 3000 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const handleClearFilters = () => {
    setActiveCategoryFilter('All');
    setActiveConcernFilter('All');
    setSelectedSkinType('All');
    setPriceRange(3000);
    setMinRating(0);
    setInStockOnly(false);
  };

  return (
    <div className="bg-[#FCFBF9] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title & Sorting */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-stone-200 gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-900/80 mb-1">
              Curated Apothecary
            </p>
            <h1 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 tracking-tight">
              {activeCategoryFilter === 'All' ? 'All Formulations' : activeCategoryFilter}
              {activeConcernFilter !== 'All' && ` · ${activeConcernFilter}`}
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Showing {filteredProducts.length} of {products.length} products formulated for Indian climates
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 py-2 px-4 bg-white border border-stone-300 rounded-lg text-xs font-semibold text-stone-800"
            >
              <Filter className="w-4 h-4 text-stone-600" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-medium text-stone-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
              <label htmlFor="sort-select" className="text-stone-400">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none font-semibold text-stone-900 cursor-pointer"
              >
                <option value="popularity">Most Popular & Bestselling</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="newest">Newly Launched</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-6">
            <span className="text-xs text-stone-500">Active Filters:</span>
            {activeCategoryFilter !== 'All' && (
              <span className="text-xs font-medium bg-stone-200 text-stone-900 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                Category: {activeCategoryFilter}
                <button onClick={() => setActiveCategoryFilter('All')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {activeConcernFilter !== 'All' && (
              <span className="text-xs font-medium bg-stone-200 text-stone-900 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                Concern: {activeConcernFilter}
                <button onClick={() => setActiveConcernFilter('All')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedSkinType !== 'All' && (
              <span className="text-xs font-medium bg-stone-200 text-stone-900 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                Skin: {selectedSkinType}
                <button onClick={() => setSelectedSkinType('All')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {priceRange < 3000 && (
              <span className="text-xs font-medium bg-stone-200 text-stone-900 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                Under ₹{priceRange}
                <button onClick={() => setPriceRange(3000)}><X className="w-3 h-3" /></button>
              </span>
            )}
            {minRating > 0 && (
              <span className="text-xs font-medium bg-stone-200 text-stone-900 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                &ge; {minRating}★
                <button onClick={() => setMinRating(0)}><X className="w-3 h-3" /></button>
              </span>
            )}
            <button
              onClick={handleClearFilters}
              className="text-xs font-semibold text-rose-700 hover:underline ml-2"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* 2-Column Layout: Sidebar Filters on Desktop + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm self-start sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2 text-sm font-bold text-stone-900 uppercase tracking-wider">
                <SlidersHorizontal className="w-4 h-4 text-stone-700" />
                <span>Refine Collection</span>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-rose-600 hover:underline font-semibold"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-2.5">
                Botanical Category
              </h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategoryFilter(cat)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      activeCategoryFilter === cat
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[11px] opacity-60">
                      {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Skin Concerns */}
            <div className="pt-4 border-t border-stone-100">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-2.5">
                Skin Concern
              </h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {concerns.map(cn => (
                  <button
                    key={cn}
                    onClick={() => setActiveConcernFilter(cn)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      activeConcernFilter === cn
                        ? 'bg-amber-900 text-white'
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {cn}
                  </button>
                ))}
              </div>
            </div>

            {/* Skin Type */}
            <div className="pt-4 border-t border-stone-100">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-2.5">
                Skin Type
              </h4>
              <div className="space-y-1.5">
                {skinTypes.map(st => (
                  <button
                    key={st}
                    onClick={() => setSelectedSkinType(st)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedSkinType === st
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                  Max Price
                </h4>
                <span className="text-xs font-bold text-stone-900 tabular-nums">
                  ₹{priceRange.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="400"
                max="3000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-stone-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                <span>₹400</span>
                <span>₹3,000</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="pt-4 border-t border-stone-100">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-2">
                Customer Rating
              </h4>
              <div className="flex items-center gap-2">
                {[0, 4.5, 4.8].map(r => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`px-3 py-1 text-xs font-medium rounded-lg border transition-colors ${
                      minRating === r
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                    }`}
                  >
                    {r === 0 ? 'All' : `${r}★ & up`}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                In-Stock Only
              </span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-stone-900 rounded cursor-pointer"
              />
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-2xl border border-stone-200 p-8">
                <Sparkles className="w-10 h-10 text-stone-400 mx-auto mb-3" />
                <h3 className="text-lg font-serif font-medium text-stone-900">
                  No formulations matched your filters
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Try clearing your skin concern or price filters to explore the full collection.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-5 px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-stone-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-xs h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                Filter Formulations
              </h3>
              <button onClick={() => setIsMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-stone-700" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div>
              <h4 className="text-xs font-semibold uppercase text-stone-900 mb-2">Category</h4>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategoryFilter(cat);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded text-xs ${
                      activeCategoryFilter === cat ? 'bg-stone-900 text-white font-semibold' : 'text-stone-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Concerns */}
            <div>
              <h4 className="text-xs font-semibold uppercase text-stone-900 mb-2">Concern</h4>
              <div className="space-y-1">
                {concerns.map(cn => (
                  <button
                    key={cn}
                    onClick={() => {
                      setActiveConcernFilter(cn);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded text-xs ${
                      activeConcernFilter === cn ? 'bg-amber-900 text-white font-semibold' : 'text-stone-700'
                    }`}
                  >
                    {cn}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex gap-2">
              <button
                onClick={handleClearFilters}
                className="flex-1 py-2.5 border border-stone-300 text-stone-700 text-xs font-semibold rounded-lg"
              >
                Clear
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-lg"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
