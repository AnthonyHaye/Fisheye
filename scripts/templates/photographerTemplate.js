// templates/photographer.js
import { createTextElement } from '../utils/createElements.js';

export function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/images/Sample Photos/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.className = "Photographe_card";

        const lienElement = document.createElement("a");
        lienElement.className = "vers_page_photographe";
        lienElement.href = `photographer.html?id=${data.id}`;

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.className = "portrait_photographe";
        img.setAttribute("alt", name);

        const h2 = document.createElement('h2');
        h2.className = "name_photographe";
        h2.textContent = name;

        const paysPhotographeElement = document.createElement("div");
        paysPhotographeElement.className = "paysPhotographe";
        const cityPhotographe = createTextElement("p", `${city}, `);
        const countryPhotographe = createTextElement("p", country);

        const taglinePhotographe = createTextElement("p", tagline, "taglinePhotographe");
        const prixPhotographe = createTextElement("p", `${price} €/jour`, "prixPhotographe");

        paysPhotographeElement.appendChild(cityPhotographe);
        paysPhotographeElement.appendChild(countryPhotographe);

        lienElement.appendChild(img);
        lienElement.appendChild(h2);

        article.appendChild(lienElement);
        article.appendChild(paysPhotographeElement);
        article.appendChild(taglinePhotographe);
        article.appendChild(prixPhotographe);

        return article;
    }

    return { name, picture, getUserCardDOM }
}
