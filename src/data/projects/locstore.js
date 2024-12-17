// Import des images
import locstore_code1 from '../../assets/screenshots_projects/locstore/locstore_code1_cartreducer.png';
import locstore_code2 from '../../assets/screenshots_projects/locstore/locstore_code2_datesreducer.png';
import locstore_code3 from '../../assets/screenshots_projects/locstore/locstore_code3_actionscart.png';
import locstore_code4 from '../../assets/screenshots_projects/locstore/locstore_code4_daterangepicker.png';
import locstore_code5 from '../../assets/screenshots_projects/locstore/locstore_code5_cartitem_component.png';
import locstore_code6 from '../../assets/screenshots_projects/locstore/locstore_code6_login.png'

// Import des screenshots d'interface
import locstore_front_cart from '../../assets/screenshots_projects/locstore/locstorefront_cart.png';
import locstore_front_home from '../../assets/screenshots_projects/locstore/locstorefront_home.png';
import locstore_front_item from '../../assets/screenshots_projects/locstore/locstorefront_item.png';
import locstore_front_login from '../../assets/screenshots_projects/locstore/locstorefront_login.png';

export const locstoreProject = {
    title: "LocStore",
    description: "Site e-commerce de location de matériel événementiel avec gestion avancée du panier et des réservations.",
    longDescription: "LocStore est une plateforme innovante de location de matériel événementiel développée avec React et Redux. L'application propose une gestion complète du parcours utilisateur, du catalogue jusqu'à la confirmation de commande, avec un focus particulier sur la gestion des disponibilités et le calcul dynamique des prix en fonction de la durée de location.",
    features: [
        {
            name: "Gestion du Panier",
            interface: {
                image: locstore_front_cart,
                description: "Interface du panier présentant le récapitulatif des articles, les quantités et le calcul des prix en fonction de la durée de location."
            },
            code: {
                image: locstore_code1,
                description: "Reducer Redux implémentant la logique de gestion du panier avec persistance des données."
            }
        },
        {
            name: "Gestion des Dates",
            interface: {
                image: locstore_code4,
                description: "Composant de sélection des dates permettant aux utilisateurs de choisir leur période de location."
            },
            code: {
                image: locstore_code2,
                description: "Reducer gérant les dates de location et la logique de disponibilité."
            }
        },
        {
            name: "Page d'Accueil",
            interface: {
                image: locstore_front_home,
                description: "Page principale avec catalogue des produits et système de filtrage des disponibilités."
            },
            code: {
                image: locstore_code3,
                description: "Service de gestion des actions du panier avec vérification des disponibilités."
            }
        },
        {
            name: "Page Produit",
            interface: {
                image: locstore_front_item,
                description: "Page détaillée d'un produit avec ses caractéristiques et options de location."
            },
            code: {
                image: locstore_code5,
                description: "Composant CartItem pour l'affichage et la manipulation des articles du panier."
            }
        },
        {
            name: "Authentification",
            interface: {
                image: locstore_front_login,
                description: "Interface de connexion avec gestion des sessions utilisateurs."
            },
            code: {
                image: locstore_code6,
                description: "Extrait du composant Login pour la connexion d'un user."
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