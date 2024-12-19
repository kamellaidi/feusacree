// Import des images
import locstore_code1 from '../../assets/screenshots_projects/locstore/locstore_code1_cartreducer.png';
import locstore_code4 from '../../assets/screenshots_projects/locstore/locstore_code4_daterangepicker.png';
import locstore_code5 from '../../assets/screenshots_projects/locstore/locstore_code5_cartitem_component.png';
import locstore_code6 from '../../assets/screenshots_projects/locstore/locstore_code6_login.png'
import locstore_code7 from '../../assets/screenshots_projects/locstore/locstore_code7_dashboard.png'


// Import des screenshots d'interface
import locstore_front_cart from '../../assets/screenshots_projects/locstore/locstorefront_cart.png';
import locstore_front_home from '../../assets/screenshots_projects/locstore/locstorefront_home.png';
import locstore_front_item from '../../assets/screenshots_projects/locstore/locstorefront_item.png';
import locstore_front_login from '../../assets/screenshots_projects/locstore/locstorefront_login.png';
import locstore_front_dashboard from '../../assets/screenshots_projects/locstore/locstorefront_dashboard.png';


export const locstoreProject = {
    title: "LocStore",
    description: "Site e-commerce de location de matériel événementiel avec gestion avancée du panier et des réservations.",
longDescription: "LocStore est une application full-stack de location de matériel événementiel développée avec React 18 et Redux pour la gestion d'état globale. L'architecture front-end s'appuie sur React Router DOM pour la navigation, Redux Toolkit pour la gestion des reducers, et intègre des hooks personnalisés pour optimiser la réutilisation du code. La gestion des dates utilise un système de validation complexe avec une logique de disponibilité en temps réel. Le panier implémente des reducers Redux pour la persistance des données et le calcul dynamique des prix. L'authentification utilise JWT avec stockage sécurisé, tandis que l'interface utilisateur est construite avec Bootstrap pour un design responsive. Le back-end Node.js/Express gère les requêtes API RESTful et PostgreSQL assure le stockage des données avec des relations complexes pour la gestion des réservations et du stock.",
    features: [
        {
            name: "Gestion du Panier",
            interface: {
                image: locstore_front_cart,
                description: "Le panier présente une vue détaillée des articles sélectionnés avec leur durée de location, calcule automatiquement les prix en fonction de la période choisie et permet une modification dynamique des quantités. Un système de réduction est intégré avec affichage du total HT/TTC."
            },
            code: {
                image: locstore_code1,
                description: "Implémentation d'un reducer Redux robuste gérant l'état du panier avec persistance locale. Le code gère les cas complexes comme la validation des disponibilités, le calcul des prix selon la durée, et la synchronisation avec le backend."
            }
        },
        {
            name: "Catalogue et Gestion des Dates",
            interface: {
                image: locstore_front_home,
                description: "Interface principale combinant un catalogue interactif et un système de sélection des dates. Les utilisateurs peuvent filtrer le matériel disponible selon leur période de location, avec une mise à jour en temps réel des disponibilités et une validation instantanée des sélections."
            },
            code: {
                image: locstore_code4,
                description: "Implémentation Redux gérant la synchronisation entre le catalogue et les dates de location. Le reducer intègre une logique complexe de filtrage du stock disponible et de validation des périodes sélectionnées, optimisant les performances avec un système de cache."
            }
        },
        {
            name: "Page Produit",
            interface: {
                image: locstore_front_item,
                description: "Page détaillée de produit avec visualisation des caractéristiques techniques, disponibilités, et options de personnalisation. Interface responsive avec galerie d'images et sélecteur de quantité."
            },
            code: {
                image: locstore_code5,
                description: "Composant CartItem optimisé gérant l'affichage et les interactions de chaque article. Intègre une logique de mise à jour efficace pour éviter les re-rendus inutiles et maintenir les performances."
            }
        },
        {
            name: "Authentification",
            interface: {
                image: locstore_front_login,
                description: "Interface sécurisée de connexion avec validation des champs en temps réel et gestion des erreurs. Support de la persistance de session et de la récupération de mot de passe."
            },
            code: {
                image: locstore_code6,
                description: "Composant Login implémentant une authentification sécurisée avec gestion des tokens JWT, validation des formulaires, et intégration avec le système de persistance Redux."
            }
        },
        {
            name: "Dashboard Utilisateur",
            interface: {
                image: locstore_front_dashboard, 
                description: "Interface personnalisée de gestion de profil permettant aux utilisateurs de modifier leurs informations personnelles. Le dashboard inclut une navigation intuitive avec accès aux commandes et aux paramètres du compte."
            },
            code: {
                image: locstore_code7, //
                description: "Composant React utilisant les hooks (useState) et Redux (useSelector, useDispatch) pour la gestion d'état du profil utilisateur. Implémente une logique de mise à jour asynchrone avec gestion des formulaires et validation des données en temps réel."
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