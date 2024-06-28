// MediasFactory.js
import Image from '../models/Image.js'; // Importation de la classe Image
import Video from '../models/Video.js'; // Importation de la classe Video
import { createImageElement, createVideoElement, createTextElement } from '../utils/createElements.js'; // Assurez-vous que le chemin est correct
import { toggleLike } from '../utils/toggleLike.js'; // Importation de la fonction pour gérer les likes

let compteur = 100;
export default class MediasFactory {
    constructor(data, photographerName) {
        if (data.image) {
            return new Image(data, photographerName); // Retourne une instance de la classe Image
        } else if (data.video) {
            return new Video(data, photographerName); // Retourne une instance de la classe Video
        } else {
            throw 'type de données inconnues'; // Lance une exception avec le message 'Unknown data type'
        }
    }

    static createMediaElement(media, mediaList, updateTotalLikesCallback) {
        // let compteur = 100;

        const lienMedia = document.createElement("div"); // Création d'un élément lien
        lienMedia.className = "lienMedia"; // Ajout de la classe CSS
        lienMedia.setAttribute('tabIndex', compteur);
        compteur++;
        lienMedia.setAttribute('alt', `${media.title} par ${media.photographerName}`); // Définition de l'attribut alt pour l'accessibilité
        lienMedia.dataset.media = media.image || media.video; // Stockage de l'URL du média dans les attributs data

        const cardMedia = document.createElement("figure"); // Création d'un élément div pour la carte média
        cardMedia.className = "cardMedia"; // Ajout de la classe CSS

        let mediaElement;
        if (media.image) {
            const imagePath = `${media.image}`; // Définition du chemin de l'image
            mediaElement = createImageElement(imagePath, "photographe_photoVideo"); // Création de l'élément image
            mediaElement.setAttribute('alt', `${media.title} par ${media.photographerName}`); // Définition de l'attribut alt pour l'accessibilité
        } else if (media.video) {
            const videoPath = `${media.video}`; // Définition du chemin de la vidéo
            mediaElement = createVideoElement(videoPath, "photographe_photoVideo"); // Création de l'élément vidéo
            // mediaElement.setAttribute('title', media.title); // Ajouter un titre pour l'accessibilité
            mediaElement.setAttribute('alt', `${media.title} par ${media.photographerName}`); // Définition de l'attribut alt pour l'accessibilité
        }

        const titreMedia = createTextElement("p", media.title, "media_title"); // Création de l'élément de texte pour le titre du média

        const articleMedia = document.createElement("article"); // Création d'un élément article pour le média
        articleMedia.className = "articleMedia"; // Ajout de la classe CSS

        const figcaptionMedia = document.createElement("figcaption"); // Création d'un élément figcaption pour la légende du média
        figcaptionMedia.className = "figcaptionMedia"; // Ajout de la classe CSS

        const h2Media = document.createElement("h2"); // Création d'un élément h2 pour le titre de la légende
        h2Media.className = "h2Media"; // Ajout de la classe CSS

        const PopulaireContenair = createTextElement("div", "", "populaireContenair"); // Création d'un conteneur pour les likes
        const nbrLike = createTextElement("p", media.likes, "nbrLikes"); // Création de l'élément de texte pour le nombre de likes

        const like = document.createElement("button"); // Création d'un bouton pour les likes
        like.className = "fas fa-heart like-button"; // Ajout des classes CSS pour le style du bouton
        like.setAttribute('aria-label', `Aimer ${media.title}`); // Ajout de l'attribut aria-label pour l'accessibilité
        like.setAttribute('tabIndex', compteur);
        compteur++;
        if (media.liked) {
            like.classList.add('liked'); // Ajout de la classe liked si le média est aimé
        }
        like.addEventListener('click', (event) => {
            event.stopPropagation(); // Empêche la propagation de l'événement click
            toggleLike(media, nbrLike, like, updateTotalLikesCallback); // Gestion du like
        });

        // Assemblage des éléments dans le DOM
        lienMedia.appendChild(cardMedia);
        cardMedia.appendChild(mediaElement);
        figcaptionMedia.appendChild(h2Media);
        h2Media.appendChild(titreMedia);
        figcaptionMedia.appendChild(PopulaireContenair);
        PopulaireContenair.appendChild(nbrLike);
        PopulaireContenair.appendChild(like);

        articleMedia.appendChild(lienMedia);
        articleMedia.appendChild(figcaptionMedia);

        return articleMedia; // Retourne l'article média complet
    }
}
