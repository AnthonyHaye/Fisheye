import { sortMedia } from './sortMedia.js'; // Importation de la fonction pour trier les médias
import { movieCardWithPlayer } from './movieCardWithPlayer.js'; // Importation de la fonction pour ajouter un lecteur de médias aux cartes

/**
 * Configure les éléments de la liste déroulante pour le tri des médias.
 * @param {Array} mediaObjects - Liste des objets média.
 * @param {Function} updateMediaCallback - Fonction de rappel pour mettre à jour l'affichage des médias après le tri.
 */
export function setupDropdown(mediaObjects, updateMediaCallback) {
    // Sélectionne tous les boutons de tri dans la liste déroulante
    const sortOptions = document.querySelectorAll('.liste button');
    
    // Ajoute un gestionnaire d'événements pour chaque bouton de tri
    sortOptions.forEach(button => {
        button.addEventListener('click', (event) => {
            // Récupère le critère de tri à partir de l'attribut aria-label du bouton
            const criterion = event.target.getAttribute('aria-label').split(' ')[2].toLowerCase();
            //console.log(criterion); 
            
            // Trie les médias en utilisant le critère
            const sortedMedia = sortMedia(mediaObjects, criterion);
            
            // Met à jour l'affichage des médias après le tri
            updateMediaCallback(sortedMedia);
            
            // Met à jour le texte du filtre actuel
            document.getElementById('current_filter').textContent = event.target.textContent;
            
            // Ferme le menu déroulant
            toggleDropdown(false);

            // Ajoute movieCardWithPlayer après le tri pour chaque média trié
            const sectionPhotographe = document.querySelector(".photographer_section");
            sectionPhotographe.querySelectorAll('.lienMedia').forEach((mediaElement) => {
                movieCardWithPlayer(mediaElement, sortedMedia);
            });

            // Masque l'option sélectionnée pour indiquer qu'elle est active
            sortOptions.forEach(btn => btn.classList.remove('hidden'));
            event.target.classList.add('hidden');
        });
    });

    // Ajoute un gestionnaire d'événements pour le bouton de liste pour ouvrir/fermer le menu déroulant
    document.querySelector('.btn_liste').addEventListener('click', () => {
        const dropdown = document.querySelector('.deroule'); // Sélectionne le menu déroulant
        const expanded = dropdown.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
        toggleDropdown(expanded === 'true');
    });
}

/**
 * Fonction pour ouvrir/fermer le menu déroulant.
 * @param {boolean} expanded - Indique si le menu déroulant doit être ouvert (true) ou fermé (false).
 */
function toggleDropdown(expanded) {
    const dropdown = document.querySelector('.deroule'); // Sélectionne l'élément du menu déroulant
    const btnListe = document.querySelector('.btn_liste'); // Sélectionne le bouton de liste
    dropdown.setAttribute('aria-expanded', expanded); // Définit l'attribut aria-expanded
    btnListe.setAttribute('aria-expanded', expanded); // Définit l'attribut aria-expanded sur le bouton
    document.querySelector('.liste').setAttribute('aria-hidden', !expanded); // Définit l'attribut aria-hidden sur la liste
}
