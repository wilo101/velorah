/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Metadata } from 'next';
import { StudioPageClient } from './StudioPageClient';

export const metadata: Metadata = {
  title: 'Studio',
  description: 'Selected works and case studies from Velorah.',
  openGraph: { title: 'Studio · Velorah' },
};

export default function StudioPage() {
  return <StudioPageClient />;
}
