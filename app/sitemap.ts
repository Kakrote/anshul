import { MetadataRoute } from 'next';
import { getPortfolioData } from '../lib/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const { seo } = getPortfolioData();
  const baseUrl = seo.siteUrl || 'https://anshul.dev';

  const routes = ['', '/about', '/work', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return routes;
}
