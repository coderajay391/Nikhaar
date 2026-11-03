'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  Package,
  CheckCircle2,
  Clock,
  Truck,
  FileText,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Search,
  ExternalLink
} from 'lucide-react';
import { GSTInvoiceModal } from '@/components/GSTInvoiceModal';

export function OrderTrackingPage() {
  const {
    orders,
    selectedOrderId,
    setSelectedOrderId,
    setCurrentView,
    viewInvoiceOrder,
    setViewInvoiceOrder
  } = useStore();

  const [searchTrackingInput, setSearchTrackingInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<typeof orders[0] | null>(null);

  // Active order to display
  const activeOrder =
    searchedOrder ||
    orders.find(o => o.id === selectedOrderId) ||
    orders[0];

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchTrackingInput.trim().toUpperCase();
    const match = orders.find(
      o => o.orderNumber.toUpperCase().includes(clean) || o.trackingNumber.toUpperCase().includes(clean)
    );
    if (match) {
      setSearchedOrder(match);
      setSelectedOrderId(match.id);
    }
  };

  return (
    <div className="bg-[#FCFBF9] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="text-center mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-900/80 mb-2">
            Real-Time Logistics
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 tracking-tight">
            Order Status & Shipment Tracking
          </h1>
          <p className="text-xs text-stone-500 mt-2">
            Track your freshly packed Ayurvedic formulations across Indian transit hubs.
          </p>
        </div>

        {/* Quick Search Order Bar */}
        <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-sm mb-8">
          <form onSubmit={handleSearchOrder} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTrackingInput}
                onChange={(e) => setSearchTrackingInput(e.target.value)}
                placeholder="Enter Order # (e.g. AURA-2026-1042) or AWB Tracking #"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
            >
              Track Order
            </button>
          </form>
        </div>

        {!activeOrder ? (
          <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center space-y-4">
            <Package className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="text-lg font-serif font-medium text-stone-900">No Orders Found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              You haven&apos;t placed any orders yet, or the order number entered was not found in our system.
            </p>
            <button
              onClick={() => setCurrentView('shop')}
              className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top Order Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                      Order Confirmed
                    </span>
                    <span className="text-xs text-stone-400">·</span>
                    <span className="text-xs text-stone-500 font-medium">
                      Placed on {new Date(activeOrder.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">
                    {activeOrder.orderNumber}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-stone-600">
                    <Truck className="w-3.5 h-3.5 text-stone-700" />
                    <span>Courier Partner: <strong>BlueDart Express Air</strong></span>
                    <span className="text-stone-300">|</span>
                    <span className="font-mono text-stone-800 font-semibold">{activeOrder.trackingNumber}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setViewInvoiceOrder(activeOrder)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold rounded-lg transition-colors border border-stone-200"
                  >
                    <FileText className="w-4 h-4 text-stone-700" />
                    <span>GST Tax Invoice</span>
                  </button>
                </div>
              </div>

              {/* Visual Shipment Timeline */}
              <div className="pt-8 pb-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-6">
                  Shipment Progress Timeline
                </h4>

                <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                  {activeOrder.timeline.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      <span
                        className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full flex items-center justify-center ring-4 ring-white ${
                          step.completed
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-300 text-white'
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </span>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5
                            className={`text-xs sm:text-sm font-bold ${
                              step.completed ? 'text-stone-900' : 'text-stone-400'
                            }`}
                          >
                            {step.status}
                          </h5>
                          <span className="text-[11px] text-stone-400 tabular-nums">{step.time}</span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Delivery & Items Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Address & Customer */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3 text-xs">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-stone-900 pb-2 border-b border-stone-100">
                  <MapPin className="w-4 h-4 text-amber-800" />
                  <span>Delivery Destination</span>
                </div>
                <div>
                  <p className="font-bold text-stone-900">{activeOrder.customer.fullName}</p>
                  <p className="text-stone-600">{activeOrder.shippingAddress.addressLine1}</p>
                  {activeOrder.shippingAddress.addressLine2 && (
                    <p className="text-stone-600">{activeOrder.shippingAddress.addressLine2}</p>
                  )}
                  <p className="text-stone-600">
                    {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state} – {activeOrder.shippingAddress.pincode}
                  </p>
                  <p className="text-stone-600 font-mono mt-2">Mobile: {activeOrder.customer.phone}</p>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3 text-xs">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-stone-900 pb-2 border-b border-stone-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Payment & Invoice Details</span>
                </div>
                <div className="space-y-1.5 text-stone-600">
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <strong className="text-stone-900">{activeOrder.payment.method}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Status:</span>
                    <strong className="text-emerald-700 uppercase">{activeOrder.payment.status}</strong>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span>Transaction ID:</span>
                    <span className="text-stone-800">{activeOrder.payment.transactionId}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-stone-100 font-bold text-sm text-stone-900">
                    <span>Final Amount Paid:</span>
                    <span className="tabular-nums">₹{activeOrder.pricing.finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Ordered */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-3">
                Items in This Package ({activeOrder.items.length})
              </h4>
              <div className="divide-y divide-stone-100">
                {activeOrder.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 object-cover rounded-lg border border-stone-200"
                      />
                      <div>
                        <h5 className="font-bold text-stone-900">{item.product.name}</h5>
                        <p className="text-stone-400">Size: {item.selectedSize} · Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-stone-900 tabular-nums">
                      ₹{item.totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentView('account')}
                className="text-xs font-semibold text-stone-700 hover:text-stone-950 underline"
              >
                ← View All Past Orders in Profile
              </button>

              <button
                onClick={() => setCurrentView('shop')}
                className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-stone-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>

      {/* GST Tax Invoice Modal */}
      <GSTInvoiceModal
        order={viewInvoiceOrder}
        onClose={() => setViewInvoiceOrder(null)}
      />
    </div>
  );
}
