'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  Leaf,
  Shield,
  Truck,
  RotateCcw,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  CheckCircle2,
  Send
} from 'lucide-react';

export function AboutPage() {
  const { setCurrentView } = useStore();

  return (
    <div className="bg-[#FCFBF9] min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Brand Mission */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-900">
            Heritage Meets Modern Dermatological Chemistry
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-medium text-stone-900 tracking-tight leading-tight">
            Rooted in Kashmir. Engineered for Indian Skin.
          </h1>
          <p className="text-base text-stone-600 leading-relaxed font-normal">
            NIKHAAR was born out of a stark realization: imported luxury cosmetics were formulated for European dryness, while domestic products often relied on heavy mineral oils that clogged pores in Indian heat and humidity.
          </p>
        </div>

        {/* 2-Column Split: Image & Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-stone-200">
            <img
              src="/images/hero_campaign.jpg"
              alt="Artisanal harvest of Kashmiri saffron"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-6 text-sm text-stone-700 leading-relaxed">
            <h3 className="text-2xl font-serif font-medium text-stone-900">
              The GI-Tagged Saffron Standard
            </h3>
            <p>
              We exclusively source Grade-A1 Mongra Saffron directly from multi-generational farming families in Pampore, Kashmir. Harvested during the crisp dawn frost of October, each crimson stigma delivers astronomical concentrations of active Crocin and Safranal.
            </p>
            <p>
              Rather than boiling away vital phytonutrients, our lab employs cold copper-vessel lipid extraction (Ayurvedic Taila Paka Vidhi) over 16 days, preserving delicate enzymes that actively reverse photo-damage and post-inflammatory hyperpigmentation.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentView('shop')}
                className="px-6 py-3 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-stone-800 transition-colors"
              >
                Explore Saffron Formulations
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-stone-200">
          <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-800">
              <Leaf className="w-5 h-5" />
            </div>
            <h4 className="text-base font-serif font-bold text-stone-900">100% Ayurvedic Pharmacopoeia</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every botanical active is authenticated against classical texts (Charaka Samhita, Bhavaprakasha) and AYUSH manufacturing standards.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-800">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-base font-serif font-bold text-stone-900">Zero White Cast Guarantee</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              All sunscreens and physical barrier creams are rigorously tested on Indian undertones (Fitzpatrick Scales III through VI).
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-800">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-serif font-bold text-stone-900">Nationwide Express Transit</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Dispatched from temperature-controlled fulfillment hubs in Mumbai and Bengaluru, reaching over 27,000 Indian pin codes via air cargo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSent(true);
    showToast('Your message has been received! Our beauty advisory team will contact you within 4 hours.', 'success');
  };

  return (
    <div className="bg-[#FCFBF9] min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-900 mb-2">
            We Are Here For You
          </p>
          <h1 className="text-3xl sm:text-5xl font-serif font-medium text-stone-900 tracking-tight">
            Connect with Our Skin Concierge
          </h1>
          <p className="text-xs text-stone-500 mt-2">
            Questions regarding botanical ingredients, order tracking, or personalized skin routine consultation?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Details */}
          <div className="md:col-span-5 bg-stone-900 text-white p-8 rounded-2xl shadow-lg space-y-6">
            <h3 className="text-xl font-serif font-bold text-amber-200">
              NIKHAAR Headquarters
            </h3>

            <div className="space-y-4 text-xs text-stone-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Corporate Office:</strong>
                  Unit 14B, Peninsula Business Park, Lower Parel, Mumbai, Maharashtra – 400013
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Fulfillment Hub:</strong>
                  Survey 84, E-City Logistic Park, Bommasandra, Bengaluru, Karnataka – 560099
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <strong className="text-white block">Customer Support:</strong>
                  care@aurabotanica.in (Mon–Sat, 9 AM – 7 PM IST)
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <strong className="text-white block">Toll-Free Helpline:</strong>
                  1800-209-AURA (2872)
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 text-[11px] text-stone-400">
              GSTIN: 27AABCA1234F1Z8 · Registered under Ministry of Corporate Affairs, Govt. of India.
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
            {isSent ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-serif font-bold text-stone-900">Message Received!</h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  A certified cosmetic formulator or customer care specialist has been assigned to your query.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-6 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priyadarshini Rao"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="priya@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Mobile Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    How Can We Help You? *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Detail your question regarding order status, ingredients, or skin recommendation..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-stone-900 hover:bg-stone-800 text-white font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-amber-200" />
                  <span>Send Message to Support</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Will the Kashmiri Kumkumadi Facial Oil feel heavy or greasy in humid Indian weather?',
      a: 'Not at all. While traditional unrefined oils can feel occlusive, our Kumkumadi Elixir undergoes micro-filtration and is blended with light cold-pressed black sesame and jojoba carriers that absorb fully within 90 seconds, leaving zero oily film.'
    },
    {
      q: 'Do your sunscreens leave any white cast on deeper Indian skin tones?',
      a: 'We offer an absolute zero white-cast guarantee. Our Aqua-Light Gel Sunscreen utilizes next-generation organic UV filters (Tinosorb S and Uvinul A Plus) suspended in a water-gel matrix that turns completely invisible upon contact with all Fitzpatrick III-VI undertones.'
    },
    {
      q: 'What payment methods do you support across India?',
      a: 'We accept Instant UPI (Google Pay, PhonePe, Paytm, BHIM, QR code), Razorpay Secure Payments (Visa, Mastercard, RuPay cards, NetBanking with all Indian banks), and Cash on Delivery (COD) to over 27,000 PIN codes.'
    },
    {
      q: 'How fast will my order arrive?',
      a: 'Orders placed before 2 PM IST are dispatched the same day via BlueDart Express Air. Metro deliveries (Mumbai, Delhi NCR, Bengaluru, Chennai, Hyderabad, Kolkata) typically arrive within 48 to 72 hours.'
    },
    {
      q: 'Are your products safe for pregnant or nursing mothers?',
      a: 'All our barrier moisturizers, rosewater hydrosols, and lip butters are 100% clean, non-toxic, and safe. However, for products with high percentages of active BHA (Salicylic Acid), we advise consulting your obstetrician.'
    },
    {
      q: 'What is your return and refund policy?',
      a: 'We offer a hassle-free 15-day return window. If a product causes sensitivity or irritation, contact care@aurabotanica.in for a full replacement or refund to your original payment mode.'
    }
  ];

  return (
    <div className="bg-[#FCFBF9] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-900 mb-2">
            Got Questions?
          </p>
          <h1 className="text-3xl sm:text-5xl font-serif font-medium text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs text-stone-500 mt-2">
            Everything you need to know about our ingredients, delivery, and guarantees.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm divide-y divide-stone-200 overflow-hidden">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between text-left gap-4"
              >
                <span className="text-base font-serif font-semibold text-stone-900">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-stone-400 transition-transform ${
                    openIndex === i ? 'rotate-180 text-stone-900' : ''
                  }`}
                />
              </button>

              {openIndex === i && (
                <div className="mt-4 pt-2 text-xs sm:text-sm text-stone-600 leading-relaxed animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PoliciesPage() {
  return (
    <div className="bg-[#FCFBF9] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-2">
            Shipping & Return Policies
          </h1>
          <p className="text-xs text-stone-500">Last updated: November 2026</p>
        </div>

        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-3">
          <h2 className="text-lg font-serif font-bold text-stone-900">1. Domestic Shipping Policy (India)</h2>
          <p>
            We deliver to virtually all serviceable PIN codes in India through our premier logistics partners BlueDart and Delhivery Express. Orders exceeding ₹799 qualify for 100% Free Express Air Shipping. For orders below this threshold, a nominal handling fee of ₹79 applies.
          </p>
          <p>
            Dispatches operate Monday through Saturday from our temperature-controlled Mumbai and Bengaluru depots. Customers receive real-time SMS and WhatsApp notifications with live tracking links upon shipment creation.
          </p>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-3">
          <h2 className="text-lg font-serif font-bold text-stone-900">2. 15-Day Ease of Return & Refunds</h2>
          <p>
            Your skin satisfaction is our paramount commitment. If any NIKHAAR formulation triggers an allergic reaction or does not meet your expectations, you may initiate a return within 15 days of verified delivery.
          </p>
          <p>
            Upon pickup, refunds are credited back to your original source (UPI, Credit/Debit card, or Bank Account for COD orders) within 3-5 business days.
          </p>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-3">
          <h2 className="text-lg font-serif font-bold text-stone-900">3. GST Compliance & Billing</h2>
          <p>
            All consumer transactions are governed under Indian GST legislation. Prices rendered on our platform are fully inclusive of 18% Goods and Services Tax (CGST 9% + SGST 9% for intra-state supply, or IGST 18% for inter-state supply). A legally compliant GST Tax Invoice bearing our GSTIN (27AABCA1234F1Z8) is automatically dispatched via email and accessible anytime in your user profile.
          </p>
        </section>
      </div>
    </div>
  );
}
