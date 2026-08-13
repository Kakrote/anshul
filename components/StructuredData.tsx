import React from 'react';
import { getPortfolioData } from '../lib/portfolio';

export default function StructuredData() {
  const { personal, seo } = getPortfolioData();

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.name,
    jobTitle: personal.title,
    url: seo.siteUrl,
    email: personal.email,
    description: personal.heroSubtext,
    sameAs: (personal?.socials || []).map((s) => s.url),
    knowsAbout: [
      'MERN Stack',
      'PERN Stack',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Docker',
      'VPS Deployment',
      'Claude Code',
      'AI Integration',
      'CI/CD Pipelines',
      'React.js',
      'Next.js',
      'Node.js'
    ],
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seo.title,
    url: seo.siteUrl,
    description: seo.description,
    author: {
      '@type': 'Person',
      name: personal.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
    </>
  );
}
