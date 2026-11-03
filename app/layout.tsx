import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#1c1917',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'NIKHAAR — Luxury Skincare & Beauty India',
  description: 'Premium Ayurvedic & Clinical Skincare e-commerce brand designed for India. Featuring Kumkumadi saffron serums, barrier ceramides, SPF protection, fast PIN code delivery, UPI, and COD.',
  keywords: [
    'skincare India',
    'Ayurvedic skincare',
    'Kumkumadi oil',
    'ceramide cream',
    'Indian beauty brand',
    'sunscreen India',
    'clean beauty',
    'Nykaa',
    'Minimalist'
  ],
  openGraph: {
    title: 'NIKHAAR — Luxury Skincare & Beauty India',
    description: 'Experience pure botanical potency and clinical dermatological science crafted for Indian skin.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'NIKHAAR India',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NIKHAAR — Luxury Skincare & Beauty India',
    description: 'Experience pure botanical potency and clinical dermatological science crafted for Indian skin.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FCFBF9] text-stone-900 selection:bg-amber-100 selection:text-amber-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
