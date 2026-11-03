'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';

export function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    subtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    shippingFee,
    finalTotal,
    freeShippingThreshold,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    setCurrentView
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartDrawerOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim());
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="bg-[#FCFBF9] w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-l border-stone-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-900" />
            <h3 className="text-base font-serif font-bold text-stone-900 tracking-wide">
              Your Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-4 bg-amber-50/90 border-b border-amber-200/60 text-xs">
          <div className="flex items-center justify-between font-semibold text-amber-950 mb-1.5">
            {amountToFreeShipping > 0 ? (
              <span>Add ₹{amountToFreeShipping.toLocaleString('en-IN')} more for FREE Express Air Shipping!</span>
            ) : (
              <span className="flex items-center gap-1.5 text-emerald-800">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                🎉 You&apos;ve unlocked FREE Express Air Shipping across India!
              </span>
            )}
            <span className="tabular-nums font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-amber-200/70 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-serif font-medium text-stone-900">
                  Your bag is empty
                </h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Discover our pure Kashmiri saffron serums, barrier-repairing creams, and light sunscreens.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setCurrentView('shop');
                }}
                className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-stone-800 transition-colors"
              >
                Explore Bestsellers
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="flex items-start gap-4 p-3 bg-white rounded-xl border border-stone-200 shadow-sm"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-stone-100 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                        {item.product.brand}
                      </p>
                      <h4 className="text-xs sm:text-sm font-semibold text-stone-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">Size: {item.selectedSize}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                      className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                        className="p-1.5 text-stone-600 hover:text-stone-900"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-stone-900 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                        className="p-1.5 text-stone-600 hover:text-stone-900"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-stone-900 tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-white space-y-4">
            {/* Promo Coupon Form */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="font-semibold uppercase tracking-wider">{appliedCoupon.code}</span>
                    <span className="text-emerald-700">applied (-₹{discountAmount.toLocaleString('en-IN')})</span>
                  </div>
                  <button onClick={removeCoupon} className="text-rose-600 hover:underline font-bold text-[11px]">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. FESTIVE15)"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value.toUpperCase());
                        setCouponError(null);
                      }}
                      className="flex-1 px-3 py-2 text-xs uppercase tracking-wider rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>}
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-1">
              <div className="flex justify-between">
                <span>Bag Subtotal</span>
                <span className="font-semibold text-stone-900 tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Savings</span>
                  <span className="tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Air Shipping</span>
                <span className="font-semibold text-stone-900">
                  {shippingFee === 0 ? <span className="text-emerald-700 uppercase">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-stone-500 text-[11px]">
                <span>Estimated GST (18% inclusive)</span>
                <span className="tabular-nums">₹{Math.round((finalTotal * 18) / 118).toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                <span>Grand Total</span>
                <span className="text-base tabular-nums">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Primary Checkout CTA */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-6 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Proceed to Indian Checkout</span>
              <ArrowRight className="w-4 h-4 text-amber-200" />
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Safe Checkout
              </span>
              <span>·</span>
              <span>UPI / Cards / COD Supported</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
