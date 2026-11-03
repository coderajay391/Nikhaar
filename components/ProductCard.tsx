'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/data';
import { useStore } from '@/context/StoreContext';
import { Star, Heart, ShoppingBag, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product }: ProductCardProps) {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProductId,
    setCurrentView
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [isAddedRecently, setIsAddedRecently] = useState<boolean>(false);
  const isWishlisted = isInWishlist(product.id);

  const handleOpenDetail = () => {
    setSelectedProductId(product.id);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1600);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={handleOpenDetail}
      className="group relative bg-white rounded-xl border border-stone-200/90 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Top Media Slot */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Elegant fallback if path ever encounters issues
            (e.target as HTMLImageElement).src = '/images/glass_skin_collection.jpg';
          }}
        />

        {/* Badge (Subtle, single text badge per design guidelines) */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-stone-900/90 text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded">
            {product.badge}
          </span>
        )}

        {/* Wishlist Heart Icon */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-stone-950 shadow-sm backdrop-blur-sm transition-transform hover:scale-110"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? 'text-rose-600 fill-rose-600' : 'text-stone-600'
            }`}
          />
        </button>

        {/* Quick View Overlay on Desktop Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between text-white text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
          <span className="text-amber-200">{product.skinType}</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium uppercase tracking-wider mb-1.5">
            <span>{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-serif font-medium text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Short Benefit / Concern */}
          <p className="text-xs text-stone-500 mt-1 line-clamp-1">
            {product.shortDescription}
          </p>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mt-2.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
            </div>
            <span className="text-xs font-bold text-stone-800 tabular-nums">
              {product.rating}
            </span>
            <span className="text-xs text-stone-400">
              ({product.reviewsCount.toLocaleString('en-IN')})
            </span>
          </div>
        </div>

        {/* Price & Size Stepper / Actions */}
        <div className="mt-4 pt-3 border-t border-stone-100">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-stone-900 tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {product.discountPercent > 0 && (
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Available Sizes selector if > 1 size */}
          {product.sizes.length > 1 && (
            <div
              className="flex items-center gap-1.5 mb-3"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[11px] text-stone-400">Size:</span>
              <div className="flex items-center gap-1">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                      selectedSize === sz
                        ? 'bg-stone-900 text-white font-medium'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Add To Bag Button */}
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`w-full py-2.5 px-4 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all flex items-center justify-center gap-2 ${
              !product.inStock
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                : isAddedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag</span>
              </>
            ) : !product.inStock ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
