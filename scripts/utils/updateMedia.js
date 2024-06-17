import { createImageElement, createVideoElement, createTextElement } from './createElements.js';
import { movieCardWithPlayer } from './movieCardWithPlayer.js';
import { toggleLike } from './toggleLike.js';

export function updatePhotographerMedia(mediaObjects, updateTotalLikesCallback) {
    const sectionPhotographe = document.querySelector(".photographer_section");
    sectionPhotographe.innerHTML = ""; // Clear existing media
    mediaObjects.forEach(media => {
        const mediaElement = createMediaElement(media, mediaObjects, updateTotalLikesCallback);
        if (mediaElement) {
            sectionPhotographe.appendChild(mediaElement);
            movieCardWithPlayer(mediaElement.querySelector('.lienMedia'), mediaObjects);
        }
    });
}

function createMediaElement(media, mediaList, updateTotalLikesCallback) {
    const lienMedia = document.createElement("a");
    lienMedia.className = "lienMedia";
    lienMedia.setAttribute('href', '#');
    lienMedia.setAttribute('alt', `${media.title} par ${media.photographerName}`);
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
    like.setAttribute('aria-label', 'like button');
    if (media.liked) {
        like.classList.add('liked');
    }
    like.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleLike(media, nbrLike, like, updateTotalLikesCallback);
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

    return articleMedia;
}
