import { createImageElement, createTextElement } from './createElements.js'; // Importation des fonctions utilitaires pour créer des éléments DOM
import { displayModal } from './contactForm.js'; // Importation de la fonction pour afficher le formulaire de contact

// Fonction pour mettre à jour l'en-tête du photographe sur la page
export function updatePhotographerHeader(photographer) {
    //console.log(photographer); 

    const detailsSection = document.querySelector(".photograph-header"); // Sélection de la section de l'en-tête du photographe dans le DOM
    const contactBtn = document.querySelector(".contact_button"); // Sélection du bouton de contact dans le DOM

    // Construction du chemin d'accès de l'image du photographe
    const imagePath = `assets/images/Sample Photos/Photographers ID Photos/${photographer.portrait}`;
    const imagePhotographe = createImageElement(imagePath, "portrait_photographe"); // Création de l'élément image avec la source et la classe CSS
    imagePhotographe.setAttribute("alt", `photo portrait de ${photographer.name}`); // Définition du texte alternatif de l'image
     

    // Création de l'élément de texte pour le nom du photographe
    const namePhotographe = createTextElement("h2", photographer.name, "name_photographe");

    // Création de l'élément conteneur pour la ville et le pays du photographe
    const paysPhotographeElement = document.createElement("div");
    paysPhotographeElement.className = "paysPhotographe";

    // Création de l'élément conteneur pour la présentation du photographe
    const Presentation = document.createElement("div");
    Presentation.className = "Presentation";

    // Création des éléments de texte pour la ville et le pays du photographe
    const cityPhotographe = createTextElement("p", `${photographer.city}`);
    cityPhotographe.innerHTML += ",&nbsp;"; // Ajout d'une virgule et d'un espace insécable après la ville
    const countryPhotographe = createTextElement("p", photographer.country);

    // Création de l'élément de texte pour la tagline du photographe
    const taglinePhotographe = createTextElement("p", photographer.tagline, "taglinePhotographe");

    // Ajout des éléments de texte pour la ville et le pays au conteneur
    paysPhotographeElement.appendChild(cityPhotographe);
    paysPhotographeElement.appendChild(countryPhotographe);

    // Ajout du conteneur de présentation à la section des détails
    detailsSection.appendChild(Presentation);

    // Ajout des éléments de texte pour le nom, la ville/pays et la tagline au conteneur de présentation
    Presentation.appendChild(namePhotographe);
    Presentation.appendChild(paysPhotographeElement);
    Presentation.appendChild(taglinePhotographe);

    // Ajout du bouton de contact et de l'image du photographe à la section des détails
    detailsSection.appendChild(contactBtn);
    detailsSection.appendChild(imagePhotographe);

    // Ajout d'un gestionnaire d'événements au bouton de contact pour afficher le formulaire de contact
    contactBtn.addEventListener('click', () => displayModal(photographer.name));
}
