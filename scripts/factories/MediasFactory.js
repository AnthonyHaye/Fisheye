import Image from '../models/Image.js'; // Importation de la classe Image
import Video from '../models/Video.js'; // Importation de la classe Video

// Définition de la classe MediasFactory
export default class MediasFactory {
    // Constructeur de la classe MediasFactory
    constructor(data, photographerName) {
        //console.log(data); 
        // Vérifie si les données contiennent une image
        if (data.image) {
            return new Image(data, photographerName); // Retourne une instance de la classe Image
        } 
        // Vérifie si les données contiennent une vidéo
        else if (data.video) {
            return new Video(data, photographerName); // Retourne une instance de la classe Video
        } 
        // Si les données ne contiennent ni image ni vidéo
        else {
            throw 'type de données inconnues'; // Lance une exception avec le message 'Unknown data type'
        }
    }
}
