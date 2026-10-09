import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ClippyAssistantProps {
  message: string;
  projectName?: string;
  projectSlug?: string;
  metrics?: string[];
  position?: 'left' | 'right';
}

export default function ClippyAssistant({
  message,
  projectName,
  projectSlug,
  metrics,
  position = 'left'
}: ClippyAssistantProps): React.ReactElement {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const posClass = position === 'left' ? 'left-4 sm:left-6' : 'right-4 sm:right-6';

  if (!isVisible) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        onClick={() => {
          setIsVisible(true);
          setIsMinimized(false);
        }}
        className={`fixed bottom-5 ${posClass} z-40 bevel-window p-3 sm:p-4 bg-[#fffde7]/95 dark:bg-slate-900/95 border-2 border-amber-500/80 dark:border-retro-cyan shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-md text-left cursor-pointer hover:scale-105 active:scale-95 transition-all max-w-[calc(100vw-2.5rem)] sm:min-w-[340px] group`}
        title="Cliquer pour faire venir l'assistant Clippy"
        aria-label="Faire venir l'assistant Clippy"
      >
        <div className="flex items-center gap-3.5">
          {/* Mini Animated Clippy Avatar Box */}
          <div className="bevel-inset p-1.5 bg-amber-200/50 dark:bg-slate-800/80 border border-amber-400/60 dark:border-retro-cyan/40 rounded flex-shrink-0 flex items-center justify-center relative">
            <svg
              viewBox="0 0 100 120"
              className="w-8 h-10 drop-shadow group-hover:rotate-6 transition-transform"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 45,10 C 25,10 15,28 15,50 L 15,85 C 15,102 30,115 50,115 C 70,115 85,102 85,85 L 85,35 C 85,22 75,12 62,12 C 48,12 38,22 38,35 L 38,82 C 38,92 45,98 52,98 C 60,98 66,92 66,82 L 66,42"
                stroke="#94a3b8"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 45,10 C 25,10 15,28 15,50 L 15,85 C 15,102 30,115 50,115 C 70,115 85,102 85,85 L 85,35 C 85,22 75,12 62,12 C 48,12 38,22 38,35 L 38,82 C 38,92 45,98 52,98 C 60,98 66,92 66,82 L 66,42"
                stroke="#f8fafc"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <ellipse cx="44" cy="40" rx="10" ry="12" fill="white" stroke="#0f172a" strokeWidth="2.5" />
              <circle cx="47" cy="40" r="4" fill="#0f172a" />
              <ellipse cx="70" cy="40" rx="10" ry="12" fill="white" stroke="#0f172a" strokeWidth="2.5" />
              <circle cx="73" cy="40" r="4" fill="#0f172a" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>

          {/* Text and context details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-pixel text-[0.75rem] font-bold text-slate-900 dark:text-retro-cyan uppercase tracking-wider">
                ASSISTANT CLIPPY
              </span>
              {projectName ? (
                <span className="px-1.5 py-0.2 rounded text-[0.5625rem] font-pixel bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40">
                  NOTE DISPO
                </span>
              ) : (
                <span className="px-1.5 py-0.2 rounded text-[0.5625rem] font-pixel bg-amber-500/20 text-amber-800 dark:text-retro-cyan border border-amber-500/30">
                  GUIDE SIG
                </span>
              )}
            </div>

            <p className="font-mono text-xs text-slate-700 dark:text-slate-300 truncate">
              {projectName ? (
                <span>Voir le mémo pour <strong className="text-amber-900 dark:text-white font-bold">{projectName}</strong></span>
              ) : (
                <span>Cliquer pour activer les explications de visite</span>
              )}
            </p>
          </div>

          {/* Action indicator tag */}
          <div className="hidden sm:flex flex-col items-center justify-center pl-2 border-l border-amber-300 dark:border-slate-700/80">
            <span className="font-pixel text-[0.625rem] font-bold text-amber-900 dark:text-retro-cyan px-2 py-1 bg-amber-200/80 dark:bg-slate-800 rounded border border-amber-400/60 dark:border-retro-cyan/40">
              OUVRIR ▲
            </span>
          </div>
        </div>
      </motion.button>
    );
  }

  return (
    <aside aria-label="Assistant Clippy" className={`fixed bottom-4 ${posClass} z-40 max-w-[calc(100vw-2rem)] sm:max-w-md w-[430px] pointer-events-auto`}>
      {/* ── Speech Bubble (Authentic Office 97 / Retro CAD Memo Pad) ── */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            key={projectName || 'default'}
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="bevel-window p-4 mb-3 shadow-[0_16px_40px_rgba(0,0,0,0.35)] bg-[#ffffe1] dark:bg-[#0f172a] border-2 border-[#b8860b] dark:border-retro-cyan"
          >
            {/* Titlebar */}
            <div className="bevel-titlebar -mx-4 -mt-4 mb-3 px-3 py-1.5 bg-[#e6dc98] dark:bg-slate-800 text-slate-950 dark:text-retro-cyan flex items-center justify-between border-b border-bevel-mid">
              <div className="flex items-center gap-2">
                <span className="text-base leading-none">📎</span>
                <span className="font-pixel text-[0.6875rem] tracking-wider uppercase font-bold text-slate-900 dark:text-retro-cyan">
                  CLIPPY · ASSISTANT DE VISITE
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="bevel-control-btn text-xs px-1.5 hover:bg-black/10"
                  aria-label="Minimiser l'assistant"
                  title="Minimiser"
                >
                  _
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="bevel-control-btn text-xs px-1.5 hover:bg-red-500 hover:text-white"
                  aria-label="Fermer l'assistant"
                  title="Masquer"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Bubble Content */}
            <div className="space-y-3">
              {projectName && (
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bevel-inset text-[0.625rem] font-pixel text-amber-950 dark:text-retro-cyan bg-amber-200/80 dark:bg-slate-800 font-bold uppercase border border-amber-400 dark:border-retro-cyan/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-retro-cyan animate-ping" />
                  <span>TERRITOIRE : {projectName}</span>
                </div>
              )}

              {/* Message text */}
              <p className="text-xs sm:text-[0.8125rem] font-mono leading-relaxed text-slate-950 dark:text-slate-100 font-medium">
                {message}
              </p>

              {/* Key Metrics preview if available */}
              {metrics && metrics.length > 0 && (
                <div className="grid grid-cols-1 gap-1.5 pt-1">
                  {metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="bevel-inset px-2.5 py-1 text-[0.6875rem] font-mono font-bold text-slate-900 dark:text-white flex items-center gap-2 border-l-2 border-l-retro-cyan bg-white/60 dark:bg-slate-900/60"
                    >
                      <span className="text-retro-cyan font-pixel text-[0.5625rem]">►</span>
                      <span className="truncate">{m}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Call to Action Button */}
              {projectSlug && (
                <div className="pt-2 border-t border-bevel-mid">
                  <Link
                    to={`/projet/${projectSlug}`}
                    className="bevel-btn-primary w-full py-2 text-xs flex items-center justify-center gap-2 font-bold shadow-md hover:scale-[1.01] transition-transform"
                  >
                    <span>CONSULTER LE DOSSIER TECHNIQUE COMPLET</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Big Prominent Clippy Character ── */}
      <div className="flex items-end justify-end gap-3">
        <motion.div
          animate={{
            y: [0, -4, 0],
            rotate: [0, 1.5, -1.5, 0]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="group flex items-center gap-3 p-2.5 bevel-window bg-[#ffffe1] dark:bg-slate-900 border-2 border-amber-400 dark:border-retro-cyan shadow-2xl hover:scale-105 transition-transform select-none"
        >
          <div
            onClick={() => setIsMinimized(!isMinimized)}
            className="cursor-pointer flex items-center gap-3"
            title={isMinimized ? "Cliquer pour agrandir le dialogue de Clippy" : "Cliquer pour réduire la bulle"}
          >
            {/* Authentic High-Res Retro SVG Clippy (Double Size) */}
            <svg
              viewBox="0 0 100 120"
              className="w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 drop-shadow-xl"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Paperclip wire outer shadow */}
              <path
                d="M 45,10 C 25,10 15,28 15,50 L 15,85 C 15,102 30,115 50,115 C 70,115 85,102 85,85 L 85,35 C 85,22 75,12 62,12 C 48,12 38,22 38,35 L 38,82 C 38,92 45,98 52,98 C 60,98 66,92 66,82 L 66,42"
                stroke="#475569"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.4"
              />
              {/* Paperclip wire loop (metallic gradient effect) */}
              <path
                d="M 45,10 C 25,10 15,28 15,50 L 15,85 C 15,102 30,115 50,115 C 70,115 85,102 85,85 L 85,35 C 85,22 75,12 62,12 C 48,12 38,22 38,35 L 38,82 C 38,92 45,98 52,98 C 60,98 66,92 66,82 L 66,42"
                stroke="#94a3b8"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Highlight shine */}
              <path
                d="M 45,10 C 25,10 15,28 15,50 L 15,85 C 15,102 30,115 50,115 C 70,115 85,102 85,85 L 85,35 C 85,22 75,12 62,12 C 48,12 38,22 38,35 L 38,82 C 38,92 45,98 52,98 C 60,98 66,92 66,82 L 66,42"
                stroke="#f1f5f9"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Left Eye (Expressive) */}
              <ellipse cx="44" cy="40" rx="11" ry="13" fill="white" stroke="#1e293b" strokeWidth="2.8" />
              <circle cx="47" cy="40" r="4.5" fill="#0f172a" />
              <circle cx="49" cy="38" r="2" fill="white" />
              {/* Left Eyebrow */}
              <path d="M 34,23 Q 45,18 55,24" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />

              {/* Right Eye (Expressive) */}
              <ellipse cx="70" cy="40" rx="11" ry="13" fill="white" stroke="#1e293b" strokeWidth="2.8" />
              <circle cx="73" cy="40" r="4.5" fill="#0f172a" />
              <circle cx="75" cy="38" r="2" fill="white" />
              {/* Right Eyebrow */}
              <path d="M 61,24 Q 72,19 82,25" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
            </svg>

            <div className="flex flex-col pr-1">
              <span className="font-pixel text-[0.6875rem] text-slate-900 dark:text-retro-cyan font-bold tracking-wider">
                {isMinimized ? "AFFICHER LE RÉSUMÉ ▲" : "RÉDUIRE LA BULLE ▼"}
              </span>
              <span className="font-mono text-[0.5625rem] text-slate-600 dark:text-bp-muted">
                Votre guide interactif
              </span>
            </div>
          </div>

          {/* Quick Close Button to return to summon box */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            className="bevel-control-btn text-xs px-1.5 py-0.5 hover:bg-red-500 hover:text-white"
            title="Masquer Clippy"
            aria-label="Masquer Clippy"
          >
            ×
          </button>
        </motion.div>
      </div>
    </aside>
  );
}
