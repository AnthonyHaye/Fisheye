
import { photographerTemplate } from "../templates/photographerTemplate.js";

async function main() {  

    try {
        const response = await fetch("./data/photographers.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const photographers = data.photographers;
        const sectionPhotographe = document.querySelector(".photographer_section");

        for (const article of photographers) {
            const FichePhotographe = photographerTemplate(article)
            sectionPhotographe.appendChild(FichePhotographe.getUserCardDOM());
        }
    } catch (error) {
        console.error("Fetch error: ", error);
    }    
}
main();
