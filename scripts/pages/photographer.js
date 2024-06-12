import Photographer from '../models/Photographe.js';
import Media from '../models/media.js';
import PlayerModal from '../templates/PlayerModal.js'; // Assurez-vous que le chemin est correct

async function main() {
    const params = new URLSearchParams(window.location.search);
    const photographerId = parseInt(params.get('id'));

    try {
        const response = await fetch("./data/photographers.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const photographerData = data.photographers.find(p => p.id === photographerId);
        const mediaData = data.media.filter(m => m.photographerId === photographerId);

        if (!photographerData) {
            throw new Error("Photographe pas trouvé");
        }

        // Instanciation de la classe Photographer
        const photographer = new Photographer(photographerData);

        // Instanciation des objets Media
        const mediaObjects = mediaData.map(m => new Media(m, photographer.name));
        const mediaList = mediaObjects.map(media => ({
            media: media.image || media.video,
            title: media.title
        }));

        // Mise à jour de la section des détails du photographe
        updatePhotographerHeader(photographer);

        // Mise à jour de la section des médias du photographe
        updatePhotographerMedia(mediaObjects, mediaList, photographer.name);

    } catch (error) {
        console.error("Fetch error: ", error);
    }
}

function updatePhotographerHeader(photographer) {
    const detailsSection = document.querySelector(".photograph-header");
    const contactBtn = document.querySelector(".contact_button");

    const namePhotographe = createTextElement("h2", photographer.name, "name_photographe");
    const imagePhotographe = createImageElement(photographer.portrait, "portrait_photographe");

    const paysPhotographeElement = document.createElement("div");
    paysPhotographeElement.className = "paysPhotographe";

    const Presentation = document.createElement("div");
    Presentation.className = "Presentation";

    const cityPhotographe = createTextElement("p", `${photographer.city}`);
    cityPhotographe.innerHTML += ",&nbsp;";
    const countryPhotographe = createTextElement("p", photographer.country);

    const taglinePhotographe = createTextElement("p", photographer.tagline, "taglinePhotographe");
    const prixPhotographe = createTextElement("p", `${photographer.price} €/jour`, "prixPhotographe");

    paysPhotographeElement.appendChild(cityPhotographe);
    paysPhotographeElement.appendChild(countryPhotographe);

    detailsSection.appendChild(Presentation);

    Presentation.appendChild(namePhotographe);
    Presentation.appendChild(paysPhotographeElement);
    Presentation.appendChild(taglinePhotographe);

    detailsSection.appendChild(contactBtn);
    detailsSection.appendChild(imagePhotographe);
}

function updatePhotographerMedia(mediaObjects, mediaList) {
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

function createImageElement(src, className) {
    const img = document.createElement("img");
    img.src = src;
    if (className) {
        img.className = className;
    }
    return img;
}

function createVideoElement(src, className) {
    const video = document.createElement("video");
    video.src = src;
    video.controls = false; // pour maitriser la lecture ou pas
    if (className) {
        video.className = className;
    }
    return video;
}

function createTextElement(tag, text, className) {
    const element = document.createElement(tag);
    element.innerText = text;
    if (className) {
        element.className = className;
    }
    return element;
}

function movieCardWithPlayer(cardMedia, mediaList) {
    console.log("Ajout d'un événement de clic à la carte média");
    cardMedia.addEventListener('click', (event) => {
        event.preventDefault();
        console.log("Carte média cliquée");
        const player = new PlayerModal(cardMedia.dataset.media, mediaList);
        player.render();
    });
    return cardMedia;
}


main();
