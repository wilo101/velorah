/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, journalArticles } from '@/data/siteContent';
import { JournalArticleClient } from './JournalArticleClient';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return journalArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: `${article.title} · Velorah`, description: article.excerpt, type: 'article' },
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  return <JournalArticleClient article={article} />;
}
