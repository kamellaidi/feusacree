import React, { useState, useEffect } from 'react';
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

  return (
    <>
      {showDesktopNav && (
        <nav className="navbar desktop-nav">
          <div className="logo">
            <Flame />
          </div>
          <ul className="nav-links">
            <li><a href="#presentation">Présentation</a></li>
            <li><a href="#projects">Projets</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
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
              <li><a href="#presentation" onClick={toggleMenu}>Présentation</a></li>
              <li><a href="#projects" onClick={toggleMenu}>Projets</a></li>
              <li><a href="#skills" onClick={toggleMenu}>Skills</a></li>
              <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;