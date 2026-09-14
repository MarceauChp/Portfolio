import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Download,
  FolderKanban,
  GraduationCap,
  Sparkles,
  MapPin,
  ExternalLink,
  Star
} from 'lucide-react';
import { profileData } from '../data/profileData';
import { projectsData } from '../data/projectsData';
import { skillsData } from '../data/skillsData';
import { experienceData } from '../data/experienceData';
import ProjectCard from '../components/ProjectCard';
import PipelineStep from '../components/PipelineStep';
import AnimatedSection from '../components/AnimatedSection';

const CATEGORIES = ["Tous", "Recherche M1", "Commande publique", "Modélisation & 3D"] as const;
type Category = typeof CATEGORIES[number];

const categoryThemes: Record<string, { dot: string; title: string }> = {
  stats: {
    dot: 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.9)] dark:bg-blue-400',
    title: 'text-blue-700 dark:text-blue-400'
  },
  sig: {
    dot: 'bg-emerald-600 shadow-[0_0_8px_rgba(22,163,74,0.9)] dark:bg-emerald-400',
    title: 'text-emerald-700 dark:text-emerald-400'
  },
};

export default function HomePage(): React.ReactElement {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Tous");

  const filteredProjects = selectedCategory === "Tous"
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory || (selectedCategory === "Recherche M1" && p.category.includes("Recherche")));

  return (
    <div className="relative pt-24 pb-20 overflow-hidden">

      {/* ============================================================
          HERO SECTION : CAD Workstation (Full Width & Justified on PC)
          ============================================================ */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 pb-16">

        {/* Top dimension line (pixel font for technical mark) */}
        <div className="dimension-line mb-6">
          Section N°1 : Présentation et résumé
        </div>

        {/* Hero Workstation Window */}
        <div className="bevel-window p-6 sm:p-10 relative overflow-hidden">
          {/* Window Titlebar */}
          <div className="bevel-titlebar -mx-6 -mt-6 sm:-mx-10 sm:-mt-10 mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.9)] dark:bg-red-500 flex-shrink-0 animate-pulse" />
              <span className="font-pixel text-[0.6875rem] font-bold tracking-wider uppercase text-red-600 dark:text-red-400">
                PRÉSENTATION
              </span>
            </div>
            <div className="bevel-controls">
              <span className="bevel-control-btn">_</span>
              <span className="bevel-control-btn">□</span>
              <span className="bevel-control-btn">×</span>
            </div>
          </div>

          <div className="w-full">
            {/* Main Title in SPACE GROTESK */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-950 dark:text-white tracking-tight leading-[1.12] mb-3"
            >
              {profileData.name}
              <br />
              <span className="text-retro-cyan font-semibold">
                {profileData.role}
              </span>
            </motion.h1>

            {/* Tagline in Space Grotesk */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="font-display font-medium text-base sm:text-lg text-ochre mb-4"
            >
              {profileData.tagline}
            </motion.div>

            {/* Availability Status Chip */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bevel-inset bg-forest-bg/80 border border-forest-border mb-6"
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#22c55e]" />
              </span>
              <span className="font-mono text-xs font-semibold text-forest dark:text-emerald-400">
                {profileData.currentStatus}
              </span>
            </motion.div>

            {/* First-person Narrative Bio: FULL WIDTH & STRICTLY JUSTIFIED */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="space-y-4 mb-8 text-body text-slate-900 dark:text-slate-100 font-mono leading-relaxed w-full"
            >
              {profileData.bio.map((paragraph, idx) => (
                <p key={idx} className="border-l-2 border-bevel-mid pl-4 pr-1 text-justify hyphens-auto font-medium">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Actions CTA : 16-bit Bevel System Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href="#projets"
                className="bevel-btn-primary px-5 py-2.5 text-xs flex items-center gap-2"
              >
                <FolderKanban className="w-4 h-4" />
                <span>VOIR MES PROJETS ▶</span>
              </a>

              <a
                href={profileData.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bevel-btn px-4 py-2.5 text-xs flex items-center gap-2 hover:text-cobalt hover:border-cobalt/40"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB</span>
              </a>

              <a
                href="#contact"
                className="bevel-btn px-4 py-2.5 text-xs flex items-center gap-2 hover:text-forest hover:border-forest/40"
              >
                <Mail className="w-4 h-4" />
                <span>CONTACT</span>
              </a>

              <a
                href={profileData.contacts.cvPdf}
                download="CV_Marceau_Chapon.pdf"
                className="bevel-btn px-4 py-2.5 text-xs flex items-center gap-2 text-terracotta hover:border-terracotta/40"
              >
                <Download className="w-4 h-4" />
                <span>TÉLÉCHARGER CV (PDF)</span>
              </a>
            </motion.div>
          </div>

          {/* Technical Metadata Inset Bar at bottom of Hero with polychrome accents */}
          <div className="mt-10 pt-4 border-t border-bevel-mid grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
            <div className="bevel-inset p-3">
              <span className="font-pixel text-[0.5625rem] text-slate-700 dark:text-bp-dim uppercase block">ÉTABLISSEMENT</span>
              <span className="font-mono text-xs text-slate-900 dark:text-white font-bold">Univ. Gustave Eiffel / ENSG</span>
            </div>
            <div className="bevel-inset p-3">
              <span className="font-pixel text-[0.5625rem] text-slate-700 dark:text-bp-dim uppercase block">SPÉCIALITÉ</span>
              <span className="font-mono text-xs text-cobalt font-bold">Science des données spatiales</span>
            </div>
            <div className="bevel-inset p-3">
              <span className="font-pixel text-[0.5625rem] text-slate-700 dark:text-bp-dim uppercase block">LOCALISATION</span>
              <span className="font-mono text-xs text-terracotta font-bold">Île-de-France &amp; Alès</span>
            </div>
            <div className="bevel-inset p-3">
              <span className="font-pixel text-[0.5625rem] text-slate-700 dark:text-bp-dim uppercase block">CE QUE JE RECHERCHE</span>
              <span className="font-mono text-xs text-forest font-bold">Stage M1 (3 à 5 mois) / CDD</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PROJETS PHARES SECTION : DAO CAD Windows
          ============================================================ */}
      <AnimatedSection id="projets" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Dimension Line Separator */}
          <div className="dimension-line mb-8">
            Section N°2 : Projets géomatiques &amp; études territoriales
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-slate-950 dark:text-white tracking-tight">
                Projets géomatiques
              </h2>
              <p className="text-body text-slate-800 dark:text-slate-200 font-mono max-w-3xl mt-2 font-medium">
                Ces quatre projets ont été produits lors de mon parcours universitaire, ou sont le fruit de travaux autodidactes. En partant d'une problématique territoriale concrète, chacun d'eux mobilise des méthodes rigoureuses et documente les limites méthodologiques associées. Vous pouvez consulter en détail ces projets ci-dessous.
              </p>
            </div>

            {/* Category Filter as 16-bit bevel buttons */}
            <div className="flex flex-wrap gap-1.5 self-start md:self-auto p-1 bevel-inset">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[0.625rem] font-pixel uppercase px-3 py-1.5 transition-colors ${selectedCategory === cat
                    ? "bevel-btn-primary"
                    : "text-slate-700 dark:text-bp-muted hover:text-slate-950 dark:hover:text-white bg-transparent"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Projects (2 columns DAO Windows) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================================
          COMPÉTENCES & MÉTHODES
          ============================================================ */}
      <AnimatedSection id="competences" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Dimension Line Separator */}
          <div className="dimension-line mb-8">
            Section N°3 : Compétences méthodologiques &amp; outils
          </div>

          <div className="mb-10">
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-slate-950 dark:text-white tracking-tight">
              Mes compétences & outils
            </h2>
            <p className="text-body text-slate-800 dark:text-slate-200 font-mono max-w-3xl mt-2 font-medium">
              Lors de mon parcours académique et professionnel, j'ai eu l'opportunité d'apprendre et de maîtriser une large gamme d'outils et de méthodes en géomatique et en science des données. Vous trouverez ci-dessous l'ensemble de mon bagage technique.
            </p>
          </div>

          {/* Category Cards in Bevel Windows */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {skillsData.categories.map((category) => (
              <div key={category.id} className="bevel-window p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="bevel-titlebar -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-4">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className={`w-2.5 h-2.5 rounded-full ${categoryThemes[category.id]?.dot || 'bg-blue-600'} flex-shrink-0 animate-pulse`} />
                      <span className={`font-pixel text-[0.6875rem] font-bold tracking-wider uppercase truncate ${categoryThemes[category.id]?.title || 'text-blue-700 dark:text-blue-400'}`}>
                        {category.title}
                      </span>
                    </div>
                    <div className="bevel-controls">
                      <span className="bevel-control-btn">_</span>
                      <span className="bevel-control-btn">□</span>
                    </div>
                  </div>

                  <div className="border-b-2 border-dashed border-[#a8956b]/40 dark:border-bevel-mid/40 pb-3 mb-4">
                    <p className="text-xs text-slate-700 dark:text-bp-dim font-mono font-medium">{category.subtitle}</p>
                  </div>

                  <div className="space-y-3">
                    {category.items.map((item, i) => (
                      <div
                        key={i}
                        className={`p-3.5 sm:p-4 bg-bp-canvas/55 dark:bg-bp-canvas/30 border border-[#a8956b]/70 dark:border-bevel-mid/50 flex flex-col sm:flex-row sm:items-start gap-3 justify-between transition-all duration-150 hover:shadow-sm ${
                          category.id === 'stats'
                            ? 'hover:border-blue-600/80 dark:hover:border-blue-400/80 hover:shadow-[0_0_8px_rgba(37,99,235,0.2)]'
                            : 'hover:border-emerald-600/80 dark:hover:border-emerald-400/80 hover:shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                        }`}
                      >
                        <div className="sm:max-w-md w-full">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="font-display font-bold text-slate-950 dark:text-white text-sm sm:text-base">
                              {item.name}
                            </span>
                            {item.highlight && (
                              <span title="Compétence favorite" className="inline-flex items-center">
                                <Star
                                  className="w-4 h-4 sm:w-[1.125rem] sm:h-[1.125rem] fill-amber-400 text-amber-500 dark:fill-amber-400 dark:text-amber-300 animate-sparkle flex-shrink-0"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-900 dark:text-slate-200 font-mono leading-relaxed text-justify hyphens-auto font-medium">
                            {item.description}
                          </p>
                        </div>
                        <span
                          className={`font-pixel text-[0.5625rem] px-2 py-0.5 self-start flex-shrink-0 border uppercase font-bold ${item.level === "Expert"
                            ? "text-forest border-forest-border bg-forest-bg"
                            : item.level === "Avancé"
                              ? "text-cobalt border-cobalt-border bg-cobalt-bg"
                              : "text-ochre border-ochre-border bg-ochre-bg"
                            }`}
                        >
                          {item.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Languages card */}
          <div className="bevel-window p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
            <div className="flex items-center gap-3">
              <div className="bevel-btn px-2 py-1 text-retro-cyan">
                <Sparkles className="w-4 h-4 text-ochre animate-sparkle" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm sm:text-base text-slate-950 dark:text-white">Langues de travail</h4>
                <p className="text-xs sm:text-[0.8125rem] text-slate-800 dark:text-slate-200 font-mono font-medium">
                  Français (langue maternelle) <br /> Anglais B2 (lecture de la littérature scientifique, rédaction académique et communication professionnelle).
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="retro-badge text-forest bg-forest-bg border-forest-border font-bold">FR : NATIF</span>
              <span className="retro-badge text-cobalt bg-cobalt-bg border-cobalt-border font-bold">EN : B2 SCIENTIFIQUE</span>
            </div>
          </div>

          {/* Technical Pipeline */}
          <div>
            <div className="mb-6">
              <span className="font-pixel text-[0.6875rem] uppercase tracking-wider text-cobalt font-bold block mb-1">
                CHAÎNE DE TRAITEMENT CLASSIQUE
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-950 dark:text-white tracking-tight">
                Workflow type
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skillsData.pipelineSteps.map((step, index) => (
                <PipelineStep key={step.number} step={step} index={index} />
              ))}
            </div>
          </div>

        </div>
      </AnimatedSection>

      {/* ============================================================
          PARCOURS ACADÉMIQUE & ENGAGEMENT (SURVEYOR RULER TIMELINE)
          ============================================================ */}
      <AnimatedSection id="parcours" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Dimension Line Separator */}
          <div className="dimension-line mb-8">
            Section N°4 : Chronologie de mon parcours professionnel &amp; académique
          </div>

          <div className="mb-10">
            <span className="font-pixel text-[0.6875rem] uppercase tracking-wider text-ochre font-bold block mb-1">
              FORMATION &amp; EXPÉRIENCES PROFESSIONNELLES
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-slate-950 dark:text-white tracking-tight">
              Mon parcours
            </h2>
          </div>

          {/* High Contrast Surveyor Axis Timeline */}
          <div className="space-y-8 relative">
            {/* Real vertical surveyor axis line */}
            <div className="timeline-axis-line absolute top-4 bottom-8 left-4 md:left-1/2 -translate-x-1/2 w-0 border-l-2 border-dashed border-blue-600 dark:border-retro-cyan z-0 pointer-events-none" />
            {experienceData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-start ${isEven ? "md:flex-row-reverse" : ""
                    }`}
                >
                  {/* Timeline Dot: Crisp Square Survey Marker aligned with card titlebar */}
                  <div
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 w-6 h-6 bg-bp-surface border-2 border-blue-600 dark:border-retro-cyan flex items-center justify-center z-10 shadow-md"
                    style={{ opacity: Math.max(0.45, 1 - index * 0.12) }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-retro-cyan animate-pulse" />
                  </div>

                  {/* Content Card with Full Width & High Contrast Justified Text */}
                  <div className={`ml-10 md:ml-0 md:w-1/2 ${isEven ? "md:pl-8" : "md:pr-8"}`}>
                    <div className="bevel-window p-5 sm:p-6">
                      {/* Window Titlebar */}
                      <div className="bevel-titlebar -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-3">
                        <span className="bevel-titlebar-text">
                          {item.period} : {item.status}
                        </span>
                        <div className="bevel-controls">
                          <span className="bevel-control-btn">_</span>
                          <span className="bevel-control-btn">□</span>
                        </div>
                      </div>

                      <h3 className="font-display font-bold text-base sm:text-lg text-slate-950 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs sm:text-[0.8125rem] text-cobalt dark:text-retro-cyan font-mono mb-3 font-semibold">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>{item.institution} | {item.location}</span>
                      </div>

                      <p className="text-xs sm:text-[0.8125rem] text-slate-900 dark:text-slate-100 font-mono leading-relaxed mb-4 text-justify hyphens-auto font-medium">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-bevel-mid">
                        {item.badges.map((badge, bIdx) => {
                          const colorClass =
                            badge.color === "cyan" ? "retro-badge-inset-cyan" :
                              badge.color === "emerald" ? "retro-badge-inset-emerald" :
                                badge.color === "yellow" || badge.color === "amber" ? "retro-badge-inset-yellow" :
                                  badge.color === "red" || badge.color === "terracotta" ? "retro-badge-inset-red" :
                                    badge.color === "violet" || badge.color === "purple" ? "retro-badge-inset-violet" :
                                      "retro-badge-inset-muted";

                          return (
                            <span
                              key={bIdx}
                              className={`retro-badge-inset font-bold ${colorClass}`}
                            >
                              {badge.text}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </AnimatedSection>

      {/* ============================================================
          CONTACT & COLLABORATIONS
          ============================================================ */}
      <AnimatedSection id="contact" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Dimension Line Separator */}
          <div className="dimension-line mb-8">
            Section N°5 : Contact
          </div>

          <div className="bevel-window p-6 sm:p-10 mb-8">
            <div className="bevel-titlebar -mx-6 -mt-6 sm:-mx-10 sm:-mt-10 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shadow-[0_0_8px_rgba(168,85,247,0.9)] dark:bg-purple-400 flex-shrink-0 animate-pulse" />
                <span className="font-pixel text-[0.6875rem] font-bold tracking-wider uppercase text-[#6b21a8] dark:text-purple-300">
                  CANAUX DE CONTACT
                </span>
              </div>
              <div className="bevel-controls">
                <span className="bevel-control-btn">_</span>
                <span className="bevel-control-btn">□</span>
                <span className="bevel-control-btn">×</span>
              </div>
            </div>

            <div className="w-full mb-8">
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-slate-950 dark:text-white tracking-tight mb-2">
                Travaillons ensemble
              </h2>
              <p className="text-body text-slate-900 dark:text-slate-100 font-mono leading-relaxed text-justify hyphens-auto font-medium">
                Disponible pour des opportunités de <strong className="text-slate-950 dark:text-white">stage de 3 à 5 mois (à partir du 15 avril 2027)</strong>, de CDD<strong className="text-slate-950 dark:text-white"> en tant que chargé d'études</strong>, ou de collaborations en <strong className="text-slate-950 dark:text-white">bureaux d'études territoriaux et collectivités</strong>.
              </p>
            </div>

            {/* 2 Collaboration Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bevel-inset p-5 flex flex-col justify-between">
                <div>
                  <span className="font-pixel text-[0.625rem] text-cobalt font-bold uppercase block mb-1">
                    [ VOLET 01 ] RECHERCHE ACADÉMIQUE
                  </span>
                  <h4 className="font-display font-bold text-base text-slate-950 dark:text-white mb-2">
                    Projets de recherche
                  </h4>
                  <p className="text-xs sm:text-[0.8125rem] text-slate-900 dark:text-slate-200 font-mono leading-relaxed mb-4 text-justify hyphens-auto font-medium">
                    Recherche sur les disparités spatiales, modélisation statistique multiniveau (GLMM, ACP, CAH, ACM, régression), politiques publiques du logement, impact climatique urbain et urbanisme favorable à la santé.
                  </p>
                </div>
                <a
                  href={`mailto:${profileData.contacts.email}?subject=Proposition%20de%20th%C3%A8se%20ou%20recherche`}
                  className="bevel-btn text-[0.6875rem] text-center flex items-center justify-center gap-1.5 text-cobalt hover:bg-cobalt-bg"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>PROPOSER UN SUJET / ÉCHANGER</span>
                </a>
              </div>

              <div className="bevel-inset p-5 flex flex-col justify-between">
                <div>
                  <span className="font-pixel text-[0.625rem] text-forest font-bold uppercase block mb-1">
                    [ VOLET 02 ] Collaborations professionnelles
                  </span>
                  <h4 className="font-display font-bold text-base text-slate-950 dark:text-white mb-2">
                    Entreprises privées, bureaux d'études &amp; collectivités
                  </h4>
                  <p className="text-xs sm:text-[0.8125rem] text-slate-900 dark:text-slate-200 font-mono leading-relaxed mb-4 text-justify hyphens-auto font-medium">
                    Automatisation de SIG, traitement statistique sous R/Python, cartographie d'aide à la décision et diagnostics territoriaux opérationnels.
                  </p>
                </div>
                <a
                  href={`mailto:${profileData.contacts.email}?subject=Mission%20ou%20poste%20en%20bureau%20d%27%C3%A9tudes`}
                  className="bevel-btn text-[0.6875rem] text-center flex items-center justify-center gap-1.5 text-forest hover:bg-forest-bg"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>PROPOSER UNE COLLABORATION</span>
                </a>
              </div>
            </div>

            {/* Direct Contact Cells */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              <div className="bevel-inset p-3.5">
                <span className="font-pixel text-[0.5625rem] text-slate-700 dark:text-bp-dim uppercase block mb-1">COURRIEL DIRECT</span>
                <a
                  href={`mailto:${profileData.contacts.email}`}
                  className="font-mono text-xs sm:text-sm text-retro-cyan hover:underline truncate block font-bold"
                >
                  {profileData.contacts.email}
                </a>
              </div>

              <div className="bevel-inset p-3.5">
                <span className="font-pixel text-[0.5625rem] text-slate-700 dark:text-bp-dim uppercase block mb-1">TÉLÉPHONE</span>
                <a
                  href={`tel:${profileData.contacts.phone.replace(/\s+/g, '')}`}
                  className="font-mono text-xs sm:text-sm text-slate-950 dark:text-white hover:text-retro-cyan font-bold"
                >
                  {profileData.contacts.phone}
                </a>
              </div>

              <div className="bevel-inset p-3.5">
                <span className="font-pixel text-[0.5625rem] text-slate-700 dark:text-bp-dim uppercase block mb-1">RÉSEAUX &amp; CODE</span>
                <div className="flex items-center gap-3 font-mono text-xs sm:text-sm">
                  <a
                    href={profileData.contacts.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cobalt hover:underline flex items-center gap-1 font-bold"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profileData.contacts.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest hover:underline flex items-center gap-1 font-bold"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </AnimatedSection>

    </div>
  );
}
