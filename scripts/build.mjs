import { mkdir, copyFile, readdir, readFile, writeFile } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'config.js', 'robots.txt']) await copyFile(file, `dist/${file}`);
await mkdir('dist/assets', { recursive: true });
for (const file of await readdir('assets')) if (/\.(webp|png|ttf|woff2)$/.test(file) || file === 'fonts.css') await copyFile(`assets/${file}`, `dist/assets/${file}`);
const siteUrl = process.env.SITE_URL;
if (siteUrl) {
  const origin = new URL(siteUrl).origin;
  let html = await readFile('dist/index.html', 'utf8');
  html = html.replace('content="/assets/gimnasio.webp"', `content="${origin}/assets/gimnasio.webp"`).replace('</head>', `<link rel="canonical" href="${origin}/"><meta property="og:url" content="${origin}/"></head>`);
  await writeFile('dist/index.html', html);
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
}
console.log('Build completo: dist/');
