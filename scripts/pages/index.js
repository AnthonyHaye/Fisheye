import { photographerTemplate } from "../templates/photographerTemplate.js"; // Importation du template pour afficher les photographes
import Api from '../api/Api.js'; // Importation de la classe Api pour récupérer les données

// Fonction principale qui exécute le script
async function main() {
    try {
        // Instanciation de l'objet Api avec le chemin vers le fichier JSON des photographes
        const api = new Api("./data/photographers.json");
        
        // Récupération des données des photographes via l'API
        const data = await api.get();
        //console.log(data); 

        // Extraction de la liste des photographes des données récupérées
        const photographers = data.photographers;

        // Sélection de la section HTML où les cartes des photographes seront ajoutées
        const sectionPhotographe = document.querySelector(".photographer_section");

        // Boucle à travers chaque photographe pour créer et ajouter une carte utilisateur à la section
        for (const article of photographers) {
            const Template = photographerTemplate(article); // Utilisation du template pour créer une carte de photographe
            sectionPhotographe.appendChild(Template.getUserCardDOM()); // Ajout de la carte de photographe à la section HTML
        }
    } catch (error) {
        console.error("Fetch error: ", error); // Affichage de l'erreur en cas d'échec de la récupération des données
    }
}
// Appel de la fonction principale pour exécuter le script
main();
