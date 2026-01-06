export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
  date: string;
  metrics?: {
    views: number;
    stars: number;
  };
}

export interface Skill {
  name: string;
  level: number;
  category: 'Frontend' | 'Backend' | 'Design' | 'Tools';
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  icon: string;
}

export type Theme = 'light' | 'dark' | 'retro';

export interface AppState {
  theme: Theme;
  isTerminalOpen: boolean;
  activeProject: Project | null;
}