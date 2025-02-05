import dubaiHome1 from '../../assets/screenshots_projects/dubaiHome1.png';
import dubaiHome2 from '../../assets/screenshots_projects/dubaiHome2.png';
import dubaiHome3 from '../../assets/screenshots_projects/dubaiHome3.png';

// Import des images code
import dubaiHome_code1 from '../../assets/screenshots_projects/dubaiHome_code1.png';
//import dubaiHome_code2 from '../../assets/screenshots_projects/dubaiHome_code2.png';
//import dubaiHome_code3 from '../../assets/screenshots_projects/dubaiHome_code3.png';

export const dubaiHomeProject = {
  title: "DubaiHome",
  description: "Site immobilier moderne utilisant Next.js et l'API Bayut pour créer une expérience de recherche immobilière fluide à Dubaï.",
  longDescription: "DubaiHome est une application immobilière construite avec Next.js qui démontre une approche moderne du développement web. Le projet met en œuvre les fonctionnalités avancées de Next.js (SSR et SSG) pour garantir des performances optimales et un excellent référencement, tout en offrant une expérience utilisateur exceptionnelle grâce à Chakra UI. L'intégration de l'API Bayut permet un accès en temps réel aux données immobilières de Dubaï, tandis que le système de filtrage sophistiqué permet aux utilisateurs d'affiner leurs recherches selon de multiples critères. Le choix de Next.js s'est révélé crucial pour gérer le rendu côté serveur et la génération de pages statiques, optimisant ainsi les performances et le SEO. L'utilisation de Chakra UI a permis de créer une interface élégante et responsive sans CSS personnalisé, démontrant l'importance d'utiliser des outils modernes pour accélérer le développement tout en maintenant une qualité élevée. L'architecture du projet, avec sa gestion d'état optimisée et son système de routing avancé, reflète une compréhension approfondie des besoins en performance et en expérience utilisateur dans le développement web contemporain.",
  features: [
    {
      name: "Système de Filtrage Avancé",
      interface: {
        image: dubaiHome1,
        description: "Interface de recherche complexe permettant aux utilisateurs de filtrer les propriétés selon de multiples critères : prix, surface, nombre de pièces, type de bien, etc. La barre de filtres utilise Chakra UI pour une expérience utilisateur intuitive et responsive."
      },
      code: {
        image: dubaiHome_code1,
        description: "Implémentation sophistiquée d'un système de filtrage avec gestion d'état React et Next.js Router pour la manipulation des paramètres d'URL. Utilisation de hooks personnalisés pour la gestion des filtres et l'optimisation des requêtes API."
      }
    },
    {
      name: "Détails des Propriétés",
      interface: {
        image: dubaiHome2,
        description: "Pages détaillées des propriétés avec galerie d'images, informations techniques et équipements. Interface élégante construite avec Chakra UI, incluant un carousel d'images et une mise en page responsive."
      },
      code: {
        image: dubaiHome_code1,
        description: "Utilisation de getServerSideProps pour le rendu côté serveur des détails de propriété, optimisant le SEO et les performances. Intégration d'un composant de galerie d'images avec gestion du scroll horizontal et lazy loading."
      }
    },
    {
      name: "Architecture Next.js",
      interface: {
        image: dubaiHome3,
        description: "Structure de l'application optimisée pour les performances avec chargement progressif et transitions fluides entre les pages."
      },
      code: {
        image: dubaiHome_code1,
        description: "Configuration avancée de Next.js avec un mélange de SSR et SSG pour optimiser les performances. Utilisation de dynamic imports et d'une architecture de composants réutilisables."
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