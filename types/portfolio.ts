export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  handle: string;
  tagline: string;
  heroSubtext: string;
  bioHeading: string;
  bioParagraphs: string[];
  location: string;
  email: string;
  phone: string;
  avatar: string;
  resumeUrl: string;
  availabilityStatus: string;
  yearsOfExperience: string;
  projectCount: string;
  clientSatisfactionRate: string;
  socials: SocialLink[];
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  siteUrl: string;
  ogImage: string;
  twitterHandle: string;
}

export interface SkillItem {
  name: string;
  level: number;
  iconName?: string;
  isPrimary?: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'full-time' | 'freelance' | 'contract';
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  category: 'saas' | 'fullstack' | 'ai' | 'devops';
  featured: boolean;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
  metrics: Metric[];
  keyFeatures: string[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  deliverables: string[];
  process: string[];
  startingPrice: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  company: string;
  avatar: string;
  rating: number;
  projectTitle: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  timezone: string;
  workingHours: string;
  responseTime: string;
  subjectOptions: string[];
  faqs: FAQItem[];
}

export interface PortfolioData {
  personal: PersonalInfo;
  seo: SEOSettings;
  skills: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  contact: ContactInfo;
}
