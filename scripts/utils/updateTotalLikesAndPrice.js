/**
 * Met à jour l'affichage du nombre total de "likes" et du prix par jour.
 * @param {Array} mediaObjects - Liste des objets média.
 * @param {number} pricePerDay - Le prix par jour du photographe.
 */
export function updateTotalLikesAndPrice(mediaObjects, pricePerDay) {
    // Calcule le nombre total de "likes" en additionnant les "likes" de chaque média
    const totalLikes = mediaObjects.reduce((sum, media) => sum + media.likes, 0);
    
    // Met à jour l'élément HTML avec l'ID 'total-likes' pour afficher le nombre total de "likes"
    document.getElementById('total-likes').innerHTML = `${totalLikes} <span class="fas fa-heart"></span>`;
    
    // Met à jour l'élément HTML avec l'ID 'price' pour afficher le prix par jour
    document.getElementById('price').innerText = `${pricePerDay}€ / jour`;
}



