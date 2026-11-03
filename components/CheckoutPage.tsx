'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { INDIAN_STATES, lookupIndianPincode } from '@/lib/data';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Smartphone
} from 'lucide-react';

export function CheckoutPage() {
  const {
    cart,
    subtotal,
    discountAmount,
    shippingFee,
    codFee,
    finalTotal,
    appliedCoupon,
    createOrder,
    setCurrentView,
    currentUser,
    userPincode,
    showToast
  } = useStore();

  // Form Fields
  const [fullName, setFullName] = useState(currentUser?.name || 'Aanya Sen');
  const [email, setEmail] = useState(currentUser?.email || 'aanya.sen@example.com');
  const [phone, setPhone] = useState('9820144512');
  const [addressLine1, setAddressLine1] = useState('Flat 402, Sea Crest Apartments');
  const [addressLine2, setAddressLine2] = useState('Pali Hill, Bandra West');
  const [landmark, setLandmark] = useState('Near Carter Road Promenade');
  const [pincode, setPincode] = useState(userPincode || '400050');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Razorpay' | 'Card' | 'COD'>('UPI');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('gpay');
  const [upiId, setUpiId] = useState('aanya@okaxis');

  // Card details (for Card option)
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('•••');

  // Errors & Processing
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState<boolean>(false);

  // Handle Pincode Auto-Fill
  const handlePincodeChange = (pin: string) => {
    const clean = pin.replace(/\D/g, '').slice(0, 6);
    setPincode(clean);
    if (clean.length === 6) {
      const match = lookupIndianPincode(clean);
      if (match) {
        setCity(match.city);
        if (INDIAN_STATES.includes(match.state)) {
          setState(match.state);
        }
      }
    }
  };

  const validateIndianPhone = (ph: string) => {
    const cleaned = ph.replace(/\D/g, '');
    return /^[6-9]\d{9}$/.test(cleaned);
  };

  const handlePlaceOrder = (overrideTxnId?: string) => {
    setErrorMsg(null);

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address for your GST tax invoice.');
      return;
    }
    if (!validateIndianPhone(phone)) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
      return;
    }
    if (!addressLine1.trim()) {
      setErrorMsg('Please enter your flat, house number, and street address.');
      return;
    }
    if (pincode.length !== 6) {
      setErrorMsg('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    if (cart.length === 0) {
      setErrorMsg('Your shopping bag is empty.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const placedOrder = createOrder({
        customer: {
          fullName,
          email,
          phone: `+91 ${phone.replace(/\D/g, '')}`
        },
        shippingAddress: {
          addressLine1,
          addressLine2,
          landmark,
          city,
          state,
          pincode
        },
        paymentMethod: paymentMethod === 'Card' ? 'Razorpay' : paymentMethod,
        transactionId: overrideTxnId
      });

      setIsProcessing(false);
      showToast('Order confirmed! We have initiated express air dispatch.', 'success');
      setCurrentView('order-tracking');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#FCFBF9] min-h-screen py-16 text-center">
        <div className="max-w-md mx-auto p-8 bg-white rounded-2xl border border-stone-200">
          <h2 className="text-xl font-serif font-bold text-stone-900 mb-2">No Items in Your Bag</h2>
          <p className="text-xs text-stone-500 mb-6">
            Add your favorite Ayurvedic and clinical formulations before proceeding to checkout.
          </p>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
          >
            Explore Formulations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFBF9] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6 font-medium">
          <span>Bag</span>
          <span>→</span>
          <span className="text-stone-900 font-bold">Secure Indian Checkout</span>
          <span>→</span>
          <span>Order Confirmation & GST Invoice</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form Details & Payment */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Customer & Mobile Verification */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2 text-sm font-bold text-stone-900 uppercase tracking-wider">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center">
                    1
                  </span>
                  <span>Contact Information (For Order SMS & WhatsApp Updates)</span>
                </div>
                <span className="text-xs text-emerald-700 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> 256-bit Encrypted
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aanya Sen"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Email Address (For GST Invoice) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. aanya.sen@example.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Indian Mobile Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-xs font-semibold text-stone-700 bg-stone-100 border border-r-0 border-stone-300 rounded-l-lg">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="10-digit mobile number"
                      className="flex-1 px-3.5 py-2.5 text-xs rounded-r-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900 tabular-nums"
                    />
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1">
                    BlueDart express delivery OTP & real-time dispatch alerts will be sent here.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
              <div className="border-b border-stone-100 pb-3 flex items-center gap-2 text-sm font-bold text-stone-900 uppercase tracking-wider">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center">
                  2
                </span>
                <span>Shipping Address (Across India)</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Flat / House No. / Building Name / Street *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="e.g. Flat 402, Sea Crest Apartments"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Area / Colony / Street
                    </label>
                    <input
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      placeholder="e.g. Pali Hill, Bandra West"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Near Carter Road Promenade"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      placeholder="e.g. 400050"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900 tabular-nums font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      City / District *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Mumbai"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      State / UT *
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white"
                    >
                      {INDIAN_STATES.map(st => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Options (UPI / Razorpay / COD) */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
              <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-stone-900 uppercase tracking-wider">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center">
                    3
                  </span>
                  <span>Payment Method (Indian Rupee ₹)</span>
                </div>
                <span className="text-xs text-stone-400">Zero Transaction Fees</span>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-3.5 rounded-xl border text-center transition-all ${
                    paymentMethod === 'UPI'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                      : 'border-stone-200 bg-stone-50 text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mx-auto mb-1.5" />
                  <span className="text-xs font-bold block">Instant UPI</span>
                  <span className="text-[10px] opacity-75">GPay, PhonePe, QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Razorpay')}
                  className={`p-3.5 rounded-xl border text-center transition-all ${
                    paymentMethod === 'Razorpay'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                      : 'border-stone-200 bg-stone-50 text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1.5" />
                  <span className="text-xs font-bold block">Razorpay</span>
                  <span className="text-[10px] opacity-75">Cards & NetBanking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`p-3.5 rounded-xl border text-center transition-all ${
                    paymentMethod === 'Card'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                      : 'border-stone-200 bg-stone-50 text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  <Lock className="w-5 h-5 mx-auto mb-1.5" />
                  <span className="text-xs font-bold block">Credit/Debit</span>
                  <span className="text-[10px] opacity-75">Visa, RuPay, MC</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-3.5 rounded-xl border text-center transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                      : 'border-stone-200 bg-stone-50 text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  <Truck className="w-5 h-5 mx-auto mb-1.5" />
                  <span className="text-xs font-bold block">Cash on Delivery</span>
                  <span className="text-[10px] opacity-75">Pay at Doorstep</span>
                </button>
              </div>

              {/* UPI Sub-View */}
              {paymentMethod === 'UPI' && (
                <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-4">
                  <div className="flex items-center gap-3">
                    {(['gpay', 'phonepe', 'paytm', 'qr'] as const).map(app => (
                      <button
                        key={app}
                        type="button"
                        onClick={() => setSelectedUpiApp(app)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                          selectedUpiApp === app
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                        }`}
                      >
                        {app === 'qr' ? 'Dynamic QR Code' : app}
                      </button>
                    ))}
                  </div>

                  {selectedUpiApp === 'qr' ? (
                    <div className="text-center p-4 bg-white rounded-xl border border-stone-200 max-w-xs mx-auto space-y-3">
                      <div className="w-36 h-36 mx-auto bg-stone-100 border border-stone-300 rounded-lg flex items-center justify-center p-2">
                        <QrCode className="w-28 h-28 text-stone-900" />
                      </div>
                      <p className="text-xs text-stone-600 font-medium">
                        Scan with Google Pay, PhonePe, or BHIM to pay <strong className="text-stone-900">₹{finalTotal.toLocaleString('en-IN')}</strong>
                      </p>
                      <span className="text-[11px] text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full font-bold">
                        VPA: aurabotanica@icici
                      </span>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                        Enter UPI VPA ID
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. mobile@okhdfcbank or user@ybl"
                          className="flex-1 px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                        />
                      </div>
                      <p className="text-[11px] text-stone-400 mt-1">
                        A payment authorization request will be sent to your {selectedUpiApp.toUpperCase()} app.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Razorpay Sub-View */}
              {paymentMethod === 'Razorpay' && (
                <div className="p-5 rounded-xl bg-blue-50/60 border border-blue-200 space-y-3 text-xs text-blue-950">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <ShieldCheck className="w-5 h-5 text-blue-700" />
                    <span>Razorpay Standard Gateway</span>
                  </div>
                  <p>
                    Supports all Indian Banks (HDFC, ICICI, SBI, Axis, Kotak), RuPay cards, CRED, and Wallets.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowRazorpayModal(true)}
                    className="mt-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold transition-colors"
                  >
                    Launch Razorpay Simulated Modal Window
                  </button>
                </div>
              )}

              {/* Card Sub-View */}
              {paymentMethod === 'Card' && (
                <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Cash on Delivery Sub-View */}
              {paymentMethod === 'COD' && (
                <div className="p-5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <Truck className="w-5 h-5 text-amber-800" />
                    <span>Pay with Cash or UPI upon Doorstep Delivery</span>
                  </div>
                  <p className="text-amber-900 leading-relaxed">
                    Our BlueDart delivery executive will carry a mobile POS for QR/Cash payment. Please keep exact change or UPI ready. Zero extra COD fee during festive season.
                  </p>
                </div>
              )}
            </div>

            {/* Error Message if any */}
            {errorMsg && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary & Place Order CTA */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm space-y-6 sticky top-28">
            <h3 className="text-base font-serif font-bold text-stone-900 tracking-wide border-b border-stone-100 pb-3">
              Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
            </h3>

            {/* Items Mini List */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg border border-stone-200"
                    />
                    <div>
                      <p className="font-semibold text-stone-900 max-w-[170px] truncate">{item.product.name}</p>
                      <p className="text-stone-400">Qty: {item.quantity} · {item.selectedSize}</p>
                    </div>
                  </div>
                  <span className="font-bold text-stone-900 tabular-nums">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-stone-900 tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Festive Coupon ({appliedCoupon?.code})</span>
                  <span className="tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>BlueDart Express Air Shipping</span>
                <span className="font-semibold text-stone-900">
                  {shippingFee === 0 ? <span className="text-emerald-700 font-bold uppercase">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between text-stone-500 text-[11px]">
                <span>Taxes (CGST 9% + SGST 9% Included)</span>
                <span className="tabular-nums">₹{Math.round((finalTotal * 18) / 118).toLocaleString('en-IN')}</span>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-between text-base font-bold text-stone-900">
                <span>Total Payable Amount</span>
                <span className="text-xl tabular-nums">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Primary Order Action Button */}
            <button
              onClick={() => handlePlaceOrder()}
              disabled={isProcessing}
              className="w-full py-4 px-6 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Securing Payment & Booking Air Dispatch...</span>
              ) : (
                <>
                  <span>Confirm Order · ₹{finalTotal.toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4 text-amber-200" />
                </>
              )}
            </button>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-500 space-y-1">
              <p className="flex items-center gap-1 font-semibold text-stone-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Tax Invoice with GSTIN Generated Instantly
              </p>
              <p>Delivery in 2-3 business days with live tracking number.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Razorpay Modal Window */}
      {showRazorpayModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
            {/* Razorpay Brand Header */}
            <div className="bg-[#0C2340] text-white p-5 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-blue-200 uppercase tracking-widest font-semibold">Razorpay Standard</p>
                <h4 className="text-base font-bold">Aura Botanica India</h4>
                <p className="text-xs text-blue-100">Order #AURA-RZP-2026</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-blue-200">Amount</span>
                <p className="text-xl font-bold tabular-nums">₹{finalTotal.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <p className="font-semibold text-stone-800">Select payment method:</p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowRazorpayModal(false);
                    handlePlaceOrder(`RZP-TEST-${Date.now()}`);
                  }}
                  className="w-full p-3 border border-stone-300 rounded-lg text-left hover:border-blue-600 hover:bg-blue-50/50 flex items-center justify-between transition-colors"
                >
                  <span className="font-semibold text-stone-900">Simulate Success: Visa / RuPay Card</span>
                  <span className="text-[11px] text-blue-700 font-bold">Instant Approve →</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowRazorpayModal(false);
                    handlePlaceOrder(`RZP-NETBANK-${Date.now()}`);
                  }}
                  className="w-full p-3 border border-stone-300 rounded-lg text-left hover:border-blue-600 hover:bg-blue-50/50 flex items-center justify-between transition-colors"
                >
                  <span className="font-semibold text-stone-900">Simulate Success: HDFC / ICICI NetBanking</span>
                  <span className="text-[11px] text-blue-700 font-bold">Instant Approve →</span>
                </button>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setShowRazorpayModal(false)}
                  className="text-stone-500 hover:text-stone-800 text-xs underline"
                >
                  Cancel Razorpay Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
