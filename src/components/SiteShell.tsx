/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { BackgroundVideo } from '@/components/BackgroundVideo';
import { SiteNav } from '@/components/SiteNav';
import { CommandPalette } from '@/components/CommandPalette';
import { loadFocusModeFromStorage } from '@/lib/focusMode';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useLayoutEffect(() => {
    loadFocusModeFromStorage();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground font-sans">
      <BackgroundVideo />
      <div className="velorah-scrim fixed inset-0 bg-background/40 z-0 backdrop-blur-[2px]" aria-hidden />
      <SiteNav onOpenSearch={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      {children}
    </div>
  );
}
