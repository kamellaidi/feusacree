import pkg from '/opt/node22/lib/node_modules/playwright/index.js';
const { chromium } = pkg;
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const SCREENSHOTS = [
  // MuscleTracker
  {
    file: 'src/assets/screenshots_projects/muscletracker/muscletracker_code_workout.png',
    language: 'typescript',
    code: `// app/(tabs)/workout.tsx (extrait)
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
}`,
  },
  {
    file: 'src/assets/screenshots_projects/muscletracker/muscletracker_code_datenavigation.png',
    language: 'typescript',
    code: `// src/hooks/useDateNavigation.ts
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
};`,
  },
  {
    file: 'src/assets/screenshots_projects/muscletracker/muscletracker_code_apiroutes.png',
    language: 'typescript',
    code: `// app/api/workouts/route.ts
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
}`,
  },
  {
    file: 'src/assets/screenshots_projects/muscletracker/muscletracker_code_form.png',
    language: 'typescript',
    code: `// src/hooks/useWorkoutForm.ts (extrait)
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
};`,
  },

  // DicoDZ
  {
    file: 'src/assets/screenshots_projects/dicodz/dicodz_code_debounce.png',
    language: 'typescript',
    code: `// src/hooks/useDebounce.ts
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
}`,
  },
  {
    file: 'src/assets/screenshots_projects/dicodz/dicodz_code_fetchwords.png',
    language: 'typescript',
    code: `// src/hooks/useFetchWords.ts
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
}`,
  },
  {
    file: 'src/assets/screenshots_projects/dicodz/dicodz_code_api.png',
    language: 'javascript',
    code: `// api_dicodz/app.js
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
});`,
  },

  // TraceApp
  {
    file: 'src/assets/screenshots_projects/traceapp/traceapp_code_voicecoach.png',
    language: 'typescript',
    code: `// src/hooks/useVoiceCoach.ts
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
};`,
  },
  {
    file: 'src/assets/screenshots_projects/traceapp/traceapp_code_programs.png',
    language: 'typescript',
    code: `// src/services/ProgramService.ts
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
};`,
  },
  {
    file: 'src/assets/screenshots_projects/traceapp/traceapp_code_progress.png',
    language: 'typescript',
    code: `// src/hooks/useProgressStats.ts
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
};`,
  },

  // Qualiconsult
  {
    file: 'src/assets/screenshots_projects/qualiconsult/qualiconsult_code_template.png',
    language: 'javascript',
    code: `// hooks/useWordTemplate.js
import { useCallback } from 'react';
import { Document, Paragraph, TextRun, Packer } from 'docx';

const FIELD_MAPPING = {
  date_visite:    'DATE_VISITE',
  nom_client:     'NOM_CLIENT',
  adresse:        'ADRESSE_CHANTIER',
  type_travaux:   'TYPE_TRAVAUX',
  observations:   'OBSERVATIONS',
  inspecteur:     'NOM_INSPECTEUR',
};

export const useWordTemplate = (templateId) => {
  const generateDocument = useCallback(async (daxiumData) => {
    const sections = Object.entries(daxiumData.fields)
      .filter(([key]) => FIELD_MAPPING[key])
      .map(([key, value]) => ({
        placeholder: FIELD_MAPPING[key],
        value: String(value ?? '—'),
      }));

    const doc = new Document({
      sections: [{
        children: sections.map(({ placeholder, value }) =>
          new Paragraph({
            children: [
              new TextRun({ text: \`\${placeholder} : \`, bold: true }),
              new TextRun(value),
            ],
          })
        ),
      }],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = \`rapport_\${templateId}_\${Date.now()}.docx\`;
    link.click();
    URL.revokeObjectURL(url);
  }, [templateId]);

  return { generateDocument };
};`,
  },
  {
    file: 'src/assets/screenshots_projects/qualiconsult/qualiconsult_code_parser.png',
    language: 'javascript',
    code: `// utils/parseDaxiumResponse.js
export const parseDaxiumResponse = (rawResponse) => {
  const { data, metadata } = rawResponse;

  return {
    id: data.id,
    type: metadata.formType,
    fields: data.fields.reduce((acc, field) => {
      // Normalise les labels en clés snake_case sans accents
      const key = field.label
        .toLowerCase()
        .replace(/\\s+/g, '_')
        .normalize('NFD')
        .replace(/[\\u0300-\\u036f]/g, '');

      acc[key] = field.type === 'date'
        ? new Date(field.value).toLocaleDateString('fr-FR')
        : field.value;

      return acc;
    }, {}),
    attachments: (data.attachments ?? []).map(att => ({
      name: att.filename,
      url: att.url,
      type: att.mimeType,
    })),
    createdAt: new Date(metadata.createdAt),
  };
};`,
  },
  {
    file: 'src/assets/screenshots_projects/qualiconsult/qualiconsult_code_webhook.png',
    language: 'javascript',
    code: `// server/webhooks/daxiumHandler.js
const crypto = require('crypto');

const validateSignature = (payload, signature, secret) => {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
};

module.exports = async (req, res) => {
  const signature = req.headers['x-daxium-signature'];

  if (!validateSignature(req.body, signature, process.env.DAXIUM_SECRET)) {
    return res.status(401).json({ error: 'Signature invalide' });
  }

  const parsed = parseDaxiumResponse(req.body);

  await generateAndStore({
    templateId: parsed.type,
    data: parsed,
    userId: req.body.metadata.userId,
  });

  res.status(200).json({ received: true, id: parsed.id });
};`,
  },

  // CEE Planning
  {
    file: 'src/assets/screenshots_projects/ceeplanning/ceeplanning_code_controller.png',
    language: 'php',
    code: `<?php
// app/Http/Controllers/DossierCEEController.php
namespace App\\Http\\Controllers;

use App\\Models\\DossierCEE;
use App\\Services\\PlanningService;
use Illuminate\\Http\\Request;

class DossierCEEController extends Controller
{
    public function __construct(
        private readonly PlanningService $planningService
    ) {}

    public function store(Request $request): \\Illuminate\\Http\\JsonResponse
    {
        $validated = $request->validate([
            'beneficiaire'      => 'required|string|max:255',
            'adresse'           => 'required|string',
            'travaux'           => 'required|array|min:1',
            'travaux.*.code'    => 'required|string',
            'travaux.*.surface' => 'nullable|numeric|min:1',
            'date_prevue'       => 'required|date|after:today',
        ]);

        $dossier = DossierCEE::create([
            ...$validated,
            'statut'     => 'en_attente',
            'created_by' => auth()->id(),
        ]);

        $this->planningService->scheduleInspection($dossier);

        return response()->json($dossier->load('travaux'), 201);
    }

    public function planning(int $month, int $year): \\Illuminate\\Http\\JsonResponse
    {
        $slots    = $this->planningService->getAvailableSlots($month, $year);
        $dossiers = DossierCEE::whereMonth('date_prevue', $month)
            ->whereYear('date_prevue', $year)
            ->with('travaux', 'inspecteur')
            ->orderBy('date_prevue')
            ->get();

        return response()->json(compact('slots', 'dossiers'));
    }
}`,
  },
  {
    file: 'src/assets/screenshots_projects/ceeplanning/ceeplanning_code_model.png',
    language: 'php',
    code: `<?php
// app/Models/DossierCEE.php
namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\HasMany;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;
use Illuminate\\Database\\Eloquent\\Builder;

class DossierCEE extends Model
{
    protected $fillable = [
        'beneficiaire', 'adresse', 'statut',
        'date_prevue', 'created_by',
    ];

    protected $casts = [
        'date_prevue' => 'date',
    ];

    public function travaux(): HasMany
    {
        return $this->hasMany(TravauxCEE::class);
    }

    public function inspecteur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scopeEnCours(Builder $query): Builder
    {
        return $query->where('statut', 'en_cours');
    }

    public function scopePeriode(
        Builder $query,
        int $month,
        int $year
    ): Builder {
        return $query
            ->whereMonth('date_prevue', $month)
            ->whereYear('date_prevue', $year);
    }
}`,
  },
  {
    file: 'src/assets/screenshots_projects/ceeplanning/ceeplanning_code_service.png',
    language: 'php',
    code: `<?php
// app/Services/PlanningService.php
namespace App\\Services;

use App\\Models\\{DossierCEE, User};
use Carbon\\Carbon;
use Illuminate\\Support\\Collection;

class PlanningService
{
    public function getAvailableSlots(int $month, int $year): array
    {
        $start = Carbon::create($year, $month, 1)->startOfMonth();
        $end   = $start->copy()->endOfMonth();

        $booked = DossierCEE::whereBetween('date_prevue', [$start, $end])
            ->pluck('date_prevue')
            ->map(fn($d) => $d->toDateString())
            ->toArray();

        $slots = [];
        for ($d = $start->copy(); $d->lte($end); $d->addDay()) {
            if ($d->isWeekend()) continue;
            $dateStr = $d->toDateString();
            $slots[$dateStr] = [
                'available' => !in_array($dateStr, $booked),
                'count'     => array_count_values($booked)[$dateStr] ?? 0,
            ];
        }
        return $slots;
    }

    public function scheduleInspection(DossierCEE $dossier): void
    {
        $inspector = User::role('inspecteur')
            ->whereDoesntHave('dossiers', fn($q) =>
                $q->whereDate('date_prevue', $dossier->date_prevue)
            )
            ->first();

        if ($inspector) {
            $dossier->update([
                'created_by' => $inspector->id,
                'statut'     => 'planifie',
            ]);
        }
    }
}`,
  },
];

// VS Code Dark+ color theme tokens
const COLORS = {
  typescript: {
    keyword: '#569cd6',
    string: '#ce9178',
    comment: '#6a9955',
    type: '#4ec9b0',
    number: '#b5cea8',
    function: '#dcdcaa',
    variable: '#9cdcfe',
    operator: '#d4d4d4',
    bracket: '#ffd700',
    default: '#d4d4d4',
  },
  javascript: {
    keyword: '#569cd6',
    string: '#ce9178',
    comment: '#6a9955',
    type: '#4ec9b0',
    number: '#b5cea8',
    function: '#dcdcaa',
    variable: '#9cdcfe',
    operator: '#d4d4d4',
    bracket: '#ffd700',
    default: '#d4d4d4',
  },
  php: {
    keyword: '#569cd6',
    string: '#ce9178',
    comment: '#6a9955',
    type: '#4ec9b0',
    number: '#b5cea8',
    function: '#dcdcaa',
    variable: '#9cdcfe',
    operator: '#d4d4d4',
    bracket: '#ffd700',
    default: '#d4d4d4',
  },
};

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function highlightCode(code, language) {
  const escaped = escapeHtml(code);

  // Apply syntax highlighting with regex patterns
  let result = escaped;

  if (language === 'php') {
    // PHP specific
    result = result
      // Comments
      .replace(/(\/\/[^\n]*)/g, '<span style="color:#6a9955">$1</span>')
      // Strings
      .replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g, '<span style="color:#ce9178">$1</span>')
      // Variables
      .replace(/(\$[a-zA-Z_][a-zA-Z0-9_]*)/g, '<span style="color:#9cdcfe">$1</span>')
      // Keywords
      .replace(/\b(namespace|use|class|extends|implements|public|private|protected|function|return|new|if|else|foreach|for|while|readonly|static|abstract|interface|trait|null|true|false|self|this|fn|array|string|int|float|bool|void|mixed)\b/g,
        '<span style="color:#569cd6">$1</span>')
      // PHP open tag
      .replace(/(&lt;\?php)/g, '<span style="color:#569cd6">$1</span>')
      // Types / classes
      .replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g, '<span style="color:#4ec9b0">$1</span>')
      // Numbers
      .replace(/\b(\d+)\b/g, '<span style="color:#b5cea8">$1</span>');
  } else {
    // TypeScript / JavaScript
    result = result
      // Single line comments
      .replace(/(\/\/[^\n]*)/g, '<span style="color:#6a9955">$1</span>')
      // Template literals backtick strings (already escaped)
      .replace(/(&#96;(?:[^&#]|&[^#]|&#(?!96;))*&#96;)/g, '<span style="color:#ce9178">$1</span>')
      // Regular strings
      .replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g, '<span style="color:#ce9178">$1</span>')
      // Keywords
      .replace(/\b(import|export|from|default|const|let|var|function|return|async|await|if|else|try|catch|new|class|extends|implements|interface|type|enum|null|undefined|true|false|this|super|of|in|for|while|do|switch|case|break|continue|typeof|instanceof|void|delete|throw|finally)\b/g,
        '<span style="color:#569cd6">$1</span>')
      // Types
      .replace(/\b(string|number|boolean|any|never|unknown|object|symbol|bigint|Promise|Array|Record|Partial|Required|Readonly|Pick|Omit|Extract|Exclude)\b/g,
        '<span style="color:#4ec9b0">$1</span>')
      // Decorators / React hooks / common functions
      .replace(/\b(useState|useEffect|useCallback|useMemo|useRef|useContext|useReducer|console)\b/g,
        '<span style="color:#dcdcaa">$1</span>')
      // Numbers
      .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span style="color:#b5cea8">$1</span>')
      // Object keys / identifiers before :
      .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*:(?!:))/g, '<span style="color:#9cdcfe">$1</span>');
  }

  return result;
}

function buildHtml(code, language, filename) {
  const highlighted = highlightCode(code, language);
  const lines = highlighted.split('\n');
  const lineNumbers = lines.map((_, i) => `<span>${i + 1}</span>`).join('\n');
  const codeLines = lines.join('\n');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #1e1e1e;
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.6;
  }
  .window {
    background: #1e1e1e;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.6);
    border: 1px solid #3c3c3c;
    min-width: 700px;
    display: inline-block;
  }
  .titlebar {
    background: #2d2d2d;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid #3c3c3c;
  }
  .dot { width: 12px; height: 12px; border-radius: 50%; }
  .dot.red { background: #ff5f57; }
  .dot.yellow { background: #febc2e; }
  .dot.green { background: #28c840; }
  .filename {
    color: #9d9d9d;
    font-size: 12px;
    margin-left: 8px;
    font-family: 'SF Pro Text', 'Segoe UI', sans-serif;
  }
  .code-container {
    display: flex;
    padding: 16px 0;
  }
  .line-numbers {
    padding: 0 16px 0 20px;
    color: #5a5a5a;
    text-align: right;
    user-select: none;
    border-right: 1px solid #333;
    line-height: 1.6;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    min-width: 48px;
  }
  .code {
    padding: 0 24px;
    color: #d4d4d4;
    white-space: pre;
    overflow: visible;
    flex: 1;
  }
</style>
</head>
<body>
<div class="window">
  <div class="titlebar">
    <div class="dot red"></div>
    <div class="dot yellow"></div>
    <div class="dot green"></div>
    <span class="filename">${escapeHtml(filename)}</span>
  </div>
  <div class="code-container">
    <div class="line-numbers">${lineNumbers}</div>
    <div class="code">${codeLines}</div>
  </div>
</div>
</body>
</html>`;
}

function extractFilename(code) {
  const match = code.match(/^\/\/ (.+)\n/) || code.match(/^<\?php\n\/\/ (.+)\n/);
  if (match) return match[1].split(' ')[0];
  return '';
}

const BASE = '/home/user/feusacree';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

for (const item of SCREENSHOTS) {
  const filename = extractFilename(item.code);
  const html = buildHtml(item.code, item.language, filename);

  await page.setContent(html, { waitUntil: 'load' });

  // Size to content
  const windowEl = await page.$('.window');
  const box = await windowEl.boundingBox();
  await page.setViewportSize({
    width: Math.ceil(box.width) + 40,
    height: Math.ceil(box.height) + 40,
  });

  // Re-set content and screenshot
  await page.setContent(html, { waitUntil: 'load' });
  const el = await page.$('.window');

  const outputPath = `${BASE}/${item.file}`;
  mkdirSync(dirname(outputPath), { recursive: true });
  await el.screenshot({ path: outputPath });
  console.log(`✓ ${item.file}`);
}

await browser.close();
console.log('\nDone! All screenshots generated.');
