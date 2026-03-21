// Import des screenshots de code
import muscletracker_code_workout from '../../assets/screenshots_projects/muscletracker/muscletracker_code_workout.png';
import muscletracker_code_datenavigation from '../../assets/screenshots_projects/muscletracker/muscletracker_code_datenavigation.png';
import muscletracker_code_apiroutes from '../../assets/screenshots_projects/muscletracker/muscletracker_code_apiroutes.png';
import muscletracker_code_form from '../../assets/screenshots_projects/muscletracker/muscletracker_code_form.png';

export const muscletrackerProject = {
  title: "MuscleTracker",
  description: "Application mobile de suivi sportif (Expo/React Native) couplée à une version web Next.js avec authentification et base MongoDB.",
  longDescription: "Deux versions complémentaires : une app mobile Expo/React Native (TypeScript) avec stockage local AsyncStorage, navigation par tabs et hooks custom pour la gestion des séances, et une version web Next.js 14 avec Prisma ORM, MongoDB Atlas, NextAuth et API Routes. Les deux partagent la même logique métier : plans d'entraînement, filtrage par groupe musculaire, historique et statistiques par séance.",
  githubUrl: "https://github.com/kamellaidi/muscletracker",
  features: [
    {
      name: "Séances d'entraînement",
      interface: {
        image: muscletracker_code_workout,
        description: "Page de séance mobile : sélecteur de date, liste des exercices du jour, formulaire d'ajout en 3 étapes (groupe musculaire → exercice → séries/reps/poids), résumé statistique en temps réel."
      },
      code: {
        type: "snippet",
        language: "typescript",
        description: "WorkoutPage : gestion optimiste de la liste après ajout, rechargement déclenché par changement de date via useCallback.",
        snippet: `// app/(tabs)/workout.tsx (extrait)
export default function WorkoutPage() {
  const { colors } = useTheme();
  const dateNavigation = useDateNavigation();
  const [todayWorkouts, setTodayWorkouts] = useState<WorkoutEntry[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Mise à jour optimiste, pas de rechargement réseau
  const handleWorkoutAdded = useCallback((newWorkout: WorkoutEntry) => {
    setTodayWorkouts(prev => [...prev, newWorkout]);
    setShowModal(false);
  }, []);

  const workoutForm = useWorkoutForm(
    dateNavigation.selectedDateString,
    handleWorkoutAdded
  );

  const loadData = useCallback(async () => {
    const workoutsData = await StorageService.getWorkoutsByDate(
      dateNavigation.selectedDateString
    );
    setTodayWorkouts(workoutsData);
  }, [dateNavigation.selectedDateString]);

  useEffect(() => { loadData(); }, [loadData]);

  // ...
}`
      }
    },
    {
      name: "Hooks : Navigation de dates",
      interface: {
        image: muscletracker_code_datenavigation,
        description: "Sélecteur de date mobile avec navigation jour précédent / suivant / aujourd'hui. Synchronisation automatique entre les composants jour, mois, année et la chaîne ISO utilisée pour les requêtes."
      },
      code: {
        type: "snippet",
        language: "typescript",
        description: "useDateNavigation : synchronisation bidirectionnelle entre composants jour/mois/année et date ISO via useEffect.",
        snippet: `// src/hooks/useDateNavigation.ts
import { useCallback, useEffect, useState } from 'react';
import { getTodayISOString, toISODateString } from '../constants/dates';

export const useDateNavigation = () => {
  const currentDate = new Date();
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedDateString, setSelectedDateString] = useState(getTodayISOString());

  // Sync ISO string quand les composants changent
  useEffect(() => {
    const newDateString = toISODateString(selectedDay, selectedMonth, selectedYear);
    setSelectedDateString(newDateString);
  }, [selectedDay, selectedMonth, selectedYear]);

  const goToToday = useCallback(() => {
    const today = new Date();
    setSelectedDay(today.getDate());
    setSelectedMonth(today.getMonth() + 1);
    setSelectedYear(today.getFullYear());
  }, []);

  const goToPreviousDay = useCallback(() => {
    const date = new Date(selectedYear, selectedMonth - 1, selectedDay);
    date.setDate(date.getDate() - 1);
    setSelectedDay(date.getDate());
    setSelectedMonth(date.getMonth() + 1);
    setSelectedYear(date.getFullYear());
  }, [selectedDay, selectedMonth, selectedYear]);

  return { selectedDay, selectedMonth, selectedYear,
           selectedDateString, goToToday, goToPreviousDay };
};`
      }
    },
    {
      name: "API Routes & Schéma Prisma",
      interface: {
        image: muscletracker_code_apiroutes,
        description: "Version web Next.js 14 : API Routes typées avec Prisma Client, MongoDB Atlas, authentification NextAuth. Gestion des séances, machines, plans d'entraînement et profil utilisateur."
      },
      code: {
        type: "snippet",
        language: "typescript",
        description: "Route API workouts (GET/POST) avec Prisma : requête conditionnelle typée et création avec relations.",
        snippet: `// app/api/workouts/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  const queryOptions: Prisma.WorkoutFindManyArgs = {
    include: { machine: true },
    orderBy: { createdAt: 'desc' },
    ...(date && { where: { date } }),
  };

  const workouts = await prisma.workout.findMany(queryOptions);
  return NextResponse.json(workouts);
}

export async function POST(request: Request) {
  const data = await request.json();
  const workout = await prisma.workout.create({
    data: {
      ...data,
      machineId: String(data.machineId),
      series: parseInt(data.series ?? '3'),
      repetitions: parseInt(data.repetitions),
      poids: parseFloat(data.poids),
    },
    include: { machine: true },
  });
  return NextResponse.json(workout);
}`
      }
    },
    {
      name: "Formulaire d'exercice",
      interface: {
        image: muscletracker_code_form,
        description: "Hook de formulaire multi-étapes : sélection de l'exercice, saisie des séries/reps/poids avec validation complète avant soumission."
      },
      code: {
        type: "snippet",
        language: "typescript",
        description: "useWorkoutForm : validation métier avec messages d'erreur natifs React Native avant persistance AsyncStorage.",
        snippet: `// src/hooks/useWorkoutForm.ts (extrait)
export const useWorkoutForm = (
  selectedDateString: string,
  onWorkoutAdded: (workout: WorkoutEntry) => void
) => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [useWeight, setUseWeight] = useState(true);

  const isFormValid = (): boolean => {
    if (!selectedExercise) return false;
    if (!sets.trim() || parseInt(sets) <= 0) return false;
    if (!reps.trim() || parseInt(reps) <= 0) return false;
    if (useWeight && (!weight.trim() || parseFloat(weight) <= 0)) return false;
    return true;
  };

  const handleSubmit = async () => {
    if (!selectedExercise) {
      Alert.alert('Erreur', WORKOUT_MESSAGES.ERRORS.NO_EXERCISE);
      return;
    }
    const entry: WorkoutEntry = {
      id: Date.now().toString(),
      date: selectedDateString,
      exercise: selectedExercise,
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: useWeight ? parseFloat(weight) : 0,
    };
    await StorageService.saveWorkout(entry);
    onWorkoutAdded(entry);
  };

  return { selectedExercise, sets, reps, weight,
           useWeight, isFormValid, handleSubmit,
           setSelectedExercise, setSets, setReps,
           setWeight, setUseWeight };
};`
      }
    }
  ],
  technologies: ["React Native", "Expo", "TypeScript", "Next.js 14", "Prisma", "MongoDB", "NextAuth", "AsyncStorage"]
};
