// Import des screenshots d'interface
import locstore_front_cart from '../../assets/screenshots_projects/locstore/locstorefront_cart.png';
import locstore_front_home from '../../assets/screenshots_projects/locstore/locstorefront_home.png';
import locstore_front_item from '../../assets/screenshots_projects/locstore/locstorefront_item.png';
import locstore_front_login from '../../assets/screenshots_projects/locstore/locstorefront_login.png';
import locstore_front_dashboard from '../../assets/screenshots_projects/locstore/locstorefront_dashboard.png';


export const locstoreProject = {
    title: "Loc'Store",
    description: "Application e-commerce full stack de location de matériel événementiel. React, Redux, JWT, API REST.",
    githubUrl: "https://github.com/kamellaidi",
    longDescription: "LocStore est une application full-stack de location de matériel événementiel développée avec React 18 et Redux pour la gestion d'état globale. L'architecture front-end s'appuie sur React Router DOM pour la navigation, Redux Toolkit pour la gestion des reducers, et intègre des hooks personnalisés pour optimiser la réutilisation du code. La gestion des dates utilise un système de validation complexe avec une logique de disponibilité en temps réel. Le panier implémente des reducers Redux pour la persistance des données et le calcul dynamique des prix. L'authentification utilise JWT avec stockage sécurisé, tandis que l'interface utilisateur est construite avec Bootstrap pour un design responsive. Le back-end Node.js/Express gère les requêtes API RESTful et PostgreSQL assure le stockage des données avec des relations complexes pour la gestion des réservations et du stock.",
    features: [
        {
            name: "Gestion du Panier",
            interface: {
                image: locstore_front_cart,
                description: "Le panier présente une vue détaillée des articles sélectionnés avec leur durée de location, calcule automatiquement les prix en fonction de la période choisie et permet une modification dynamique des quantités. Un système de réduction est intégré avec affichage du total HT/TTC."
            },
            code: {
                type: "snippet",
                language: "javascript",
                description: "Reducer Redux du panier : gestion des actions add/remove/update avec calcul dynamique du total et persistance localStorage.",
                snippet: `// src/store/reducers/cartReducer.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0 },
  reducers: {
    addItem(state, action) {
      const { id, pricePerDay, startDate, endDate } = action.payload;
      const days = Math.ceil(
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
      );
      const existing = state.items.find(i => i.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1, days });
      }
      state.total = state.items.reduce(
        (sum, i) => sum + i.pricePerDay * i.days * i.quantity,
        0
      );
    },
    removeItem(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
      state.total = state.items.reduce(
        (sum, i) => sum + i.pricePerDay * i.days * i.quantity,
        0
      );
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;`
            }
        },
        {
            name: "Catalogue et Gestion des Dates",
            interface: {
                image: locstore_front_home,
                description: "Interface principale combinant un catalogue interactif et un système de sélection des dates. Les utilisateurs peuvent filtrer le matériel disponible selon leur période de location, avec une mise à jour en temps réel des disponibilités et une validation instantanée des sélections."
            },
            code: {
                type: "snippet",
                language: "javascript",
                description: "Hook de sélection de dates : validation de la cohérence start/end, calcul du nombre de jours et synchronisation avec Redux.",
                snippet: `// src/hooks/useDateRangePicker.js
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setDateRange } from '../store/reducers/filterReducer';

export const useDateRangePicker = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate]     = useState('');
  const [error, setError]         = useState('');

  const handleStartDate = useCallback((value) => {
    setStartDate(value);
    if (endDate && new Date(value) >= new Date(endDate)) {
      setError('La date de début doit être avant la date de fin');
      return;
    }
    setError('');
    if (endDate) dispatch(setDateRange({ startDate: value, endDate }));
  }, [endDate, dispatch]);

  const handleEndDate = useCallback((value) => {
    setEndDate(value);
    if (startDate && new Date(value) <= new Date(startDate)) {
      setError('La date de fin doit être après la date de début');
      return;
    }
    setError('');
    if (startDate) dispatch(setDateRange({ startDate, endDate: value }));
  }, [startDate, dispatch]);

  const getDays = useCallback(() => {
    if (!startDate || !endDate) return 0;
    return Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
  }, [startDate, endDate]);

  return { startDate, endDate, error, getDays,
           handleStartDate, handleEndDate };
};`
            }
        },
        {
            name: "Page Produit",
            interface: {
                image: locstore_front_item,
                description: "Page détaillée de produit avec visualisation des caractéristiques techniques, disponibilités, et options de personnalisation. Interface responsive avec galerie d'images et sélecteur de quantité."
            },
            code: {
                type: "snippet",
                language: "jsx",
                description: "Composant CartItem : affichage de l'article, mise à jour de quantité et suppression avec dispatch Redux.",
                snippet: `// src/components/CartItem/CartItem.jsx
import { useDispatch } from 'react-redux';
import { removeItem } from '../../store/reducers/cartReducer';
import PropTypes from 'prop-types';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { id, name, pricePerDay, days, quantity, image } = item;
  const subtotal = pricePerDay * days * quantity;

  return (
    <div className="cart-item">
      <img src={image} alt={name} className="cart-item__img" />
      <div className="cart-item__info">
        <h4>{name}</h4>
        <p>{days} jour{days > 1 ? 's' : ''} × {quantity} unité{quantity > 1 ? 's' : ''}</p>
        <p className="cart-item__price">{pricePerDay} €/j</p>
      </div>
      <div className="cart-item__total">
        <span>{subtotal.toFixed(2)} €</span>
        <button
          onClick={() => dispatch(removeItem(id))}
          aria-label={\`Supprimer \${name}\`}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    pricePerDay: PropTypes.number.isRequired,
    days: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CartItem;`
            }
        },
        {
            name: "Authentification",
            interface: {
                image: locstore_front_login,
                description: "Interface sécurisée de connexion avec validation des champs en temps réel et gestion des erreurs. Support de la persistance de session et de la récupération de mot de passe."
            },
            code: {
                type: "snippet",
                language: "jsx",
                description: "Composant Login : authentification JWT, stockage du token et redirection post-connexion via Redux et React Router.",
                snippet: `// src/components/Login/Login.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../store/reducers/authReducer';
import api from '../../services/api';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', credentials);
      localStorage.setItem('token', data.token);
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      navigate('/catalogue');
    } catch (err) {
      setError(
        err.response?.status === 401
          ? 'Identifiants incorrects'
          : 'Erreur de connexion, réessayez plus tard'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="email" value={credentials.email} required
        onChange={e => setCredentials(p => ({ ...p, email: e.target.value }))}
        placeholder="Email"
      />
      <input
        type="password" value={credentials.password} required
        onChange={e => setCredentials(p => ({ ...p, password: e.target.value }))}
        placeholder="Mot de passe"
      />
      {error && <p className="login-form__error">{error}</p>}
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;`
            }
        },
        {
            name: "Dashboard Utilisateur",
            interface: {
                image: locstore_front_dashboard,
                description: "Interface personnalisée de gestion de profil permettant aux utilisateurs de modifier leurs informations personnelles. Le dashboard inclut une navigation intuitive avec accès aux commandes et aux paramètres du compte."
            },
            code: {
                type: "snippet",
                language: "jsx",
                description: "Dashboard profil : chargement des données utilisateur via Redux, formulaire de mise à jour avec état local et dispatch asynchrone.",
                snippet: `// src/pages/Dashboard/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../store/reducers/authReducer';
import api from '../../services/api';

const Dashboard = () => {
  const dispatch  = useDispatch();
  const { user }  = useSelector(state => state.auth);
  const [form, setForm]     = useState({ name: '', phone: '' });
  const [saved, setSaved]   = useState(false);

  useEffect(() => {
    if (user) setForm({ name: user.name, phone: user.phone ?? '' });
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    const { data } = await api.put('/users/profile', form);
    dispatch(updateProfile(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <section className="dashboard">
      <h2>Mon profil</h2>
      <form onSubmit={handleSave}>
        <input
          value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          placeholder="Nom complet"
        />
        <input
          value={form.phone}
          onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
          placeholder="Téléphone"
        />
        <button type="submit">Enregistrer</button>
        {saved && <span className="dashboard__success">Profil mis à jour</span>}
      </form>
    </section>
  );
};

export default Dashboard;`
            }
        }
    ],
    technologies: [
        "React",
        "Redux",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Bootstrap"
    ]
}
