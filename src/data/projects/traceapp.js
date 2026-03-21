// Import des screenshots de code
import traceapp_code_voicecoach from '../../assets/screenshots_projects/traceapp/traceapp_code_voicecoach.png';
import traceapp_code_programs from '../../assets/screenshots_projects/traceapp/traceapp_code_programs.png';
import traceapp_code_progress from '../../assets/screenshots_projects/traceapp/traceapp_code_progress.png';

export const traceAppProject = {
  title: "TraceApp",
  description: "Application mobile de coaching sportif vocal. React Native, text-to-speech, programmes personnalisés et suivi de progression.",
  longDescription: "Application React Native de coaching en temps réel : un coach vocal (expo-speech) guide l'utilisateur séance par séance, annonce les exercices, compte les séries et déclenche les timers de repos. Les programmes sont personnalisables et persistés en local via AsyncStorage. Navigation par tabs avec Expo Router.",
  features: [
    {
      name: "Coach vocal",
      interface: {
        image: traceapp_code_voicecoach,
        description: "Écran de séance : le coach annonce chaque exercice à voix haute, compte les séries, déclenche automatiquement le timer de repos et relance la série suivante. Paramètres de voix configurables (langue, débit, tonalité)."
      },
      code: {
        type: "snippet",
        language: "typescript",
        description: "useVoiceCoach : wrapper expo-speech avec annonces contextuelles (début de série, fin de repos, encouragement).",
        snippet: `// src/hooks/useVoiceCoach.ts
import { useCallback } from 'react';
import * as Speech from 'expo-speech';
import { Exercise } from '../types';

export const useVoiceCoach = () => {
  const announce = useCallback((message: string) => {
    Speech.speak(message, {
      language: 'fr-FR',
      pitch: 1.0,
      rate: 0.9,
    });
  }, []);

  const startSet = useCallback((
    exercise: Exercise,
    setNumber: number
  ) => {
    announce(
      \`Série \${setNumber} sur \${exercise.sets}. \` +
      \`\${exercise.reps} répétitions. \` +
      \`Poids : \${exercise.weight} kilos. Allez !\`
    );
  }, [announce]);

  const startRest = useCallback((
    seconds: number,
    onComplete: () => void
  ) => {
    announce(\`Repos. \${seconds} secondes.\`);
    const timer = setTimeout(() => {
      announce("C'est reparti !");
      onComplete();
    }, seconds * 1000);
    return () => clearTimeout(timer);
  }, [announce]);

  return { announce, startSet, startRest };
};`
      }
    },
    {
      name: "Programmes personnalisés",
      interface: {
        image: traceapp_code_programs,
        description: "Créer, éditer et planifier des programmes d'entraînement sur mesure. Chaque programme définit les exercices, séries, reps et temps de repos. La planification hebdomadaire distribue les séances sur les jours de la semaine."
      },
      code: {
        type: "snippet",
        language: "typescript",
        description: "ProgramService : persistance AsyncStorage avec upsert, génération du planning hebdomadaire et calcul du volume total par séance.",
        snippet: `// src/services/ProgramService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Program, WeeklySchedule } from '../types';

const STORAGE_KEY = '@trace_programs';

export const ProgramService = {
  async save(program: Program): Promise<void> {
    const existing = await this.getAll();
    const updated = [
      ...existing.filter(p => p.id !== program.id),
      program,
    ];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  async getAll(): Promise<Program[]> {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  generateWeeklySchedule(program: Program): WeeklySchedule {
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    return program.sessions.reduce(
      (schedule, session, index) => ({
        ...schedule,
        [days[index % 7]]: session,
      }),
      {} as WeeklySchedule
    );
  },

  getTotalVolume(program: Program): number {
    return program.sessions.reduce((total, session) =>
      total + session.exercises.reduce((s, ex) =>
        s + ex.sets * ex.reps * (ex.weight ?? 0), 0
      ), 0
    );
  },
};`
      }
    },
    {
      name: "Historique & progression",
      interface: {
        image: traceapp_code_progress,
        description: "Visualisation de l'historique des séances avec courbes de progression par exercice. Comparaison semaine N vs semaine N-1 pour chaque groupe musculaire."
      },
      code: {
        type: "snippet",
        language: "typescript",
        description: "useProgressStats : calcul des deltas de progression par exercice entre deux semaines, avec aggregation par groupe musculaire.",
        snippet: `// src/hooks/useProgressStats.ts
import { useMemo } from 'react';
import { WorkoutEntry } from '../types';

export const useProgressStats = (
  entries: WorkoutEntry[],
  exerciseId: string
) => {
  return useMemo(() => {
    const exerciseEntries = entries
      .filter(e => e.exercise.id === exerciseId)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const getWeekVolume = (weeksAgo: number) => {
      const now = new Date();
      const start = new Date(now);
      start.setDate(now.getDate() - (weeksAgo + 1) * 7);
      const end = new Date(now);
      end.setDate(now.getDate() - weeksAgo * 7);

      return exerciseEntries
        .filter(e => {
          const d = new Date(e.date);
          return d >= start && d < end;
        })
        .reduce((sum, e) => sum + e.sets * e.reps * e.weight, 0);
    };

    const currentWeek = getWeekVolume(0);
    const previousWeek = getWeekVolume(1);
    const delta = previousWeek > 0
      ? ((currentWeek - previousWeek) / previousWeek) * 100
      : null;

    return { currentWeek, previousWeek, delta, entries: exerciseEntries };
  }, [entries, exerciseId]);
};`
      }
    }
  ],
  technologies: ["React Native", "Expo", "TypeScript", "expo-speech", "AsyncStorage", "Expo Router"]
};
