import Api from "../api/Api.js";
import Photographer from '../models/Photographer.js';
import MediasFactory from "../factories/MediasFactory.js";
import PhotographerHeader from "../templates/PhotographerHeader.js";
import PhotographerMedias from "../templates/PhotographerMedias.js";
import { displayTotalLikes} from '../utils/updateTotalLikes.js'
import { openCloseFormContact, validateForm } from "../utils/contactForm.js";
import { openCloseFilterMenu, displayMediaWithFilter } from "../utils/sortMedia.js";
import { displayLightbox } from "../utils/movieCardWithPlayer.js";


// Initialisation de l'API avec le chemin vers le fichier JSON contenant les données des photographes
const photographersApi = new Api("./data/photographers.json");

// Récupération de l'ID du photographe à partir des paramètres de l'URL
const photographerId = new URLSearchParams(window.location.search).get("id");

// Fonction asynchrone pour obtenir le photographe et ses médias en utilisant l'ID du photographe
export const getPhotographerById = async () => {
    // Récupération des données des photographes et des médias depuis l'API
    const { photographers, media } = await photographersApi.get();
    
    // Création d'une instance de Photographer pour chaque photographe et recherche du photographe correspondant à l'ID
    const photographer = photographers
        .map(photographer => new Photographer(photographer))
        .find(photographer => photographer.id == photographerId);
    
    // Création d'une instance de MediasFactory pour chaque média et filtrage des médias appartenant au photographe
    const medias = media
        .map(media => new MediasFactory(media))
        .filter(media => media.photographerId == photographerId);
    
    // Retourne le photographe et ses médias
    return { photographer, medias };
};

// Fonction asynchrone pour afficher la page de profil du photographe
const displayProfilePage = async () => {
    // Obtention des données du photographe et des médias
    const { photographer, medias } = await getPhotographerById();
    
    // Création et insertion de l'en-tête du photographe
    const headerTemplate = new PhotographerHeader(photographer);
    headerTemplate.createPhotographerHeader();
    
    // Création et insertion des médias du photographe
    const mediasTemplate = new PhotographerMedias(photographer, medias);
    mediasTemplate.createPhotographerMedias();

    // Affichage du total des likes
    displayTotalLikes();
    
    // Initialisation du formulaire de contact (ouverture/fermeture)
    // openCloseFormContact();
    // validateForm();
    
    // Initialisation du menu de filtre (ouverture/fermeture)
    //openCloseFilterMenu();
    
    // Affichage des médias avec les filtres appliqués
    // displayMediaWithFilter(mediasTemplate);
    
    // Initialisation de la lightbox pour les médias
    // displayLightbox(mediasTemplate);
};
// Affiche la page de profil du photographe
displayProfilePage();