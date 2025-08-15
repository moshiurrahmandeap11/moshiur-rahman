// generate-sitemap.js
import { SitemapStream, streamToPromise } from 'sitemap';
import { writeFile } from 'node:fs/promises';

const hostname = 'https://moshiurrahman.online';

const links = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/blog', changefreq: 'weekly', priority: 0.7 },
  { url: '/login', changefreq: 'monthly', priority: 0.5 },
  { url: '/signup', changefreq: 'monthly', priority: 0.5 },
  { url: '/assets/resume-Bu6aSiZz.pdf', changefreq: 'yearly', priority: 0.6 },
];



async function generateSitemap() {
  try {
    const sitemapStream = new SitemapStream({ hostname });
    links.forEach(link => sitemapStream.write(link));
    sitemapStream.end();

    const sitemapOutput = await streamToPromise(sitemapStream).then(data => data.toString());
    await writeFile('public/sitemap.xml', sitemapOutput);

    console.log('✅ Sitemap successfully generated at public/sitemap.xml');
  } catch (err) {
    console.error('❌ Sitemap generation error:', err);
  }
}

generateSitemap();
