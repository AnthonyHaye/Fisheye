import { createImageElement, createTextElement } from './createElements.js';
import { displayModal } from './contactForm.js';

export function updatePhotographerHeader(photographer) {
    const detailsSection = document.querySelector(".photograph-header");
    const contactBtn = document.querySelector(".contact_button");

    const namePhotographe = createTextElement("h2", photographer.name, "name_photographe");
    const imagePhotographe = createImageElement(photographer.portrait, "portrait_photographe");

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
