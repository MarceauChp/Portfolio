import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Github, 
  ZoomIn, 
  AlertTriangle, 
  Info,
  Table as TableIcon
} from 'lucide-react';
import { projectsData } from '../data/projectsData';
import ReadingProgress from '../components/ReadingProgress';
import CodeSnippet from '../components/CodeSnippet';
import LightboxModal from '../components/LightboxModal';

interface LightboxState {
  isOpen: boolean;
  src: string;
  title: string;
  caption: string;
}

type BadgeColor = 'violet' | 'cyan' | 'emerald' | 'muted';

const statusBadgeClasses: Record<BadgeColor, string> = {
  violet: 'text-terracotta bg-terracotta-bg border-terracotta-border',
  cyan: 'text-cobalt bg-cobalt-bg border-cobalt-border',
  emerald: 'text-forest bg-forest-bg border-forest-border',
  muted: 'text-plum bg-plum-bg border-plum-border',
};

interface ProjectTheme {
  titleColor: string;
  dot: string;
}

const projectThemes: Record<string, ProjectTheme> = {
  'memoire-vefa': {
    titleColor: 'text-[#9a3412] dark:text-orange-400',
    dot: 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.9)] dark:bg-orange-400',
  },
  'article-ipa': {
    titleColor: 'text-[#1e40af] dark:text-blue-400',
    dot: 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.9)] dark:bg-blue-400',
  },
  'grand-avignon-climat': {
    titleColor: 'text-[#166534] dark:text-emerald-400',
    dot: 'bg-emerald-600 shadow-[0_0_8px_rgba(22,163,74,0.9)] dark:bg-emerald-400',
  },
  'rennes-foncier-sig': {
    titleColor: 'text-[#6b21a8] dark:text-purple-400',
    dot: 'bg-purple-600 shadow-[0_0_8px_rgba(168,85,247,0.9)] dark:bg-purple-400',
  },
};

const defaultTheme: ProjectTheme = {
  titleColor: 'text-retro-cyan',
  dot: 'bg-retro-cyan shadow-[0_0_6px_rgba(2,132,199,0.8)]',
};

const phaseColors: Record<string, { dot: string; text: string }> = {
  "PHASE 01": {
    dot: "bg-emerald-600 shadow-[0_0_6px_rgba(22,163,74,0.8)] dark:bg-emerald-400",
    text: "text-emerald-700 dark:text-emerald-400"
  },
  "PHASE 02": {
    dot: "bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.8)] dark:bg-blue-400",
    text: "text-blue-700 dark:text-blue-400"
  },
  "PHASE 03": {
    dot: "bg-amber-600 shadow-[0_0_6px_rgba(217,119,6,0.8)] dark:bg-amber-400",
    text: "text-amber-800 dark:text-amber-400"
  },
  "PHASE 04": {
    dot: "bg-orange-600 shadow-[0_0_6px_rgba(234,88,12,0.8)] dark:bg-orange-400",
    text: "text-orange-800 dark:text-orange-400"
  },
};

const tagColorMap: Record<string, string> = {
  "R": "tag-bevel-blue",
  "QGIS": "tag-bevel-green",
  "PostGIS": "tag-bevel-cyan",
  "SQL spatial": "tag-bevel-purple",
  "GLMM": "tag-bevel-orange",
  "QNEAT3": "tag-bevel-cyan",
  "QGIS Model Builder": "tag-bevel-green",
  "Landsat 8": "tag-bevel-orange",
  "MNS/MNT 50 cm": "tag-bevel-purple",
  "BD TOPO IGN": "tag-bevel-amber",
  "Filosofi INSEE": "tag-bevel-blue",
  "RPLS": "tag-bevel-rose",
  "Réseau viaire": "tag-bevel-rose",
  "LCZ": "tag-bevel-amber",
  "PLUi": "tag-bevel-blue",
  "ZAN": "tag-bevel-green",
};

const fallbackBevelColors = [
  "tag-bevel-blue",
  "tag-bevel-green",
  "tag-bevel-orange",
  "tag-bevel-purple",
  "tag-bevel-cyan",
  "tag-bevel-amber",
  "tag-bevel-rose",
];

const getTagBevelClass = (tag: string, index: number): string => {
  return tagColorMap[tag] || fallbackBevelColors[index % fallbackBevelColors.length];
};

export default function ProjectDetailPage(): React.ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const [activeSection, setActiveSection] = useState('problematique');
  const [lightboxData, setLightboxData] = useState<LightboxState>({ isOpen: false, src: '', title: '', caption: '' });

  const project = projectsData.find((p) => p.slug === slug);

  // Active section scroll spy
  useEffect(() => {
    if (!project) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    project.sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="bevel-window p-8 max-w-md">
          <div className="bevel-titlebar -mx-8 -mt-8 mb-6">
            <span className="bevel-titlebar-text">ERREUR 404 : PROJET INTROUVABLE</span>
            <div className="bevel-controls">
              <span className="bevel-control-btn">×</span>
            </div>
          </div>
          <p className="text-body text-bp-muted font-mono mb-6">
            Le projet d'étude demandé n'existe pas ou a été déplacé dans les archives DAO.
          </p>
          <Link
            to="/"
            className="bevel-btn-primary px-4 py-2 inline-flex items-center gap-2 text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETOUR À LA STATION</span>
          </Link>
        </div>
      </div>
    );
  }

  const theme = projectThemes[project.slug] || defaultTheme;
  const badgeClass = statusBadgeClasses[project.statusColor] ?? statusBadgeClasses.cyan;

  const scrollToSection = (id: string): void => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative pt-24 pb-28">
      {/* Top reading progress bar */}
      <ReadingProgress />

      {/* Hero Header Section in Bevel Window */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        
        {/* Dimension Line Breadcrumb */}
        <div className="dimension-line mb-4">
          ACCUEIL &gt; PROJETS &gt; {project.shortTitle.toUpperCase()}
        </div>

        <div className="bevel-window p-6 sm:p-10 relative">
          {/* Titlebar */}
          <div className="bevel-titlebar -mx-6 -mt-6 sm:-mx-10 sm:-mt-10 mb-6">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${theme.dot} flex-shrink-0 animate-pulse`} />
              <span className={`font-pixel text-[0.6875rem] font-bold tracking-wider uppercase truncate ${theme.titleColor}`}>
                DOSSIER TECHNIQUE DAO : {project.shortTitle}
              </span>
            </div>
            <div className="bevel-controls">
              <span className="bevel-control-btn">_</span>
              <span className="bevel-control-btn">□</span>
              <span className="bevel-control-btn">×</span>
            </div>
          </div>

          {/* Status Badge in Pixel Font */}
          <div className="mb-4">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[0.625rem] font-pixel uppercase tracking-wider border font-bold ${badgeClass}`}>
              <span className="w-1.5 h-1.5 bg-current animate-pulse" />
              {project.statusText}
            </span>
          </div>

          {/* Title in Space Grotesk (Modern, crisp, legible) */}
          <h1 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-bp-text tracking-tight leading-[1.18] mb-4">
            {project.title}
          </h1>

          <p className="text-body text-slate-900 dark:text-slate-100 font-mono leading-relaxed w-full mb-6 text-justify hyphens-auto font-medium">
            {project.subtitle}
          </p>

          {/* Technical Metadata Inset Bar with polychrome accents */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 bevel-inset p-3 w-full">
            {project.meta.map((m, idx) => (
              <div key={idx} className="p-1.5">
                <span className="font-pixel text-[0.5625rem] text-slate-700 dark:text-bp-dim uppercase block mb-0.5">
                  {m.label}
                </span>
                <span className={`text-xs sm:text-sm font-mono font-bold ${m.isMono ? 'text-cobalt' : 'text-slate-950 dark:text-white'}`}>
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.links?.pdf && (
              <a
                href={project.links.pdf}
                download
                className="bevel-btn-primary text-xs px-4 py-2 flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>TÉLÉCHARGER LE RAPPORT (PDF)</span>
              </a>
            )}

            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bevel-btn text-xs px-4 py-2 flex items-center gap-2 hover:text-cobalt hover:border-cobalt/40"
              >
                <Github className="w-3.5 h-3.5" />
                <span>CODE &amp; DONNÉES SUR GITHUB</span>
              </a>
            )}

            <Link
              to="/#projets"
              className="bevel-btn text-xs px-4 py-2 flex items-center gap-2 text-slate-700 dark:text-bp-muted hover:text-slate-950 dark:hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETOUR AUX PROJETS</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content + Sticky TOC */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Column */}
          <main className="lg:col-span-8 space-y-10">
            {project.sections.map((sec) => (
              <section
                key={sec.id}
                id={sec.id}
                className="scroll-mt-28 bevel-window p-6 sm:p-8"
              >
                {/* Section Titlebar */}
                <div className="bevel-titlebar -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6">
                  <div className="flex items-center gap-2 truncate">
                    <span className={`w-2.5 h-2.5 rounded-full ${phaseColors[sec.num]?.dot || theme.dot} flex-shrink-0 animate-pulse`} />
                    <span className={`font-pixel text-xs font-bold ${phaseColors[sec.num]?.text || theme.titleColor}`}>{sec.num}</span>
                    <span className="font-display font-bold text-xs sm:text-sm text-slate-950 dark:text-white truncate">{sec.title}</span>
                  </div>
                  <div className="bevel-controls">
                    <span className="bevel-control-btn">_</span>
                    <span className="bevel-control-btn">□</span>
                  </div>
                </div>

                {/* Paragraphs in 18px body text: FULL WIDTH & STRICTLY JUSTIFIED */}
                <div className="space-y-4 text-body text-slate-900 dark:text-slate-100 font-mono leading-relaxed mb-6 w-full">
                  {sec.content.map((p, pIdx) => (
                    <p key={pIdx} className="text-justify hyphens-auto font-medium">{p}</p>
                  ))}
                </div>

                {/* Callout with warm tint */}
                {sec.callout && (
                  <div className="my-6 bevel-inset p-4 flex items-start gap-3 border-ochre/40">
                    <span className="text-xl flex-shrink-0 text-ochre">{sec.callout.icon}</span>
                    <div>
                      <h4 className="font-display font-bold text-sm text-ochre uppercase mb-1">{sec.callout.title}</h4>
                      <p className="text-xs sm:text-[0.8125rem] text-bp-text font-mono leading-relaxed">{sec.callout.text}</p>
                    </div>
                  </div>
                )}

                {/* Subsections if any */}
                {sec.subsections && sec.subsections.map((sub, sIdx) => (
                  <div key={sIdx} className="mt-6 pt-4 border-t border-bevel-mid">
                    <h3 className="font-display font-bold text-sm sm:text-base text-terracotta uppercase mb-2">
                      &gt; {sub.title}
                    </h3>
                    <p className="text-body text-bp-muted font-mono leading-relaxed">{sub.text}</p>
                  </div>
                ))}

                {/* Code Snippet if any */}
                {sec.codeSnippet && (
                  <CodeSnippet
                    lang={sec.codeSnippet.lang}
                    title={sec.codeSnippet.title}
                    code={sec.codeSnippet.code}
                  />
                )}

                {/* Data Table if any */}
                {sec.table && (
                  <div className="my-6 bevel-window overflow-hidden">
                    <div className="bevel-titlebar">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400 flex-shrink-0 animate-pulse" />
                        <TableIcon className="w-3.5 h-3.5 text-cobalt" />
                        <span className="font-display font-bold text-xs text-blue-700 dark:text-blue-300">{sec.table.title}</span>
                      </div>
                    </div>
                    <div className="overflow-x-auto p-2">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bevel-inset font-pixel text-[0.5625rem] text-cobalt uppercase">
                          <tr>
                            {sec.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="px-3 py-2 border-b border-bevel-mid">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-bevel-mid text-bp-text">
                          {sec.table.rows.map((r, rIdx) => (
                            <tr key={rIdx} className="hover:bg-bp-surface/60 transition-colors">
                              {r.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`px-3 py-2 ${cIdx === 0 ? 'font-mono text-cobalt font-semibold' : ''}`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Odds Ratio Table (Specific to VEFA GLMM) */}
                {sec.oddsTable && (
                  <div className="my-6 bevel-window overflow-hidden">
                    <div className="bevel-titlebar">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400 flex-shrink-0 animate-pulse" />
                        <TableIcon className="w-3.5 h-3.5 text-forest" />
                        <span className="font-display font-bold text-xs text-emerald-800 dark:text-emerald-300">
                          MODÈLE GLMM : EFFETS FIXES &amp; ODDS-RATIOS
                        </span>
                      </div>
                    </div>
                    <div className="overflow-x-auto p-2">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bevel-inset font-pixel text-[0.5625rem] text-forest uppercase">
                          <tr>
                            {sec.oddsTable.headers.map((h, hIdx) => (
                              <th key={hIdx} className="px-3 py-2 border-b border-bevel-mid">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-bevel-mid text-bp-text">
                          {sec.oddsTable.rows.map((r, rIdx) => (
                            <tr key={rIdx} className="hover:bg-bp-surface/60 transition-colors">
                              <td className="px-3 py-2 font-mono text-terracotta font-semibold">{r[0]}</td>
                              <td className="px-3 py-2 font-mono font-bold text-bp-text">{r[1]}</td>
                              <td className="px-3 py-2 font-mono text-bp-dim">{r[2]}</td>
                              <td className="px-3 py-2 font-mono text-forest font-bold">{r[3]}</td>
                              <td className="px-3 py-2 text-[0.6875rem] text-bp-muted">{r[4]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Method Steps Flow if any */}
                {sec.methodSteps && (
                  <div className="my-6 space-y-2">
                    {sec.methodSteps.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="bevel-inset p-3.5 flex items-start gap-3"
                      >
                        <span className="font-pixel text-xs text-cobalt px-2.5 py-1 bevel-btn flex-shrink-0 font-bold">
                          {m.step}
                        </span>
                        <div>
                          <h4 className="font-display font-bold text-xs sm:text-sm text-bp-text uppercase mb-1">{m.title}</h4>
                          <p className="text-xs text-bp-muted font-mono leading-relaxed">{m.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Cartographic Figure with Zoom Trigger */}
                {sec.figure && (
                  <div className="my-6 bevel-window overflow-hidden">
                    <div className="bevel-titlebar">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)] flex-shrink-0 animate-pulse" />
                        <span className="font-display font-bold text-xs text-amber-700 dark:text-amber-300 truncate">{sec.figure.title}</span>
                      </div>
                      <span className="retro-badge text-cobalt bg-cobalt-bg border-cobalt-border">
                        {sec.figure.tag}
                      </span>
                    </div>

                    <div
                      onClick={() => setLightboxData({ isOpen: true, src: sec.figure!.src, title: sec.figure!.title, caption: sec.figure!.caption })}
                      className="relative group cursor-zoom-in overflow-hidden p-2 bevel-inset m-2 max-h-[500px] flex items-center justify-center bg-bp-canvas"
                    >
                      <img
                        src={sec.figure.src}
                        alt={sec.figure.title}
                        loading="lazy"
                        className="w-full h-auto object-cover transform transition-transform duration-200 group-hover:scale-[1.01]"
                      />
                      <div className="absolute inset-0 bg-bp-canvas/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-bp-text font-pixel text-xs">
                        <ZoomIn className="w-4 h-4 text-retro-cyan" />
                        <span>[ CLIQUER POUR AGRANDIR PLEINE RÉSOLUTION ]</span>
                      </div>
                    </div>

                    <div className="p-3 border-t border-bevel-mid text-xs text-bp-muted font-mono leading-relaxed bg-bp-surface">
                      <span className="text-retro-cyan font-pixel text-[0.5625rem] mr-2">FIGURE:</span>
                      {sec.figure.caption}
                    </div>
                  </div>
                )}

                {/* Info Box */}
                {sec.infoBox && (
                  <div className="my-6 bevel-inset p-4 flex items-start gap-3 border-forest-border bg-forest-bg/20">
                    <Info className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-bold text-xs sm:text-sm text-forest uppercase mb-1">{sec.infoBox.title}</h4>
                      <p className="text-xs sm:text-[0.8125rem] text-bp-text font-mono leading-relaxed">{sec.infoBox.text}</p>
                    </div>
                  </div>
                )}

                {/* Warning Box */}
                {sec.warningBox && (
                  <div className="my-6 bevel-inset p-4 flex items-start gap-3 border-ochre-border bg-ochre-bg/20">
                    <AlertTriangle className="w-4 h-4 text-ochre flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-bold text-xs sm:text-sm text-ochre uppercase mb-1">{sec.warningBox.title}</h4>
                      <p className="text-xs sm:text-[0.8125rem] text-bp-text font-mono leading-relaxed">{sec.warningBox.text}</p>
                    </div>
                  </div>
                )}

              </section>
            ))}

            {/* Back to projects navigation banner */}
            <div className="bevel-window p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-display font-bold text-base text-bp-text mb-1">Explorer d'autres projets</h4>
                <p className="text-xs sm:text-[0.8125rem] text-bp-muted font-mono">Découvrez mes autres travaux en modélisation spatiale, télédétection et SIG.</p>
              </div>
              <Link
                to="/#projets"
                className="bevel-btn-primary px-4 py-2 text-xs flex items-center gap-2 flex-shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>TOUS LES PROJETS</span>
              </Link>
            </div>

          </main>

          {/* Sticky Table of Contents Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              {/* TOC Navigation Window */}
              <div className="bevel-window p-4 sm:p-5">
                <div className="bevel-titlebar -mx-4 -mt-4 sm:-mx-5 sm:-mt-5 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.7)] dark:bg-blue-400 flex-shrink-0 animate-pulse" />
                    <span className="font-display font-bold text-xs text-blue-700 dark:text-blue-300 tracking-tight">
                      SOMMAIRE DU PROJET
                    </span>
                  </div>
                  <div className="bevel-controls">
                    <span className="bevel-control-btn">_</span>
                  </div>
                </div>

                <nav className="space-y-1">
                  {project.sections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left px-2.5 py-1.5 text-xs transition-colors flex items-center gap-2 ${
                        activeSection === sec.id
                          ? 'bevel-btn-primary text-[0.6875rem] font-bold'
                          : 'text-bp-muted hover:text-bp-text hover:bg-bp-surface font-mono'
                      }`}
                    >
                      <span className="font-pixel text-[0.5625rem] opacity-80">{sec.num}</span>
                      <span className="font-display truncate font-medium">{sec.title}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Stack Technique Pill Card */}
              <div className="bevel-window p-4 sm:p-5">
                <div className="bevel-titlebar -mx-4 -mt-4 sm:-mx-5 sm:-mt-5 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.7)] dark:bg-emerald-400 flex-shrink-0 animate-pulse" />
                    <span className="font-display font-bold text-xs text-emerald-800 dark:text-emerald-300 tracking-tight">
                      STACK TECHNIQUE DÉPLOYÉE
                    </span>
                  </div>
                  <div className="bevel-controls">
                    <span className="bevel-control-btn">□</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`tag-bevel ${getTagBevelClass(tag, idx)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      <LightboxModal
        isOpen={lightboxData.isOpen}
        onClose={() => setLightboxData({ ...lightboxData, isOpen: false })}
        src={lightboxData.src}
        title={lightboxData.title}
        caption={lightboxData.caption}
      />
    </div>
  );
}
