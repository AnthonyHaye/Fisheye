/*La classe Media sert de modèle de base pour représenter des médias (comme des images ou des vidéos) avec des propriétés communes.
 Le constructeur de la classe prend un objet data et initialise les propriétés de l'instance de Media avec les valeurs fournies dans cet objet.
  Cela permet de créer facilement des instances de Media avec des données standardisées.*/

// Déclaration de la classe Media avec exportation par défaut
export default class Media {
    // Constructeur de la classe qui prend des données en paramètre
    constructor(data) {
        // Initialisation des propriétés de l'objet Media avec les valeurs fournies dans data
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.likes = data.likes;
        this.date = data.date;
        this.price = data.price;
        this.alt = data.alt;
    }
};
