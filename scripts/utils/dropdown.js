import { sortMedia } from './sortMedia.js';
import { updatePhotographerMedia } from './updateMedia.js';
import { movieCardWithPlayer } from './movieCardWithPlayer.js';

/*configure les éléments de la liste déroulante pour le tri des médias.
    mediaObjects : Liste des objets média.
    updateMediaCallback : Fonction de rappel pour mettre à jour l'affichage des médias après le tri.*/


export function setupDropdown(mediaObjects, updateMediaCallback) {
    const sortOptions = document.querySelectorAll('.liste button');
    sortOptions.forEach(button => {
        button.addEventListener('click', (event) => {
            const criterion = event.target.getAttribute('aria-label').split(' ')[2].toLowerCase();
            const sortedMedia = sortMedia(mediaObjects, criterion);
            updateMediaCallback(sortedMedia);
            document.getElementById('current_filter').textContent = event.target.textContent;
            toggleDropdown(false);

            // Ajouter movieCardWithPlayer après le tri
            const sectionPhotographe = document.querySelector(".photographer_section");
            sectionPhotographe.querySelectorAll('.lienMedia').forEach((mediaElement, index) => {
                movieCardWithPlayer(mediaElement, sortedMedia);
            });
        });
    });

    document.querySelector('.btn_liste').addEventListener('click', () => {
        const dropdown = document.querySelector('.deroule');
        const expanded = dropdown.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
        toggleDropdown(expanded === 'true');
    });
}

function toggleDropdown(expanded) {
    const dropdown = document.querySelector('.deroule');
    dropdown.setAttribute('aria-expanded', expanded);
    document.querySelector('.liste').setAttribute('aria-hidden', !expanded);
}

