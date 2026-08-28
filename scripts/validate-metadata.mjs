import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
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

console.log('Static and Vinext metadata are aligned.');
