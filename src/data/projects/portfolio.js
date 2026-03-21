import portfolio_home from '../../assets/screenshots_projects/portfolio/feusacree_home_front.png';
import portfolio_modal from '../../assets/screenshots_projects/portfolio/feusacree_modal_front.png';
import portfolio_projects from '../../assets/screenshots_projects/portfolio/feusacree_projets_front.png';

export const portfolioProject = {
  title: "Feu Sacré",
  description: "Portfolio React avec hooks personnalisés, background vidéo animé et toggle Interface/Code.",
  longDescription: "Portfolio construit de zéro, sans template ni UI library. Architecture React avec hooks custom (useFeatureNavigation, useZoom), background vidéo full-screen, modals projet avec toggle Interface/Code et zoom interactif. Navigation scroll-aware, design 100% CSS custom.",
  githubUrl: "https://github.com/kamellaidi/feusacree",
  features: [
    {
      name: "Hooks personnalisés",
      interface: {
        image: portfolio_home,
        description: "Interface principale : présentation, projets, compétences et contact sur une seule page avec navigation smooth-scroll."
      },
      code: {
        type: "snippet",
        language: "javascript",
        description: "useFeatureNavigation : navigation circulaire entre les features d'un projet avec useCallback pour éviter les re-renders.",
        snippet: `// src/hooks/useFeatureNavigation.js
import { useState, useCallback } from 'react';

export const useFeatureNavigation = (features) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex(prev =>
      prev === features.length - 1 ? 0 : prev + 1
    );
  }, [features.length]);

  const prev = useCallback(() => {
    setCurrentIndex(prev =>
      prev === 0 ? features.length - 1 : prev - 1
    );
  }, [features.length]);

  return { currentIndex, next, prev };
};`
      }
    },
    {
      name: "Modal & Zoom interactif",
      interface: {
        image: portfolio_modal,
        description: "Modal projet avec galerie de features, navigation prev/next, toggle Interface/Code et zoom au clic."
      },
      code: {
        type: "snippet",
        language: "javascript",
        description: "useZoom : gestion du zoom interactif avec bornes min/max, step et reset via ZOOM_CONFIG.",
        snippet: `// src/hooks/useZoom.js
import { useState, useCallback } from 'react';
import { ZOOM_CONFIG } from '../constants/zoom';

export const useZoom = (initialZoom = ZOOM_CONFIG.DEFAULT) => {
  const [zoom, setZoom] = useState(initialZoom);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + ZOOM_CONFIG.STEP, ZOOM_CONFIG.MAX));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - ZOOM_CONFIG.STEP, ZOOM_CONFIG.MIN));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(ZOOM_CONFIG.DEFAULT);
  }, []);

  return { zoom, setZoom, handleZoomIn, handleZoomOut, resetZoom };
};`
      }
    },
    {
      name: "Background Vidéo & Navbar",
      interface: {
        image: portfolio_projects,
        description: "Section projets avec cards cliquables, badges technos et accès aux modals."
      },
      code: {
        type: "snippet",
        language: "javascript",
        description: "Navbar scroll-aware : masque la navigation desktop une fois la première section passée.",
        snippet: `// src/components/Navbar/Navbar.jsx (extrait)
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDesktopNav, setShowDesktopNav] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowDesktopNav(scrollPosition < windowHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)
      ?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  // ...
};`
      }
    }
  ],
  technologies: ["React.js", "Hooks Custom", "CSS3", "Vite", "JavaScript ES6+"]
};
