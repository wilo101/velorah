/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { getSavedSlugs, isArticleSaved, toggleArticleSaved } from '../lib/savedArticles';

export function useSavedSlugs(): string[] {
  const [slugs, setSlugs] = useState<string[]>(() => getSavedSlugs());

  useEffect(() => {
    const sync = () => setSlugs(getSavedSlugs());
    window.addEventListener('velorah-saved-change', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('velorah-saved-change', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return slugs;
}

export function useArticleSaveToggle(slug: string): { saved: boolean; toggle: () => void } {
  const [saved, setSaved] = useState(() => isArticleSaved(slug));

  useEffect(() => {
    setSaved(isArticleSaved(slug));
  }, [slug]);

  useEffect(() => {
    const sync = () => setSaved(isArticleSaved(slug));
    window.addEventListener('velorah-saved-change', sync);
    return () => window.removeEventListener('velorah-saved-change', sync);
  }, [slug]);

  const toggle = useCallback(() => {
    const next = toggleArticleSaved(slug);
    setSaved(next);
  }, [slug]);

  return { saved, toggle };
}
