'use client';

import React from 'react';
import { Order } from '@/lib/data';
import { X, Printer, Download, CheckCircle2 } from 'lucide-react';

interface GSTInvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export function GSTInvoiceModal({ order, onClose }: GSTInvoiceModalProps) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const gstRate = 18;
  const taxableValue = Math.round((order.pricing.finalTotal * 100) / (100 + gstRate));
  const cgstAmount = Math.round((order.pricing.gstAmount) / 2);
  const sgstAmount = cgstAmount;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-stone-300 p-6 sm:p-8 my-8 text-stone-900">
        {/* Header Actions (Print / Close) */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 print:hidden">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Official GST Tax Invoice (Rule 46 CGST Rules, 2017)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 flex items-center gap-1.5 text-xs font-semibold"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              aria-label="Close invoice"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Tax Invoice Content */}
        <div className="pt-6 space-y-6 text-xs" id="printable-invoice">
          {/* Company Brand & GSTIN */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-serif font-bold uppercase tracking-[0.2em] text-stone-900">
                NIKHAAR
              </h2>
              <p className="text-stone-500 text-[11px] mt-0.5">NIKHAAR Cosmeceuticals Pvt. Ltd.</p>
              <p className="text-stone-600">Unit 14B, Peninsula Business Park, Lower Parel</p>
              <p className="text-stone-600">Mumbai, Maharashtra – 400013, India</p>
              <p className="font-semibold text-stone-900 mt-1">
                GSTIN: <span className="font-mono">27AABCA1234F1Z8</span> · State: 27 (Maharashtra)
              </p>
              <p className="text-stone-500">AYUSH License: AYU-MH-2024-9921</p>
            </div>

            <div className="text-right">
              <span className="inline-block bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded mb-2">
                ORIGINAL FOR RECIPIENT
              </span>
              <p className="font-bold text-stone-900 text-sm">Invoice #: {order.orderNumber}</p>
              <p className="text-stone-600">
                Date: {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
              <p className="text-stone-600">Place of Supply: {order.shippingAddress.state} (State Code)</p>
              <p className="text-stone-600">AWB No: {order.trackingNumber}</p>
            </div>
          </div>

          {/* Bill To & Ship To Details */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold uppercase tracking-wider text-stone-700 text-[11px] mb-1">
                Billed To & Shipped To:
              </h4>
              <p className="font-semibold text-stone-900">{order.customer.fullName}</p>
              <p className="text-stone-600">{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p className="text-stone-600">{order.shippingAddress.addressLine2}</p>}
              <p className="text-stone-600">{order.shippingAddress.city}, {order.shippingAddress.state} – {order.shippingAddress.pincode}</p>
              <p className="text-stone-600 font-mono mt-1">Mobile: {order.customer.phone}</p>
              <p className="text-stone-600">Email: {order.customer.email}</p>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider text-stone-700 text-[11px] mb-1">
                Payment Verification:
              </h4>
              <p className="text-stone-700">Mode: <strong className="text-stone-900">{order.payment.method}</strong></p>
              <p className="text-stone-700 font-mono">Ref Txn: {order.payment.transactionId}</p>
              <p className="text-stone-700">Payment Status: <strong className="text-emerald-700 uppercase">{order.payment.status}</strong></p>
              <p className="text-stone-500 mt-2 text-[10px]">Reverse Charge Applicable: No</p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-100 text-[11px] font-bold text-stone-700 uppercase tracking-wider border-b border-stone-200">
                  <th className="p-2.5">#</th>
                  <th className="p-2.5">Item Description</th>
                  <th className="p-2.5">HSN Code</th>
                  <th className="p-2.5">Qty</th>
                  <th className="p-2.5 text-right">Unit Rate</th>
                  <th className="p-2.5 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-stone-50">
                    <td className="p-2.5 font-mono text-stone-500">{idx + 1}</td>
                    <td className="p-2.5 font-medium text-stone-900">
                      {item.product.name}
                      <span className="block text-[11px] text-stone-500">Size: {item.selectedSize}</span>
                    </td>
                    <td className="p-2.5 font-mono text-stone-600">{item.product.hsnCode || '330499'}</td>
                    <td className="p-2.5 font-mono text-stone-900">{item.quantity}</td>
                    <td className="p-2.5 text-right font-mono tabular-nums">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                    <td className="p-2.5 text-right font-mono font-bold text-stone-900 tabular-nums">
                      ₹{item.totalPrice.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tax Calculation Matrix */}
          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-1.5 border-t border-stone-200 pt-3">
              <div className="flex justify-between text-stone-600">
                <span>Taxable Value:</span>
                <span className="font-mono tabular-nums">₹{taxableValue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>CGST (9.0%):</span>
                <span className="font-mono tabular-nums">₹{cgstAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>SGST (9.0%):</span>
                <span className="font-mono tabular-nums">₹{sgstAmount.toLocaleString('en-IN')}</span>
              </div>
              {order.pricing.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount ({order.pricing.couponCode}):</span>
                  <span className="font-mono tabular-nums">-₹{order.pricing.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Air Shipping:</span>
                <span className="font-mono">{order.pricing.shippingFee === 0 ? 'FREE' : `₹${order.pricing.shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-300">
                <span>Total Amount Due:</span>
                <span className="text-base font-mono tabular-nums">₹{order.pricing.finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Footer Terms */}
          <div className="pt-4 border-t border-stone-200 text-[10px] text-stone-500 flex justify-between items-end">
            <div>
              <p className="font-bold uppercase tracking-wider text-stone-700">Declaration:</p>
              <p>We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</p>
              <p>Customer Support: care@aurabotanica.in · Toll Free: 1800-209-AURA</p>
            </div>
            <div className="text-center font-serif text-stone-800">
              <div className="h-8 border-b border-stone-300 mb-1" />
              <p className="font-bold">Authorized Signatory</p>
              <p className="text-[9px] text-stone-400">For NIKHAAR India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
