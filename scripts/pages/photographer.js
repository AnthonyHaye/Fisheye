import Photographer from '../models/Photographe.js';
import Media from '../models/media.js';
// import PlayerModal from '../templates/PlayerModal.js'; 
import { updatePhotographerHeader } from '../utils/updateHeader.js';
import { updatePhotographerMedia } from '../utils/updateMedia.js';
import { setupDropdown } from '../utils/dropdown.js';
import { updateTotalLikesAndPrice} from '../utils/updateTotalLikesAndPrice.js'

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

        // Mise à jour de la section des détails du photographe
        updatePhotographerHeader(photographer);

        // Mise à jour de la section des médias du photographe
        updatePhotographerMedia(mediaObjects, () => updateTotalLikesAndPrice(mediaObjects, photographer.price));

        // Setup dropdown for sorting
        setupDropdown(mediaObjects, (sortedMedia) => {
            updatePhotographerMedia(sortedMedia, () => updateTotalLikesAndPrice(sortedMedia, photographer.price));
        });

        // Initial update of total likes and price
        updateTotalLikesAndPrice(mediaObjects, photographer.price);

    } catch (error) {
        console.error("Fetch error: ", error);
    }
}

// async function main() {
//     const params = new URLSearchParams(window.location.search);
//     const photographerId = parseInt(params.get('id'));

//     try {
//         const response = await fetch("./data/photographers.json");
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         const photographerData = data.photographers.find(p => p.id === photographerId);
//         const mediaData = data.media.filter(m => m.photographerId === photographerId);

//         if (!photographerData) {
//             throw new Error("Photographe pas trouvé");
//         }

//         // Instanciation de la classe Photographer
//         const photographer = new Photographer(photographerData);

//         // Instanciation des objets Media
//         const mediaObjects = mediaData.map(m => new Media(m, photographer.name));
//         const mediaList = mediaObjects.map(media => ({
//             media: media.image || media.video,
//             title: media.title
//         }));

//         // Mise à jour de la section des détails du photographe
//         updatePhotographerHeader(photographer);

//         // Mise à jour de la section des médias du photographe
//         updatePhotographerMedia(mediaObjects, mediaList, photographer.name);
        
//         // Configuration du menu déroulant pour le tri
//         setupDropdown(mediaObjects, updatePhotographerMedia);

//         // mise à jour  total likes and price
//         updateTotalLikesAndPrice(mediaObjects, photographer.price);

//     } catch (error) {
//         console.error("Fetch error: ", error);
//     }
// }

main();
