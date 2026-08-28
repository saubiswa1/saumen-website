import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { caseStudies } from '../case-studies.config.mjs';
import { siteMetadata } from '../site.config.mjs';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const requiredHeadMarkup = [
  `<script>${siteMetadata.earlyEnhancementScript}</script>`,
  `<meta name="description" content="${escapeHtml(siteMetadata.description)}">`,
  `<meta name="author" content="${escapeHtml(siteMetadata.author)}">`,
  `<meta name="theme-color" content="${siteMetadata.themeColor}">`,
  `<link rel="canonical" href="${siteMetadata.canonicalUrl}">`,
  `<meta property="og:title" content="${escapeHtml(siteMetadata.title)}">`,
  `<meta property="og:description" content="${escapeHtml(siteMetadata.socialDescription)}">`,
  `<meta property="og:url" content="${siteMetadata.canonicalUrl}">`,
  `<meta property="og:image" content="${siteMetadata.socialImage}">`,
  `<meta property="og:image:alt" content="${escapeHtml(siteMetadata.socialImageAlt)}">`,
  `<meta name="twitter:title" content="${escapeHtml(siteMetadata.title)}">`,
  `<meta name="twitter:description" content="${escapeHtml(siteMetadata.socialDescription)}">`,
  `<meta name="twitter:image" content="${siteMetadata.socialImage}">`,
  `<title>${escapeHtml(siteMetadata.title)}</title>`,
];

for (const markup of requiredHeadMarkup) {
  assert.ok(html.includes(markup), `Static metadata is out of sync: ${markup}`);
}

const jsonLdMatch = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
assert.ok(jsonLdMatch, 'Static Person JSON-LD is missing');
assert.deepEqual(JSON.parse(jsonLdMatch[1]), siteMetadata.personSchema, 'Static Person JSON-LD is out of sync');

for (const study of Object.values(caseStudies)) {
  const caseStudyHtml = await readFile(
    new URL(`../case-studies/${study.slug}/index.html`, import.meta.url),
    'utf8',
  );

  const requiredCaseStudyMarkup = [
    `<script>${siteMetadata.earlyEnhancementScript}</script>`,
    `<meta name="description" content="${escapeHtml(study.description)}">`,
    `<meta name="author" content="${escapeHtml(siteMetadata.author)}">`,
    `<meta name="theme-color" content="${siteMetadata.themeColor}">`,
    `<link rel="canonical" href="${study.canonicalUrl}">`,
    `<meta property="og:title" content="${escapeHtml(study.title)}">`,
    `<meta property="og:description" content="${escapeHtml(study.description)}">`,
    `<meta property="og:url" content="${study.canonicalUrl}">`,
    `<meta property="og:image" content="${siteMetadata.socialImage}">`,
    `<meta property="og:image:alt" content="${escapeHtml(siteMetadata.socialImageAlt)}">`,
    `<meta name="twitter:title" content="${escapeHtml(study.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(study.description)}">`,
    `<meta name="twitter:image" content="${siteMetadata.socialImage}">`,
    `<title>${escapeHtml(study.title)}</title>`,
  ];

  for (const markup of requiredCaseStudyMarkup) {
    assert.ok(
      caseStudyHtml.includes(markup),
      `Static case-study metadata is out of sync for ${study.slug}: ${markup}`,
    );
  }

  assert.ok(
    html.includes(`href="case-studies/${study.slug}/"`),
    `Homepage link is missing for ${study.slug}`,
  );

  const caseStudyJsonLdMatch = caseStudyHtml.match(
    /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/,
  );
  assert.ok(caseStudyJsonLdMatch, `Static Article JSON-LD is missing for ${study.slug}`);
  assert.deepEqual(JSON.parse(caseStudyJsonLdMatch[1]), {
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
  }, `Static Article JSON-LD is out of sync for ${study.slug}`);
}

console.log('Static and Vinext metadata are aligned across the homepage and case studies.');
