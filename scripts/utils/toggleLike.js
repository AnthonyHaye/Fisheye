export function toggleLike(media, nbrLikeElement, likeButton, updateTotalLikesCallback) {
    // Vérifie si le bouton "like" a déjà la classe "liked"
    if (likeButton.classList.contains('liked')) {
        // Si oui, décrémente le nombre de "likes" du média
        media.likes -= 1;
        // Met à jour l'état "liked" du média
        media.liked = false;
        // Retire la classe "liked" du bouton
        likeButton.classList.remove('liked');
    } else {
        // Si non, incrémente le nombre de "likes" du média
        media.likes += 1;
        // Met à jour l'état "liked" du média
        media.liked = true;
        // Ajoute la classe "liked" au bouton
        likeButton.classList.add('liked');
    }
    // Met à jour le texte de l'élément affichant le nombre de "likes"
    nbrLikeElement.innerText = media.likes;
    // Appelle la fonction de rappel pour mettre à jour le total des "likes"
    updateTotalLikesCallback();
}

