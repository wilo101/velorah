/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Menu, Search, X } from 'lucide-react';
import { getFocusMode, loadFocusModeFromStorage, setFocusMode } from '../lib/focusMode';

const links = [
  { path: '/', label: 'Home' },
  { path: '/studio', label: 'Studio' },
  { path: '/about', label: 'About' },
  { path: '/journal', label: 'Journal' },
  { path: '/reach', label: 'Reach Us' },
] as const;

function pathMatches(path: string, current: string): boolean {
  if (path === '/') return current === '/' || current === '';
  return current === path || current.startsWith(`${path}/`);
}

export type SiteNavProps = {
  onOpenSearch: () => void;
};

export function SiteNav({ onOpenSearch }: SiteNavProps) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [focusOn, setFocusOn] = useState(false);
  const pathname = location.pathname;

  useLayoutEffect(() => {
    loadFocusModeFromStorage();
    setFocusOn(getFocusMode());
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function toggleFocus() {
    const next = !getFocusMode();
    setFocusMode(next);
    setFocusOn(next);
  }

  return (
    <>
      <nav className="relative print:hidden z-40 flex flex-row items-center justify-between px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full gap-2">
        <Link
          to="/"
          className="text-2xl sm:text-3xl tracking-tight text-foreground shrink-0"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Velorah<sup className="text-xs">®</sup>
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm transition-colors ${
                pathMatches(link.path, pathname) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenSearch}
            className="liquid-glass rounded-full p-3 text-foreground hover:scale-[1.03] transition-transform"
            aria-label="Search"
            title="Search (⌘K)"
          >
            <Search className="w-5 h-5" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={toggleFocus}
            className={`hidden sm:inline-flex liquid-glass rounded-full p-3 transition-transform hover:scale-[1.03] ${
              focusOn ? 'text-foreground ring-1 ring-white/25' : 'text-foreground'
            }`}
            aria-pressed={focusOn}
            aria-label={focusOn ? 'Disable focus mode' : 'Enable focus mode'}
            title="Dim background for reading"
          >
            {focusOn ? <EyeOff className="w-5 h-5" strokeWidth={1.5} /> : <Eye className="w-5 h-5" strokeWidth={1.5} />}
          </button>

          <Link
            to="/reach"
            className="liquid-glass rounded-full px-5 py-2.5 text-sm text-foreground hover:scale-[1.03] cursor-pointer hidden lg:inline-block"
          >
            Begin Journey
          </Link>

          <button
            type="button"
            className="md:hidden liquid-glass rounded-full p-3 text-foreground hover:scale-[1.03] transition-transform"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="md:hidden fixed inset-0 z-30 pt-[5.5rem] px-6 pb-10 flex flex-col bg-background/85 backdrop-blur-md animate-fade-rise">
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => {
                onOpenSearch();
                setOpen(false);
              }}
              className="flex-1 liquid-glass rounded-2xl px-4 py-3 text-sm text-foreground flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" strokeWidth={1.5} /> Search
            </button>
            <button
              type="button"
              onClick={toggleFocus}
              className={`flex-1 liquid-glass rounded-2xl px-4 py-3 text-sm flex items-center justify-center gap-2 ${
                focusOn ? 'text-foreground ring-1 ring-white/25' : 'text-foreground'
              }`}
            >
              {focusOn ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />} Focus
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`liquid-glass rounded-2xl px-5 py-4 text-lg ${
                  pathMatches(link.path, pathname) ? 'text-foreground' : 'text-muted-foreground'
                }`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link to="/reach" className="liquid-glass rounded-full px-8 py-4 text-center text-foreground mt-auto">
            Begin Journey
          </Link>
        </div>
      ) : null}
    </>
  );
}
