// Importation de la classe Media depuis son fichier
import Media from "./Media.js";

// Déclaration de la classe Image avec exportation par défaut
export default class Image extends Media {
    // Constructeur de la classe qui prend des données en paramètre
    constructor(data) {
        // Appel du constructeur de la classe parente Media avec les données fournies
        super(data);
        // Initialisation de la propriété image avec la valeur de data.image
        this.image = data.image;
    }
};
