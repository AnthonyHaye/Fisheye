// updateMedia.js
import { movieCardWithPlayer } from './movieCardWithPlayer.js'; // Importation de la fonction pour gérer les cartes de médias avec un lecteur
import MediasFactory from '../factories/MediasFactory.js'; // Importation de MediasFactory

// Fonction pour mettre à jour la section des médias du photographe
export function updatePhotographerMedia(mediaObjects, updateTotalLikesCallback) {
    const sectionPhotographe = document.querySelector(".photographer_section"); // Sélection de la section des médias du photographe dans le DOM
    sectionPhotographe.innerHTML = ""; // Effacement des médias existants

    // Parcours de chaque objet média et création de son élément DOM via MediasFactory
    mediaObjects.forEach(media => {
        const mediaElement = MediasFactory.createMediaElement(media, mediaObjects, updateTotalLikesCallback); // Utilisation de MediasFactory
        if (mediaElement) {
            sectionPhotographe.appendChild(mediaElement); // Ajout de l'élément média à la section des médias
            movieCardWithPlayer(mediaElement.querySelector('.lienMedia'), mediaObjects); // Gestion du lecteur pour les cartes de médias
        }
    });
}
