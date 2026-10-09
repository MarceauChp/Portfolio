import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES, type SupportedLanguageCode } from '../i18n';

interface LanguageSelectorProps {
  className?: string;
  isCompact?: boolean;
}


function PixelFlag({
  src,
  alt,
  className = '',
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      className={`w-4 h-2.5 object-cover rounded-[1px] border border-black/20 dark:border-white/20 shrink-0 select-none [image-rendering:pixelated] ${className}`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
}

export default function LanguageSelector({
  className = '',
  isCompact = false,
}: LanguageSelectorProps): React.ReactElement {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLangCode = (i18n.language?.substring(0, 2) || 'fr') as SupportedLanguageCode;
  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLangCode) || SUPPORTED_LANGUAGES[0];

  const handleSelectLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      {/* ── Main Bevel Button Trigger ── */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={t('languageSelector.selectLanguage', 'Choisir la langue')}
        title={t('languageSelector.currentLanguage', 'Langue actuelle') + `: ${currentLang.label}`}
        className="bevel-btn text-[0.625rem] flex items-center gap-1.5 py-1 px-2 hover:text-retro-cyan transition-colors"
      >
        <PixelFlag src={currentLang.flagImg} alt={currentLang.shortLabel} />
        <span className="font-pixel uppercase tracking-wider">{currentLang.shortLabel}</span>
        <ChevronDown
          className={`w-3 h-3 text-bp-dim transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-retro-cyan' : ''
          }`}
        />
      </button>

      {/* ── Cute Bevel Dropdown Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute z-50 mt-1.5 bevel-window shadow-bp-glow ${
              isCompact ? 'right-0 w-48' : 'right-0 w-56'
            }`}
          >
            {/* Window Title Bar */}
            <div className="bevel-titlebar py-0.5 px-2">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-retro-cyan shadow-[0_0_6px_#0284c7] animate-pulse" />
                <span className="font-pixel text-[0.5625rem] text-slate-800 dark:text-slate-200 font-bold uppercase tracking-wider">
                  [LANG] {t('languageSelector.title', 'LANGUE')}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bevel-control-btn text-[0.625rem] w-3.5 h-3.5 flex items-center justify-center leading-none"
                aria-label={t('clippy.close', 'Fermer')}
              >
                ×
              </button>
            </div>

            {/* List Container */}
            <div className="p-1.5 space-y-1 bg-bp-surface">
              {/* Active Languages */}
              <div className="space-y-0.5">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isActive = currentLangCode === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleSelectLanguage(lang.code)}
                      className={`w-full text-left px-2 py-1.5 flex items-center justify-between text-xs transition-colors rounded-none border ${
                        isActive
                          ? 'bevel-inset bg-retro-cyan/15 dark:bg-retro-cyan/25 border-retro-cyan text-slate-950 dark:text-white font-bold'
                          : 'border-transparent hover:bg-bp-canvas/80 text-slate-800 dark:text-slate-200 hover:text-retro-cyan'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <PixelFlag src={lang.flagImg} alt={lang.shortLabel} className="w-4.5 h-3" />
                        <span className="font-display text-xs">{lang.nativeName}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="font-pixel text-[0.5625rem] px-1 py-0.2 bg-bp-canvas border border-bevel-mid text-bp-dim">
                          {lang.shortLabel}
                        </span>
                        {isActive && (
                          <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_6px_#22c55e]" />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-1 mt-1 border-t border-bevel-mid/50 flex items-center justify-between px-1 text-[0.5rem] font-pixel text-bp-muted">
                <span>STAGE 2027</span>
                <span className="text-retro-cyan font-bold">5 LANGUES</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
