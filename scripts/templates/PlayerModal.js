export default class PlayerModal {
    constructor(media, mediaList) {
        console.log("PlayerModal initialisé");
        this.media = media;
        this.mediaList = mediaList;
        this.currentIndex = mediaList.findIndex(m => m.image === media.image || m.video === media.video);

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('player-wrapper');

        this.$modalWrapper = document.querySelector('#player_modal');
    }

    onCloseButton() {
        console.log("Ajout d'un événement de fermeture");
        this.$wrapper.querySelector('.close-btn').addEventListener('click', () => {
            console.log("Fermeture de la modal");
            this.$modalWrapper.classList.remove('modal-on');
            this.$wrapper.innerHTML = "";
            document.removeEventListener('keydown', this.handleKeydown);
        });
    }

    onNextButton() {
        console.log("Ajout d'un événement suivant");
        this.$wrapper.querySelector('.next-btn').addEventListener('click', () => {
            this.currentIndex = (this.currentIndex + 1) % this.mediaList.length;
            this.updatePlayer(this.mediaList[this.currentIndex]);
        });
    }

    onPrevButton() {
        console.log("Ajout d'un événement précédent");
        this.$wrapper.querySelector('.prev-btn').addEventListener('click', () => {
            this.currentIndex = (this.currentIndex - 1 + this.mediaList.length) % this.mediaList.length;
            this.updatePlayer(this.mediaList[this.currentIndex]);
        });
    }

    handleKeydown = (event) => {
        if (event.key === 'ArrowRight') {
            this.currentIndex = (this.currentIndex + 1) % this.mediaList.length;
            this.updatePlayer(this.mediaList[this.currentIndex]);
        } else if (event.key === 'ArrowLeft') {
            this.currentIndex = (this.currentIndex - 1 + this.mediaList.length) % this.mediaList.length;
            this.updatePlayer(this.mediaList[this.currentIndex]);
        } else if (event.key === 'Escape') {
            this.$modalWrapper.classList.remove('modal-on');
            this.$wrapper.innerHTML = "";
            document.removeEventListener('keydown', this.handleKeydown);
        }
    }

    updatePlayer(media) {
        console.log("Mise à jour du lecteur", media);
        const isVideo = media.video && media.video.endsWith('.mp4');
        const mediaElement = isVideo ? 
            `<video height="600" width="800" controls>
                <source src="${media.video}" type="video/mp4">
             </video>` :
            `<img class="diaporama" src="${media.image}" height="700" width="900" />`;
        const mediaTitle = media.title || '';
        const player = `
            <div class="player">
                ${mediaElement}
                <p class="media-title">${mediaTitle}</p>
                <button class="close-btn">X</button>
                <button class="prev-btn"><</button>
                <button class="next-btn">></button>
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

        this.$modalWrapper.innerHTML = "";


        this.$modalWrapper.classList.add('modal-on');
        this.$modalWrapper.appendChild(this.$wrapper);
        document.addEventListener('keydown', this.handleKeydown);
    }

    render() {
        this.createPlayer();
    }
}
