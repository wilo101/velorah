/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const STORAGE_KEY = 'velorah:journal-saved';

export function getSavedSlugs(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export function isArticleSaved(slug: string): boolean {
  return getSavedSlugs().includes(slug);
}

export function setArticleSaved(slug: string, saved: boolean): void {
  const next = new Set(getSavedSlugs());
  if (saved) next.add(slug);
  else next.delete(slug);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
  window.dispatchEvent(new CustomEvent('velorah-saved-change'));
}

export function toggleArticleSaved(slug: string): boolean {
  const next = !isArticleSaved(slug);
  setArticleSaved(slug, next);
  return next;
}
