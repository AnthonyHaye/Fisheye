// import PlayerModal from '../templates/PlayerModal.js';

// export function movieCardWithPlayer(cardMedia, mediaList) {
//     console.log("Ajout d'un événement de clic à la carte média");
//     cardMedia.addEventListener('click', (event) => {
//         event.preventDefault();
//         console.log("Carte média cliquée");
//         const player = new PlayerModal(cardMedia.dataset.media, mediaList);
//         player.render();
//     });
//     return cardMedia;
// }

import PlayerModal from '../templates/PlayerModal.js';

export function movieCardWithPlayer(cardMedia, mediaList) {
    cardMedia.addEventListener('click', (event) => {
        event.preventDefault();
        const media = mediaList.find(m => m.image === cardMedia.dataset.media || m.video === cardMedia.dataset.media);
        const player = new PlayerModal(media, mediaList);
        player.render();
    });
}
