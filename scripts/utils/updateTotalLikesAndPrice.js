export function updateTotalLikesAndPrice(mediaObjects, pricePerDay) {
    const totalLikes = mediaObjects.reduce((sum, media) => sum + media.likes, 0);
    document.getElementById('total-likes').innerHTML = `${totalLikes} <span class="fas fa-heart"></span>`;
    document.getElementById('price').innerText = `${pricePerDay}€ / jour`;
}


