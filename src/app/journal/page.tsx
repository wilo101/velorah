/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Metadata } from 'next';
import { JournalPageClient } from './JournalPageClient';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Thoughts and essays on quiet interfaces from Velorah.',
  openGraph: { title: 'Journal · Velorah' },
};

export default function JournalPage() {
  return <JournalPageClient />;
}
