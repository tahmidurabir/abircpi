import { Project, Skill, TimelineEvent } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Enterprise CRM Sync',
    description: 'Automated bi-directional sync between HubSpot and custom PostgreSQL databases using n8n.',
    longDescription: 'A complex automation architecture that handles data transformation, error logging, and real-time updates across multiple platforms. Utilizes custom JS nodes in n8n for sophisticated JSON parsing.',
    tags: ['n8n', 'PostgreSQL', 'JSON', 'Custom Workflow'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbdac8626ad1?auto=format&fit=crop&q=80&w=800',
    demoUrl: '#',
    githubUrl: '#',
    date: '2024-05-15',
    metrics: { views: 3420, stars: 128 }
  },
  {
    id: '2',
    title: 'Smart Invoicing Engine',
    description: 'End-to-end automated billing system with PDF generation and email automation.',
    longDescription: 'Designed a custom workflow that triggers on payment events, fetches data from PostgreSQL, generates dynamic JSON-based reports, and sends personalized invoices.',
    tags: ['Automation', 'JSON', 'n8n', 'Node.js'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    demoUrl: '#',
    githubUrl: '#',
    date: '2024-02-10',
    metrics: { views: 1840, stars: 92 }
  },
  {
    id: '3',
    title: 'AI Lead Scraper',
    description: 'Automated lead generation bot using AI-driven n8n nodes and custom search logic.',
    longDescription: 'An advanced scraper that identifies potential clients based on JSON criteria and populates a high-performance PostgreSQL database for sales teams.',
    tags: ['n8n', 'AI', 'Workflow', 'PostgreSQL'],
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    demoUrl: '#',
    githubUrl: '#',
    date: '2023-11-05',
    metrics: { views: 5200, stars: 310 }
  }
];

export const SKILLS: Skill[] = [
  { name: 'n8n Automation', level: 98, category: 'Backend' },
  { name: 'PostgreSQL', level: 92, category: 'Backend' },
  { name: 'JSON Mastery', level: 95, category: 'Tools' },
  { name: 'Custom Workflows', level: 96, category: 'Backend' },
  { name: 'JavaScript', level: 88, category: 'Frontend' },
  { name: 'API Integration', level: 94, category: 'Backend' },
  { name: 'React', level: 80, category: 'Frontend' },
  { name: 'SQL Architecture', level: 85, category: 'Backend' }
];

export const TIMELINE: TimelineEvent[] = [
  {
    id: 't1',
    year: '2024 - Present',
    title: 'Automation Architect',
    company: 'Self-Employed / Freelance',
    description: 'Mastering the art of automation to scale business operations globally.',
    icon: 'zap'
  },
  {
    id: 't2',
    year: '2022 - 2024',
    title: 'Vibe Coding Explorer',
    company: 'Digital Innovation Hub',
    description: 'Leveraging AI and low-code tools to create high-impact workflows with "vibe coding" principles.',
    icon: 'code'
  },
  {
    id: 't3',
    year: '2020 - 2022',
    title: 'Learning n8n',
    company: 'Tech Academy',
    description: 'The beginning of the journey: discovering the power of visual workflow automation.',
    icon: 'briefcase'
  }
];