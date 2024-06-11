export default class PlayerModal {
    constructor(media, mediaList) {
        console.log("PlayerModal initialisé");
        this.media = media;
        this.mediaList = mediaList;
        this.currentIndex = mediaList.indexOf(media);

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
            });
    }

    onNextButton() {
        console.log("Ajout d'un événement suivant");
        this.$wrapper
            .querySelector('.next-btn')
            .addEventListener('click', () => {
                this.currentIndex = (this.currentIndex + 1) % this.mediaList.length;
                this.updatePlayer(this.mediaList[this.currentIndex]);
            });
    }

    onPrevButton() {
        console.log("Ajout d'un événement précédent");
        this.$wrapper
            .querySelector('.prev-btn')
            .addEventListener('click', () => {
                this.currentIndex = (this.currentIndex - 1 + this.mediaList.length) % this.mediaList.length;
                this.updatePlayer(this.mediaList[this.currentIndex]);
            });
    }

    updatePlayer(media) {
        console.log("Mise à jour du lecteur", media);
        const isVideo = media.endsWith('.mp4');
        const mediaElement = isVideo ? 
            `<video height="600" width="800" controls>
                <source src="${media}" type="video/mp4">
             </video>` :
            `<img class="diaporama" src="${media}" height="700" width="900" />`;

        const player = `
            <div class="player">
                ${mediaElement}
                <button class="close-btn">Fermer la fenêtre</button>
                <button class="prev-btn">◄</button>
                <button class="next-btn">►</button>
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
    }

    render() {
        this.createPlayer();
    }
}
