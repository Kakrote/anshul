import portfolioDataRaw from '../data/portfolio.json';
import { PortfolioData, Project, Service, SkillCategory, Testimonial } from '../types/portfolio';

export const portfolioData: PortfolioData = portfolioDataRaw as PortfolioData;

export function getPortfolioData(): PortfolioData {
  return portfolioData;
}

export function getFeaturedProjects(): Project[] {
  return portfolioData.projects.filter(p => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return portfolioData.projects.find(p => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'all') return portfolioData.projects;
  return portfolioData.projects.filter(p => p.category === category);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return portfolioData.services.find(s => s.slug === slug);
}
