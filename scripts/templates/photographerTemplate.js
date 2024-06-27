import { createTextElement } from '../utils/createElements.js'; // Importation de la fonction utilitaire pour créer des éléments de texte

// Fonction pour créer un template de photographe à partir des données fournies
export function photographerTemplate(data) {
    // Déstructuration de l'objet data pour extraire les propriétés individuelles
    const { name, portrait, city, country, tagline, price } = data;

    // Construction du chemin vers l'image du photographe
    const picture = `assets/images/Sample Photos/Photographers ID Photos/${portrait}`;

    // Fonction pour créer l'élément DOM représentant la carte utilisateur du photographe
    function getUserCardDOM() {
        const article = document.createElement('article'); // Création de l'élément article
        article.className = "Photographe_card"; // Ajout de la classe CSS pour styliser l'article

        const lienElement = document.createElement("a"); // Création de l'élément lien
        lienElement.className = "vers_page_photographe"; // Ajout de la classe CSS pour le lien
        lienElement.href = `photographer.html?id=${data.id}`; // Définition de l'URL de destination du lien

        const img = document.createElement('img'); // Création de l'élément image
        img.setAttribute("src", picture); // Définition de la source de l'image
        img.className = "portrait_photographe"; // Ajout de la classe CSS pour l'image
        img.setAttribute("alt", name); // Définition du texte alternatif de l'image

        const h2 = document.createElement('h2'); // Création de l'élément titre
        h2.className = "name_photographe"; // Ajout de la classe CSS pour le titre
        h2.textContent = name; // Définition du contenu textuel du titre

        const paysPhotographeElement = document.createElement("div"); // Création de l'élément div pour le pays
        paysPhotographeElement.className = "paysPhotographe"; // Ajout de la classe CSS pour le pays
        const cityPhotographe = createTextElement("p", `${city}, `); // Création de l'élément de texte pour la ville
        const countryPhotographe = createTextElement("p", country); // Création de l'élément de texte pour le pays

        const taglinePhotographe = createTextElement("p", tagline, "taglinePhotographe"); // Création de l'élément de texte pour la tagline
        const prixPhotographe = createTextElement("p", `${price} €/jour`, "prixPhotographe"); // Création de l'élément de texte pour le prix

        // Ajout des éléments ville et pays à l'élément div du pays
        paysPhotographeElement.appendChild(cityPhotographe);
        paysPhotographeElement.appendChild(countryPhotographe);

        // Ajout de l'image et du titre au lien
        lienElement.appendChild(img);
        lienElement.appendChild(h2);

        // Ajout du lien, du pays, de la tagline et du prix à l'article
        article.appendChild(lienElement);
        article.appendChild(paysPhotographeElement);
        article.appendChild(taglinePhotographe);
        article.appendChild(prixPhotographe);

        // Retourne l'élément article complet représentant la carte du photographe
        return article;
    }

    // Retourne un objet contenant les propriétés name, picture et la fonction getUserCardDOM
    return { name, picture, getUserCardDOM }
}
