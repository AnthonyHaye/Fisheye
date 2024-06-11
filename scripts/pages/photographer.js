async function main() {
    const params = new URLSearchParams(window.location.search);
    console.log(params);
    const photographerId = parseInt(params.get('id'));

    try {
        const response = await fetch("./data/photographers.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
            const photographer = data.photographers.find(p => p.id == photographerId);
            const media = data.media.filter(m => m.photographerId === photographerId);
            // const titreMedia = media.title;
            console.log(media);

        if (!photographer) {
            throw new Error("Photographe pas trouvé");
        }
/*photograph-header***************************************************/
        const detailsSection = document.querySelector(".photograph-header");
        const contactBtn = document.querySelector(".contact_button")

        const namePhotographe = createTextElement("h2", photographer.name, "name_photographe");

        const imagePhotographe = createImageElement(`assets/images/Sample Photos/Photographers ID Photos/${photographer.portrait}`, "portrait_photographe");

        const paysPhotographeElement = document.createElement("div");
        paysPhotographeElement.className = "paysPhotographe";

        const Presentation = document.createElement("div");
        Presentation.className = "Presentation";

        const cityPhotographe = createTextElement("p", `${photographer.city}`);
        cityPhotographe.innerHTML += ",&nbsp;"
        const countryPhotographe = createTextElement("p", photographer.country);

        const taglinePhotographe = createTextElement("p", photographer.tagline, "taglinePhotographe");
        const prixPhotographe = createTextElement("p", `${photographer.price} €/jour`, "prixPhotographe");


        paysPhotographeElement.appendChild(cityPhotographe);
        paysPhotographeElement.appendChild(countryPhotographe);

        detailsSection.appendChild(Presentation);

            Presentation.appendChild(namePhotographe);        
            Presentation.appendChild(paysPhotographeElement);
            Presentation.appendChild(taglinePhotographe);
        
        detailsSection.appendChild(contactBtn);
        detailsSection.appendChild(imagePhotographe);

/*photographer_section pour les médias***************************************************/

        const sectionPhotographe = document.querySelector(".photographer_section")
        media.forEach(photoVideo => {
            const mediaPath = `assets/images/Sample Photos/${photographer.name}/${photoVideo.image || photoVideo.video}`;  
           
            
            if (photoVideo.image){  
                const lienMedia = document.createElement ("a") 
                lienMedia.className = "lienMedia" 
                lienMedia.setAttribute('href', '#')   ;
                lienMedia.setAttribute('alt', 'Pas de description pour le moment')
                const cardMedia = document.createElement("div");
                cardMedia.className = "cardMedia"; 
                const imgMedia = createImageElement(mediaPath);
                imgMedia.className = "photographe_photo";
                const titreMedia = createTextElement("p", photoVideo.title, "media_title");

                const articleMedia = document.createElement("article")
                articleMedia.className = "articleMedia"

                const figcaptionMedia = document.createElement("figcaption")
                figcaptionMedia.className = "figcaptionMedia"

                const h2Media = document.createElement("h2")
                h2Media.className = "h2Media"

                const PopulaireContenair = createTextElement("div", "" ,"populaireContenair")
                const nbrLike = createTextElement("p", photoVideo.likes, "nbrLikes")

                const like = document.createElement("button")
                like.className = "fas fa-heart"

                sectionPhotographe.appendChild(articleMedia)
                    articleMedia.appendChild(lienMedia)
                        lienMedia.appendChild(cardMedia)
                            cardMedia.appendChild(imgMedia) 
                    articleMedia.appendChild(figcaptionMedia) 
                        figcaptionMedia.appendChild(h2Media)
                            h2Media.appendChild(titreMedia) 
                        figcaptionMedia.appendChild(PopulaireContenair)   
                            PopulaireContenair.appendChild(nbrLike) 
                            PopulaireContenair.appendChild(like)         
            }         
        });


        

            
    } catch (error) {
        console.error("Fetch error: ", error);
    }
}

function createImageElement(src, className) {
    const img = document.createElement("img");
    img.src = src;
    if (className) {
        img.className = className;
    }
    return img;
}

function createTextElement(tag, text, className) {
    const element = document.createElement(tag);
    element.innerText = text;
    if (className) {
        element.className = className;
    }
    return element;
}

main();
