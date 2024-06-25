import Media from "./Media.js";

export default class Image extends Media {
    constructor(data, photographerName) {
        super(data);
        this.image = `assets/images/Sample Photos/${photographerName}/${data.image}`;
        this.title = data.title;
        this.likes = data.likes;
        this.photographerName = photographerName;
    }
};