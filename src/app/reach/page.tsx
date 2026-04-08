/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Reach Us',
  description: 'Get in touch with Velorah.',
  openGraph: { title: 'Reach Us · Velorah' },
};

export default function ReachPage() {
  return (
    <main className="relative z-10 px-6 pt-24 pb-40 max-w-2xl mx-auto w-full text-center">
      <h1 className="text-5xl md:text-7xl animate-fade-rise" style={{ fontFamily: 'var(--font-display), serif' }}>
        Initiate Contact
      </h1>
      <p className="text-muted-foreground mt-6 animate-fade-rise-delay">
        Whether you have a project in mind or just want to share a thought, we&apos;re here to listen.
      </p>
      <div className="mt-12">
        <ContactForm />
      </div>
    </main>
  );
}
