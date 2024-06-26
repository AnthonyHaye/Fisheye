import Image from '../models/Image.js';
import Video from '../models/Video.js';

export default class MediasFactory {
    constructor(data, photographerName) {
        console.log(data)
        if (data.image) {
            return new Image(data, photographerName);
        } else if (data.video) {
            return new Video(data, photographerName);
        } else {
            throw 'Unknown data type';
        }
    }
}
