'use client';

import React, { useState } from 'react';
import { useStore, AppView } from '@/context/StoreContext';
import { Search, Heart, ShoppingBag, User, Menu, X, ShieldCheck, Sparkles } from 'lucide-react';

export function Navbar() {
  const {
    currentView,
    setCurrentView,
    cartCount,
    subtotal,
    wishlist,
    setIsCartDrawerOpen,
    setIsSearchOpen,
    setIsAuthModalOpen,
    currentUser,
    logout,
    setActiveCategoryFilter,
    setActiveConcernFilter
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const navigateTo = (view: AppView, catFilter = 'All', concernFilter = 'All') => {
    setActiveCategoryFilter(catFilter);
    setActiveConcernFilter(concernFilter);
    setCurrentView(view);
    setMobileMenuOpen(false);
    setAccountDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FCFBF9]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      {/* Top Festive Announcement Bar */}
      <div className="bg-[#1C1917] text-stone-200 text-xs py-2 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
        <span>
          Festive Offer: 15% OFF with code <strong className="text-amber-300 font-semibold tracking-wider">FESTIVE15</strong> · Free Express Air Shipping on orders over ₹799 across India
        </span>
      </div>

      {/* Main Navigation - 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-950 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="text-2xl sm:text-3xl font-serif font-bold tracking-[0.2em] uppercase text-stone-900 hover:text-stone-700 transition-colors whitespace-nowrap shrink-0 text-left"
          >
            NIKHAAR
          </button>
        </div>

        {/* Zone 2: Single-line Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm tracking-wide font-medium text-stone-700">
          <button
            onClick={() => navigateTo('home')}
            className={`transition-colors whitespace-nowrap hover:text-stone-950 pb-1 ${
              currentView === 'home' ? 'text-stone-950 border-b-2 border-stone-900 font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigateTo('shop', 'All')}
            className={`transition-colors whitespace-nowrap hover:text-stone-950 pb-1 ${
              currentView === 'shop' ? 'text-stone-950 border-b-2 border-stone-900 font-semibold' : ''
            }`}
          >
            Shop All
          </button>
          <button
            onClick={() => navigateTo('shop', 'Serums')}
            className="transition-colors whitespace-nowrap hover:text-stone-950 pb-1"
          >
            Serums
          </button>
          <button
            onClick={() => navigateTo('shop', 'Moisturizers')}
            className="transition-colors whitespace-nowrap hover:text-stone-950 pb-1"
          >
            Moisturizers
          </button>
          <button
            onClick={() => navigateTo('shop', 'Sunscreens')}
            className="transition-colors whitespace-nowrap hover:text-stone-950 pb-1"
          >
            Sun Protection
          </button>
          <button
            onClick={() => navigateTo('blog')}
            className={`transition-colors whitespace-nowrap hover:text-stone-950 pb-1 ${
              currentView === 'blog' ? 'text-stone-950 border-b-2 border-stone-900 font-semibold' : ''
            }`}
          >
            Beauty Journal
          </button>
          <button
            onClick={() => navigateTo('about')}
            className={`transition-colors whitespace-nowrap hover:text-stone-950 pb-1 ${
              currentView === 'about' ? 'text-stone-950 border-b-2 border-stone-900 font-semibold' : ''
            }`}
          >
            Our Story
          </button>
        </nav>

        {/* Zone 3: Actions (Search, Wishlist, Account, Cart) */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Live Search Modal Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors"
            title="Search products"
            aria-label="Search products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => navigateTo('wishlist')}
            className="relative p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors"
            title="Saved to Wishlist"
            aria-label="View wishlist"
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rose-600 fill-rose-600' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-stone-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                if (currentUser) {
                  setAccountDropdownOpen(!accountDropdownOpen);
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors flex items-center gap-1.5"
              title={currentUser ? `Account: ${currentUser.name}` : 'Sign In'}
              aria-label="User Account"
            >
              <User className="w-5 h-5" />
              {currentUser && (
                <span className="hidden xl:inline text-xs font-medium max-w-[80px] truncate text-stone-800">
                  {currentUser.name}
                </span>
              )}
            </button>

            {/* Account Popover Menu */}
            {accountDropdownOpen && currentUser && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-stone-200 py-2 z-50 text-sm">
                <div className="px-4 py-2 border-b border-stone-100">
                  <p className="font-semibold text-stone-900">{currentUser.name}</p>
                  <p className="text-xs text-stone-500 truncate">{currentUser.email}</p>
                  <span className="inline-block mt-1 text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                    Role: {currentUser.role === 'admin' ? 'Store Administrator' : 'VIP Member'}
                  </span>
                </div>

                <button
                  onClick={() => navigateTo('account')}
                  className="w-full text-left px-4 py-2 hover:bg-stone-50 text-stone-700 hover:text-stone-900 transition-colors"
                >
                  My Profile & Addresses
                </button>
                <button
                  onClick={() => navigateTo('order-tracking')}
                  className="w-full text-left px-4 py-2 hover:bg-stone-50 text-stone-700 hover:text-stone-900 transition-colors"
                >
                  Track Recent Orders
                </button>
                <button
                  onClick={() => navigateTo('admin')}
                  className="w-full text-left px-4 py-2 hover:bg-amber-50 text-amber-900 font-medium flex items-center gap-2 transition-colors border-t border-stone-100 mt-1 pt-2"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  Admin CMS Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    setAccountDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 transition-colors border-t border-stone-100 mt-1"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Cart Bag Trigger */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="flex items-center gap-2.5 py-2 px-3.5 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all shadow-sm"
            aria-label="View shopping bag"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-amber-200" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 w-4 h-4 bg-amber-400 text-stone-950 text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold tracking-wide whitespace-nowrap">
              {cartCount === 0 ? 'Bag' : `₹${subtotal.toLocaleString('en-IN')}`}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FCFBF9] px-4 pt-4 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => navigateTo('home')}
              className="text-left py-2 px-3 rounded hover:bg-stone-100 text-stone-800"
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('shop', 'All')}
              className="text-left py-2 px-3 rounded hover:bg-stone-100 text-stone-800"
            >
              Shop All
            </button>
            <button
              onClick={() => navigateTo('shop', 'Serums')}
              className="text-left py-2 px-3 rounded hover:bg-stone-100 text-stone-800"
            >
              Face Serums
            </button>
            <button
              onClick={() => navigateTo('shop', 'Moisturizers')}
              className="text-left py-2 px-3 rounded hover:bg-stone-100 text-stone-800"
            >
              Moisturizers
            </button>
            <button
              onClick={() => navigateTo('shop', 'Sunscreens')}
              className="text-left py-2 px-3 rounded hover:bg-stone-100 text-stone-800"
            >
              SPF Protection
            </button>
            <button
              onClick={() => navigateTo('routine-quiz')}
              className="text-left py-2 px-3 rounded bg-amber-50 text-amber-900 font-semibold"
            >
              Skin Diagnostic Quiz
            </button>
            <button
              onClick={() => navigateTo('blog')}
              className="text-left py-2 px-3 rounded hover:bg-stone-100 text-stone-800"
            >
              Beauty Journal
            </button>
            <button
              onClick={() => navigateTo('about')}
              className="text-left py-2 px-3 rounded hover:bg-stone-100 text-stone-800"
            >
              Our Story
            </button>
            <button
              onClick={() => navigateTo('admin')}
              className="text-left py-2 px-3 rounded bg-stone-100 text-stone-900 font-medium col-span-2 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-stone-700" />
              Open Admin Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
