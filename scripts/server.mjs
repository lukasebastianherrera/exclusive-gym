import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('.');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.txt': 'text/plain' };
const allowed = new Set(['/index.html', '/styles.css', '/app.js', '/config.js', '/robots.txt']);
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const path = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
    const file = resolve(root, `.${path}`);
    if ((!allowed.has(path) && !path.startsWith('/assets/')) || !file.startsWith(root + sep)) { res.writeHead(404); res.end('No encontrado'); return; }
    const content = await readFile(file); res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' }); res.end(content);
  } catch { res.writeHead(404); res.end('No encontrado'); }
}).listen(5173, '127.0.0.1', () => console.log('Local: http://localhost:5173'));
