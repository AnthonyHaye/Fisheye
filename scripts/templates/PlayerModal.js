export default class PlayerModal {
    constructor(media, mediaList) {
        this.media = media; 
        this.mediaList = mediaList; 
        this.currentIndex = mediaList.findIndex(m => m.image === media.image || m.video === media.video); 
        this.$wrapper = document.createElement('div'); 
        this.$wrapper.classList.add('player-wrapper'); 
        this.$modalWrapper = document.querySelector('#player_modal'); 
    }

    // Méthode pour gérer l'événement de fermeture du lecteur
    onCloseButton() {
        this.$wrapper.querySelector('.close-btn').addEventListener('click', () => {
            this.$modalWrapper.classList.remove('modal-on'); 
            this.$wrapper.innerHTML = ""; 
            document.removeEventListener('keydown', this.handleKeydown); 
        });
    }

    // Méthode pour gérer l'événement de passage au média suivant
    onNextButton() {
        this.$wrapper.querySelector('.next-btn').addEventListener('click', () => {
            this.currentIndex = (this.currentIndex + 1) % this.mediaList.length; 
            this.updatePlayer(this.mediaList[this.currentIndex]); 
        });
    }

    // Méthode pour gérer l'événement de retour au média précédent
    onPrevButton() {
        this.$wrapper.querySelector('.prev-btn').addEventListener('click', () => {
            this.currentIndex = (this.currentIndex - 1 + this.mediaList.length) % this.mediaList.length; 
            this.updatePlayer(this.mediaList[this.currentIndex]); 
        });
    }

    // Méthode pour gérer les événements du clavier
    handleKeydown = (event) => {
        console.log("Key pressed:", event.key); // Ajout d'un log pour vérifier les touches pressées
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

    // Méthode pour mettre à jour le contenu du lecteur avec un nouveau média
    updatePlayer(media) {
        const isVideo = media.video && media.video.endsWith('.mp4'); 
        const mediaElement = isVideo ?  
            `<video height="700" width="900" controls>
                <source src="${media.video}" type="video/mp4">
             </video>` :
            `<img class="diaporama" src="${media.image}" height="700" width="900" />`; 
        const mediaTitle = media.title || ''; 
        const photographerName = media.photographerName || ''; 
        const description = `${mediaTitle} par ${photographerName}`; 

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
        this.$wrapper.innerHTML = player; 
        this.onCloseButton(); 
        this.onNextButton(); 
        this.onPrevButton(); 
    }

    // Méthode pour créer le lecteur et l'afficher dans la modal
    createPlayer() {
        this.updatePlayer(this.media); 
        this.$modalWrapper.innerHTML = ""; 
        this.$modalWrapper.classList.add('modal-on'); 
        this.$modalWrapper.appendChild(this.$wrapper); 
        document.addEventListener('keydown', this.handleKeydown); 
    }

    // Méthode pour rendre (afficher) le lecteur
    render() {
        this.createPlayer();
    }
}
