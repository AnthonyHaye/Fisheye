/*La classe PhotographerHeader est utilisée pour créer et insérer dynamiquement un en-tête de photographe dans une page web. 
Elle prend les informations d'un photographe en entrée, met à jour les éléments de la page en conséquence 
(comme le nom dans un formulaire modal et la meta description), 
et génère le contenu HTML pour l'en-tête du photographe, qui est ensuite inséré dans la page. 
Cela permet de personnaliser la page de manière dynamique en fonction du photographe sélectionné.*/

// Déclaration de la classe PhotographerHeader avec exportation par défaut
export default class PhotographerHeader {
    // Constructeur de la classe qui prend un objet photographe en paramètre
    constructor(photographer) {
        this.photographer = photographer;
    }

    // Méthode pour créer et insérer l'en-tête du photographe dans la page
    createPhotographerHeader() {
        // Sélectionne l'élément de la page où l'en-tête du photographe sera inséré
        const profilePageHeader = document.querySelector(".photograph-header");

        // Sélectionne l'élément de formulaire modal et met à jour son contenu avec le nom du photographe
        const formName = document.querySelector(".modal-overlay");
        formName.textContent = this.photographer.name;

        // Met à jour la meta description de la page avec les informations du photographe
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = `Découvrez ${this.photographer.name}, photographe professionnel basé à ${this.photographer.city}, ${this.photographer.country} offrant ses services à partir de ${this.photographer.price} € / jour.`;
        }

        // Crée le contenu HTML pour l'en-tête du photographe
        const about = `
            <div class="photographer_profile__infos">
                <h1 class="photographer_name">${this.photographer.name}</h1>
                <p class="photographer_location">${this.photographer.city}, ${this.photographer.country}</p>
                <p class="photographer_tagline">${this.photographer.tagline}</p>    
            </div>
            <button class="contact_button" type="button" aria-label="Open contact form">Contactez-moi</button>
            <img class="portrait_photographe" src="assets/images/Sample Photos/Photographers ID Photos/${this.photographer.portrait}" alt="${this.photographer.name}">
        `;       

        // Insère le contenu HTML créé dans l'élément sélectionné
        profilePageHeader.innerHTML = about;

        // Retourne le contenu HTML créé
        return about;
    }
}
