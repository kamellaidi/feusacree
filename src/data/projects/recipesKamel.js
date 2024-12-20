// Import des images interface
import recipeskamel_front_home from '../../assets/screenshots_projects/recipeskamel/recipeskamel_front_home.png';
import recipeskamel_front_recipe from '../../assets/screenshots_projects/recipeskamel/recipeskamel_front_recipe.png';

// Import des images code
import recipeskamel_code_app from '../../assets/screenshots_projects/recipeskamel/recipeskamel_code_app.png';
import recipeskamel_code_card from '../../assets/screenshots_projects/recipeskamel/recipeskamel_code_card.png';
import recipeskamel_code_reducer from '../../assets/screenshots_projects/recipeskamel/recipeskamel_code_reducer.png';

export const recipesKamelProject = {
    title: "RecipesKamel",
    description: "Application de recettes de cuisine algérienne avec navigation dynamique et gestion d'état Redux.",
    longDescription: "RecipesKamel est une application web moderne dédiée à la découverte de la cuisine algérienne traditionnelle. Développée avec React et Redux, elle propose une expérience utilisateur fluide avec une navigation dynamique, une gestion d'état centralisée, et une interface élégante. L'application met en avant la richesse du patrimoine culinaire algérien à travers des recettes détaillées et des fonctionnalités de favoris personnalisés.",
    features: [
        {
            name: "Navigation et Structure",
            interface: {
                image: recipeskamel_front_home,
                description: "Page d'accueil présentant un menu de navigation intuitif et une mise en page claire des recettes avec leur niveau de difficulté et descriptions détaillées."
            },
            code: {
                image: recipeskamel_code_app,
                description: "Composant App principal utilisant React Router pour la navigation, avec une gestion optimisée du scroll et du chargement des données via useEffect et Redux."
            }
        },
        {
            name: "Affichage des Recettes",
            interface: {
                image: recipeskamel_front_recipe,
                description: "Page détaillée de recette présentant les ingrédients, les instructions et les informations culturelles associées à chaque plat traditionnel."
            },
            code: {
                image: recipeskamel_code_card,
                description: "Composant Card modulaire gérant l'affichage des recettes avec PropTypes pour la validation des données et une structure JSX optimisée."
            }
        },
        {
            name: "Gestion d'État",
            interface: {
                image: recipeskamel_front_home,
                description: "Système de gestion des données permettant un accès rapide aux recettes et une navigation fluide entre les différentes sections."
            },
            code: {
                image: recipeskamel_code_reducer,
                description: "Reducer Redux implémentant la logique de gestion des recettes et des favoris, avec un state initial structuré et des actions typées."
            }
        }
    ],
    technologies: ["React", "Redux", "React Router", "PropTypes", "Sass"]
};