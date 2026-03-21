export const ceePlanningProject = {
  title: "CEE Planning Tool",
  description: "Outil de planification de dossiers CEE développé en PHP / Laravel — gestion des interventions, des inspecteurs et des créneaux disponibles.",
  longDescription: "Application Laravel MVC pour la gestion des dossiers de Certificats d'Économie d'Énergie. Permet de créer et suivre les dossiers (bénéficiaire, adresse, type de travaux), d'affecter les inspecteurs disponibles et de planifier les visites via un calendrier mensuel. API JSON interne consommée par le front Blade + Alpine.js.",
  features: [
    {
      name: "Gestion des dossiers CEE",
      interface: {
        type: "description",
        content: "Formulaire de création de dossier : bénéficiaire, adresse, nature des travaux (isolation, chauffage, menuiseries…), surface, date prévue. Validation côté serveur avec les règles métier CEE."
      },
      code: {
        type: "snippet",
        language: "php",
        description: "DossierCEEController — validation Laravel, création avec relation travaux, déclenchement automatique de la planification d'inspection.",
        snippet: `<?php
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
        $slots   = $this->planningService->getAvailableSlots($month, $year);
        $dossiers = DossierCEE::whereMonth('date_prevue', $month)
            ->whereYear('date_prevue', $year)
            ->with('travaux', 'inspecteur')
            ->orderBy('date_prevue')
            ->get();

        return response()->json(compact('slots', 'dossiers'));
    }
}`
      }
    },
    {
      name: "Modèle & Relations Laravel",
      interface: {
        type: "description",
        content: "Modèle DossierCEE avec relations polymorphiques vers les types de travaux CEE, belongsTo inspecteur, scopes de filtrage par statut. Migrations et seeders pour les codes travaux ATEE."
      },
      code: {
        type: "snippet",
        language: "php",
        description: "Model DossierCEE — casts, relations HasMany/BelongsTo et scopes Eloquent pour le filtrage par statut et par période.",
        snippet: `<?php
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
}`
      }
    },
    {
      name: "Service de planification",
      interface: {
        type: "description",
        content: "Calendrier mensuel des visites avec créneaux disponibles par inspecteur. Détection des conflits, affectation automatique au premier inspecteur libre, notifications email à la confirmation."
      },
      code: {
        type: "snippet",
        language: "php",
        description: "PlanningService — calcul des créneaux libres par mois, détection des conflits d'agenda et affectation automatique des inspecteurs.",
        snippet: `<?php
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
}`
      }
    }
  ],
  technologies: ["PHP", "Laravel", "MySQL", "Eloquent ORM", "REST API", "Carbon"]
};
