import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

// Distinct chromatic identities for each project to avoid monochrome look
interface ProjectTheme {
  titleColor: string;
  badge: string;
  dot: string;
  tag: string;
  accentBorder: string;
  btnHover: string;
}

const projectThemes: Record<string, ProjectTheme> = {
  'memoire-vefa': {
    titleColor: 'text-[#9a3412] dark:text-orange-400',
    badge: 'text-[#9a3412] dark:text-orange-200 bg-[#ffedd5] dark:bg-orange-950/70 border-orange-500/80 dark:border-orange-500/60 shadow-sm font-bold',
    dot: 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.9)] dark:bg-orange-400',
    tag: 'text-[#9a3412] dark:text-orange-200 bg-[#ffedd5] dark:bg-orange-950/70 border-orange-500/80 dark:border-orange-500/60 font-bold',
    accentBorder: 'hover:border-orange-500',
    btnHover: 'hover:bg-orange-600',
  },
  'article-ipa': {
    titleColor: 'text-[#1e40af] dark:text-blue-400',
    badge: 'text-[#1e40af] dark:text-blue-200 bg-[#dbeafe] dark:bg-blue-950/70 border-blue-500/80 dark:border-blue-500/60 shadow-sm font-bold',
    dot: 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.9)] dark:bg-blue-400',
    tag: 'text-[#1e40af] dark:text-blue-200 bg-[#dbeafe] dark:bg-blue-950/70 border-blue-500/80 dark:border-blue-500/60 font-bold',
    accentBorder: 'hover:border-blue-500',
    btnHover: 'hover:bg-blue-600',
  },
  'grand-avignon-climat': {
    titleColor: 'text-[#166534] dark:text-emerald-400',
    badge: 'text-[#166534] dark:text-emerald-200 bg-[#dcfce7] dark:bg-emerald-950/70 border-emerald-600/80 dark:border-emerald-500/60 shadow-sm font-bold',
    dot: 'bg-emerald-600 shadow-[0_0_8px_rgba(22,163,74,0.9)] dark:bg-emerald-400',
    tag: 'text-[#166534] dark:text-emerald-200 bg-[#dcfce7] dark:bg-emerald-950/70 border-emerald-600/80 dark:border-emerald-500/60 font-bold',
    accentBorder: 'hover:border-emerald-600',
    btnHover: 'hover:bg-emerald-600',
  },
  'rennes-foncier-sig': {
    titleColor: 'text-[#6b21a8] dark:text-purple-400',
    badge: 'text-[#6b21a8] dark:text-purple-200 bg-[#f3e8ff] dark:bg-purple-950/70 border-purple-500/80 dark:border-purple-500/60 shadow-sm font-bold',
    dot: 'bg-purple-600 shadow-[0_0_8px_rgba(168,85,247,0.9)] dark:bg-purple-400',
    tag: 'text-[#6b21a8] dark:text-purple-200 bg-[#f3e8ff] dark:bg-purple-950/70 border-purple-500/80 dark:border-purple-500/60 font-bold',
    accentBorder: 'hover:border-purple-500',
    btnHover: 'hover:bg-purple-600',
  },
};

const defaultTheme: ProjectTheme = {
  titleColor: 'text-retro-cyan',
  badge: 'text-retro-cyan bg-bp-surface border-bevel-mid',
  dot: 'bg-retro-cyan shadow-[0_0_6px_rgba(2,132,199,0.8)]',
  tag: 'text-bp-text bg-bp-surface border-bevel-mid font-bold',
  accentBorder: 'hover:border-retro-cyan/70',
  btnHover: 'hover:bg-retro-cyan',
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps): React.ReactElement {
  const theme = projectThemes[project.slug] || defaultTheme;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      className={`group bevel-window flex flex-col justify-between overflow-hidden ${theme.accentBorder} transition-all`}
    >
      {/* ── 16-Bit Window Titlebar (Colored pixel title + Colored LED dot) ── */}
      <div className="bevel-titlebar">
        <div className="flex items-center gap-2 overflow-hidden">
          {/* Colored LED dot */}
          <span className={`w-2.5 h-2.5 rounded-full ${theme.dot} flex-shrink-0 animate-pulse`} />
          
          {/* Colored Pixel Art Short Title */}
          <span className={`font-pixel text-[0.6875rem] font-bold tracking-wider uppercase truncate ${theme.titleColor}`}>
            {project.shortTitle}
          </span>
        </div>
        <div className="bevel-controls">
          <span className="bevel-control-btn">_</span>
          <span className="bevel-control-btn">□</span>
          <span className="bevel-control-btn">×</span>
        </div>
      </div>

      {/* ── Card Content ── */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Inset Thumbnail Frame */}
          <Link
            to={`/projet/${project.slug}`}
            className="block relative aspect-[16/9] w-full overflow-hidden bevel-inset group-hover:border-retro-cyan/60 transition-colors"
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover object-center transform transition-transform duration-300 group-hover:scale-[1.02] opacity-95 group-hover:opacity-100"
            />

            {/* Small status chip with pixel font */}
            <div className="absolute top-2.5 left-2.5">
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[0.5625rem] font-pixel uppercase tracking-wider backdrop-blur-sm border ${theme.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                {project.statusBadge}
              </span>
            </div>
          </Link>

          {/* Color-coded Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className={`retro-badge text-[0.5625rem] font-pixel ${theme.tag}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Large Project Title in SPACE GROTESK */}
          <h3 className="font-display font-bold text-lg sm:text-xl text-slate-950 dark:text-white group-hover:text-retro-cyan transition-colors duration-150 leading-snug mt-2.5">
            <Link to={`/projet/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          {/* High-Contrast Excerpt Text (Justified to right margin) */}
          <p className="text-xs sm:text-[0.8125rem] text-slate-900 dark:text-slate-100 font-mono leading-relaxed text-justify hyphens-auto mt-2.5 font-medium">
            {project.excerpt}
          </p>
        </div>

        {/* Card Footer / System Action */}
        <div className="pt-3 border-t border-bevel-mid flex items-center justify-between gap-3">
          <span className="font-mono text-[0.6875rem] text-slate-800 dark:text-slate-300 font-semibold truncate">
            {project.summaryFooter}
          </span>

          <Link
            to={`/projet/${project.slug}`}
            className="bevel-btn-primary text-[0.625rem] px-3.5 py-1.5 flex items-center gap-1.5 flex-shrink-0"
          >
            <span>OUVRIR</span>
            <span>▶</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
