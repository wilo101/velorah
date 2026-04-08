/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative z-10 px-6 pt-32 pb-40 max-w-lg mx-auto w-full text-center">
      <h1 className="text-5xl md:text-6xl" style={{ fontFamily: 'var(--font-display), serif' }}>
        Lost in the quiet
      </h1>
      <p className="text-muted-foreground mt-6">This page doesn&apos;t exist. The silence is intentional—but yours need not be.</p>
      <Link href="/" prefetch className="liquid-glass inline-block rounded-full px-10 py-4 mt-10 text-foreground hover:scale-[1.03] transition-transform">
        Return home
      </Link>
    </main>
  );
}
