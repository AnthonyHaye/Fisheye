/*La classe PhotographerMedias est utilisée pour créer et insérer dynamiquement une galerie de médias pour un photographe dans une page web.
 Elle prend les informations d'un photographe et un tableau de médias en entrée, 
génère le contenu HTML pour chaque média (image ou vidéo), et insère ce contenu dans la page.
 Cela permet de personnaliser la page de manière dynamique en fonction des médias du photographe sélectionné.*/
 

// Déclaration de la classe PhotographerMedias avec exportation par défaut
export default class PhotographerMedias {
    // Constructeur de la classe qui prend un photographe et ses médias en paramètre
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.medias = medias;
    }

    // Méthode pour créer et insérer la galerie de médias du photographe dans la page
    createPhotographerMedias() {
        // Sélectionne l'élément de la page où le contenu des médias sera inséré
        const sectionPhotographe = document.querySelector(".photographer_section");

        // Crée le contenu HTML pour la galerie de médias
        const content = `
            <section class="articleMedia">
                ${this.medias.map(media => {
                    // Détermine le contenu du média (image ou vidéo)
                    const mediaElement = media.image
                        ? `<img class="photographe_photoVideo" src="assets/images/Sample Photos/${this.photographer.name}/${media.image}" alt="${media.alt}">`
                        : `<video class="photographe_photoVideo" aria-label="${media.alt}">
                            <source src="assets/images/Sample Photos/${this.photographer.name}/${media.video}" type="video/mp4">
                           </video>`;
                    
                    // Retourne le contenu HTML pour chaque média
                    return `
                        <article class="gallery_card">                           
                            <a href="#" data-media=${media.id} role="link" aria-label="View media large">
                                <figure>${mediaElement}</figure>
                            </a>
                            <figcaption>
                                <h2>${media.title}</h2>
                                <div role="group" aria-label="Like button and number of likes">
                                    <span class="nbLike">${media.likes}</span> 
                                    <button class="btn_like" type="button" aria-label="Like" data-id="${media.id}">
                                        <span class="fas fa-heart" aria-hidden="true"></span>
                                    </button> 
                                </div>
                            </figcaption>
                        </article>
                    `;
                }).join("")}
            </section>
            <aside>
                <p class="photographer_Likes">
                    <span class="photographer_likes_count"></span>
                    <span class="fas fa-heart" aria-hidden="true"></span>
                </p>
                <span>${this.photographer.price}€ / jour</span>
            </aside>
        `;

        // Insère le contenu HTML créé dans l'élément sélectionné
        sectionPhotographe.innerHTML = content;

        // Retourne le contenu HTML créé
        return content;
    }
}
