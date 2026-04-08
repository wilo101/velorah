/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import Link from 'next/link';
import { ArrowLeft, Bookmark, BookmarkCheck } from 'lucide-react';
import { ReadingProgress } from '@/components/ReadingProgress';
import { ShareBar } from '@/components/ShareBar';
import type { JournalArticle } from '@/data/siteContent';
import { useArticleSaveToggle } from '@/hooks/useSavedArticles';

export function JournalArticleClient({ article }: { article: JournalArticle }) {
  const { saved, toggle } = useArticleSaveToggle(article.slug);

  return (
    <>
      <ReadingProgress />
      <article className="relative z-10 px-6 pt-20 pb-40 max-w-3xl mx-auto w-full">
        <Link
          href="/journal"
          prefetch
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4 mr-1" strokeWidth={1.5} />
          Journal
        </Link>

        <p className="text-sm text-muted-foreground">
          {article.date} · {article.readTime}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mt-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl flex-1" style={{ fontFamily: 'var(--font-display), serif' }}>
            {article.title}
          </h1>
          <button
            type="button"
            onClick={toggle}
            className={`shrink-0 liquid-glass rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2 ${
              saved ? 'text-foreground ring-1 ring-white/25' : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-pressed={saved}
          >
            {saved ? <BookmarkCheck className="w-4 h-4" strokeWidth={1.5} /> : <Bookmark className="w-4 h-4" strokeWidth={1.5} />}
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
        <p className="text-lg text-muted-foreground mt-6 leading-relaxed">{article.excerpt}</p>

        <div className="mt-14 space-y-12 text-muted-foreground leading-relaxed">
          {article.sections.map((sec) => (
            <section key={sec.heading}>
              <h2 className="text-xl text-foreground mb-4" style={{ fontFamily: 'var(--font-display), serif' }}>
                {sec.heading}
              </h2>
              <p>{sec.body}</p>
            </section>
          ))}
        </div>

        <ShareBar label={article.title} />
      </article>
    </>
  );
}
