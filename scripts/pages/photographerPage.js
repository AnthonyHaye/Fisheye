// photographerPage.js

import Api from '../api/Api.js'; // Importation de la classe Api pour gérer les requêtes de données
import Photographer from '../models/Photographer.js'; // Importation de la classe Photographer pour créer des objets photographe
import MediasFactory from "../factories/MediasFactory.js"; // Importation de la fabrique pour créer des objets médias
import { updatePhotographerHeader } from '../utils/updateHeader.js'; // Importation de la fonction pour mettre à jour l'en-tête du photographe
import { updatePhotographerMedia } from '../utils/updateMedia.js'; // Importation de la fonction pour mettre à jour la section des médias du photographe
import { setupDropdown } from '../utils/dropdown.js'; // Importation de la fonction pour configurer le menu déroulant
import { updateTotalLikesAndPrice } from '../utils/updateTotalLikesAndPrice.js'; // Importation de la fonction pour mettre à jour le total des likes et le prix

// Fonction principale exécutée au chargement de la page
async function main() {
    try {
        // Création d'une instance de l'API avec le chemin vers le fichier JSON des photographes
        const response = new Api("./data/photographers.json");

        // Récupération des paramètres de l'URL
        const params = new URLSearchParams(window.location.search);
        const photographerId = parseInt(params.get('id')); // Extraction de l'ID du photographe des paramètres de l'URL

        // Récupération des données des photographes via l'API
        const data = await response.get();

        // Recherche des données du photographe correspondant à l'ID
        const photographerData = data.photographers.find(p => p.id === photographerId);
        console.log(photographerData);
        const mediaData = data.media.filter(m => m.photographerId === photographerId); // Filtrage des médias du photographe

        if (!photographerData) {
            throw new Error("Photographe pas trouvé"); // Lancer une erreur si le photographe n'est pas trouvé
        }

        // Instanciation de la classe Photographer avec les données du photographe
        const photographer = new Photographer(photographerData);

        // Création des objets Media à partir des données filtrées
        const mediaObjects = mediaData.map(m => new MediasFactory(m, photographer.name));

        // Mise à jour de la section des détails du photographe
        updatePhotographerHeader(photographer);

        // Mise à jour de la section des médias du photographe avec une fonction de rappel pour mettre à jour les likes et le prix
        updatePhotographerMedia(mediaObjects, () => updateTotalLikesAndPrice(mediaObjects, photographer.price));

        // Configuration du menu déroulant pour le tri des médias
        setupDropdown(mediaObjects, (sortedMedia) => {
            updatePhotographerMedia(sortedMedia, () => updateTotalLikesAndPrice(sortedMedia, photographer.price));
        });

        // Mise à jour initiale du total des likes et du prix
        updateTotalLikesAndPrice(mediaObjects, photographer.price);

    } catch (error) {
        console.error("Fetch error: ", error); // Affichage de l'erreur en cas d'échec de la récupération des données
    }
}

// Appel de la fonction principale pour exécuter le script au chargement de la page
main();
