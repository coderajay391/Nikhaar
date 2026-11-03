'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Product, Coupon } from '@/lib/data';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Tag,
  ShieldCheck,
  Eye,
  ArrowLeft
} from 'lucide-react';
import { GSTInvoiceModal } from '@/components/GSTInvoiceModal';

export function AdminDashboard() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    deleteCoupon,
    reviews,
    setCurrentView,
    setViewInvoiceOrder,
    viewInvoiceOrder
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'coupons' | 'reviews'>('overview');

  // Add Product Form State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('NIKHAAR');
  const [newProdCategory, setNewProdCategory] = useState<Product['category']>('Serums');
  const [newProdConcern, setNewProdConcern] = useState<Product['concern']>('Dullness & Glow');
  const [newProdSkinType, setNewProdSkinType] = useState<Product['skinType']>('All Skin Types');
  const [newProdPrice, setNewProdPrice] = useState<number>(1299);
  const [newProdOrigPrice, setNewProdOrigPrice] = useState<number>(1699);
  const [newProdShortDesc, setNewProdShortDesc] = useState('');
  const [newProdSizes, setNewProdSizes] = useState('30 ml, 50 ml');

  // Add Coupon Form State
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponValue, setNewCouponValue] = useState(15);
  const [newCouponMinOrder, setNewCouponMinOrder] = useState(999);
  const [newCouponDesc, setNewCouponDesc] = useState('');

  // Analytics Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.payment.status === 'Paid' ? o.pricing.finalTotal : 0), 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const totalCustomers = 340; // demo base

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const discount = Math.round(((newProdOrigPrice - newProdPrice) / newProdOrigPrice) * 100);

    addProduct({
      name: newProdName.trim(),
      brand: newProdBrand,
      category: newProdCategory,
      concern: newProdConcern,
      skinType: newProdSkinType,
      originalPrice: newProdOrigPrice,
      price: newProdPrice,
      discountPercent: Math.max(0, discount),
      rating: 5.0,
      reviewsCount: 1,
      badge: 'New Launch',
      image: '/images/kumkumadi_serum.jpg',
      galleryImages: ['/images/kumkumadi_serum.jpg', '/images/glass_skin_collection.jpg'],
      sizes: newProdSizes.split(',').map(s => s.trim()),
      volume: newProdSizes.split(',')[0]?.trim() || '30 ml',
      inStock: true,
      shortDescription: newProdShortDesc.trim() || 'Formulated with cold-pressed Ayurvedic botanicals.',
      description: 'Handcrafted luxury formulation designed for Indian skin barrier health and environmental protection.',
      benefits: ['Restores skin luminosity', 'Deeply hydrates without clogging pores', '100% natural formulation'],
      keyIngredients: [{ name: 'Kashmiri Saffron', purpose: 'Skin brightening & cell renewal' }],
      ingredientsList: 'Aqua, Sesamum Indicum Seed Oil, Saffron Extract, Glycerin, Phenoxyethanol.',
      howToUse: ['Apply 2-3 drops to cleansed skin every evening.'],
      hsnCode: '330499',
      gstPercent: 18,
      isFeatured: false
    });

    setIsAddProductOpen(false);
    setNewProdName('');
    setNewProdShortDesc('');
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountType: 'percentage',
      discountValue: newCouponValue,
      minOrderValue: newCouponMinOrder,
      maxDiscount: 500,
      description: newCouponDesc.trim() || `${newCouponValue}% OFF on orders above ₹${newCouponMinOrder}`,
      expiryDate: '31 Dec 2026'
    });

    setIsAddCouponOpen(false);
    setNewCouponCode('');
    setNewCouponDesc('');
  };

  return (
    <div className="bg-[#F8F7F4] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>NIKHAAR Operations & Admin Console</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-stone-900 mt-1">
              Store Management Dashboard
            </h1>
          </div>

          <button
            onClick={() => setCurrentView('home')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg text-xs font-semibold text-stone-800 transition-colors shadow-sm self-start"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Customer Storefront</span>
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Financial Overview', count: null },
            { id: 'orders', label: 'Order Processing', count: orders.length },
            { id: 'products', label: 'Product Catalog', count: products.length },
            { id: 'coupons', label: 'Festive Discounts', count: coupons.length },
            { id: 'reviews', label: 'Customer Reviews', count: reviews.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-stone-700 text-white' : 'bg-stone-100 text-stone-600'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Gross Revenue</span>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </p>
                <p className="text-[11px] text-emerald-700 font-medium mt-1">
                  +18.4% from last festive week
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Indian Orders</span>
                  <ShoppingBag className="w-4 h-4 text-stone-800" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                  {totalOrders}
                </p>
                <p className="text-[11px] text-stone-500 mt-1">
                  BlueDart Express Air Dispatch active
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Avg Order Value (AOV)</span>
                  <Tag className="w-4 h-4 text-amber-700" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                  ₹{avgOrderValue.toLocaleString('en-IN')}
                </p>
                <p className="text-[11px] text-stone-500 mt-1">
                  Threshold for free delivery: ₹799
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Live Catalog Items</span>
                  <Package className="w-4 h-4 text-stone-800" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                  {products.length}
                </p>
                <p className="text-[11px] text-stone-500 mt-1">
                  All AYUSH / FDA approved formulations
                </p>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-stone-900 uppercase tracking-wider mb-4">
                Recent Orders Stream
              </h3>
              <div className="divide-y divide-stone-100">
                {orders.slice(0, 5).map(ord => (
                  <div key={ord.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <p className="font-bold text-stone-900">{ord.orderNumber}</p>
                      <p className="text-stone-500">Customer: {ord.customer.fullName} ({ord.shippingAddress.city}, {ord.shippingAddress.state})</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-bold tabular-nums text-stone-900">
                        ₹{ord.pricing.finalTotal.toLocaleString('en-IN')}
                      </span>
                      <span className="px-2.5 py-1 rounded text-[11px] font-bold bg-amber-50 text-amber-900">
                        {ord.status}
                      </span>
                      <button
                        onClick={() => setViewInvoiceOrder(ord)}
                        className="text-stone-600 hover:text-stone-900 underline font-semibold"
                      >
                        Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Management */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-stone-900 uppercase tracking-wider">
              Manage Orders & Dispatch Status
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-stone-700 uppercase tracking-wider border-b border-stone-200">
                    <th className="p-3">Order #</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Items</th>
                    <th className="p-3">Total (₹)</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Logistics Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {orders.map(ord => (
                    <tr key={ord.id} className="hover:bg-stone-50">
                      <td className="p-3 font-bold text-stone-900">
                        {ord.orderNumber}
                        <span className="block text-[11px] text-stone-400 font-mono">{ord.trackingNumber}</span>
                      </td>
                      <td className="p-3 text-stone-700">
                        {ord.customer.fullName}
                        <span className="block text-stone-400">{ord.shippingAddress.city}, {ord.shippingAddress.pincode}</span>
                      </td>
                      <td className="p-3 text-stone-600">{ord.items.length} product(s)</td>
                      <td className="p-3 font-bold text-stone-900 tabular-nums">
                        ₹{ord.pricing.finalTotal.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-stone-800">{ord.payment.method}</span>
                        <span className="block text-[10px] text-emerald-700 uppercase font-bold">{ord.payment.status}</span>
                      </td>
                      <td className="p-3">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                          className="bg-white border border-stone-300 rounded px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-stone-900"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Dispatched">Dispatched (Air)</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setViewInvoiceOrder(ord)}
                          className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded text-xs transition-colors"
                        >
                          GST Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Products Catalog Manager */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-base font-bold text-stone-900 uppercase tracking-wider">
                  Product Catalog ({products.length} Items)
                </h3>
                <p className="text-xs text-stone-500">Manage formulations, pricing, and stock availability.</p>
              </div>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>Add New Formulation</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-stone-700 uppercase tracking-wider border-b border-stone-200">
                    <th className="p-3">Product</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Concern</th>
                    <th className="p-3">Price (₹)</th>
                    <th className="p-3">Inventory</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-stone-50">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg border border-stone-200" />
                          <div>
                            <p className="font-bold text-stone-900">{p.name}</p>
                            <p className="text-stone-400">{p.volume}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-stone-600">{p.category}</td>
                      <td className="p-3 text-stone-600">{p.concern}</td>
                      <td className="p-3 font-bold text-stone-900 tabular-nums">
                        ₹{p.price.toLocaleString('en-IN')}
                        {p.originalPrice > p.price && (
                          <span className="block text-stone-400 text-[10px] line-through">₹{p.originalPrice}</span>
                        )}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                            p.inStock ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                          }`}
                        >
                          {p.inStock ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                          title="Delete formulation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Coupons Management */}
        {activeTab === 'coupons' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-base font-bold text-stone-900 uppercase tracking-wider">
                  Active Promotional Codes ({coupons.length})
                </h3>
                <p className="text-xs text-stone-500">Configure Indian festive and holiday discount vouchers.</p>
              </div>

              <button
                onClick={() => setIsAddCouponOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>Create New Coupon</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {coupons.map(cp => (
                <div key={cp.code} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-bold tracking-wider text-amber-900 bg-amber-100 px-2.5 py-1 rounded">
                      {cp.code}
                    </span>
                    <button
                      onClick={() => deleteCoupon(cp.code)}
                      className="text-stone-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs font-semibold text-stone-800">{cp.description}</p>
                  <div className="text-[11px] text-stone-500 space-y-0.5 pt-1 border-t border-stone-200">
                    <p>Min Order Value: ₹{cp.minOrderValue}</p>
                    <p>Expiry: {cp.expiryDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Customer Reviews Moderation */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-stone-900 uppercase tracking-wider">
              Customer Reviews ({reviews.length})
            </h3>
            <div className="divide-y divide-stone-100">
              {reviews.map(rev => (
                <div key={rev.id} className="py-4 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900">{rev.userName}</span>
                      <span className="text-stone-400">· {rev.city}</span>
                      <span className="text-amber-500 font-bold">★ {rev.rating}</span>
                    </div>
                    <span className="text-stone-400">{rev.date}</span>
                  </div>
                  <h5 className="font-semibold text-stone-800">{rev.title}</h5>
                  <p className="text-stone-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-serif font-bold text-stone-900">
              Add New Ayurvedic / Clinical Formulation
            </h3>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Kashmiri Saffron & Gotu Kola Night Oil"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
                  >
                    <option value="Serums">Serums</option>
                    <option value="Moisturizers">Moisturizers</option>
                    <option value="Sunscreens">Sunscreens</option>
                    <option value="Face Wash">Face Wash</option>
                    <option value="Toners">Toners</option>
                    <option value="Face Masks">Face Masks</option>
                    <option value="Lip Care">Lip Care</option>
                    <option value="Haircare">Haircare</option>
                    <option value="Body Care">Body Care</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Skin Concern *
                  </label>
                  <select
                    value={newProdConcern}
                    onChange={(e) => setNewProdConcern(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
                  >
                    <option value="Dullness & Glow">Dullness & Glow</option>
                    <option value="Acne & Pimples">Acne & Pimples</option>
                    <option value="Dark Spots & Pigmentation">Dark Spots & Pigmentation</option>
                    <option value="Barrier Repair & Dry Skin">Barrier Repair & Dry Skin</option>
                    <option value="Oily & Open Pores">Oily & Open Pores</option>
                    <option value="Anti-Aging & Fine Lines">Anti-Aging & Fine Lines</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Original Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProdOrigPrice}
                    onChange={(e) => setNewProdOrigPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Sizes (Comma separated)
                </label>
                <input
                  type="text"
                  value={newProdSizes}
                  onChange={(e) => setNewProdSizes(e.target.value)}
                  placeholder="30 ml, 50 ml"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={newProdShortDesc}
                  onChange={(e) => setNewProdShortDesc(e.target.value)}
                  placeholder="Highlight key botanical actives..."
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 text-stone-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-stone-900 text-white font-semibold uppercase tracking-wider rounded-lg"
                >
                  Publish Formulation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Coupon Modal */}
      {isAddCouponOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Create Festive Promo Code
            </h3>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                  placeholder="e.g. DIWALI20"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 uppercase tracking-widest font-mono font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Discount (%) *
                  </label>
                  <input
                    type="number"
                    required
                    min={5}
                    max={50}
                    value={newCouponValue}
                    onChange={(e) => setNewCouponValue(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Min Order Value (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newCouponMinOrder}
                    onChange={(e) => setNewCouponMinOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={newCouponDesc}
                  onChange={(e) => setNewCouponDesc(e.target.value)}
                  placeholder="e.g. 20% OFF on all Diwali gift sets"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddCouponOpen(false)}
                  className="px-4 py-2 text-stone-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-stone-900 text-white font-semibold uppercase tracking-wider rounded-lg"
                >
                  Activate Coupon
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
