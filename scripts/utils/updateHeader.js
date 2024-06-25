import { createImageElement, createTextElement } from './createElements.js';
import { displayModal } from './contactForm.js';

export function updatePhotographerHeader(photographer) {
    console.log(photographer);
    const detailsSection = document.querySelector(".photograph-header");
    const contactBtn = document.querySelector(".contact_button");

    // Correction du chemin d'accès de l'image
    const imagePath = `assets/images/Sample Photos/Photographers ID Photos/${photographer.portrait}`;
    const imagePhotographe = createImageElement(imagePath, "portrait_photographe");
    
    console.log(imagePhotographe);

    const namePhotographe = createTextElement("h2", photographer.name, "name_photographe");

    const paysPhotographeElement = document.createElement("div");
    paysPhotographeElement.className = "paysPhotographe";

    const Presentation = document.createElement("div");
    Presentation.className = "Presentation";

    const cityPhotographe = createTextElement("p", `${photographer.city}`);
    cityPhotographe.innerHTML += ",&nbsp;";
    const countryPhotographe = createTextElement("p", photographer.country);

    const taglinePhotographe = createTextElement("p", photographer.tagline, "taglinePhotographe");
    const prixPhotographe = createTextElement("p", `${photographer.price} €/jour`, "prixPhotographe");

    paysPhotographeElement.appendChild(cityPhotographe);
    paysPhotographeElement.appendChild(countryPhotographe);

    detailsSection.appendChild(Presentation);

    Presentation.appendChild(namePhotographe);
    Presentation.appendChild(paysPhotographeElement);
    Presentation.appendChild(taglinePhotographe);

    detailsSection.appendChild(contactBtn);
    detailsSection.appendChild(imagePhotographe);

    contactBtn.addEventListener('click', () => displayModal(photographer.name));
}
