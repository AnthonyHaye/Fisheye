
/*La fonction displayTotalLikes est utilisée pour gérer l'affichage et la mise à jour des "likes" pour les médias d'un photographe.
 Elle récupère les données du photographe, initialise l'affichage du total des "likes",
et ajoute des gestionnaires d'événements aux boutons de "like" pour permettre aux utilisateurs de "liker" ou de "disliker" des médias.
Chaque interaction met à jour le nombre de "likes" pour le média concerné et le total des "likes" affiché.*/

// Importation de la fonction getPhotographerById depuis le fichier photographerPage.js
import { getPhotographerById } from "../pages/photographerPages.js";

// Exportation de la fonction displayTotalLikes
export const displayTotalLikes = async () => {
    // Récupère les médias du photographe via la fonction getPhotographerById
    const { medias } = await getPhotographerById();
    
    // Sélectionne tous les boutons de "like" dans la page
    const allBtnLike = document.querySelectorAll(".btn_like");
    
    // Sélectionne l'élément où le total des "likes" sera affiché
    const likesElement = document.querySelector(".photographer_likes_count");

    // Fonction pour mettre à jour le total des "likes"
    const updateTotalLikes = () => {
        // Calcule le total des "likes" en additionnant les "likes" de chaque média
        const totalLikes = medias.reduce((acc, media) => acc + media.likes, 0);
        
        // Met à jour le contenu de l'élément likesElement avec le total des "likes"
        likesElement.textContent = `${totalLikes}`;
    };

    // Appelle la fonction pour mettre à jour le total des "likes" au chargement de la page
    updateTotalLikes();

    // Ajoute un événement de clic à chaque bouton de "like"
    allBtnLike.forEach(btn => {
        btn.addEventListener("click", () => {
            // Trouve le média correspondant au bouton cliqué en utilisant l'ID du média
            const media = medias.find(media => media.id == btn.dataset.id);

            // Incrémente ou décrémente le nombre de "likes" selon que le bouton a déjà été cliqué
            !btn.classList.contains("liked") ? media.likes++ : media.likes--;

            // Bascule la classe "liked" sur le bouton
            btn.classList.toggle("liked");

            // Met à jour le nombre de "likes" affiché pour le média cliqué
            const likesElement = btn.previousElementSibling;
            likesElement.textContent = `${media.likes}`;

            // Met à jour le total des "likes"
            updateTotalLikes();
        });
    });
};



