function movieCardWithPlayer(cardMedia, mediaList) {
    cardMedia.addEventListener('click', () => {
        const player = new PlayerModal(cardMedia.dataset.media, mediaList);
        player.render();
    });
    return cardMedia;
}
