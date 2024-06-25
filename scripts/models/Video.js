import  Media  from "./Media.js";

export default class Video extends Media {
    constructor(data, photographerName) {
        super(data);    
        this.video = `assets/images/Sample Photos/${photographerName}/${data.video}`;
        this.title = data.title;
        this.likes = data.likes;
        this.photographerName = photographerName;
    }
};