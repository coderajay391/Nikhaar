'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { BLOG_POSTS } from '@/lib/data';
import { ArrowRight, BookOpen, Clock, User } from 'lucide-react';

export function BlogPage() {
  const { setSelectedBlogId, setCurrentView } = useStore();

  const handleOpenPost = (id: string) => {
    setSelectedBlogId(id);
    setCurrentView('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FCFBF9] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-900/80 mb-2">
            The Botanical Journal
          </p>
          <h1 className="text-3xl sm:text-5xl font-serif font-medium text-stone-900 tracking-tight">
            Science & Ayurvedic Wisdom
          </h1>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            Dermatological research, ingredient spotlights, and climate-specific skincare guides authored by formulation chemists and Ayurvedic vaidyas.
          </p>
        </div>

        {/* Featured Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map(post => (
            <article
              key={post.id}
              onClick={() => handleOpenPost(post.id)}
              className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-2">
                    <span className="text-amber-900 font-semibold uppercase tracking-wider">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-serif font-medium text-stone-900 group-hover:text-stone-700 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    <span>{post.author}</span>
                  </div>
                  <span className="font-semibold text-stone-900 group-hover:text-amber-800 transition-colors flex items-center gap-1">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
