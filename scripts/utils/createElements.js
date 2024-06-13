export function createImageElement(src, className) {
    const img = document.createElement("img");
    img.src = src;
    if (className) {
        img.className = className;
    }
    return img;
}

export function createVideoElement(src, className) {
    const video = document.createElement("video");
    video.src = src;
    video.controls = false; // pour maitriser la lecture ou pas
    if (className) {
        video.className = className;
    }
    return video;
}

export function createTextElement(tag, text, className) {
    const element = document.createElement(tag);
    element.innerText = text;
    if (className) {
        element.className = className;
    }
    return element;
}