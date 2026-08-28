import { copyFile } from 'node:fs/promises';

const source = new URL('../og.jpg', import.meta.url);
const destination = new URL('../public/og.jpg', import.meta.url);

await copyFile(source, destination);
console.log('Social preview image synced for Vinext/Sites.');
