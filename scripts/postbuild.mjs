// Vercel serves dist/404.html (with a real 404 status) for unknown URLs.
// It is the app shell, so the React "page not found" screen still renders.
import { copyFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));
console.log('postbuild: wrote dist/404.html');
