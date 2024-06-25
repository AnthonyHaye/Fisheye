// photographerPage.js

import Api from '../api/Api.js';
import Photographer from '../models/Photographer.js';
import MediasFactory from "../factories/MediasFactory.js";
import { updatePhotographerHeader } from '../utils/updateHeader.js';
import { updatePhotographerMedia } from '../utils/updateMedia.js';
import { setupDropdown } from '../utils/dropdown.js';
import { updateTotalLikesAndPrice} from '../utils/updateTotalLikesAndPrice.js'

async function main() {
    try {
        const response = new Api("./data/photographers.json");
        const params = new URLSearchParams(window.location.search);
        const photographerId = parseInt(params.get('id'));
        const data = await response.get();

        const photographerData = data.photographers.find(p => p.id === photographerId);
        const mediaData = data.media.filter(m => m.photographerId === photographerId);

        if (!photographerData) {
            throw new Error("Photographe pas trouvé");
        }

        // Instanciation de la classe Photographer
        const photographer = new Photographer(photographerData);

        // Instanciation des objets Media
        const mediaObjects = mediaData.map(m => new MediasFactory(m, photographer.name));

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

main();
