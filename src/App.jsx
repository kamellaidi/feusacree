import { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';

import VideoBG from './components/VideoBG';
import Navbar from './components/Navbar/Navbar';
import Presentation from './components/Presentation/Presentation';
import SEO from './components/SEO/SEO';

// Lazy-load les sections non critiques (sous le fold)
const Projects    = lazy(() => import('./components/Projects/Projects'));
const Experiences = lazy(() => import('./components/Experiences/Experiences'));
const Skills      = lazy(() => import('./components/Skills/Skills'));
const Contact     = lazy(() => import('./components/Contact/Contact'));

const SectionFallback = () => (
  <div style={{ minHeight: '100vh' }} aria-hidden="true" />
);

const App = () => {
  return (
    <HelmetProvider>
      <SEO />
      <div className="app-container">
        <VideoBG />
        <Navbar />
        <main>
          <Presentation />
          <Suspense fallback={<SectionFallback />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Experiences />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </main>
      </div>
    </HelmetProvider>
  );
};

export default App;
