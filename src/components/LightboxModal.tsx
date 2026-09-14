import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title?: string;
  caption?: string;
}

export default function LightboxModal({ isOpen, onClose, src, title, caption }: LightboxModalProps): React.ReactElement {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/80 backdrop-blur-sm cursor-zoom-out"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bevel-window relative max-w-6xl w-full overflow-hidden shadow-2xl cursor-default"
          >
            {/* ── Modal Titlebar ── */}
            <div className="bevel-titlebar">
              <div className="flex items-center gap-2 truncate pr-2">
                <ZoomIn className="w-3.5 h-3.5 text-retro-cyan flex-shrink-0" />
                <span className="bevel-titlebar-text">
                  {title || "Aperçu DAO & Cartographie"}
                </span>
              </div>
              <div className="bevel-controls">
                <button
                  onClick={onClose}
                  aria-label="Fermer la vue"
                  className="bevel-control-btn hover:bg-retro-red hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            {/* ── Inset Frame for Image ── */}
            <div className="p-3 sm:p-4 bg-bp-surface">
              <div className="bevel-inset p-2 flex items-center justify-center bg-bp-canvas max-h-[72vh] overflow-auto">
                <img
                  src={src}
                  alt={title || "Carte cartographique"}
                  className="max-h-[68vh] w-auto max-w-full object-contain"
                />
              </div>
            </div>

            {/* ── Caption Bar ── */}
            {caption && (
              <div className="p-3 bg-bp-panel border-t border-bevel-mid text-xs text-bp-muted font-mono leading-relaxed">
                <span className="text-retro-cyan font-pixel text-[0.625rem] mr-2">NOTE:</span>
                {caption}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
