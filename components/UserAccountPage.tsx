'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  User,
  MapPin,
  Package,
  ShieldCheck,
  Plus,
  FileText,
  LogOut,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { GSTInvoiceModal } from '@/components/GSTInvoiceModal';
import { INDIAN_STATES } from '@/lib/data';

export function UserAccountPage() {
  const {
    currentUser,
    setCurrentUser,
    orders,
    logout,
    setCurrentView,
    setSelectedOrderId,
    viewInvoiceOrder,
    setViewInvoiceOrder,
    addToCart,
    setIsCartDrawerOpen,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  // Add Address Modal
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState('Office');
  const [newAddrLine1, setNewAddrLine1] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrState, setNewAddrState] = useState('Maharashtra');
  const [newAddrPincode, setNewAddrPincode] = useState('');

  if (!currentUser) {
    return (
      <div className="bg-[#FCFBF9] min-h-screen py-16 text-center">
        <div className="max-w-md mx-auto p-8 bg-white rounded-2xl border border-stone-200 space-y-4">
          <User className="w-12 h-12 text-stone-300 mx-auto" />
          <h2 className="text-xl font-serif font-bold text-stone-900">Sign in to Your Account</h2>
          <p className="text-xs text-stone-500">
            Access your saved Indian delivery addresses, live BlueDart shipments, and official GST invoices.
          </p>
          <button
            onClick={() => setCurrentView('home')}
            className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
          >
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  const handleToggleRole = () => {
    const nextRole = currentUser.role === 'customer' ? 'admin' : 'customer';
    setCurrentUser(prev => prev ? { ...prev, role: nextRole } : null);
    showToast(`Account mode switched to: ${nextRole === 'admin' ? 'Store Administrator' : 'VIP Customer'}`, 'info');
  };

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrLine1.trim() || !newAddrCity.trim() || newAddrPincode.length !== 6) {
      showToast('Please fill out all address fields with a valid 6-digit PIN code.', 'error');
      return;
    }

    const newAddr = {
      id: `addr-${Date.now()}`,
      label: newAddrLabel,
      addressLine1: newAddrLine1.trim(),
      city: newAddrCity.trim(),
      state: newAddrState,
      pincode: newAddrPincode.trim(),
      isDefault: false
    };

    setCurrentUser(prev => prev ? { ...prev, savedAddresses: [...prev.savedAddresses, newAddr] } : null);
    setIsAddAddressOpen(false);
    setNewAddrLine1('');
    setNewAddrCity('');
    setNewAddrPincode('');
    showToast('Saved new Indian shipping address!', 'success');
  };

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach(item => {
      addToCart(item.product, item.selectedSize, item.quantity);
    });
    setIsCartDrawerOpen(true);
  };

  return (
    <div className="bg-[#FCFBF9] min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Card Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-900 font-serif text-2xl font-bold">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-serif font-bold text-stone-900">{currentUser.name}</h1>
                <span className="text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded">
                  {currentUser.role === 'admin' ? 'Store Administrator' : 'VIP Gold Member'}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">{currentUser.email} · {currentUser.phone}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleToggleRole}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors border border-stone-200"
            >
              Toggle Demo Role ({currentUser.role === 'customer' ? 'Switch to Admin' : 'Switch to Customer'})
            </button>

            {currentUser.role === 'admin' && (
              <button
                onClick={() => setCurrentView('admin')}
                className="px-4 py-2 bg-amber-900 hover:bg-amber-950 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>Open Admin CMS</span>
              </button>
            )}

            <button
              onClick={logout}
              className="p-2 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'orders' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            Order History ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'addresses' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            Saved Delivery Addresses ({currentUser.savedAddresses.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'profile' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            Account Details & KYC
          </button>
        </div>

        {/* Tab 1: Orders History */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white p-10 rounded-2xl border border-stone-200 text-center">
                <p className="text-sm text-stone-500">No orders placed yet.</p>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm">{order.orderNumber}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                          {order.status}
                        </span>
                      </div>
                      <p className="text-stone-400 mt-0.5">
                        Placed: {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} · BlueDart: {order.trackingNumber}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedOrderId(order.id);
                          setCurrentView('order-tracking');
                        }}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded text-xs transition-colors"
                      >
                        Track Shipment
                      </button>
                      <button
                        onClick={() => setViewInvoiceOrder(order)}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded text-xs transition-colors flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>GST Invoice</span>
                      </button>
                      <button
                        onClick={() => handleReorder(order)}
                        className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded text-xs transition-colors flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reorder</span>
                      </button>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                        <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg border border-stone-200" />
                        <div className="text-xs">
                          <p className="font-semibold text-stone-900 line-clamp-1">{item.product.name}</p>
                          <p className="text-stone-400">Qty: {item.quantity} · Size: {item.selectedSize}</p>
                          <p className="font-bold text-stone-900 tabular-nums">₹{item.totalPrice.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 text-xs text-stone-600 border-t border-stone-100">
                    <span>Delivered to: {order.shippingAddress.city}, {order.shippingAddress.state}</span>
                    <span className="text-sm font-bold text-stone-900 tabular-nums">
                      Total: ₹{order.pricing.finalTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-900 uppercase tracking-wider">
                Saved Shipping Addresses
              </h3>
              <button
                onClick={() => setIsAddAddressOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>Add New Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentUser.savedAddresses.map(addr => (
                <div key={addr.id} className="p-5 rounded-xl border border-stone-200 bg-stone-50 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold uppercase tracking-wider text-stone-900 px-2 py-0.5 bg-white rounded border border-stone-200">
                      {addr.label}
                    </span>
                    {addr.isDefault && (
                      <span className="text-emerald-700 font-semibold">Primary Address</span>
                    )}
                  </div>
                  <p className="text-stone-700 leading-relaxed">{addr.addressLine1}</p>
                  <p className="text-stone-900 font-bold">{addr.city}, {addr.state} – {addr.pincode}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Profile Details */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4 max-w-xl text-xs">
            <h3 className="text-base font-bold text-stone-900 uppercase tracking-wider border-b border-stone-100 pb-3">
              Profile & Preferences
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-stone-500 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-stone-500 mb-1">Email Address</label>
                <input
                  type="email"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser(prev => prev ? { ...prev, email: e.target.value } : null)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-stone-500 mb-1">Mobile Number (+91)</label>
                <input
                  type="tel"
                  value={currentUser.phone}
                  onChange={(e) => setCurrentUser(prev => prev ? { ...prev, phone: e.target.value } : null)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Address Modal */}
      {isAddAddressOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="text-lg font-serif font-bold text-stone-900">Add New Shipping Address</h3>
            <form onSubmit={handleAddNewAddress} className="space-y-3">
              <div>
                <label className="block font-semibold uppercase text-stone-700 mb-1">Address Label</label>
                <select
                  value={newAddrLabel}
                  onChange={(e) => setNewAddrLabel(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-700 mb-1">Flat / Street Address *</label>
                <input
                  type="text"
                  required
                  value={newAddrLine1}
                  onChange={(e) => setNewAddrLine1(e.target.value)}
                  placeholder="House 12, Park Street"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-stone-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={newAddrCity}
                    onChange={(e) => setNewAddrCity(e.target.value)}
                    placeholder="Bengaluru"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-stone-700 mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={newAddrPincode}
                    onChange={(e) => setNewAddrPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="560001"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-700 mb-1">State *</label>
                <select
                  value={newAddrState}
                  onChange={(e) => setNewAddrState(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
                >
                  {INDIAN_STATES.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddAddressOpen(false)}
                  className="px-4 py-2 text-stone-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 text-white font-semibold uppercase tracking-wider rounded-lg"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GST Invoice Viewer */}
      <GSTInvoiceModal
        order={viewInvoiceOrder}
        onClose={() => setViewInvoiceOrder(null)}
      />
    </div>
  );
}
