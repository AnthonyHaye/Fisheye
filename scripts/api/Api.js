// Déclaration de la classe Api avec exportation par défaut
export default class Api {
    // Le constructeur de la classe qui initialise l'URL de l'API
    constructor(url) {
        this.url = url;
    }

    // Méthode asynchrone 'get' pour récupérer des données depuis l'API
    async get() {
        try {
            // Envoie une requête HTTP GET à l'URL spécifiée
            const response = await fetch(this.url);
            
            // Convertit la réponse en format JSON
            const data = await response.json();
            
            // Retourne les données JSON
            return data;
        } catch (err) {
            // En cas d'erreur, lance une nouvelle erreur avec le message d'erreur
            throw new Error(err);
        }
    }
};
