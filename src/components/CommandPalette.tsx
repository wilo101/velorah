/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FileText, FolderKanban, Search } from 'lucide-react';
import { journalArticles, studioProjects } from '@/data/siteContent';

export type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

type Item = { id: string; type: 'project' | 'article'; title: string; hint: string; to: string };

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(() => {
    const projectItems: Item[] = studioProjects.map((p) => ({
      id: `p-${p.slug}`,
      type: 'project',
      title: p.title,
      hint: `${p.category} · ${p.year}`,
      to: `/studio/${p.slug}`,
    }));
    const articleItems: Item[] = journalArticles.map((a) => ({
      id: `a-${a.slug}`,
      type: 'article',
      title: a.title,
      hint: a.date,
      to: `/journal/${a.slug}`,
    }));
    return [...projectItems, ...articleItems];
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(
      (i) => i.title.toLowerCase().includes(s) || i.hint.toLowerCase().includes(s) || i.type.includes(s),
    );
  }, [items, q]);

  useEffect(() => {
    setActive(0);
  }, [q, open]);

  useEffect(() => {
    if (!open) {
      setQ('');
      return;
    }
    const t = window.setTimeout(() => inputRef.current?.focus(), 10);
    return () => window.clearTimeout(t);
  }, [open]);

  const go = useCallback(
    (to: string) => {
      router.push(to);
      onClose();
    },
    [router, onClose],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, Math.max(0, filtered.length - 1)));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && filtered[active]) {
        e.preventDefault();
        go(filtered[active].to);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, active, go]);

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm data-[state=closed]:animate-none" />
        <Dialog.Content
          className="fixed left-1/2 top-[15vh] z-[101] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 liquid-glass rounded-2xl shadow-2xl overflow-hidden border border-white/15 outline-none focus:outline-none"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Dialog.Title className="sr-only">Search Velorah</Dialog.Title>
          <Dialog.Description className="sr-only">Search projects and journal posts.</Dialog.Description>

          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
            <Search className="w-5 h-5 text-muted-foreground shrink-0" strokeWidth={1.5} />
            <input
              ref={inputRef}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Find a project or journal piece…"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-base"
            />
            <kbd className="hidden sm:inline text-[10px] text-muted-foreground border border-white/15 rounded px-1.5 py-0.5">
              esc
            </kbd>
          </div>
          <ul className="max-h-[50vh] overflow-y-auto py-2">
            {filtered.length === 0 ? (
              <li className="px-4 py-8 text-center text-muted-foreground text-sm">No matches.</li>
            ) : (
              filtered.map((item, index) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onClick={() => go(item.to)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      index === active ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    {item.type === 'project' ? (
                      <FolderKanban className="w-4 h-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
                    ) : (
                      <FileText className="w-4 h-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
                    )}
                    <div className="min-w-0">
                      <div className="text-foreground truncate">{item.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{item.hint}</div>
                    </div>
                  </button>
                </li>
              ))
            )}
          </ul>
          <div className="px-4 py-2 border-t border-white/10 text-[10px] text-muted-foreground flex justify-between">
            <span>↑↓ navigate · ↵ open</span>
            <span className="hidden sm:inline">⌘K / Ctrl+K</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
