/*La classe MediasFactory est une usine (factory) 
qui crée des instances de Image ou Video en fonction du type de média contenu 
dans les données fournies. 
Si les données contiennent une image, une instance de Image est créée. 
Si elles contiennent une vidéo, une instance de Video est créée. 
Si les données ne contiennent ni l'un ni l'autre, une erreur est lancée pour indiquer que le type de données est inconnu.*/

// Importation des classes Image et Video depuis leurs fichiers respectifs
import Image from '../models/Image.js'
import Video from '../models/Video.js'

// Déclaration de la classe MediasFactory avec exportation par défaut
export default class MediasFactory {
    // Constructeur de la classe qui prend des données en paramètre
    constructor(data) {
        // Si les données contiennent une image, crée une instance de la classe Image
        if (data.image) {
            return new Image(data);
        // Si les données contiennent une vidéo, crée une instance de la classe Video
        } else if (data.video) {
            return new Video(data);
        // Si les données ne contiennent ni image ni vidéo, lance une exception
        } else {
            throw 'Unknown data type';
        }
    }
}
