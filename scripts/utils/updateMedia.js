import { createImageElement, createVideoElement, createTextElement } from './createElements.js'; // Importation des fonctions utilitaires pour créer des éléments DOM
import { movieCardWithPlayer } from './movieCardWithPlayer.js'; // Importation de la fonction pour gérer les cartes de médias avec un lecteur
import { toggleLike } from './toggleLike.js'; // Importation de la fonction pour gérer les likes

// Fonction pour mettre à jour la section des médias du photographe
export function updatePhotographerMedia(mediaObjects, updateTotalLikesCallback) {
    const sectionPhotographe = document.querySelector(".photographer_section"); // Sélection de la section des médias du photographe dans le DOM
    sectionPhotographe.innerHTML = ""; // Effacement des médias existants

    // Parcours de chaque objet média et création de son élément DOM
    mediaObjects.forEach(media => {
        const mediaElement = createMediaElement(media, mediaObjects, updateTotalLikesCallback); // Création de l'élément DOM pour le média
        if (mediaElement) {
            sectionPhotographe.appendChild(mediaElement); // Ajout de l'élément média à la section des médias
            movieCardWithPlayer(mediaElement.querySelector('.lienMedia'), mediaObjects); // Gestion du lecteur pour les cartes de médias
        }
    });
}

// Fonction pour créer l'élément DOM d'un média
function createMediaElement(media, mediaList, updateTotalLikesCallback) {
    const lienMedia = document.createElement("a"); // Création d'un élément lien
    lienMedia.className = "lienMedia"; // Ajout de la classe CSS
    lienMedia.setAttribute('href', '#'); // Définition de l'attribut href
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
        mediaElement.setAttribute('tabindex', '0'); // Rendre l'élément vidéo focusable
        mediaElement.setAttribute('title', media.title); // Ajouter un titre pour l'accessibilité
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
