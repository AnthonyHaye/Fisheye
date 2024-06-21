export function mediaFactory(data) {
    const { image, video, title, likes, photographerName } = data;

    function getMediaDOM() {
        const article = document.createElement('article');
        article.className = "media_card";

        let mediaElement;
        if (image) {
            mediaElement = document.createElement('img');
            mediaElement.setAttribute("src", `assets/images/Sample Photos/${photographerName}/${image}`);
            mediaElement.setAttribute("alt", title);
        } else if (video) {
            mediaElement = document.createElement('video');
            mediaElement.setAttribute("src", `assets/videos/${photographerName}/${video}`);
            mediaElement.setAttribute("controls", "true");
        }

        const mediaTitle = document.createElement('h3');
        mediaTitle.textContent = title;

        const mediaLikes = document.createElement('p');
        mediaLikes.textContent = `${likes} ❤`;

        article.appendChild(mediaElement);
        article.appendChild(mediaTitle);
        article.appendChild(mediaLikes);

        return article;
    }

    return { getMediaDOM };
}

// // mediaFactory.js

// export function mediaFactory(media) {
//     const { title, image, video, likes } = media;

//     function createMediaElement() {
//         const article = document.createElement('article');
//         article.className = "media_card";

//         let mediaElement;
//         if (image) {
//             mediaElement = document.createElement('img');
//             mediaElement.setAttribute('src', `assets/images/Sample Photos/${image}``assets/images/Sample Photos/${image}`);
//             mediaElement.setAttribute('alt', title);
//         } else if (video) {
//             mediaElement = document.createElement('video');
//             mediaElement.setAttribute('controls', '');
//             const source = document.createElement('source');
//             source.setAttribute('src', `assets/videos/${video}`);
//             source.setAttribute('type', 'video/mp4');
//             mediaElement.appendChild(source);
//         }

//         const mediaTitle = document.createElement('h2');
//         mediaTitle.className = "media_title";
//         mediaTitle.textContent = title;

//         const likeContainer = document.createElement('div');
//         likeContainer.className = "like_container";

//         const likeCount = document.createElement('p');
//         likeCount.className = "like_count";
//         likeCount.textContent = likes;

//         const likeButton = document.createElement('span');
//         likeButton.className = "fas fa-heart";
//         likeButton.setAttribute('role', 'button');
//         likeButton.setAttribute('aria-label', 'likes');

//         likeContainer.appendChild(likeCount);
//         likeContainer.appendChild(likeButton);

//         article.appendChild(mediaElement);
//         article.appendChild(mediaTitle);
//         article.appendChild(likeContainer);

//         return article;
//     }

//     return { createMediaElement };
// }
