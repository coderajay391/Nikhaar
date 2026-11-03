'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Check,
  RotateCcw,
  Sparkles,
  ChevronRight,
  MapPin,
  Plus,
  Minus,
  MessageSquare
} from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

export function ProductDetailPage() {
  const {
    selectedProductId,
    products,
    reviews,
    addReview,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCurrentView,
    setIsCartDrawerOpen,
    verifyPincode,
    userPincode,
    pincodeDeliveryInfo
  } = useStore();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [pincodeInput, setPincodeInput] = useState<string>(userPincode || '400050');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'howToUse'>('benefits');

  // Review Form Modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewCity, setNewReviewCity] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  const isWishlisted = isInWishlist(product.id);
  const productReviews = reviews.filter(r => r.productId === product.id);

  // Companion product for "Frequently Bought Together"
  const companionProduct = products.find(p => p.id !== product.id && (p.category === 'Sunscreens' || p.category === 'Moisturizers')) || products[1];

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPincode(pincodeInput)) {
      setPincodeStatus('Available');
    } else {
      setPincodeStatus('Invalid');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddBundle = () => {
    addToCart(product, selectedSize, 1);
    addToCart(companionProduct, companionProduct.sizes[0], 1);
    setIsCartDrawerOpen(true);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    addReview({
      productId: product.id,
      userName: newReviewAuthor.trim(),
      city: newReviewCity.trim() || 'Mumbai, India',
      rating: newReviewRating,
      title: newReviewTitle.trim() || 'Verified Experience',
      comment: newReviewComment.trim(),
      verifiedBuyer: true,
      skinType: 'All Skin Types'
    });

    setIsReviewModalOpen(false);
    setNewReviewAuthor('');
    setNewReviewCity('');
    setNewReviewTitle('');
    setNewReviewComment('');
  };

  return (
    <div className="bg-[#FCFBF9] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-8 font-medium">
          <button onClick={() => setCurrentView('home')} className="hover:text-stone-900 transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <button
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-stone-900 transition-colors"
          >
            {product.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* 2-Column Split: Sticky Gallery Left + Contiguous Purchase Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Product Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-stone-200/80 shadow-sm">
              <img
                src={activeImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {product.badge && (
                <span className="absolute top-4 left-4 bg-stone-900 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded">
                  {product.badge}
                </span>
              )}

              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md backdrop-blur-sm transition-transform hover:scale-110"
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? 'text-rose-600 fill-rose-600' : 'text-stone-600'
                  }`}
                />
              </button>
            </div>

            {/* Thumbnails Row */}
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex items-center gap-3">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === img ? 'border-stone-900 shadow-sm' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Ayurvedic & Dermatological Trust Banner */}
            <div className="p-4 bg-amber-50/70 border border-amber-200/70 rounded-xl flex items-center justify-between text-xs text-amber-950 font-medium">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                <span>100% Certified Ayurvedic Pharmacopoeia Standards · Cold-Processed</span>
              </div>
              <span className="hidden sm:inline text-amber-800/80">Batch: AB-2026/09</span>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm space-y-6">
            <div>
              {/* Brand & Category kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                <span>{product.brand}</span>
                <span aria-hidden="true">·</span>
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-800">{product.skinType}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 leading-snug">
                {product.name}
              </h1>

              {/* Rating & Reviews Jump */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-500'
                          : 'fill-stone-200 text-stone-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-stone-900 tabular-nums">{product.rating}</span>
                <span className="text-xs text-stone-400">·</span>
                <a href="#reviews" className="text-xs text-stone-600 hover:text-stone-900 underline font-medium">
                  {product.reviewsCount.toLocaleString('en-IN')} verified customer reviews
                </a>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/60 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-stone-500 uppercase tracking-wider block mb-1">
                  Inclusive of all Indian taxes (GST 18%)
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-stone-900 tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-base text-stone-400 line-through tabular-nums">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
              {product.discountPercent > 0 && (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Select Volume / Size:
                  </span>
                  <span className="text-xs text-stone-500 font-medium">{selectedSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-4 rounded-lg text-xs font-semibold transition-all border ${
                        selectedSize === size
                          ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                          : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Bag / Buy Now buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-300 rounded-lg p-1 bg-stone-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-stone-600 hover:text-stone-950 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-sm font-semibold text-stone-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-stone-600 hover:text-stone-950 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 py-3.5 px-6 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-200" />
                  <span>Add to Bag</span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full py-3 px-6 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-all shadow-sm"
              >
                Instant Buy Now (Fast Indian Checkout)
              </button>
            </div>

            {/* Indian Pincode Delivery Availability Checker */}
            <div className="pt-4 border-t border-stone-200">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                <MapPin className="w-4 h-4 text-amber-700" />
                <span>Check Delivery & Cash on Delivery (COD)</span>
              </div>

              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit PIN code"
                  className="flex-1 px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors"
                >
                  Verify
                </button>
              </form>

              {pincodeDeliveryInfo && (
                <div className="mt-2.5 p-3 bg-emerald-50/80 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">
                      Delivery available to {pincodeDeliveryInfo.city}, {pincodeDeliveryInfo.state}!
                    </span>
                    <span className="text-emerald-700">
                      Estimated Delivery: within {pincodeDeliveryInfo.days} business days via BlueDart Air Express. Cash on Delivery supported.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Trust highlights */}
            <div className="pt-2 grid grid-cols-2 gap-3 text-xs text-stone-600 border-t border-stone-100">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-stone-800" />
                <span>Free Shipping &gt; ₹799</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-stone-800" />
                <span>15-Day Easy Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-stone-800" />
                <span>100% Authentic Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-stone-800" />
                <span>Cruelty Free & Vegan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Benefits | Key Ingredients | How to Use */}
        <div className="mt-16 bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-4 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('benefits')}
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'benefits'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Key Benefits & Clinical Results
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'ingredients'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Active Ingredients Breakdown
            </button>
            <button
              onClick={() => setActiveTab('howToUse')}
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'howToUse'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Application Ritual (AM/PM)
            </button>
          </div>

          {activeTab === 'benefits' && (
            <div className="space-y-6">
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                {product.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {product.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200/60">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-stone-800">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.keyIngredients.map((item, i) => (
                  <div key={i} className="p-4 bg-stone-50 rounded-xl border border-stone-200/80">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-stone-900">{item.name}</h4>
                      {item.percentage && (
                        <span className="text-xs font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                          {item.percentage}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-600">{item.purpose}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-stone-100/60 rounded-xl border border-stone-200 text-xs text-stone-600">
                <strong className="text-stone-900 block mb-1">Full Transparent INCI Declaration:</strong>
                <p className="leading-relaxed">{product.ingredientsList}</p>
              </div>
            </div>
          )}

          {activeTab === 'howToUse' && (
            <div className="space-y-4">
              <p className="text-sm text-stone-700">Follow this recommended Ayurvedic-clinical sequence for maximum absorption:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {product.howToUse.map((step, idx) => (
                  <div key={idx} className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col justify-between">
                    <span className="w-7 h-7 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center mb-3">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-stone-700 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Frequently Bought Together Bundle */}
        <div className="mt-12 bg-[#FBF9F5] rounded-2xl border border-stone-200 p-6 sm:p-8">
          <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">
            Frequently Bought Together
          </h3>
          <p className="text-xs text-stone-500 mb-6">
            Pair with daily sun protection for maximum barrier recovery and zero dark spots.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover border border-stone-200"
                />
                <div>
                  <p className="text-xs font-semibold text-stone-900 max-w-[180px] truncate">{product.name}</p>
                  <p className="text-xs text-stone-600 font-bold tabular-nums">₹{product.price}</p>
                </div>
              </div>

              <Plus className="w-5 h-5 text-stone-400" />

              <div className="flex items-center gap-3">
                <img
                  src={companionProduct.image}
                  alt={companionProduct.name}
                  className="w-16 h-16 rounded-lg object-cover border border-stone-200"
                />
                <div>
                  <p className="text-xs font-semibold text-stone-900 max-w-[180px] truncate">{companionProduct.name}</p>
                  <p className="text-xs text-stone-600 font-bold tabular-nums">₹{companionProduct.price}</p>
                </div>
              </div>
            </div>

            <div className="text-right flex items-center gap-4">
              <div>
                <span className="text-xs text-stone-500 block">Bundle Price (Save 15%):</span>
                <span className="text-xl font-bold text-stone-900 tabular-nums">
                  ₹{Math.round((product.price + companionProduct.price) * 0.85).toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-stone-400 line-through ml-2 tabular-nums">
                  ₹{(product.price + companionProduct.price).toLocaleString('en-IN')}
                </span>
              </div>
              <button
                onClick={handleAddBundle}
                className="py-2.5 px-5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap"
              >
                Add Both to Bag
              </button>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div id="reviews" className="mt-16 pt-8 border-t border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900">
                Customer Testimonials
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Authentic experiences from verified Indian customers
              </p>
            </div>

            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="inline-flex items-center gap-2 py-2.5 px-5 bg-stone-900 text-white rounded-lg text-xs font-semibold tracking-wider uppercase hover:bg-stone-800 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-amber-200" />
              <span>Write a Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productReviews.length === 0 ? (
              <div className="col-span-2 py-10 text-center text-sm text-stone-500 bg-white rounded-xl border border-stone-200">
                No reviews yet for this product. Be the first to share your experience!
              </div>
            ) : (
              productReviews.map(r => (
                <div key={r.id} className="p-6 bg-white rounded-xl border border-stone-200/90 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < r.rating ? 'fill-amber-500' : 'fill-stone-200 text-stone-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-stone-400">{r.date}</span>
                  </div>

                  <h4 className="text-sm font-bold text-stone-900">{r.title}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">{r.comment}</p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <div>
                      <strong className="text-stone-900 font-semibold">{r.userName}</strong>
                      <span className="text-stone-400 ml-1">· {r.city}</span>
                    </div>
                    {r.verifiedBuyer && (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" /> Verified Buyer
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Related Products Carousel */}
        <div className="mt-16 pt-8 border-t border-stone-200">
          <h3 className="text-2xl font-serif font-medium text-stone-900 mb-6">
            Complete Your Daily Routine
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter(p => p.id !== product.id)
              .slice(0, 3)
              .map(rel => (
                <ProductCard key={rel.id} product={rel} />
              ))}
          </div>
        </div>
      </div>

      {/* Write a Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4">
            <h3 className="text-xl font-serif font-medium text-stone-900">
              Review &quot;{product.name}&quot;
            </h3>
            <p className="text-xs text-stone-500">
              Your honest feedback helps fellow skincare enthusiasts choose the right ritual.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Rating:
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(st => (
                    <button
                      type="button"
                      key={st}
                      onClick={() => setNewReviewRating(st)}
                      className="p-1 text-amber-500 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          st <= newReviewRating ? 'fill-amber-500' : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-stone-800 ml-2">
                    {newReviewRating} / 5 Stars
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Diya Sengupta"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={newReviewCity}
                    onChange={(e) => setNewReviewCity(e.target.value)}
                    placeholder="e.g. Bengaluru, Karnataka"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Review Headline *
                </label>
                <input
                  type="text"
                  required
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="e.g. Cleared my summer pigmentation!"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Your Detailed Experience *
                </label>
                <textarea
                  required
                  rows={4}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Share texture, absorption, how long you used it, and changes observed on your skin..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors"
                >
                  Submit Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
