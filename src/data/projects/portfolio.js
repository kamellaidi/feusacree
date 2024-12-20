// Import des images
import portfolio_home from '../../assets/screenshots_projects/portfolio/feusacree_home_front.png';
import portfolio_modal from '../../assets/screenshots_projects/portfolio/feusacree_modal_front.png';
import portfolio_projects from '../../assets/screenshots_projects/portfolio/feusacree_projets_front.png';
import portfolio_responsive from '../../assets/screenshots_projects/portfolio/feusacree_responsive_front.png';

export const portfolioProject = {
  title: "Portfolio",
  description: "Site personnel de présentation professionnelle avec design responsive et moderne.",
  longDescription: "Portfolio moderne développé avec React et Tailwind CSS, mettant en avant une expérience utilisateur fluide et un design épuré. Le projet intègre des animations subtiles, une navigation responsive, et une mise en page soignée pour présenter mes projets et compétences de manière professionnelle.",
  features: [
    {
        name: "Design Responsive",
        interface: {
            image: portfolio_home,
            description: "Landing page avec présentation et navigation fluide."
        },
        code: {
            image: portfolio_responsive,
            description: "Configuration Tailwind et mise en place des breakpoints responsives."
        }
    },
    {
        name: "Modal Projets",
        interface: {
            image: portfolio_modal,
            description: "Galerie de projets avec descriptions détaillées."
        },
        code: {
            image: portfolio_projects,
            description: "Composant Modal réutilisable avec gestion d'état et animations."
        }
    },
    {
        name: "Formulaire Contact",
        interface: {
            image: portfolio_home, // Vous pourriez vouloir un screenshot spécifique pour le contact
            description: "Section contact avec formulaire interactif."
        },
        code: {
            image: portfolio_responsive,
            description: "Validation et gestion des soumissions du formulaire."
        }
    }
],
  technologies: ["React", "Tailwind CSS", "JavaScript"]
};