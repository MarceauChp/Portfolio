import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { profileData } from '../data/profileData';
import ThemeToggle from './ThemeToggle';

interface NavLink {
  label: string;
  href: string;
}

export default function Navbar(): React.ReactElement {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks: NavLink[] = [
    { label: "Projets", href: "/#projets" },
    { label: "Compétences", href: "/#competences" },
    { label: "Parcours", href: "/#parcours" },
    { label: "Contact", href: "/#contact" }
  ];

  const handleNavClick = (href: string): void => {
    if (location.pathname === '/' && href.startsWith('/#')) {
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-bp-canvas/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      {/* ── Bevel Window Navbar ── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2">
        <div className={`bevel-window ${isScrolled ? 'shadow-bp-glow' : ''}`}>
          {/* ── Title Bar (hatched) ── */}
          <div className="bevel-titlebar">
            <Link
              to="/"
              className="flex items-center gap-2 group focus:outline-none"
              aria-label="Accueil Marceau Chapon"
            >
              {/* Monogram */}
              <div className="bevel-btn px-1.5 py-0.5 text-retro-cyan font-bold text-xs">
                MC
              </div>
              <span className="font-display font-bold text-xs sm:text-sm text-bp-text group-hover:text-retro-cyan transition-colors tracking-tight">
                {profileData.name} <span className="font-normal text-bp-muted font-mono text-xs hidden sm:inline">| {profileData.role}</span>
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <div className="bevel-controls hidden sm:flex">
                <span className="bevel-control-btn">_</span>
                <span className="bevel-control-btn">□</span>
                <span className="bevel-control-btn">×</span>
              </div>
            </div>
          </div>

          {/* ── Menu Bar ── */}
          <div className="flex items-center justify-between px-2 py-1.5 border-b border-bevel-mid">
            {/* Desktop Links */}
            <nav className="hidden md:flex items-center gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="bevel-btn text-[0.6875rem] font-mono hover:text-retro-cyan"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side: Status + Theme Toggle + CV */}
            <div className="hidden md:flex items-center gap-2">
              {/* Availability Signal with bevel-inset carved case + pulsing green hardware LED */}
              <div className="bevel-inset flex items-center gap-2 px-2.5 py-1 text-[0.5625rem] font-pixel uppercase tracking-wider text-forest font-bold bg-forest-bg border border-forest-border">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#22c55e]" />
                </span>
                <span>DISPONIBLE</span>
              </div>

              {/* Theme Toggle Button */}
              <ThemeToggle />

              {/* CV Download Button */}
              <a
                href={profileData.contacts.cvPdf}
                download="CV_Marceau_Chapon.pdf"
                className="bevel-btn-primary text-[0.625rem] flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                <span>CV.PDF</span>
              </a>
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-1.5 md:hidden">
              <ThemeToggle />

              <a
                href={profileData.contacts.cvPdf}
                download="CV_Marceau_Chapon.pdf"
                aria-label="Télécharger CV"
                className="bevel-btn-primary text-[0.5625rem] flex items-center gap-1 px-2 py-1"
              >
                <Download className="w-3 h-3" />
                <span>CV</span>
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                className="bevel-btn p-1"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer (DAO Popup Window) ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-3 sm:mx-6 lg:mx-8 overflow-hidden"
          >
            <div className="bevel-window mt-1 p-3">
              <div className="bevel-titlebar mb-2">
                <span className="bevel-titlebar-text">Navigation</span>
                <div className="bevel-controls">
                  <button onClick={() => setMobileMenuOpen(false)} className="bevel-control-btn">×</button>
                </div>
              </div>

              <div className="bevel-inset flex items-center gap-2 px-2.5 py-1 text-[0.5625rem] font-pixel uppercase tracking-wider text-forest font-bold bg-forest-bg border border-forest-border mb-2">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#22c55e]" />
                </span>
                <span>Disponible : Thèse & Bureaux d'études</span>
              </div>

              <div className="flex flex-col gap-1 pt-2 border-t border-bevel-mid">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="bevel-btn text-left text-[0.6875rem] w-full"
                  >
                    {'>'} {link.label}
                  </Link>
                ))}
              </div>

              <div className="pt-2 mt-2 border-t border-bevel-mid">
                <a
                  href={profileData.contacts.cvPdf}
                  download="CV_Marceau_Chapon.pdf"
                  className="bevel-btn-primary text-[0.6875rem] flex items-center justify-center gap-2 w-full py-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger mon CV (PDF)</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
