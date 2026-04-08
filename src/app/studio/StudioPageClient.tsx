/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { studioProjects } from '@/data/siteContent';

export function StudioPageClient() {
  const categories = useMemo(() => {
    const unique = [...new Set(studioProjects.map((p) => p.category))];
    return ['All', ...unique];
  }, []);
  const [cat, setCat] = useState('All');
  const shown = useMemo(
    () => (cat === 'All' ? studioProjects : studioProjects.filter((p) => p.category === cat)),
    [cat],
  );

  return (
    <main className="relative z-10 px-6 pt-24 pb-40 max-w-7xl mx-auto w-full">
      <h1 className="text-5xl md:text-7xl animate-fade-rise" style={{ fontFamily: 'var(--font-display), serif' }}>
        Selected Works
      </h1>
      <p className="text-muted-foreground mt-4 max-w-2xl animate-fade-rise-delay">
        Case studies with context, constraints, and outcomes—click a project for the full story.
      </p>

      <div className="flex flex-wrap gap-2 mt-10 animate-fade-rise-delay" role="tablist" aria-label="Filter by category">
        {categories.map((c) => {
          const active = c === cat;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                active ? 'bg-white/15 text-foreground ring-1 ring-white/20' : 'liquid-glass text-muted-foreground hover:text-foreground'
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 animate-fade-rise-delay">
        {shown.map((p) => (
          <Link
            key={p.slug}
            href={`/studio/${p.slug}`}
            prefetch
            className="liquid-glass p-8 rounded-3xl flex flex-col justify-between aspect-video group cursor-pointer hover:bg-white/5 transition-colors text-left"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{p.category}</span>
              <span className="text-xs text-muted-foreground">{p.year}</span>
            </div>
            <div>
              <h3
                className="text-3xl mt-8 group-hover:translate-x-2 transition-transform"
                style={{ fontFamily: 'var(--font-display), serif' }}
              >
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{p.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
