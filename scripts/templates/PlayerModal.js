export default class PlayerModal {
    constructor(media, mediaList) {
        // Initialisation des propriétés de la classe
        this.media = media; // Le média actuellement affiché
        this.mediaList = mediaList; // La liste complète des médias
        this.currentIndex = mediaList.findIndex(m => m.image === media.image || m.video === media.video); // L'index du média actuel dans la liste
        this.$wrapper = document.createElement('div'); // Création d'un élément div pour contenir le lecteur
        this.$wrapper.classList.add('player-wrapper'); // Ajout de la classe CSS pour le wrapper du lecteur
        this.$modalWrapper = document.querySelector('#player_modal'); // Sélection de l'élément modal dans le DOM
    }

    // Méthode pour gérer l'événement de fermeture du lecteur
    onCloseButton() {
        this.$wrapper.querySelector('.close-btn').addEventListener('click', () => {
            this.$modalWrapper.classList.remove('modal-on'); // Cache la modal
            this.$wrapper.innerHTML = ""; // Vide le contenu du wrapper
            document.removeEventListener('keydown', this.handleKeydown); // Retire l'écouteur d'événements pour les touches du clavier
        });
    }

    // Méthode pour gérer l'événement de passage au média suivant
    onNextButton() {
        this.$wrapper.querySelector('.next-btn').addEventListener('click', () => {
            this.currentIndex = (this.currentIndex + 1) % this.mediaList.length; // Passe à l'index suivant (avec retour au début si fin de liste)
            this.updatePlayer(this.mediaList[this.currentIndex]); // Met à jour le lecteur avec le nouveau média
        });
    }

    // Méthode pour gérer l'événement de retour au média précédent
    onPrevButton() {
        this.$wrapper.querySelector('.prev-btn').addEventListener('click', () => {
            this.currentIndex = (this.currentIndex - 1 + this.mediaList.length) % this.mediaList.length; // Passe à l'index précédent (avec retour à la fin si début de liste)
            this.updatePlayer(this.mediaList[this.currentIndex]); // Met à jour le lecteur avec le nouveau média
        });
    }

    // Méthode pour gérer les événements du clavier
    handleKeydown = (event) => {
        if (event.key === 'ArrowRight') { // Flèche droite
            this.currentIndex = (this.currentIndex + 1) % this.mediaList.length;
            this.updatePlayer(this.mediaList[this.currentIndex]);
        } else if (event.key === 'ArrowLeft') { // Flèche gauche
            this.currentIndex = (this.currentIndex - 1 + this.mediaList.length) % this.mediaList.length;
            this.updatePlayer(this.mediaList[this.currentIndex]);
        } else if (event.key === 'Escape') { // Touche échap
            this.$modalWrapper.classList.remove('modal-on');
            this.$wrapper.innerHTML = "";
            document.removeEventListener('keydown', this.handleKeydown);
        }
    }

    // Méthode pour mettre à jour le contenu du lecteur avec un nouveau média
    updatePlayer(media) {
        const isVideo = media.video && media.video.endsWith('.mp4'); // Vérifie si le média est une vidéo
        /*expression ternaire pour conditionnellement créer un élément HTML <video> ou <img> 
        en fonction du type de média (vidéo ou image). Cela permet d'insérer dynamiquement 
        le bon type d'élément dans le DOM en fonction des données du média.*/
        const mediaElement = isVideo ?  
            `<video height="700" width="900" controls>
                <source src="${media.video}" type="video/mp4">
             </video>` :
            `<img class="diaporama" src="${media.image}" height="700" width="900" />`; // Crée l'élément HTML approprié pour le média
        const mediaTitle = media.title || ''; // Titre du média
        const photographerName = media.photographerName || ''; // Nom du photographe
        const description = `${mediaTitle} par ${photographerName}`; // Description combinée du média

        const player = `
            <div class="player">
                ${mediaElement}
                <p class="media-title">${mediaTitle}</p>
                <p class="media-description">${description}</p> <!-- Description pour l'accessibilité -->
                <button class="close-btn">X</button>
                <button class="prev-btn"><</button>
                <button class="next-btn">></button>
            </div>
        `;
        this.$wrapper.innerHTML = player; // Met à jour le contenu du wrapper avec le nouveau lecteur
        this.onCloseButton(); // Ajoute l'événement de fermeture
        this.onNextButton(); // Ajoute l'événement pour le bouton suivant
        this.onPrevButton(); // Ajoute l'événement pour le bouton précédent
    }

    // Méthode pour créer le lecteur et l'afficher dans la modal
    createPlayer() {
        this.updatePlayer(this.media); // Met à jour le lecteur avec le média actuel
        this.$modalWrapper.innerHTML = ""; // Vide le contenu de la modal
        this.$modalWrapper.classList.add('modal-on'); // Affiche la modal
        this.$modalWrapper.appendChild(this.$wrapper); // Ajoute le wrapper du lecteur à la modal
        document.addEventListener('keydown', this.handleKeydown); // Ajoute l'événement pour gérer les touches du clavier
    }

    // Méthode pour rendre (afficher) le lecteur
    render() {
        this.createPlayer();
    }
}
