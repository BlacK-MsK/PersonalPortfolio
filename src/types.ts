export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
  gif?: string; // URL for the hover animation
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
  description?: string; // New field for tooltip
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}