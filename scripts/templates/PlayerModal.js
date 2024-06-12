export default class PlayerModal {
    constructor(media, mediaList) {
        console.log("PlayerModal initialisé");
        this.media = media;
        this.mediaList = mediaList;
        this.currentIndex = mediaList.findIndex(m => m.media === media);

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('player-wrapper');

        this.$modalWrapper = document.querySelector('#player_modal');
    }

    onCloseButton() {
        console.log("Ajout d'un événement de fermeture");
        this.$wrapper
            .querySelector('.close-btn')
            .addEventListener('click', () => {
                console.log("Fermeture de la modal");
                this.$modalWrapper.classList.remove('modal-on');
                this.$wrapper.innerHTML = "";
                document.removeEventListener('keydown', this.handleKeydown);
            });
    }

    onNextButton() {
        console.log("Ajout d'un événement suivant");
        this.$wrapper
            .querySelector('.next-btn')
            .addEventListener('click', () => {
                this.currentIndex = (this.currentIndex + 1) % this.mediaList.length;
                this.updatePlayer(this.mediaList[this.currentIndex].media);
            });
    }

    onPrevButton() {
        console.log("Ajout d'un événement précédent");
        this.$wrapper
            .querySelector('.prev-btn')
            .addEventListener('click', () => {
                this.currentIndex = (this.currentIndex - 1 + this.mediaList.length) % this.mediaList.length;
                this.updatePlayer(this.mediaList[this.currentIndex].media);
            });
    }

    handleKeydown = (event) => {
        // Vérifie si la touche appuyée est la flèche droite
        if (event.key === 'ArrowRight') {
            // Incrémente l'index courant pour passer au média suivant
            // Utilise le modulo (%) pour revenir au début de la liste après le dernier média
            this.currentIndex = (this.currentIndex + 1) % this.mediaList.length;
            // Met à jour l'affichage de la modal avec le média correspondant au nouvel index
            this.updatePlayer(this.mediaList[this.currentIndex].media);
        // Vérifie si la touche appuyée est la flèche gauche
        } else if (event.key === 'ArrowLeft') {
            // Décrémente l'index courant pour passer au média précédent
            // Utilise le modulo (%) pour revenir à la fin de la liste avant le premier média
            this.currentIndex = (this.currentIndex - 1 + this.mediaList.length) % this.mediaList.length;
            // Met à jour l'affichage de la modal avec le média correspondant au nouvel index
            this.updatePlayer(this.mediaList[this.currentIndex].media);
        // Vérifie si la touche appuyée est la touche Échap (Escape)
        } else if (event.key === 'Escape') {
            // Enlève la classe 'modal-on' pour masquer la modal
            this.$modalWrapper.classList.remove('modal-on');
            // Vide le contenu de l'élément wrapper de la modal
            this.$wrapper.innerHTML = "";
            // Supprime l'événement d'écoute des touches du clavier pour cette modal
            document.removeEventListener('keydown', this.handleKeydown);
        }
    }

    updatePlayer(media) {
        console.log("Mise à jour du lecteur", media);
        const isVideo = media.endsWith('.mp4'); // La méthode `endsWith` vérifie si la chaîne de caractères `media` se termine par '.mp4'
        const mediaElement = isVideo ? 
            `<video height="700" width="900" controls>
                <source src="${media}" type="video/mp4">
             </video>` :
            `<img class="diaporama" src="${media}" height="700" width="900" />`;        
        const mediaTitle = this.mediaList[this.currentIndex].title || '';
        const player = `
            <div class="player">
                ${mediaElement}
                <p class="media-title">${mediaTitle}</p>
                <button class="close-btn" aria-label="Fermer le modal">✖</button>
                <button class="prev-btn" aria-label="Photo précédente"><</button>
                <button class="next-btn" aria-label="Photo suivante">></button>
            </div>
        `;

        this.$wrapper.innerHTML = player;
        this.onCloseButton();
        this.onNextButton();
        this.onPrevButton();
    }

    createPlayer() {
        console.log("Création du lecteur");
        this.updatePlayer(this.media);

        this.$modalWrapper.classList.add('modal-on');
        this.$modalWrapper.appendChild(this.$wrapper);
        document.addEventListener('keydown', this.handleKeydown);
    }

    render() {
        this.createPlayer();
    }
}
