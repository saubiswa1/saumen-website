import { copyFile } from 'node:fs/promises';

const assets = [
  'og.jpg',
  'Saumen-Biswas-Resume.pdf',
  'sitemap.xml',
  'robots.txt',
];

await Promise.all(assets.map((asset) => copyFile(
  new URL(`../${asset}`, import.meta.url),
  new URL(`../public/${asset}`, import.meta.url),
)));

console.log('Public assets synced for Vinext/Sites.');
