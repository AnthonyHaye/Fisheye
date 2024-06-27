import PlayerModal from '../templates/PlayerModal.js'; // Importation de la classe PlayerModal pour gérer l'affichage du lecteur de médias

// Fonction pour ajouter un lecteur de médias à une carte média
export function movieCardWithPlayer(cardMedia, mediaList) {
    // Ajout d'un gestionnaire d'événements au clic sur la carte média
    cardMedia.addEventListener('click', (event) => {
        event.preventDefault(); // Empêche le comportement par défaut du lien

        // Recherche du média correspondant dans la liste des médias
        const media = mediaList.find(m => m.image === cardMedia.dataset.media || m.video === cardMedia.dataset.media);

        // Création d'une nouvelle instance de PlayerModal avec le média trouvé et la liste des médias
        const player = new PlayerModal(media, mediaList);

        // Affichage du lecteur de médias
        player.render();
    });
}

