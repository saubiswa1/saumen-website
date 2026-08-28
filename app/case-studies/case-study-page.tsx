import type { Metadata } from 'next';
import { siteMetadata } from '../../site.config.mjs';
import PortfolioBehavior from '../portfolio-behavior';

type Study = {
  slug: string;
  heading: string;
  title: string;
  description: string;
  canonicalUrl: string;
};

export function createCaseStudyMetadata(study: Study): Metadata {
  return {
    title: study.title,
    description: study.description,
    alternates: { canonical: study.canonicalUrl },
    openGraph: {
      type: 'article',
      url: study.canonicalUrl,
      siteName: siteMetadata.author,
      title: study.title,
      description: study.description,
      images: [{
        url: siteMetadata.socialImage,
        width: 1200,
        height: 630,
        alt: siteMetadata.socialImageAlt,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: study.title,
      description: study.description,
      images: [siteMetadata.socialImage],
    },
  };
}

export default function CaseStudyPage({ html, study }: { html: string; study: Study }) {
  const bodyMarkup = html
    .match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]
    ?.replace(/<script\s+src="\.\.\/\.\.\/script\.js"\s+defer><\/script>/i, '') ?? '';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.heading,
    description: study.description,
    url: study.canonicalUrl,
    image: siteMetadata.socialImage,
    author: {
      '@type': 'Person',
      name: siteMetadata.author,
      url: siteMetadata.canonicalUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      <div dangerouslySetInnerHTML={{ __html: bodyMarkup }} />
      <PortfolioBehavior />
    </>
  );
}
