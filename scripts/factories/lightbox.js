export function lightboxFactory() {
  // Crée un élément div avec la classe lightbox
  let currentPosition = 0;
  let medias = [];

  const lightboxDom = document.createElement("div");
  lightboxDom.classList.add("lightbox");

  function initializeLightbox() {
    // regroupe en tableau tous les médias  a href avec des extensions .png, .jpg, .jpeg, .mp4
    const links = Array.from(
      document.querySelectorAll(
        'a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".mp4"]'
      )
    );

    // récupère data-tite, href de chaque média en objet title et link
    medias = links.map((link) => {
      return {
        title: link.getAttribute("data-title"),
        link: link.getAttribute("href")
      };
    });

    // Assignation du click pour chaque lien
    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();

        // Recuperation de l'élément cliqué
        const clickedElement = e.currentTarget;

        // recuperation de la position de l'élément cliqué
        let position = parseInt(clickedElement.getAttribute("data-index"));
        // création de l'élément lightboxDom
        let lightboxDOM = buildLightboxDOM(position);
        // pour permettre la navigation avec la touche tabulation
        lightboxDom.setAttribute("tabindex", "0");
        // ajout de l'élément lightboxDom dans le DOM
        document.body.appendChild(lightboxDOM);
        //pour permettre la navigation à l'aide des touches clavier, vous pouvez ajouter un "focus" sur l'élément lightboxDom lorsqu'il est ajouté au DOM
        lightboxDOM.focus();
      })
    );

    // Assignation du click sur le clavier
    document.addEventListener("keyup", onKeyUp, true);
  }

  // Fonction qui supprime l'élément lightboxDom du DOM lorsqu'elle est appelée
  function close(e) {
    // Empêche l'événement par défaut (par exemple, l'ouverture d'un lien)
    e.preventDefault();
    // Il est également bon de retirer le focus de l'élément lightboxDom lorsque l'utilisateur ferme le lightbox
    lightboxDom.blur();
    // Supprime l'élément lightboxDom du DOM en utilisant la méthode removeChild de l'élément parent
    lightboxDom.parentElement.removeChild(lightboxDom);
  }

  // Fonction qui affiche le média précédent d'une liste de médias donnée en utilisant la fonction buildLightboxDOM
  function prev(e) {
    // Empêche l'événement par défaut (par exemple, l'ouverture d'un lien)
    e.preventDefault();
    // Affiche le média précédent en utilisant la fonction buildLightboxDOM. Si le média courant est le premier de la liste, affiche le dernier média de la liste.
    buildLightboxDOM(
      currentPosition === 0 ? medias.length - 1 : currentPosition - 1
    );
  }

  // Fonction qui affiche le média suivant d'une liste de médias donnée en utilisant la fonction buildLightboxDOM
  function next(e) {
    // Empêche l'événement par défaut (par exemple, l'ouverture d'un lien)
    e.preventDefault();
    // La condition ternaire vérifie si "currentPosition" est égal à la longueur de "medias" moins 1.
    // Si c'est vrai, la valeur passée à la fonction "buildLightboxDOM" sera 0.
    // Si c'est faux, la valeur passée à la fonction "buildLightboxDOM" sera "currentPosition" augmenté de 1.
    buildLightboxDOM(
      currentPosition === medias.length - 1 ? 0 : currentPosition + 1
    );
  }

  function onKeyUp(e) {
    // événement lorsqu'une touche est enfoncée
    switch (e.key) {
      case "ArrowLeft":
        prev(e);
        break;
      case "ArrowRight":
        next(e);
        break;
      case "Escape":
        close(e);
        break;
      default:
        return;
    }
    e.preventDefault();
  }

  // Fonction qui construit le contenu HTML de l'élément lightboxDom en fonction du média courant et de la liste de médias donnés
  function buildLightboxDOM(position) {
    let currentMedia = medias[position];

    // Récupère l'extension du fichier du média courant
    const fileExtension = currentMedia.link.split(".").pop();
    let html = `<button class="lightbox-close"><i class="fa-solid fa-close"></i></button>
              <button class="lightbox-prev"><i class="fa-solid fa-chevron-left"></i></button>
              <button class="lightbox-next"><i class="fa-solid fa-chevron-right"></i></button>
              <div class="lightbox-container">
            `;

    // Si le média courant est une vidéo au format MP4, ajoute une balise video au contenu HTML ; sinon, ajoute une image
    if (fileExtension === "mp4") {
      html += `<figure><video id="video-${position}" controls><source src="${currentMedia.link}" type="video/mp4"></video><figcaption><span>${currentMedia.title}</span></figcaption></figure>`;
    } else {
      html += `<figure><img src="${currentMedia.link}" type="image" alt=""><figcaption><span>${currentMedia.title}</span></figcaption></figure>`;
    }

    // Remplace le contenu HTML de l'élément lightboxDom par le nouveau contenu HTML
    lightboxDom.innerHTML = html;

    // Ajoute des événements qui appellent les fonctions close, prev et next lorsque l'utilisateur clique sur les boutons correspondants
    lightboxDom
      .querySelector(".lightbox-close")
      .addEventListener("click", (e) => close(e));
    lightboxDom
      .querySelector(".lightbox-prev")
      .addEventListener("click", (e) => prev(e));
    lightboxDom
      .querySelector(".lightbox-next")
      .addEventListener("click", (e) => next(e));

    // Mise à jour de la position actuelle
    currentPosition = position;

    // Gestion de la vidéo
    let video = lightboxDom.querySelector(`#video-${position}`);

    if (video) {
      document.addEventListener("keyup", function (e) {
        if (e.code === "Space") {
          if (video.paused) video.play();
          else video.pause();
        }

        e.preventDefault();
      });
    }

    // Retourne l'élément lightboxDom avec son nouveau contenu HTML et ses événements
    return lightboxDom;
  }

  // Appel de la fonction initializeLightbox pour mettre en place le lightbox
  return { initializeLightbox };
}
