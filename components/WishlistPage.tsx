'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export function WishlistPage() {
  const {
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    setCurrentView,
    setSelectedProductId,
    setIsCartDrawerOpen
  } = useStore();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    wishlistedProducts.forEach(prod => {
      addToCart(prod, prod.sizes[0], 1);
    });
    setIsCartDrawerOpen(true);
  };

  const handleOpenProduct = (id: string) => {
    setSelectedProductId(id);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FCFBF9] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-stone-200 gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-900/80 mb-1">
              Personal Vault
            </p>
            <h1 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 tracking-tight">
              My Saved Wishlist ({wishlistedProducts.length})
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Curated rituals and formulas saved for your skin routine
            </p>
          </div>

          {wishlistedProducts.length > 0 && (
            <button
              onClick={handleMoveAllToCart}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-sm self-start"
            >
              <ShoppingBag className="w-4 h-4 text-amber-200" />
              <span>Move All to Bag</span>
            </button>
          )}
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-stone-200 p-8 max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-serif font-medium text-stone-900">
              Your Wishlist is Empty
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Explore our best-selling Kashmiri Kumkumadi oils, ceramide creams, and invisible gel sunscreens.
            </p>
            <button
              onClick={() => setCurrentView('shop')}
              className="mt-2 px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-stone-800 transition-colors"
            >
              Explore Formulations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistedProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div
                  className="relative aspect-[4/3] bg-stone-100 cursor-pointer overflow-hidden"
                  onClick={() => handleOpenProduct(product.id)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-2.5 right-2.5 p-2 bg-white/90 hover:bg-white text-rose-600 rounded-full shadow-sm"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleOpenProduct(product.id)}
                  >
                    <p className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
                      {product.category}
                    </p>
                    <h4 className="text-sm font-semibold text-stone-900 line-clamp-1 mt-0.5">
                      {product.name}
                    </h4>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-base font-bold text-stone-900 tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-stone-400 line-through tabular-nums">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex gap-2">
                    <button
                      onClick={() => addToCart(product, product.sizes[0], 1)}
                      className="flex-1 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-200" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
