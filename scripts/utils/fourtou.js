import { sortMedia } from './sortMedia.js';
import { movieCardWithPlayer } from './movieCardWithPlayer.js';

export function setupDropdown(mediaObjects, updateMediaCallback) {
    const sortOptions = document.querySelectorAll('.liste button');
    const currentFilter = document.getElementById('current_filter');
    const btnListe = document.querySelector('.btn_liste');
    const dropdown = document.querySelector('.deroule');

    sortOptions.forEach(button => {
        button.addEventListener('click', (event) => {
            const criterion = event.target.getAttribute('aria-label').split(' ')[2].toLowerCase();
            const sortedMedia = sortMedia(mediaObjects, criterion);
            updateMediaCallback(sortedMedia);

            // Update current filter text and hide selected option
            currentFilter.textContent = event.target.textContent;
            toggleDropdown(false);

            // Hide selected option
            sortOptions.forEach(btn => btn.classList.remove('hidden'));
            event.target.classList.add('hidden');

            // Add movieCardWithPlayer after sorting
            const sectionPhotographe = document.querySelector(".photographer_section");
            sectionPhotographe.querySelectorAll('.lienMedia').forEach((mediaElement, index) => {
                movieCardWithPlayer(mediaElement, sortedMedia);
            });
        });
    });

    btnListe.addEventListener('click', () => {
        const expanded = dropdown.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
        toggleDropdown(expanded === 'true');
    });
}

function toggleDropdown(expanded) {
    const dropdown = document.querySelector('.deroule');
    const btnListe = document.querySelector('.btn_liste');
    dropdown.setAttribute('aria-expanded', expanded);
    btnListe.setAttribute('aria-expanded', expanded);
    document.querySelector('.liste').setAttribute('aria-hidden', !expanded);
}
