/*Les fonctions openCloseFilterMenu et displayMediaWithFilter permettent de gérer 
l'affichage des médias d'un photographe de manière dynamique en fonction des filtres sélectionnés 
par l'utilisateur. 
openCloseFilterMenu gère l'ouverture et la fermeture du menu de filtrage, 
tandis que displayMediaWithFilter trie les médias selon le filtre sélectionné et met à jour l'affichage,
y compris les "likes" et la lightbox. 
*/

// Importation des fonctions displayTotalLikes et displayLightbox depuis leurs fichiers respectifs
import { displayTotalLikes } from "../utils/updateTotalLikes.js";
import { displayLightbox } from "../utils/movieCardWithPlayer.js";

// Exportation de la fonction openCloseFilterMenu
export const openCloseFilterMenu = () => {
    // Sélectionne les éléments du menu de filtrage
    const filterMenu = document.querySelector(".trie_section");
    const filterMenuButton = document.querySelector(".btn_liste");
    const filterButtons = document.querySelectorAll(".filter-options");

    // Ajoute un événement de clic au bouton du menu de filtrage
    filterMenuButton.addEventListener("click", () => {
        // Détermine si le menu est actuellement étendu
        const isExpanded = filterMenuButton.getAttribute("aria-expanded") === "true" || false;

        // Met à jour l'attribut aria-expanded du bouton
        filterMenuButton.setAttribute("aria-expanded", !isExpanded);

        // Ajoute ou supprime la classe curtain_effect pour afficher ou masquer le menu
        filterMenu.classList.toggle("curtain_effect");

        // Bascule l'icône de la flèche vers le haut
        document.querySelector(".fa-chevron-up").classList.toggle("rotate");

        // Met à jour l'attribut aria-hidden du menu de filtrage
        const newAriaHiddenValue = filterMenu.classList.contains("curtain_effect") ? "false" : "true";
        filterMenu.setAttribute("aria-hidden", newAriaHiddenValue);

        // Met à jour l'attribut tabindex des boutons de filtrage
        const newTabIndexValue = filterMenu.classList.contains("curtain_effect") ? "0" : "-1";
        filterButtons.forEach(button => button.setAttribute("tabindex", newTabIndexValue));
    });
};

// Exportation de la fonction displayMediaWithFilter
export const displayMediaWithFilter = mediasTemplate => {
    // Sélectionne l'élément du filtre actuel et tous les boutons de filtre
    const currentFilter = document.querySelector('#current_filter');
    const allFilters = Array.from(document.querySelectorAll('.dropdown_content li button'));

    // Cache le filtre déjà sélectionné
    let filterAlreadySelected = allFilters.find(filter => filter.textContent == currentFilter.textContent);
    filterAlreadySelected.style.display = 'none';

    // Ajoute un événement de clic à chaque bouton de filtre
    allFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Met à jour le texte du filtre actuel
            currentFilter.textContent = filter.textContent;

            // Affiche le filtre précédemment sélectionné
            if (filterAlreadySelected) filterAlreadySelected.style.display = 'block';

            // Met à jour le filtre déjà sélectionné et le cache
            filterAlreadySelected = filter;
            filterAlreadySelected.style.display = 'none';

            // Trie les médias selon le filtre sélectionné
            sortByFilter(filter.textContent);
        });
    });

    // Fonction pour trier les médias selon le filtre sélectionné
    const sortByFilter = filterValue => {
        switch (filterValue) {
            case 'Titre':
                mediasTemplate.medias.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'Popularité':
                mediasTemplate.medias.sort((a, b) => b.likes - a.likes);
                break;
            case 'Date':
                mediasTemplate.medias.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
        }

        // Crée et affiche les médias triés
        mediasTemplate.createPhotographerMedias();

        // Applique les filtres et met à jour la lightbox et les likes
        const mediasfiltered = mediasTemplate;
        displayLightbox(mediasfiltered);
        displayTotalLikes();

        // Ajoute une animation pour chaque média affiché
        const mediaElements = document.querySelectorAll('.gallery_card');
        mediaElements.forEach((media, index) => {
            setTimeout(() => {
                media.classList.add('animeCard');
            }, 100 * index);
        });
    };
};
