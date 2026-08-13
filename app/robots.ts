import { MetadataRoute } from 'next';
import { getPortfolioData } from '../lib/portfolio';

export default function robots(): MetadataRoute.Robots {
  const { seo } = getPortfolioData();
  const baseUrl = seo.siteUrl || 'https://anshul.dev';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
