export const dicodzProject = {
  title: "DicoDZ",
  description: "Dictionnaire bilingue français / algérien — React TypeScript avec recherche debounce et API REST Node.js / MongoDB.",
  longDescription: "Application full stack composée d'un front React TypeScript (hooks custom, recherche dynamique avec debounce) et d'un back Node.js Express avec MongoDB. La recherche en temps réel interroge deux endpoints distincts — liste complète ou recherche filtrée — avec gestion des erreurs Axios typée. Architecture séparée front/back avec CORS configuré.",
  githubUrl: "https://github.com/kamellaidi/front-dico-dz",
  features: [
    {
      name: "Recherche avec debounce",
      interface: {
        type: "description",
        content: "Interface de recherche dynamique : saisie utilisateur → debounce 300ms → appel API → liste de mots FR/DZ filtrée en temps réel. Chaque mot affiche la traduction, le type grammatical et la transcription phonétique."
      },
      code: {
        type: "snippet",
        language: "typescript",
        description: "useDebounce — délai configurable avant déclenchement de la recherche, cleanup du timer à chaque keystroke.",
        snippet: `// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup : annule le timer si value change avant delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`
      }
    },
    {
      name: "Hook de fetch TypeScript",
      interface: {
        type: "description",
        content: "États loading, error et data gérés dans un seul hook. Le refreshTrigger permet de forcer un rechargement depuis l'extérieur sans modifier la query."
      },
      code: {
        type: "snippet",
        language: "typescript",
        description: "useFetchWords — switch automatique entre endpoint liste et endpoint recherche selon la query, avec typage strict des erreurs Axios.",
        snippet: `// src/hooks/useFetchWords.ts
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { WORDS_ENDPOINT, SEARCH_ENDPOINT } from '../config/config';

interface Word {
  _id: string;
  wordfr: string;
  worddz: string;
  type: string;
}

export function useFetchWords(
  debouncedSearchQuery: string,
  refreshTrigger: number = 0
) {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWords = useCallback(async () => {
    try {
      const url = debouncedSearchQuery ? SEARCH_ENDPOINT : WORDS_ENDPOINT;
      const response = await axios.get(url, {
        params: debouncedSearchQuery ? { q: debouncedSearchQuery } : {}
      });
      setWords(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(\`Erreur : \${err.response?.data?.message || err.message}\`);
      } else {
        setError("Une erreur inattendue s'est produite");
      }
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchQuery]);

  useEffect(() => {
    fetchWords();
  }, [fetchWords, refreshTrigger]);

  return { words, loading, error };
}`
      }
    },
    {
      name: "API REST Express / MongoDB",
      interface: {
        type: "description",
        content: "Back Node.js Express avec MongoDB, CORS configuré pour le front React, routes modulaires. Endpoints GET /api/words et GET /api/words/search?q= avec correspondance partielle insensible à la casse."
      },
      code: {
        type: "snippet",
        language: "javascript",
        description: "Serveur Express — configuration CORS restrictive, routes API modulaires, vérification de la connexion MongoDB au démarrage.",
        snippet: `// api_dicodz/app.js
const express = require('express');
const db = require('./config/db');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api', routes);

app.get('/health', async (req, res) => {
  if (db.readyState === 1) {
    res.status(200).json({ status: 'ok', db: 'connected' });
  } else {
    res.status(500).json({ status: 'error', db: 'disconnected' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`API DicoDZ démarrée sur le port \${PORT}\`);
});`
      }
    }
  ],
  technologies: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Axios", "React Router"]
};
