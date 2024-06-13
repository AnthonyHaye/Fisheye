import { createImageElement, createVideoElement, createTextElement } from './createElements.js';
import { movieCardWithPlayer } from './movieCardWithPlayer.js';

export function updatePhotographerMedia(mediaObjects, mediaList) {
    const sectionPhotographe = document.querySelector(".photographer_section");
    mediaObjects.forEach(media => {
        const mediaElement = createMediaElement(media, mediaList);
        if (mediaElement) {
            sectionPhotographe.appendChild(mediaElement);
        }
    });
}


function createMediaElement(media, mediaList, photographerName) {
    const lienMedia = document.createElement("a");
    lienMedia.className = "lienMedia";
    lienMedia.setAttribute('href', '#');
    lienMedia.setAttribute('alt', `${media.title} de ${photographerName}`);
    lienMedia.dataset.media = media.image || media.video;

    const cardMedia = document.createElement("div");
    cardMedia.className = "cardMedia";

    let mediaElement;
    if (media.image) {
        mediaElement = createImageElement(media.image, "photographe_photoVideo");
    } else if (media.video) {
        mediaElement = createVideoElement(media.video, "photographe_photoVideo");
    }

    const titreMedia = createTextElement("p", media.title, "media_title");

    const articleMedia = document.createElement("article");
    articleMedia.className = "articleMedia";

    const figcaptionMedia = document.createElement("figcaption");
    figcaptionMedia.className = "figcaptionMedia";

    const h2Media = document.createElement("h2");
    h2Media.className = "h2Media";

    const PopulaireContenair = createTextElement("div", "", "populaireContenair");
    const nbrLike = createTextElement("p", media.likes, "nbrLikes");

    const like = document.createElement("button");
    like.className = "fas fa-heart";
    like.addEventListener('click', (event) => {
        event.stopPropagation();
        // Logic for handling like button click
    });

    lienMedia.appendChild(cardMedia);
    cardMedia.appendChild(mediaElement);
    figcaptionMedia.appendChild(h2Media);
    h2Media.appendChild(titreMedia);
    figcaptionMedia.appendChild(PopulaireContenair);
    PopulaireContenair.appendChild(nbrLike);
    PopulaireContenair.appendChild(like);

    articleMedia.appendChild(lienMedia);
    articleMedia.appendChild(figcaptionMedia);

    // Ajout du comportement de la modal à la carte média
    movieCardWithPlayer(lienMedia, mediaList);

    return articleMedia;
}