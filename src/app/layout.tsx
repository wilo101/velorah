/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Instrument_Serif, Inter } from 'next/font/google';
import './globals.css';
import { GoogleTagManager } from '@/components/GoogleTagManager';
import { SiteShell } from '@/components/SiteShell';

const fontDisplay = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

const fontBody = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://velorah.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Velorah', template: '%s · Velorah' },
  description:
    'Velorah — cinematic creative studio: digital experiences, product design, and quiet interfaces for deep focus.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Velorah',
    title: 'Velorah',
    description: 'Where dreams rise through the silence. Studio for bold creators and quiet rebels.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velorah',
    description: 'Where dreams rise through the silence.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://d8j0ntlcm91z4.cloudfront.net" />
      </head>
      <body className="antialiased">
        <GoogleTagManager />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
