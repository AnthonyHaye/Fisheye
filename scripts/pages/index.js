
import { photographerTemplate } from "../templates/photographerTemplate.js";

async function main() {
    console.log("avant");

    try {
        const response = await fetch("./data/photographers.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const photographers = data.photographers;
        const sectionPhotographe = document.querySelector(".photographer_section");

        for (const article of photographers) {
            const Template = photographerTemplate(article)
            sectionPhotographe.appendChild(Template.getUserCardDOM());
        }
    } catch (error) {
        console.error("Fetch error: ", error);
    }

    console.log("apres");
}
main();
// async function main() {
//     console.log("avant");

//     try {
//         const response = await fetch("./data/photographers.json");
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         const data = await response.json();

//         const photographers = data.photographers;
//         const sectionPhotographe = document.querySelector(".photographer_section");

//         for (const article of photographers) {
//             console.log(article);

//             const photographeElement = document.createElement("article");
//             photographeElement.className = "Photographe_card";

//             const lienElement = document.createElement("a");
//             lienElement.className = "vers_page_photographe";
//             lienElement.href = `photographer.html?id=${article.id}`;

//             const imagePhotographe = createImageElement(`assets/images/Sample Photos/Photographers ID Photos/${article.portrait}`, "portrait_photographe");
//             imagePhotographe.className = "portrait_photographe"
//             const namePhotographe = createTextElement("h2", article.name, "name_photographe");

//             const paysPhotographeElement = document.createElement("div");
//             paysPhotographeElement.className = "paysPhotographe";
//             const cityPhotographe = createTextElement("p", `${article.city}`);
//             cityPhotographe.innerHTML += ",&nbsp;"
//             const countryPhotographe = createTextElement("p", article.country);

//             const taglinePhotographe = createTextElement("p", article.tagline, "taglinePhotographe");
//             const prixPhotographe = createTextElement("p", `${article.price} €/jour`, "prixPhotographe");

            
//             paysPhotographeElement.appendChild(cityPhotographe);
//             paysPhotographeElement.appendChild(countryPhotographe);

//             lienElement.appendChild(imagePhotographe);
//             lienElement.appendChild(namePhotographe);
//             photographeElement.appendChild(lienElement);
//             photographeElement.appendChild(paysPhotographeElement);
//             photographeElement.appendChild(taglinePhotographe);
//             photographeElement.appendChild(prixPhotographe);

//             sectionPhotographe.appendChild(photographeElement);
//         }
//     } catch (error) {
//         console.error("Fetch error: ", error);
//     }

//     console.log("apres");
// }

// function createImageElement(src, className) {
//     const img = document.createElement("img");
//     img.src = src;
//     if (className) {
//         img.className = className;
//     }
//     return img;
// }

// function createTextElement(tag, text, className) {
//     const element = document.createElement(tag);
//     element.innerText = text;
//     if (className) {
//         element.className = className;
//     }
//     return element;
// }

// main();
