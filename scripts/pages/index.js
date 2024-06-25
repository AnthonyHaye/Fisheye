import { photographerTemplate } from "../templates/photographerTemplate.js";
import Api from '../api/Api.js';

async function main() {
    console.log("avant");

    try {
        const api = new Api("./data/photographers.json");
        const data = await api.get();
        console.log(data);

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
