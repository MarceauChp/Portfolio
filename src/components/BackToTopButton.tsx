import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTopButton(): React.ReactElement {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // When near the top, hide completely
      if (scrollY < 150 || docHeight <= 0) {
        setOpacity(0);
        return;
      }

      // Progressive opacity: increases smoothly as user scrolls down the page
      // starts at ~0.25 around 150px and reaches full opacity (1.0) around 60% of the page
      const progress = Math.min(1, Math.max(0.25, scrollY / (docHeight * 0.6)));
      setOpacity(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Retourner en haut de la page"
      style={{
        opacity: opacity,
        pointerEvents: opacity > 0 ? 'auto' : 'none',
      }}
      className="fixed bottom-6 right-6 z-50 bevel-btn-primary px-3 py-2 flex items-center gap-1.5 shadow-2xl transition-all duration-300 hover:scale-105 active:translate-y-0.5 group"
    >
      <ArrowUp className="w-4 h-4 text-retro-cyan transition-transform group-hover:-translate-y-0.5" />
      <span className="font-pixel text-[0.625rem] tracking-wider font-bold">HAUT</span>
    </button>
  );
}
