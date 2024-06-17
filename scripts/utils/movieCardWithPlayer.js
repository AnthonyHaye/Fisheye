import PlayerModal from '../templates/PlayerModal.js';

export function movieCardWithPlayer(cardMedia, mediaList) {
    cardMedia.addEventListener('click', (event) => {
        event.preventDefault();
        const media = mediaList.find(m => m.image === cardMedia.dataset.media || m.video === cardMedia.dataset.media);
        const player = new PlayerModal(media, mediaList);
        player.render();
    });
}
