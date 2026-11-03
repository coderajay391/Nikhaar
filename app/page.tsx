'use client';

import React from 'react';
import { StoreProvider, useStore } from '@/context/StoreContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { CategorySection } from '@/components/CategorySection';
import { BestsellersSection } from '@/components/BestsellersSection';
import { SkinConcernSection } from '@/components/SkinConcernSection';
import { GlassSkinFeature } from '@/components/GlassSkinFeature';
import { ProductDetailPage } from '@/components/ProductDetailPage';
import { ShopAllPage } from '@/components/ShopAllPage';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutPage } from '@/components/CheckoutPage';
import { OrderTrackingPage } from '@/components/OrderTrackingPage';
import { WishlistPage } from '@/components/WishlistPage';
import { UserAccountPage } from '@/components/UserAccountPage';
import { AdminDashboard } from '@/components/AdminDashboard';
import { BlogPage } from '@/components/BlogPage';
import { BlogDetailPage } from '@/components/BlogDetailPage';
import { AboutPage, ContactPage, FaqsPage, PoliciesPage } from '@/components/InformationalPages';
import { SkinQuizModal } from '@/components/SkinQuizModal';
import { SearchModal } from '@/components/SearchModal';
import { AuthModal } from '@/components/AuthModal';
import { ToastContainer } from '@/components/ToastContainer';
import { Star, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

function StorefrontContent() {
  const { currentView, setCurrentView, reviews, products } = useStore();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        {/* Dynamic View Router */}
        {currentView === 'home' && (
          <>
            <HeroSection />
            <CategorySection />
            <BestsellersSection />
            <SkinConcernSection />
            <GlassSkinFeature />

            {/* Authentic Customer Reviews Section on Homepage */}
            <section className="py-16 bg-[#FCFBF9] border-b border-stone-200/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-900/80 mb-2">
                    Verified Experiences
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 tracking-tight">
                    Real Skin Transformations Across India
                  </h2>
                  <p className="text-xs text-stone-500 mt-2">
                    Over 12,000+ five-star reviews from Mumbai, Bengaluru, Delhi NCR, and 200+ cities.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {reviews.slice(0, 4).map(rev => (
                    <div
                      key={rev.id}
                      className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-center gap-1 text-amber-500 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? 'fill-amber-500' : 'fill-stone-200 text-stone-200'
                              }`}
                            />
                          ))}
                        </div>
                        <h4 className="text-sm font-bold text-stone-900">{rev.title}</h4>
                        <p className="text-xs text-stone-600 leading-relaxed mt-1 font-normal">
                          &ldquo;{rev.comment}&rdquo;
                        </p>
                      </div>

                      <div className="pt-3 border-t border-stone-100 text-xs">
                        <strong className="text-stone-900 block font-semibold">{rev.userName}</strong>
                        <span className="text-stone-400 text-[11px] block">{rev.city}</span>
                        {rev.verifiedBuyer && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Buyer
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Diagnostic Routine Quiz Banner CTA */}
            <section className="py-16 bg-[#181615] text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-stone-900 via-[#262220] to-stone-900 border border-stone-800 flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="max-w-xl space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Free Diagnostic Consultation</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
                      Find Your Custom Indian Skin Ritual
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-normal">
                      Take our 60-second diagnostic formulated with certified Ayurvedic Vaidyas and cosmetic chemists to unlock your perfect morning and evening regimen.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentView('routine-quiz');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-lg hover:scale-105 shrink-0 flex items-center gap-2"
                  >
                    <span>Start 60-Second Quiz</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {currentView === 'shop' && <ShopAllPage />}
        {currentView === 'product-detail' && <ProductDetailPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'order-tracking' && <OrderTrackingPage />}
        {currentView === 'wishlist' && <WishlistPage />}
        {currentView === 'account' && <UserAccountPage />}
        {currentView === 'admin' && <AdminDashboard />}
        {currentView === 'blog' && <BlogPage />}
        {currentView === 'blog-detail' && <BlogDetailPage />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'faqs' && <FaqsPage />}
        {currentView === 'policies' && <PoliciesPage />}
        {currentView === 'routine-quiz' && <SkinQuizModal />}
      </main>

      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <SearchModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
}

export default function Home() {
  return (
    <StoreProvider>
      <StorefrontContent />
    </StoreProvider>
  );
}
