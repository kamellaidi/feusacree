import { useState, useEffect } from 'react';
import './Navbar.css';
import Flame from './Flame';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDesktopNav, setShowDesktopNav] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Ferme le menu mobile après le clic
  };

  return (
    <>
      {showDesktopNav && (
        <nav className="navbar desktop-nav">
          <div className="logo">
            <Flame />
          </div>
          <ul className="nav-links">
            <li><a href="#presentation" onClick={() => scrollToSection('presentation')}>Présentation</a></li>
            <li><a href="#projects" onClick={() => scrollToSection('projects')}>Projets</a></li>
            <li><a href="#skills" onClick={() => scrollToSection('skills')}>Skills</a></li>
            <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
          </ul>
        </nav>
      )}
      <div className="mobile-menu">
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        {isOpen && (
          <div className="fullscreen-menu">
            <ul className="mobile-nav-links">
              <li><a href="#presentation" onClick={() => scrollToSection('presentation')}>Présentation</a></li>
              <li><a href="#projects" onClick={() => scrollToSection('projects')}>Projets</a></li>
              <li><a href="#skills" onClick={() => scrollToSection('skills')}>Skills</a></li>
              <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;