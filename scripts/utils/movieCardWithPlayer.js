import PlayerModal from '../templates/PlayerModal.js';

export function movieCardWithPlayer(element, mediaList) {
    // Ajoute un événement click sur l'élément pour ouvrir le modal
    element.addEventListener('click', (event) => {
        event.preventDefault();
        const mediaSrc = event.currentTarget.dataset.media;
        const media = mediaList.find(m => m.image === mediaSrc || m.video === mediaSrc);

        if (media) {
            const player = new PlayerModal(media, mediaList);
            player.render();
        }
    });

    // Ajoute un événement keydown sur l'élément pour ouvrir le modal avec la touche "Entrée"
    element.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            element.click();
        }
    });
}
