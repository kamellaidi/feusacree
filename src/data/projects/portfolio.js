import portfolio1 from '../../assets/screenshots_projects/test1 copy.png';
import portfolio2 from '../../assets/screenshots_projects/test1 copy 2.png';
import portfolio3 from '../../assets/screenshots_projects/test1 copy 3.png';

export const portfolioProject = {
  title: "Portfolio",
  description: "Site personnel de présentation professionnelle avec design responsive et moderne.",
  longDescription: "Ce portfolio personnel est une vitrine de mes compétences...",
  features: [
    {
      name: "Design Responsive",
      interface: {
        image: portfolio1,
        description: "Landing page avec présentation et navigation fluide."
      },
      code: {
        image: portfolio1,
        description: "Configuration Tailwind et mise en place des breakpoints responsives."
      }
    },
    {
      name: "Modal Projets",
      interface: {
        image: portfolio2,
        description: "Galerie de projets avec descriptions détaillées."
      },
      code: {
        image: portfolio2,
        description: "Composant Modal réutilisable avec gestion d'état et animations."
      }
    },
    {
      name: "Formulaire Contact",
      interface: {
        image: portfolio3,
        description: "Section contact avec formulaire interactif."
      },
      code: {
        image: portfolio3,
        description: "Validation et gestion des soumissions du formulaire."
      }
    }
  ],
  technologies: ["HTML", "Tailwind CSS", "JavaScript"]
};