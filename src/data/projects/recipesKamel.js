// Import des images interface
import recipeskamel_front_home from '../../assets/screenshots_projects/recipeskamel/recipeskamel_front_home.png';
import recipeskamel_front_recipe from '../../assets/screenshots_projects/recipeskamel/recipeskamel_front_recipe.png';

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
                type: "snippet",
                language: "jsx",
                description: "Composant App : configuration React Router avec scroll-to-top automatique et initialisation du store Redux au chargement.",
                snippet: `// src/App.jsx
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadRecipes } from './store/reducers/recipesReducer';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import RecipeDetail from './pages/RecipeDetail/RecipeDetail';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRecipes());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/recette/:slug" element={<RecipeDetail />} />
      </Routes>
    </>
  );
};

export default App;`
            }
        },
        {
            name: "Affichage des Recettes",
            interface: {
                image: recipeskamel_front_recipe,
                description: "Page détaillée de recette présentant les ingrédients, les instructions et les informations culturelles associées à chaque plat traditionnel."
            },
            code: {
                type: "snippet",
                language: "jsx",
                description: "Composant RecipeCard : affichage structuré avec PropTypes, badge de difficulté et lien vers la page détail.",
                snippet: `// src/components/RecipeCard/RecipeCard.jsx
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './RecipeCard.sass';

const DIFFICULTY_LABELS = { easy: 'Facile', medium: 'Moyen', hard: 'Difficile' };

const RecipeCard = ({ recipe }) => {
  const { slug, title, image, difficulty, prepTime, description } = recipe;

  return (
    <article className="recipe-card">
      <Link to={\`/recette/\${slug}\`}>
        <img src={image} alt={title} className="recipe-card__img" />
      </Link>
      <div className="recipe-card__body">
        <span className={\`recipe-card__badge recipe-card__badge--\${difficulty}\`}>
          {DIFFICULTY_LABELS[difficulty]}
        </span>
        <h3 className="recipe-card__title">
          <Link to={\`/recette/\${slug}\`}>{title}</Link>
        </h3>
        <p className="recipe-card__time">{prepTime} min</p>
        <p className="recipe-card__desc">{description}</p>
      </div>
    </article>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    slug:        PropTypes.string.isRequired,
    title:       PropTypes.string.isRequired,
    image:       PropTypes.string.isRequired,
    difficulty:  PropTypes.oneOf(['easy', 'medium', 'hard']).isRequired,
    prepTime:    PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeCard;`
            }
        },
        {
            name: "Gestion d'État",
            interface: {
                image: recipeskamel_front_home,
                description: "Système de gestion des données permettant un accès rapide aux recettes et une navigation fluide entre les différentes sections."
            },
            code: {
                type: "snippet",
                language: "javascript",
                description: "Reducer Redux : gestion des recettes et des favoris avec actions typées et state initial structuré.",
                snippet: `// src/store/reducers/recipesReducer.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import recipesData from '../../data/recipes.json';

export const loadRecipes = createAsyncThunk(
  'recipes/load',
  async () => recipesData
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    list:       [],
    favorites:  [],
    status:     'idle',
  },
  reducers: {
    toggleFavorite(state, action) {
      const slug = action.payload;
      const index = state.favorites.indexOf(slug);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(slug);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRecipes.pending,  (state) => { state.status = 'loading'; })
      .addCase(loadRecipes.fulfilled, (state, action) => {
        state.list   = action.payload;
        state.status = 'idle';
      })
      .addCase(loadRecipes.rejected, (state) => { state.status = 'error'; });
  },
});

export const { toggleFavorite } = recipesSlice.actions;
export default recipesSlice.reducer;`
            }
        }
    ],
    technologies: ["React", "Redux", "React Router", "PropTypes", "Sass"]
};
