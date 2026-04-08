/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { useEffect, useState } from 'react';
import { Check, Link2, Share2 } from 'lucide-react';

type ShareBarProps = {
  label: string;
};

export function ShareBar({ label }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  async function copyLink() {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy link:', url);
    }
  }

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: label, url });
      } catch {
        /* aborted */
      }
    } else {
      await copyLink();
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-10 pt-8 border-t border-white/10">
      <span className="text-xs uppercase tracking-widest text-muted-foreground w-full sm:w-auto sm:mr-2">Share</span>
      <button
        type="button"
        onClick={copyLink}
        className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-foreground hover:bg-white/5"
      >
        {copied ? <Check className="w-4 h-4" strokeWidth={1.5} /> : <Link2 className="w-4 h-4" strokeWidth={1.5} />}
        {copied ? 'Copied' : 'Copy link'}
      </button>
      <button
        type="button"
        onClick={share}
        className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-foreground hover:bg-white/5"
      >
        <Share2 className="w-4 h-4" strokeWidth={1.5} />
        {canShare ? 'Share…' : 'Share (copy)'}
      </button>
    </div>
  );
}
