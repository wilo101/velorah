/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Lottie = dynamic(() => import('lottie-react').then((mod) => mod.default), { ssr: false });

/** Subtle ambient loop from LottieFiles CDN — override with NEXT_PUBLIC_LOTTIE_URL */
const DEFAULT_LOTTIE = 'https://assets2.lottiefiles.com/packages/lf20_aZTdD5.json';

export function HeroLottie() {
  const [data, setData] = useState<unknown>(null);
  const src = process.env.NEXT_PUBLIC_LOTTIE_URL?.trim() || DEFAULT_LOTTIE;

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((r) => r.json())
      .then((j) => {
        if (!cancelled) setData(j);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!data) {
    return <div className="h-[100px] w-full max-w-[200px] mx-auto mt-2" aria-hidden />;
  }

  return (
    <div className="w-[min(220px,45vw)] mx-auto mt-4 opacity-60 pointer-events-none select-none" aria-hidden>
      <Lottie animationData={data} loop className="w-full h-auto" />
    </div>
  );
}
