'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  INITIAL_PRODUCTS,
  Coupon,
  INITIAL_COUPONS,
  Review,
  INITIAL_REVIEWS,
  Order,
  OrderItem,
  INITIAL_ORDERS,
  BlogPost,
  BLOG_POSTS,
  lookupIndianPincode
} from '@/lib/data';

export type AppView =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'order-tracking'
  | 'wishlist'
  | 'account'
  | 'admin'
  | 'blog'
  | 'blog-detail'
  | 'about'
  | 'contact'
  | 'faqs'
  | 'policies'
  | 'routine-quiz';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  savedAddresses: {
    id: string;
    label: string;
    addressLine1: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
  }[];
}

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface StoreContextType {
  // Navigation
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedBlogId: string | null;
  setSelectedBlogId: (id: string | null) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  activeCategoryFilter: string;
  setActiveCategoryFilter: (cat: string) => void;
  activeConcernFilter: string;
  setActiveConcernFilter: (concern: string) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Cart
  cart: {
    product: Product;
    selectedSize: string;
    quantity: number;
  }[];
  addToCart: (product: Product, size?: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;
  shippingFee: number;
  codFee: number;
  finalTotal: number;
  freeShippingThreshold: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'slug'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: {
    customer: { fullName: string; email: string; phone: string };
    shippingAddress: {
      addressLine1: string;
      addressLine2?: string;
      landmark?: string;
      city: string;
      state: string;
      pincode: string;
    };
    paymentMethod: 'UPI' | 'Razorpay' | 'Card' | 'NetBanking' | 'COD';
    transactionId?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Pincode
  userPincode: string;
  setUserPincode: (pin: string) => void;
  pincodeDeliveryInfo: { city: string; state: string; days: number } | null;
  verifyPincode: (pin: string) => boolean;

  // User Auth
  currentUser: UserProfile | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  login: (email: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Invoice
  viewInvoiceOrder: Order | null;
  setViewInvoiceOrder: (order: Order | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Navigation
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [activeConcernFilter, setActiveConcernFilter] = useState<string>('All');

  // Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Cart
  const [cart, setCart] = useState<{ product: Product; selectedSize: string; quantity: number }[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-3']);

  // Products & Data
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Pincode
  const [userPincode, setUserPincode] = useState<string>('400050');
  const [pincodeDeliveryInfo, setPincodeDeliveryInfo] = useState<{ city: string; state: string; days: number } | null>({
    city: 'Mumbai',
    state: 'Maharashtra',
    days: 2
  });

  // User
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    id: 'usr-1',
    name: 'Aanya Sen',
    email: 'aanya.sen@example.com',
    phone: '+91 98201 44512',
    role: 'customer',
    savedAddresses: [
      {
        id: 'addr-1',
        label: 'Home',
        addressLine1: 'Flat 402, Sea Crest Apartments, Pali Hill, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
        isDefault: true
      }
    ]
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Invoice
  const [viewInvoiceOrder, setViewInvoiceOrder] = useState<Order | null>(null);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, size?: string, quantity: number = 1) => {
    const chosenSize = size || product.sizes[0] || 'Standard';
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === chosenSize
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, selectedSize: chosenSize, quantity }];
      }
    });
    showToast(`Added "${product.name}" to your bag`, 'success');
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === size)));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId && item.selectedSize === size) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Coupon discount calculation
  let discountAmount = 0;
  if (appliedCoupon) {
    if (subtotal >= appliedCoupon.minOrderValue) {
      if (appliedCoupon.discountType === 'percentage') {
        const calculated = (subtotal * appliedCoupon.discountValue) / 100;
        discountAmount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated;
      } else {
        discountAmount = appliedCoupon.discountValue;
      }
    }
  }

  const applyCoupon = (code: string) => {
    const found = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { success: false, message: 'Invalid promo code. Try "FESTIVE15" or "GLOW500".' };
    }
    if (subtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Min order value of ₹${found.minOrderValue} required for ${found.code}.`
      };
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`, 'success');
    return { success: true, message: `Applied! You saved ₹${discountAmount || (subtotal * found.discountValue / 100)}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const freeShippingThreshold = 799;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 79;
  const codFee = 0; // standard zero COD fee for festive celebration

  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee + codFee);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    const prod = products.find(p => p.id === productId);
    if (exists) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast(`Removed from Wishlist`, 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast(`Saved ${prod ? `"${prod.name}"` : 'item'} to Wishlist`, 'success');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Product Admin
  const addProduct = (productData: Omit<Product, 'id' | 'slug'>) => {
    const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      slug
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Added product "${newProduct.name}" to catalog`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
    showToast(`Updated product details`, 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(`Product removed from catalog`, 'info');
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setReviews(prev => [newRev, ...prev]);
    showToast(`Thank you! Your verified review has been posted.`, 'success');
  };

  // Coupons Admin
  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => [...prev.filter(c => c.code !== coupon.code), coupon]);
    showToast(`Coupon ${coupon.code} created!`, 'success');
  };

  const deleteCoupon = (code: string) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
    showToast(`Coupon ${code} deleted`, 'info');
  };

  // Orders
  const createOrder = (orderData: {
    customer: { fullName: string; email: string; phone: string };
    shippingAddress: {
      addressLine1: string;
      addressLine2?: string;
      landmark?: string;
      city: string;
      state: string;
      pincode: string;
    };
    paymentMethod: 'UPI' | 'Razorpay' | 'Card' | 'NetBanking' | 'COD';
    transactionId?: string;
  }): Order => {
    const num = Math.floor(1000 + Math.random() * 9000);
    const tracking = `BLUEDART-AURA-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const orderItems: OrderItem[] = cart.map(item => ({
      product: item.product,
      selectedSize: item.selectedSize,
      quantity: item.quantity,
      unitPrice: item.product.price,
      totalPrice: item.product.price * item.quantity
    }));

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `AURA-2026-${num}`,
      trackingNumber: tracking,
      createdAt: now.toISOString(),
      status: 'Confirmed',
      customer: orderData.customer,
      shippingAddress: orderData.shippingAddress,
      payment: {
        method: orderData.paymentMethod,
        transactionId: orderData.transactionId || (orderData.paymentMethod === 'COD' ? 'COD-UNPAID' : `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`),
        status: orderData.paymentMethod === 'COD' ? 'Pending COD Verification' : 'Paid'
      },
      items: orderItems,
      pricing: {
        subtotal,
        discount: discountAmount,
        couponCode: appliedCoupon?.code,
        shippingFee,
        codFee,
        gstAmount: Math.round((finalTotal * 18) / 118),
        finalTotal
      },
      timeline: [
        { status: 'Order Placed', time: 'Just now', description: 'Order confirmed and payment verified', completed: true },
        { status: 'Quality Inspection', time: 'Pending', description: 'Fresh batch batch-testing and sealed carton prep', completed: false },
        { status: 'Handover to BlueDart Express', time: 'Within 24h', description: `Air-waybill booked: ${tracking}`, completed: false },
        { status: 'In Transit', time: 'Expected 2-3 Days', description: 'Express air-cargo transit across Indian hubs', completed: false },
        { status: 'Out for Delivery', time: 'Expected Soon', description: 'Delivery executive assigned with OTP confirmation', completed: false },
        { status: 'Delivered', time: 'Doorstep', description: 'Safe contactless delivery with tamper-proof seal', completed: false }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setSelectedOrderId(newOrder.id);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const updated = { ...ord, status };
          if (status === 'Dispatched') {
            updated.timeline[1].completed = true;
            updated.timeline[2].completed = true;
          } else if (status === 'Out for Delivery') {
            updated.timeline[1].completed = true;
            updated.timeline[2].completed = true;
            updated.timeline[3].completed = true;
            updated.timeline[4].completed = true;
          } else if (status === 'Delivered') {
            updated.timeline.forEach(t => (t.completed = true));
            if (updated.payment.method === 'COD') {
              updated.payment.status = 'Paid';
            }
          }
          return updated;
        }
        return ord;
      })
    );
    showToast(`Order status updated to "${status}"`, 'success');
  };

  // Pincode Verification
  const verifyPincode = (pin: string) => {
    const info = lookupIndianPincode(pin);
    if (info) {
      setUserPincode(pin);
      setPincodeDeliveryInfo(info);
      showToast(`Delivery available to ${info.city}, ${info.state} in ${info.days} days!`, 'success');
      return true;
    } else {
      showToast(`Invalid 6-digit Indian PIN code. Please check.`, 'error');
      return false;
    }
  };

  // User Auth
  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const name = email.split('@')[0].replace('.', ' ');
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    setCurrentUser({
      id: `usr-${Date.now()}`,
      name: formattedName,
      email,
      phone: '+91 98765 43210',
      role,
      savedAddresses: [
        {
          id: 'addr-default',
          label: 'Primary',
          addressLine1: 'B-12, Green Park Main',
          city: 'New Delhi',
          state: 'Delhi',
          pincode: '110016',
          isDefault: true
        }
      ]
    });
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${formattedName}!`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Signed out of NIKHAAR', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProductId,
        setSelectedProductId,
        selectedBlogId,
        setSelectedBlogId,
        selectedOrderId,
        setSelectedOrderId,
        activeCategoryFilter,
        setActiveCategoryFilter,
        activeConcernFilter,
        setActiveConcernFilter,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        subtotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        shippingFee,
        codFee,
        finalTotal,
        freeShippingThreshold,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        reviews,
        addReview,
        coupons,
        addCoupon,
        deleteCoupon,
        orders,
        createOrder,
        updateOrderStatus,
        userPincode,
        setUserPincode,
        pincodeDeliveryInfo,
        verifyPincode,
        currentUser,
        setCurrentUser,
        login,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        toasts,
        showToast,
        removeToast,
        viewInvoiceOrder,
        setViewInvoiceOrder
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
