'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { BLOG_POSTS } from '@/lib/data';
import { ArrowLeft, Clock, User, Calendar, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

export function BlogDetailPage() {
  const { selectedBlogId, setCurrentView, products } = useStore();

  const post = BLOG_POSTS.find(p => p.id === selectedBlogId) || BLOG_POSTS[0];
  const relatedProducts = products.filter(prod => post.relatedProductIds.includes(prod.id));

  return (
    <article className="bg-[#FCFBF9] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => setCurrentView('blog')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Botanical Journal</span>
        </button>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900">
            <span>{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-medium text-stone-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-xs text-stone-500 pt-2 border-b border-stone-200 pb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center font-bold text-stone-700">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-stone-900">{post.author}</p>
                <p className="text-[11px] text-stone-500">{post.authorRole}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>Published on {post.date}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100 mb-10 shadow-md">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Article Body Content */}
        <div className="prose prose-stone max-w-none space-y-6 text-stone-700 text-base leading-relaxed">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Related Formulations mentioned in Article */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-stone-200">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Formulations Featured in this Research</span>
            </div>
            <h3 className="text-2xl font-serif font-medium text-stone-900 mb-6">
              Shop Discussed Actives
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
