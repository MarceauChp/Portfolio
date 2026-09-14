import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { profileData } from '../data/profileData';
import { projectsData } from '../data/projectsData';

export default function Footer(): React.ReactElement {
  return (
    <footer className="border-t-2 border-bevel-mid bg-bp-surface text-bp-muted py-12 relative z-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* ── Engineering Title Block (Cartouche Normalisé) ── */}
        <div className="title-block overflow-hidden">
          {/* Titlebar of title block */}
          <div className="bevel-titlebar">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.7)] dark:bg-retro-cyan flex-shrink-0 animate-pulse" />
              <span className="bevel-titlebar-text font-pixel text-xs tracking-wider">
                Cartouche d'Ingénierie &amp; Synthèse Professionnelle
              </span>
            </div>
            <div className="bevel-controls">
              <span className="bevel-control-btn">_</span>
              <span className="bevel-control-btn">□</span>
              <span className="bevel-control-btn">×</span>
            </div>
          </div>

          {/* Grid Cells */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y sm:divide-y-0 divide-bevel-mid bg-bp-surface">
            <div className="title-block-cell">
              <span className="title-block-label">Auteur</span>
              <span className="title-block-value">Marceau Chapon</span>
            </div>
            <div className="title-block-cell">
              <span className="title-block-label">Formation</span>
              <span className="title-block-value">M1 GeoData | UGE</span>
            </div>
            <div className="title-block-cell">
              <span className="title-block-label">Spécialité</span>
              <span className="title-block-value">Data spatiale &amp; stats</span>
            </div>
            <div className="title-block-cell">
              <span className="title-block-label">Territoires</span>
              <span className="title-block-value">IDF &amp; Occitanie</span>
            </div>
            <div className="title-block-cell">
              <span className="title-block-label">Statut</span>
              <span className="title-block-value">Étudiant</span>
            </div>
            <div className="title-block-cell">
              <span className="title-block-label">Date Édition</span>
              <span className="title-block-value">SEPT. 2026</span>
            </div>
          </div>
        </div>

        {/* ── Main Navigation & Information ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-2">
          {/* Brand & Bio */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="bevel-btn px-2 py-0.5 text-retro-cyan font-bold text-xs">
                MC
              </div>
              <span className="font-display font-bold text-bp-text text-base tracking-tight">
                {profileData.name}
              </span>
            </div>
            <p className="text-xs sm:text-[0.8125rem] text-bp-muted font-mono leading-relaxed max-w-md">
              {profileData.role} en Master 1 à GeoData Paris (Université Gustave Eiffel).
              Spécialisé en science des données spatiales, modélisation statistique avancée et pipelines automatisés.
            </p>

            {/* Social Links as polychrome bevel buttons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={profileData.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="bevel-btn flex items-center gap-1.5 text-[0.625rem] text-bp-text hover:text-cobalt hover:border-cobalt/40"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB</span>
              </a>
              <a
                href={profileData.contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="bevel-btn flex items-center gap-1.5 text-[0.625rem] text-bp-text hover:text-forest hover:border-forest/40"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LINKEDIN</span>
              </a>
              <a
                href={`mailto:${profileData.contacts.email}`}
                aria-label="Courriel"
                className="bevel-btn flex items-center gap-1.5 text-[0.625rem] text-bp-text hover:text-terracotta hover:border-terracotta/40"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>COURRIEL</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-bp-text mb-3 flex items-center gap-1.5">
              <span className="text-retro-cyan font-pixel text-[0.625rem]">►</span> Navigation
            </h4>
            <ul className="space-y-1.5 text-xs font-mono">
              <li>
                <Link to="/#projets" className="hover:text-retro-cyan transition-colors">
                  &gt; Mes projets
                </Link>
              </li>
              <li>
                <Link to="/#competences" className="hover:text-retro-cyan transition-colors">
                  &gt; Compétences & outils
                </Link>
              </li>
              <li>
                <Link to="/#parcours" className="hover:text-retro-cyan transition-colors">
                  &gt; Parcours & Diplômes
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="hover:text-retro-cyan transition-colors">
                  &gt; Me contacter
                </Link>
              </li>
            </ul>
          </div>

          {/* Projets / Études de cas */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-bp-text mb-3 flex items-center gap-1.5">
              <span className="text-retro-cyan font-pixel text-[0.625rem]">►</span> Projets d'étude
            </h4>
            <ul className="space-y-1.5 text-xs font-mono">
              {projectsData.map((project) => (
                <li key={project.id}>
                  <Link
                    to={`/projet/${project.slug}`}
                    className="hover:text-retro-cyan transition-colors flex items-center gap-1 group"
                  >
                    <span className="truncate">&gt; {project.shortTitle}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-retro-cyan" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-6 border-t border-bevel-mid flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.6875rem] font-mono text-bp-dim">
          <p>© 2025-2026 {profileData.name} - Tous droits réservés</p>
          <div className="flex items-center gap-2">
            <span className="bevel-inset px-2 py-0.5 text-[0.5625rem] font-pixel text-bp-muted">
              PROJET ARCHITECTURÉ EN REACT + TS + TAILWIND
            </span>
            <span className="bevel-inset px-2 py-0.5 text-[0.5625rem] font-pixel text-forest font-bold">
              OPEN SOURCE
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
