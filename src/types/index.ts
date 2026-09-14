/* ══════════════════════════════════════════════
   TYPE SYSTEM : SimCity 2000 CAD Workstation
   Portfolio Marceau Chapon
   ══════════════════════════════════════════════ */

export interface Profile {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  currentStatus: string;
  bio: string[];
  contacts: {
    email: string;
    phone: string;
    phoneFormatted: string;
    github: string;
    linkedin: string;
    cvPdf: string;
  };
}

export interface Metric {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  accent: 'cyan' | 'emerald' | 'violet';
  icon: string;
  description: string;
  isFloat?: boolean;
}

export interface ProjectSection {
  id: string;
  num: string;
  title: string;
  content: string[];
  callout?: {
    icon: string;
    title: string;
    text: string;
  };
  subsections?: {
    title: string;
    text: string;
  }[];
  codeSnippet?: {
    lang: string;
    title: string;
    code: string;
  };
  table?: {
    title: string;
    headers: string[];
    rows: string[][];
  };
  oddsTable?: {
    headers: string[];
    rows: string[][];
  };
  methodSteps?: {
    step: string;
    title: string;
    desc: string;
  }[];
  figure?: {
    src: string;
    title: string;
    tag: string;
    caption: string;
  };
  infoBox?: {
    type: 'cyan' | 'emerald';
    title: string;
    text: string;
  };
  warningBox?: {
    title: string;
    text: string;
  };
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  statusBadge: string;
  statusText: string;
  statusColor: 'violet' | 'cyan' | 'emerald' | 'muted';
  thumbnail: string;
  subtitle: string;
  excerpt: string;
  tags: string[];
  summaryFooter: string;
  meta: {
    label: string;
    value: string;
    isMono?: boolean;
  }[];
  links?: {
    pdf?: string;
    github?: string;
  };
  sections: ProjectSection[];
}

export interface SkillItem {
  name: string;
  level: 'Expert' | 'Avancé' | 'Intermédiaire';
  highlight: boolean;
  description: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  accent: 'cyan' | 'emerald' | 'violet';
  items: SkillItem[];
}

export interface LanguageItem {
  lang: string;
  level: string;
  description?: string;
  code: string;
}

export interface PipelineStepItem {
  number: string;
  title: string;
  color: 'emerald' | 'cyan' | 'violet';
  icon: string;
  description: string;
  items: string[];
}

export interface SkillsData {
  categories: SkillCategory[];
  languages: LanguageItem[];
  pipelineSteps: PipelineStepItem[];
}

export interface ExperienceBadge {
  text: string;
  color: 'cyan' | 'emerald' | 'muted' | 'yellow' | 'amber' | 'red' | 'terracotta' | 'violet' | 'purple';
}

export interface ExperienceItem {
  id: string;
  period: string;
  status: string;
  isCurrent: boolean;
  title: string;
  institution: string;
  location: string;
  description: string;
  badges: ExperienceBadge[];
  accent: 'cyan' | 'emerald' | 'muted' | 'yellow' | 'amber' | 'red' | 'terracotta' | 'violet' | 'purple';
}
