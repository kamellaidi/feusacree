import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import frCommon from './locales/fr/common.json';
import frHome from './locales/fr/home.json';
import frProjects from './locales/fr/projects.json';
import frExperience from './locales/fr/experience.json';
import frSkills from './locales/fr/skills.json';
import frContact from './locales/fr/contact.json';

import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enProjects from './locales/en/projects.json';
import enExperience from './locales/en/experience.json';
import enSkills from './locales/en/skills.json';
import enContact from './locales/en/contact.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        common: frCommon,
        home: frHome,
        projects: frProjects,
        experience: frExperience,
        skills: frSkills,
        contact: frContact,
      },
      en: {
        common: enCommon,
        home: enHome,
        projects: enProjects,
        experience: enExperience,
        skills: enSkills,
        contact: enContact,
      },
    },
    fallbackLng: 'fr',
    defaultNS: 'common',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: {
      escapeValue: false,
    },
  });

// Sync <html lang> on init and on every language change
const syncLang = (lng) => {
  document.documentElement.lang = lng.split('-')[0];
};

syncLang(i18n.language || 'fr');
i18n.on('languageChanged', syncLang);

export default i18n;
