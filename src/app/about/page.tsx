/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Metadata } from 'next';
import { journalArticles, studioProjects } from '@/data/siteContent';

export const metadata: Metadata = {
  title: 'About',
  description: 'The Quiet Rebels — who we are at Velorah.',
  openGraph: { title: 'About · Velorah' },
};

export default function AboutPage() {
  return (
    <main className="relative z-10 px-6 pt-24 pb-40 max-w-4xl mx-auto w-full text-center">
      <h1 className="text-5xl md:text-7xl animate-fade-rise" style={{ fontFamily: 'var(--font-display), serif' }}>
        The Quiet Rebels
      </h1>

      <div className="mt-16 space-y-8 text-lg text-muted-foreground leading-relaxed animate-fade-rise-delay text-left md:text-center max-w-2xl mx-auto">
        <p>
          Velorah was born from a simple observation: the digital world has become too loud. We are a collective of
          designers, engineers, and artists who believe in the power of silence.
        </p>
        <p>
          We craft experiences that don&apos;t demand attention, but rather invite immersion. Our tools are built for
          those who seek depth over breadth, quality over quantity, and resonance over reach.
        </p>
      </div>

      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-rise-delay-2 border-t border-white/10 pt-16">
        {[
          { label: 'Founded', value: '2024' },
          { label: 'Location', value: 'Global' },
          { label: 'Projects', value: `${studioProjects.length}+` },
          { label: 'Journal', value: `${journalArticles.length}` },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className="text-4xl text-foreground" style={{ fontFamily: 'var(--font-display), serif' }}>
              {stat.value}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest mt-2">{stat.label}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
