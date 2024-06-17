export function toggleLike(media, nbrLikeElement, likeButton, updateTotalLikesCallback) {
    if (likeButton.classList.contains('liked')) {
        media.likes -= 1;
        media.liked = false;
        likeButton.classList.remove('liked');
    } else {
        media.likes += 1;
        media.liked = true;
        likeButton.classList.add('liked');
    }
    nbrLikeElement.innerText = media.likes;
    updateTotalLikesCallback(); // Met à jour le total des likes
}
