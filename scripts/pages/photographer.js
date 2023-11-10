//Mettre le code JavaScript lié à la page photographer.html
import {photographerFactory} from "/scripts/factories/photographer.js";
import {mediaFactory} from "/scripts/factories/media.js";
import {dataApi} from "/scripts/utils/dataApi.js";
import {lightboxFactory} from "/scripts/factories/lightbox.js";

const photographerHeader = document.querySelector(".photograph-header");
const main = document.querySelector("#main");

// Recuperation de l'ID
const id = parseInt(new URL(location.href).searchParams.get("id"));

const {getPhotographer, getPhotographerMedias, getPhotographerMediaLikes} = dataApi();
const { initializeLightbox } = lightboxFactory();

//////////////////////// Details of photographer ////////////////////////
async function displayPhotographerDetails() {
    // Recuperation du photographe
    let photographer = await getPhotographer(id);

    // Generation DOM
    let photographerCardDom = photographerFactory(photographer).getUserPageDOM();
    let insertDom = photographerFactory(photographer).getInsertDOM();

    // Affichage
    photographerHeader.append(photographerCardDom);
    main.append(insertDom);
}

//////////////////////// Medias ////////////////////////
async function displayPhotographerMedias() {
    // Recuperation des media du photographer
    let medias = await getPhotographerMedias(id);

    // Affichage des medias
    await displayMedias(medias)
}

async function initFilter() {
    // Récupère la liste des médias du photographe
    let medias = await getPhotographerMedias(id);
    // Récupère l'élément HTML pour le sélecteur de filtre
    let selectFilter = document.getElementById('media_filter');
    // selectFilter.setAttribute("aria-label", "Sélecteur de filtre des médias");
    // selectFilter.setAttribute("tabindex", "6");

    // Lorsque le filtre est modifié
    selectFilter.addEventListener('change', async function () {
        // Récupère la valeur du filtre sélectionné
        let filter = selectFilter.value
        // Applique le filtre sur la liste des médias
        medias = await filterMedia(medias, filter)

        // Affiche les médias filtrés
        await displayMedias(medias)
    })
}

async function filterMedia(medias, filter) {
    switch (filter) {
        case 'date':
            // Trie les médias par date
            medias.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date)
            })
            break;
        case 'title':
            // Trie les médias par titre
            medias.sort(function (a, b) {
                if (a.title < b.title) { return -1; }
                if (a.title > b.title) { return 1; }
                return 0;
            })
            break;
        default:
            // Trie les médias par nombre de likes
            medias.sort(function (a, b) {
                return b.likes - a.likes
            })
    }

    return medias;
}

async function displayMedias(medias) {
    // Generation DOM
    let mediaContent = document.querySelector(".medias_section");
    mediaContent.innerHTML = ""

    for (const [index, media] of medias.entries()) {
        const mediaFact = await mediaFactory(index, media)

        let mediaCardDom = mediaFact.getMediaCardDOM();
        mediaContent.append(mediaCardDom);
    }

    main.append(mediaContent);

    //Récupère le nombre total des likes des médias du photographe
    let totalLikes = await getPhotographerMediaLikes(id);

    // Affichage du total des likes dans la page web
    let likesContent = document.querySelector(".insert");

    let likesDiv = document.querySelector('.insert-likes');

    // Si la class likesDiv existe, alors supprime sinon on la crée pour mettre à jour l'encart
    if (likesDiv){
        likesDiv.remove()
    }

    likesDiv = document.createElement("div");
    likesDiv.classList.add("insert-likes")

    likesDiv.innerHTML = "<i class='fa-solid fa-heart'></i>"

    let pLikes = document.createElement("p");
    pLikes.classList.add("numb-likes")
    pLikes.textContent = totalLikes;

    likesDiv.appendChild(pLikes);
    likesContent.appendChild(likesDiv);

    // Initialisation du lightbox
    initializeLightbox()
}

async function init() {
    // Afficher les details du photographer
    await displayPhotographerDetails();

    // Afficher les medias
    await displayPhotographerMedias();

    // Filtre
    await initFilter();
}

// Initialisation
init().then(() => {
});
