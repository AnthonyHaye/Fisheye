/*La fonction displayLightbox permet d'afficher une lightbox pour les médias d'un photographe. 
Elle gère l'ouverture et la fermeture de la lightbox, la navigation entre les médias (images et vidéos),
 et les interactions clavier pour une meilleure accessibilité. 
 Lorsqu'un utilisateur clique sur un média, la lightbox s'ouvre avec le média correspondant. 
 Les utilisateurs peuvent naviguer entre les médias à l'aide des boutons de navigation 
 ou des touches du clavier,
 et fermer la lightbox avec le bouton de fermeture ou la touche Escape.*/

 // Exportation de la fonction displayLightbox
export const displayLightbox = medias => {
    // Sélection des éléments du DOM nécessaires pour la lightbox
    const lightboxWrapper = document.querySelector('.lightbox_wrapper');
    const btnClose = document.querySelector('.btn_close_lightbox');
    const btnPrevious = document.querySelector('.btn_previous');
    const btnNext = document.querySelector('.btn_next');
    const lightboxMedia = document.querySelector('.lightbox_media');
    const mediaProvider = Array.from(document.querySelectorAll('.gallery_card a'));

    // Extraction des informations du photographe et de ses médias
    const photographer = medias.photographer;
    const mediasList = medias.medias;
    let currentIndex = 0; 

    // Ajout d'un événement de clic à chaque lien de média pour ouvrir la lightbox
    mediaProvider.forEach(media => {
        media.addEventListener('click', () => {
            const mediaId = media.dataset.media;
            const mediaIndex = mediasList.findIndex(media => media.id == mediaId);
            currentIndex = mediaIndex;
            lightboxWrapper.style.display = 'flex';
            btnClose.focus();
            lightboxTemplate();
        });
    });

    // Fonction pour mettre à jour le contenu de la lightbox
    const lightboxTemplate = () => {
        const currentMedia = mediasList[currentIndex];
        
        lightboxMedia.innerHTML = `
            ${currentMedia.image ? `
            <img src="./assets/images/photographers/samplePhotos-Medium/${photographer.name}/${currentMedia.image}" alt="${currentMedia.alt}">` : 
            `<video controls aria-label="${currentMedia.alt}"><source src="./assets/images/photographers/samplePhotos-Medium/${photographer.name}/${currentMedia.video}" type="video/mp4"></video>`}

            <figcaption>${currentMedia.title}</figcaption>
        `;
    };
    
    // Fonction pour fermer la lightbox
    const closeLightbox = () => {
        lightboxWrapper.style.display = 'none';
        lightboxMedia.innerHTML = '';
    };

    // Fonction pour afficher le média suivant dans la lightbox
    const nextMedia = () => {
        currentIndex++;
        if (currentIndex > mediasList.length - 1) currentIndex = 0;
        lightboxTemplate();
        showActiveBtn(btnNext);
    };

    // Fonction pour afficher le média précédent dans la lightbox
    const previousMedia = () => {
        currentIndex--;
        if (currentIndex < 0) currentIndex = mediasList.length - 1;
        lightboxTemplate();
        showActiveBtn(btnPrevious);
    };

    // Fonction pour ajouter un effet visuel aux boutons de navigation
    const showActiveBtn = btn => {
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 100);
    };        
        
    // Gestion des événements clavier pour la navigation dans la lightbox
    document.addEventListener('keyup', e => {
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                previousMedia();
                break;
            case 'ArrowRight':
                nextMedia();
                break;
        };
    });

    // Ajout des événements de clic aux boutons de navigation et de fermeture
    btnPrevious.addEventListener('click', () => previousMedia());
    btnNext.addEventListener('click', () => nextMedia());
    btnClose.addEventListener('click', () => closeLightbox());
};

