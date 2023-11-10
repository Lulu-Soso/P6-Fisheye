import {dataApi} from "/scripts/utils/dataApi.js";

export async function mediaFactory(index, data) {
    const {getPhotographer} = dataApi()
    let {id, photographerId, title, image, likes, date, price, video} = data;

    const photographer = await getPhotographer(photographerId)
    // chemin de récupération des médias au même nom du photographe en remplaçant les espaces par un tirait
    const directoryName = photographer.name.replace(/ /g, '-')

    const imgMedia = `assets/medias/${directoryName}/${image}`;
    const vMedia = `assets/medias/${directoryName}/${video}`;

    // Création du média selon le type
    function getMediaElement(type) {
        if (type === "image") {
            return document.createElement("img");
        } else if (type === "video") {
            return document.createElement("video");
        } else {
            return null;
        }
    }

    function getMediaCardDOM() {
        // Content
        const contentElement = document.createElement("article");

        const a = document.createElement("a");
        a.setAttribute("data-title", title)
        a.setAttribute("data-index", index)

        const divInfosMedia = document.createElement("div");
        divInfosMedia.classList.add("infos-media");

        // Title
        const titleElement = document.createElement("h2");
        titleElement.textContent = title;

        // Likes
        const likeHeartContent = document.createElement("div");
        likeHeartContent.classList.add("like-heart")
        const pHeart = document.createElement("button");
        pHeart.setAttribute("aria-label", "like")
        pHeart.innerHTML = "<i class='fa-regular fa-heart'></i>"

        const spanElement = document.createElement("span");
        spanElement.textContent = likes;


        // changement état du bouton like au clique et incrémentation
        pHeart.addEventListener('click', () => {
            let numberLikes = document.querySelector('.numb-likes')
            let totalLikes = parseInt(numberLikes.innerText)

            if (data.likes === likes){
                likes = data.likes + 1

                // changement de icon solid heart
                pHeart.innerHTML = "<i class='fa-solid fa-heart'></i>"

                totalLikes += 1;
            }else{
                // Remettre "likes" à la valeur de "data.likes"
                likes = data.likes
                // icon heart à état initial
                pHeart.innerHTML = "<i class='fa-regular fa-heart'></i>"

                totalLikes -= 1;
            }
            numberLikes.innerText = totalLikes;
        })

        // Attribution des propriétés à l'élément média selon média image ou média vidéo
        let mediaElement;
        if (image) {
            mediaElement = getMediaElement("image");
            mediaElement.setAttribute("src", imgMedia);
            mediaElement.ariaLabel ="média image"

            a.setAttribute("href", imgMedia)
        } else if (video) {
            mediaElement = getMediaElement("video");
            mediaElement.setAttribute("src", vMedia);
            mediaElement.setAttribute("controls", null);
            mediaElement.ariaLabel ="média video"

            a.setAttribute("href", vMedia)
        } else {
            // Return null if no image or video is provided
            return null;
        }

        contentElement.appendChild(a);
        a.appendChild(mediaElement);
        contentElement.appendChild(divInfosMedia);
        divInfosMedia.appendChild(titleElement);
        divInfosMedia.appendChild(likeHeartContent);
        likeHeartContent.appendChild(spanElement);
        likeHeartContent.appendChild(pHeart);

        return contentElement;
    }

    return {
        id,
        photographerId,
        title,
        image,
        likes,
        date,
        price,
        video,
        getMediaCardDOM
    };
}
