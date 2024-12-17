import dubaiHome1 from '../../assets/screenshots_projects/test1 copy 5.png';
import dubaiHome2 from '../../assets/screenshots_projects/test1 copy 6.png';
import dubaiHome3 from '../../assets/screenshots_projects/test1 copy 7.png';

export const dubaiHomeProject = {
  title: "DubaiHome",
  description: "Site de recherche immobilière utilisant l'API Bayut pour du contenu dynamique.",
  longDescription: "DubaiHome est une plateforme immobilière sophistiquée...",
  features: [
    {
      name: "Moteur de Recherche",
      interface: {
        image: dubaiHome1,
        description: "Interface de recherche avec filtres avancés."
      },
      code: {
        image: dubaiHome1,
        description: "Configuration Next.js pour l'intégration de l'API Bayut et gestion des filtres."
      }
    },
    {
      name: "Détail Propriété",
      interface: {
        image: dubaiHome2,
        description: "Page détaillée d'une propriété avec galerie photos et informations."
      },
      code: {
        image: dubaiHome2,
        description: "Composant de page dynamique avec getStaticProps pour le pré-rendu des données."
      }
    },
    {
      name: "Carte Interactive",
      interface: {
        image: dubaiHome3,
        description: "Visualisation des propriétés sur une carte interactive."
      },
      code: {
        image: dubaiHome3,
        description: "Intégration de la carte avec gestion des marqueurs et événements."
      }
    }
  ],
  technologies: ["Next.js", "Chakra UI", "API Integration"]
};