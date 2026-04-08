/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, studioProjects } from '@/data/siteContent';
import { StudioProjectClient } from './StudioProjectClient';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return studioProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    openGraph: { title: `${project.title} · Velorah`, description: project.tagline },
  };
}

export default async function StudioProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <StudioProjectClient project={project} />;
}
