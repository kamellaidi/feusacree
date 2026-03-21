import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SITE_URL = 'https://kamellaidi.github.io';
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const META = {
  fr: {
    title: 'Kamel Laidi — Chef de Projet & Développeur Full Stack | React · SAP · CEE',
    description:
      'Chef de Projet & Développeur Full Stack à Saint-Maur-des-Fossés. React, SAP HANA, transformation digitale CEE/BTP. Disponible pour missions Île-de-France.',
    keywords:
      'Chef de Projet, Full Stack, JavaScript, React, SAP HANA, CEE, BTP, transformation digitale, Vélizy, Île-de-France, Saint-Maur-des-Fossés',
    locale: 'fr_FR',
    localeAlt: 'en_GB',
    jobTitle: 'Chef de Projet | Développeur Full Stack',
    knowsAbout: ['JavaScript', 'React', 'SAP HANA', 'CEE', 'Gestion de projet', 'BTP', 'Node.js', 'Redux'],
  },
  en: {
    title: 'Kamel Laidi — Project Manager & Full Stack Developer | React · SAP · CEE',
    description:
      'Project Manager & Full Stack Developer based near Paris. React, SAP HANA, digital transformation for CEE/Construction. Open to international opportunities.',
    keywords:
      'Project Manager, Full Stack Developer, JavaScript, React, SAP HANA, CEE, BTP, digital transformation, Paris, Île-de-France',
    locale: 'en_GB',
    localeAlt: 'fr_FR',
    jobTitle: 'Project Manager | Full Stack Developer',
    knowsAbout: ['JavaScript', 'React', 'SAP HANA', 'CEE', 'Project Management', 'Construction', 'Node.js', 'Redux'],
  },
};

const SEO = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const m = META[lang];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kamel Laidi',
    jobTitle: m.jobTitle,
    url: SITE_URL,
    email: 'kamellaidi@outlook.fr',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Saint-Maur-des-Fossés',
      addressCountry: 'FR',
    },
    sameAs: [
      'https://www.linkedin.com/in/kamellaidi',
      'https://github.com/kamellaidi',
    ],
    knowsAbout: m.knowsAbout,
  };

  return (
    <Helmet>
      {/* Primaires */}
      <title>{m.title}</title>
      <meta name="description" content={m.description} />
      <meta name="keywords" content={m.keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Kamel Laidi" />
      <link rel="canonical" href={SITE_URL} />

      {/* Open Graph */}
      <meta property="og:title" content={m.title} />
      <meta property="og:description" content={m.description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={m.locale} />
      <meta property="og:locale:alternate" content={m.localeAlt} />
      <meta property="og:site_name" content="Kamel Laidi — Portfolio" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={m.title} />
      <meta name="twitter:description" content={m.description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;
