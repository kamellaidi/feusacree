import dubaiHome1 from '../../assets/screenshots_projects/dubaiHome1.png';
import dubaiHome2 from '../../assets/screenshots_projects/dubaiHome2.png';
import dubaiHome3 from '../../assets/screenshots_projects/dubaiHome3.png';

export const dubaiHomeProject = {
  title: "DubaiHome",
  description: "Site immobilier moderne utilisant Next.js et l'API Bayut pour créer une expérience de recherche immobilière fluide à Dubaï.",
  longDescription: "DubaiHome est une application immobilière construite avec Next.js qui démontre une approche moderne du développement web. Le projet met en œuvre les fonctionnalités avancées de Next.js (SSR et SSG) pour garantir des performances optimales et un excellent référencement, tout en offrant une expérience utilisateur exceptionnelle grâce à Chakra UI. L'intégration de l'API Bayut permet un accès en temps réel aux données immobilières de Dubaï, tandis que le système de filtrage sophistiqué permet aux utilisateurs d'affiner leurs recherches selon de multiples critères.",
  features: [
    {
      name: "Système de Filtrage Avancé",
      interface: {
        image: dubaiHome1,
        description: "Interface de recherche complexe permettant aux utilisateurs de filtrer les propriétés selon de multiples critères : prix, surface, nombre de pièces, type de bien, etc. La barre de filtres utilise Chakra UI pour une expérience utilisateur intuitive et responsive."
      },
      code: {
        type: "snippet",
        language: "jsx",
        description: "Composant SearchFilters : synchronisation des filtres avec l'URL via Next.js Router, récupération des propriétés via React Query.",
        snippet: `// components/SearchFilters.jsx
import { useRouter } from 'next/router';
import { Select, Box, Button } from '@chakra-ui/react';
import { useState } from 'react';

const PURPOSES = ['for-rent', 'for-sale'];
const PROPERTY_TYPES = ['Apartment', 'Villa', 'Townhouse', 'Penthouse'];

const SearchFilters = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    purpose:      router.query.purpose ?? 'for-rent',
    propertyType: router.query.propertyType ?? '',
    minPrice:     router.query.minPrice ?? '',
    maxPrice:     router.query.maxPrice ?? '',
    roomsMin:     router.query.roomsMin ?? '',
  });

  const handleSearch = () => {
    // Purge les valeurs vides avant de pousser dans l'URL
    const query = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== '')
    );
    router.push({ pathname: '/search', query });
  };

  const update = (key) => (e) =>
    setFilters(prev => ({ ...prev, [key]: e.target.value }));

  return (
    <Box display="flex" gap={3} flexWrap="wrap" p={4}>
      <Select value={filters.purpose} onChange={update('purpose')}>
        {PURPOSES.map(p => <option key={p} value={p}>{p}</option>)}
      </Select>
      <Select value={filters.propertyType} onChange={update('propertyType')}>
        <option value="">Tous types</option>
        {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
      </Select>
      <Button colorScheme="blue" onClick={handleSearch}>Rechercher</Button>
    </Box>
  );
};

export default SearchFilters;`
      }
    },
    {
      name: "Détails des Propriétés",
      interface: {
        image: dubaiHome2,
        description: "Pages détaillées des propriétés avec galerie d'images, informations techniques et équipements. Interface élégante construite avec Chakra UI, incluant un carousel d'images et une mise en page responsive."
      },
      code: {
        type: "snippet",
        language: "javascript",
        description: "getServerSideProps : récupération des détails d'une propriété côté serveur pour optimiser le SEO, avec gestion du cas 404.",
        snippet: `// pages/property/[id].js
import { fetchProperty } from '../../utils/fetchApi';

export async function getServerSideProps({ params }) {
  const property = await fetchProperty(params.id);

  if (!property) {
    return { notFound: true };
  }

  return {
    props: { property },
  };
}

// utils/fetchApi.js
export const fetchProperty = async (id) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key':  process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
    },
  };
  const res = await fetch(
    \`https://bayut.p.rapidapi.com/properties/detail?externalID=\${id}\`,
    options
  );
  if (!res.ok) return null;
  return res.json();
};`
      }
    },
    {
      name: "Architecture Next.js",
      interface: {
        image: dubaiHome3,
        description: "Structure de l'application optimisée pour les performances avec chargement progressif et transitions fluides entre les pages."
      },
      code: {
        type: "snippet",
        language: "javascript",
        description: "next.config.js et getStaticProps : configuration des domaines d'images, génération statique de la page d'accueil avec revalidation ISR.",
        snippet: `// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'bayut-production.s3.eu-central-1.amazonaws.com',
      'cdn.propertyimages.com',
    ],
  },
};
module.exports = nextConfig;

// pages/index.js
import { fetchProperties } from '../utils/fetchApi';

export async function getStaticProps() {
  const [forRent, forSale] = await Promise.all([
    fetchProperties({ purpose: 'for-rent', hitsPerPage: 6 }),
    fetchProperties({ purpose: 'for-sale', hitsPerPage: 6 }),
  ]);

  return {
    props: { propertiesForRent: forRent.hits, propertiesForSale: forSale.hits },
    revalidate: 3600, // ISR : regénération toutes les heures
  };
}`
      }
    }
  ],
  technologies: [
    "Next.js",
    "Chakra UI",
    "API Bayut",
    "React Query",
    "Server-Side Rendering",
    "Static Site Generation"
  ],
};
