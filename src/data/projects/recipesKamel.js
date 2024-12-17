import recipesKamel1 from '../../assets/screenshots_projects/test1 copy 3.png';
import recipesKamel2 from '../../assets/screenshots_projects/test1 copy 4.png';
import recipesKamel3 from '../../assets/screenshots_projects/test1 copy 5.png';

export const recipesKamelProject = {
  title: "RecipesKamel",
  description: "Site de recettes de cuisine avec navigation dynamique et gestion d'état complexe.",
  longDescription: "RecipesKamel est une application web moderne dédiée aux passionnés de cuisine...",
  features: [
    {
      name: "Liste des Recettes",
      interface: {
        image: recipesKamel1,
        description: "Vue principale affichant la liste des recettes avec système de filtrage."
      },
      code: {
        image: recipesKamel1,
        description: "Composant React de la liste des recettes avec intégration Redux pour la gestion des filtres."
      }
    },
    {
      name: "Détail Recette",
      interface: {
        image: recipesKamel2,
        description: "Page détaillée d'une recette avec ingrédients et étapes."
      },
      code: {
        image: recipesKamel2,
        description: "Logique de récupération et d'affichage des données détaillées d'une recette."
      }
    },
    {
      name: "Système de Favoris",
      interface: {
        image: recipesKamel3,
        description: "Gestion des recettes favorites avec stockage persistant."
      },
      code: {
        image: recipesKamel3,
        description: "Reducer Redux pour la gestion des favoris avec persistance localStorage."
      }
    }
  ],
  technologies: ["React", "Redux", "React Router", "Sass"]
};