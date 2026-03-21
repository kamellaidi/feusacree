import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Flame from './Flame';
import './Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const [showDesktopNav, setShowDesktopNav] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('en') ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowDesktopNav(window.scrollY < window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const currentLang = i18n.language.startsWith('en') ? 'EN' : 'FR';

  return (
    <>
      {showDesktopNav && (
        <nav className="navbar desktop-nav">
          <div className="logo">
            <Flame />
          </div>
          <ul className="nav-links">
            <li><a href="#presentation" onClick={() => scrollToSection('presentation')}>{t('nav.presentation')}</a></li>
            <li><a href="#projects" onClick={() => scrollToSection('projects')}>{t('nav.projects')}</a></li>
            <li><a href="#skills" onClick={() => scrollToSection('skills')}>{t('nav.skills')}</a></li>
            <li><a href="#contact" onClick={() => scrollToSection('contact')}>{t('nav.contact')}</a></li>
          </ul>
          <button
            className="lang-toggle"
            onClick={toggleLanguage}
            aria-label={`Passer en ${currentLang === 'FR' ? 'anglais' : 'français'}`}
          >
            {t('nav.switch_lang')}
          </button>
        </nav>
      )}
      <div className="mobile-menu">
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Ouvrir le menu"
          aria-expanded={isOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        {isOpen && (
          <div className="fullscreen-menu">
            <ul className="mobile-nav-links">
              <li><a href="#presentation" onClick={() => scrollToSection('presentation')}>{t('nav.presentation')}</a></li>
              <li><a href="#projects" onClick={() => scrollToSection('projects')}>{t('nav.projects')}</a></li>
              <li><a href="#skills" onClick={() => scrollToSection('skills')}>{t('nav.skills')}</a></li>
              <li><a href="#contact" onClick={() => scrollToSection('contact')}>{t('nav.contact')}</a></li>
              <li>
                <button className="lang-toggle lang-toggle--mobile" onClick={toggleLanguage}>
                  {t('nav.switch_lang')}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
