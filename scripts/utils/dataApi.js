export function dataApi(){
    const URL = "data/photographers.json";

    const getData = async () => {
        let response = await fetch(URL);
        let data = await response.json();

        const dataPhotographers = [...data.photographers];
        const dataMedias = [...data.media];

        return {
            'photographers': dataPhotographers,
            'media': dataMedias
        };
    }

    const getPhotographers = async () => {
        return (await getData()).photographers;
    }

    const getMedias = async () => {
        return (await getData()).media;
    }

    const getPhotographer = async (id) => {
        return (await getPhotographers()).filter(photographer => photographer.id === id)[0];
    }

    const getPhotographerMedias = async (id) => {
        return (await getMedias()).filter(media => media.photographerId === id);
    }

    const getPhotographerMediaLikes = async (id) => {
        let totalLikes = 0;
        const medias = await getPhotographerMedias(id)

        medias.map(media => totalLikes += media.likes)

        return totalLikes;
    }

    return {
        getPhotographers,
        getPhotographer,
        getMedias,
        getPhotographerMedias,
        getPhotographerMediaLikes
    }
}