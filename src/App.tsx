import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BackToTopButton from './components/BackToTopButton';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';

export default function App(): React.ReactElement {
  return (
    <Router>
      <ScrollToTop />
      <BackToTopButton />
      <div className="relative z-10 min-h-screen bg-transparent text-bp-text flex flex-col font-mono selection:bg-cyan/30 selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projet/:slug" element={<ProjectDetailPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
