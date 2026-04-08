/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ShareBar } from '@/components/ShareBar';
import type { StudioProject } from '@/data/siteContent';

export function StudioProjectClient({ project }: { project: StudioProject }) {
  return (
    <main className="relative z-10 px-6 pt-20 pb-40 max-w-3xl mx-auto w-full">
      <Link
        href="/studio"
        prefetch
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4 mr-1" strokeWidth={1.5} />
        Selected Works
      </Link>

      <p className="text-xs uppercase tracking-widest text-muted-foreground animate-fade-rise">
        {project.category} · {project.year}
      </p>
      <h1 className="text-4xl sm:text-6xl md:text-7xl mt-3 animate-fade-rise" style={{ fontFamily: 'var(--font-display), serif' }}>
        {project.title}
      </h1>
      <p className="text-lg text-muted-foreground mt-6 leading-relaxed animate-fade-rise-delay">{project.tagline}</p>

      <div className="mt-12 space-y-6 text-muted-foreground leading-relaxed animate-fade-rise-delay">
        <p className="text-foreground/90">{project.overview}</p>
        <div className="liquid-glass rounded-2xl p-6 space-y-2">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Role</p>
          <p className="text-foreground/90">{project.role}</p>
        </div>
        <div className="liquid-glass rounded-2xl p-6 space-y-3">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Stack</p>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tag) => (
              <li key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 text-foreground/90 border border-white/10">
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <div className="liquid-glass rounded-2xl p-6 space-y-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Highlights</p>
          <ul className="list-disc pl-5 space-y-2">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </div>

      <ShareBar label={project.title} />

      <Link
        href="/reach"
        prefetch
        className="liquid-glass inline-block rounded-full px-10 py-4 text-foreground mt-8 hover:scale-[1.03] transition-transform"
      >
        Start a similar project
      </Link>
    </main>
  );
}
