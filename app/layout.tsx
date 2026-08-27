import type { Metadata } from 'next';
import './globals.css';

const title = 'Saumen Biswas — Quality Engineering & AI-Assisted Testing';
const description = 'Saumen Biswas is a Senior SDET and GenAI quality engineering leader specializing in AI-assisted testing, automation platforms, reliability, engineering intelligence, and cloud efficiency.';

export const metadata: Metadata = {
  metadataBase: new URL('https://saubiswa1.github.io/saumen-website/'),
  title,
  description,
  authors: [{ name: 'Saumen Biswas' }],
  openGraph: {
    type: 'website',
    title,
    description: 'Engineering systems that make quality, reliability, and delivery impact measurable.',
    images: [{ url: 'og.png', width: 1200, height: 630, alt: 'Saumen Biswas — Quality engineering systems that make impact measurable.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: 'Engineering systems that make quality, reliability, and delivery impact measurable.',
    images: ['og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
