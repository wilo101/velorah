/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Bookmark, BookmarkCheck, Search } from 'lucide-react';
import { journalArticles } from '@/data/siteContent';
import { useSavedSlugs } from '@/hooks/useSavedArticles';

export function JournalPageClient() {
  const [query, setQuery] = useState('');
  const [savedOnly, setSavedOnly] = useState(false);
  const savedSlugs = useSavedSlugs();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return journalArticles.filter((a) => {
      if (savedOnly && !savedSlugs.includes(a.slug)) return false;
      if (!q) return true;
      return a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
    });
  }, [query, savedOnly, savedSlugs]);

  return (
    <main className="relative z-10 px-6 pt-24 pb-40 max-w-4xl mx-auto w-full">
      <h1 className="text-5xl md:text-7xl animate-fade-rise" style={{ fontFamily: 'var(--font-display), serif' }}>
        Thoughts &amp; Echoes
      </h1>
      <p className="text-muted-foreground mt-4 animate-fade-rise-delay">Long-form notes on quiet interfaces and studio practice.</p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-rise-delay">
        <div className="liquid-glass rounded-2xl flex items-center gap-3 px-4 py-3 flex-1">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles & excerpts…"
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm"
            aria-label="Search journal"
          />
        </div>
        <button
          type="button"
          onClick={() => setSavedOnly((v) => !v)}
          className={`liquid-glass rounded-2xl px-5 py-3 text-sm flex items-center justify-center gap-2 transition-colors ${
            savedOnly ? 'text-foreground ring-1 ring-white/25' : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-pressed={savedOnly}
        >
          {savedOnly ? <BookmarkCheck className="w-4 h-4" strokeWidth={1.5} /> : <Bookmark className="w-4 h-4" strokeWidth={1.5} />}
          Saved{savedSlugs.length > 0 ? ` (${savedSlugs.length})` : ''}
        </button>
      </div>

      <div className="mt-16 flex flex-col animate-fade-rise-delay">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground py-16 text-center border border-white/10 rounded-2xl liquid-glass">
            {savedOnly ? 'No saved pieces yet — open an article and tap Save for later.' : 'No articles match your search.'}
          </p>
        ) : (
          filtered.map((a) => (
            <Link
              key={a.slug}
              href={`/journal/${a.slug}`}
              prefetch
              className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-white/10 cursor-pointer hover:border-white/30 transition-colors text-left"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                <span className="text-sm text-muted-foreground w-32 shrink-0">{a.date}</span>
                <div>
                  <h2
                    className="text-2xl md:text-3xl text-foreground group-hover:translate-x-2 transition-transform"
                    style={{ fontFamily: 'var(--font-display), serif' }}
                  >
                    {a.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2 max-w-xl">{a.excerpt}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground mt-4 md:mt-0 uppercase tracking-widest shrink-0">{a.readTime}</span>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
