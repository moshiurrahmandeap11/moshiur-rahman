// generate-sitemap.js
import { SitemapStream, streamToPromise } from 'sitemap';
import { writeFile } from 'node:fs/promises';

const hostname = 'https://moshiurrahman.online';

const links = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.9 },
  { url: '/skills', changefreq: 'monthly', priority: 0.8 },
  { url: '/portfolio', changefreq: 'weekly', priority: 0.9 },
  { url: '/projects/codecircle', changefreq: 'monthly', priority: 0.7 },
  { url: '/projects/coursion', changefreq: 'monthly', priority: 0.7 },
  { url: '/projects/miverr', changefreq: 'monthly', priority: 0.7 },
  { url: '/services', changefreq: 'monthly', priority: 0.8 },
  { url: '/experience', changefreq: 'monthly', priority: 0.7 },
  { url: '/education', changefreq: 'yearly', priority: 0.6 },
  { url: '/contact', changefreq: 'monthly', priority: 0.8 },
  { url: '/blog', changefreq: 'weekly', priority: 0.7 },
  { url: '/resume', changefreq: 'monthly', priority: 0.6 },
  { url: '/testimonials', changefreq: 'monthly', priority: 0.5 },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
  { url: '/terms', changefreq: 'yearly', priority: 0.3 },
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
