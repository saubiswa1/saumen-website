import type { Metadata, Viewport } from 'next';
import { siteMetadata } from '../site.config.mjs';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.canonicalUrl),
  title: siteMetadata.title,
  description: siteMetadata.description,
  authors: [{ name: siteMetadata.author }],
  verification: { google: siteMetadata.googleSiteVerification },
  alternates: { canonical: siteMetadata.canonicalUrl },
  openGraph: {
    type: 'website',
    url: siteMetadata.canonicalUrl,
    siteName: siteMetadata.author,
    title: siteMetadata.title,
    description: siteMetadata.socialDescription,
    images: [{ url: siteMetadata.socialImage, width: 1200, height: 630, alt: siteMetadata.socialImageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.socialDescription,
    images: [siteMetadata.socialImage],
  },
};

export const viewport: Viewport = {
  themeColor: siteMetadata.themeColor,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: siteMetadata.earlyEnhancementScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteMetadata.personSchema).replace(/</g, '\\u003c') }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
