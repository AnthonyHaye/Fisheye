// Fonction pour créer un élément image avec des attributs spécifiés
export function createImageElement(src, className) {
    const img = document.createElement("img"); // Création de l'élément image
    img.src = src; // Définition de la source de l'image
    if (className) { // Vérification si une classe CSS est spécifiée
        img.className = className; // Ajout de la classe CSS à l'image
    }
    return img; // Retourne l'élément image créé
}

// Fonction pour créer un élément vidéo avec des attributs spécifiés
export function createVideoElement(src, className) {
    const video = document.createElement("video"); // Création de l'élément vidéo
    video.src = src; // Définition de la source de la vidéo
    video.controls = false; // Désactivation des contrôles de la vidéo
    if (className) { // Vérification si une classe CSS est spécifiée
        video.className = className; // Ajout de la classe CSS à la vidéo
    }
    return video; // Retourne l'élément vidéo créé
}

// Fonction pour créer un élément de texte (paragraphe, titre, etc.) avec des attributs spécifiés
export function createTextElement(tag, text, className) {
    const element = document.createElement(tag); // Création de l'élément de texte spécifié par le tag
    element.innerText = text; // Définition du contenu textuel de l'élément
    if (className) { // Vérification si une classe CSS est spécifiée
        element.className = className; // Ajout de la classe CSS à l'élément
    }
    return element; // Retourne l'élément de texte créé
}
