/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Link from 'next/link';
import { FadeIn } from '@/components/FadeIn';
import { HeroLottie } from '@/components/HeroLottie';

export default function HomePage() {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 min-h-[calc(100vh-88px)]">
      <FadeIn>
        <h1
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal"
          style={{ fontFamily: 'var(--font-display), serif' }}
        >
          Where <em className="not-italic text-muted-foreground">dreams</em> rise{' '}
          <em className="not-italic text-muted-foreground">through the silence.</em>
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed">
          We&apos;re designing tools for deep thinkers, bold creators, and quiet rebels. Amid the chaos, we build digital
          spaces for sharp focus and inspired work.
        </p>
      </FadeIn>

      <FadeIn delay={0.35}>
        <Link
          href="/studio"
          prefetch
          className="liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] cursor-pointer inline-block"
        >
          Explore Our Work
        </Link>
      </FadeIn>

      <HeroLottie />

      <FadeIn delay={0.45}>
        <p className="text-xs text-muted-foreground/90 mt-6 max-w-md leading-relaxed">
          <span className="inline-flex items-center gap-1 flex-wrap justify-center">
            Press{' '}
            <kbd className="px-1.5 py-0.5 rounded border border-white/20 font-sans text-[10px]">⌘K</kbd>{' '}
            <span className="hidden sm:inline">or</span>{' '}
            <kbd className="px-1.5 py-0.5 rounded border border-white/20 font-sans text-[10px]">Ctrl+K</kbd>
            — instant search across projects &amp; essays.
          </span>
        </p>
      </FadeIn>
    </main>
  );
}
