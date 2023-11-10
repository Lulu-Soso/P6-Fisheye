export function photographerFactory(data) {
  const { id, name, portrait, city, tagline, price } = data;

  const mediaPath = name.replace(/ /g, '-')

  const picture = `assets/medias/${mediaPath}/${portrait}`;
  const photographerId = `photographer.html?id=${id}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const a = document.createElement("a");
    (a.href = photographerId), (a.title = name);
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const dataCity = document.createElement("h4");
    dataCity.textContent = city;
    const dataTagline = document.createElement("p");
    dataTagline.textContent = tagline;
    const dataPrice = document.createElement("span");
    dataPrice.textContent = price + "€/jour";

    article.appendChild(a);
    a.appendChild(img);
    a.appendChild(h2);
    article.appendChild(dataCity);
    article.appendChild(dataTagline);
    article.appendChild(dataPrice);

    return article;
  }

  function getUserPageDOM() {
    const article = document.createElement("article");
    const contactHeader = document.querySelector(".modal");

    const modalButton = document.createElement("button")
    modalButton.classList.add("contact_button")
    modalButton.innerHTML= "Contactez-moi"
    modalButton.setAttribute("aria-label", "bouton ouverture du formulaire de contact")
    modalButton.setAttribute("id", "modal-button")
    modalButton.setAttribute("role", "button")
    modalButton.onclick = window.displayModal;

    const h3 = document.createElement("h3");
    h3.textContent = name;
    const div = document.createElement("div");
    div.classList.add("infos-photographer");
    const divInfosPhotographer = div;

    const a = document.createElement("a");
    (a.href = "#"), (a.title = name), (a.ariaLabel = "image du photographe");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("aria-label", "image du photographe")
    img.setAttribute("alt", "image du  photographe")

    const h2 = document.createElement("h2");
    h2.ariaLabel = "nom du photographe";
    h2.textContent = name;
    const dataCity = document.createElement("h4");
    dataCity.textContent = city;
    const dataTagline = document.createElement("p");
    dataTagline.textContent = tagline;

    article.appendChild(divInfosPhotographer);
    article.appendChild(modalButton);
    article.appendChild(a);
    a.appendChild(img);

    divInfosPhotographer.appendChild(h2);
    divInfosPhotographer.appendChild(dataCity);
    divInfosPhotographer.appendChild(dataTagline);
    contactHeader.appendChild(h3);

    return article;
  }

  function getInsertDOM() {
    const insertContent = document.createElement("div");
    insertContent.classList.add("insert");
    const dataPrice = document.createElement("p");
    dataPrice.textContent = price + "€/jour";

    insertContent.appendChild(dataPrice);

    return insertContent;
  }

  return {
    id,
    name,
    picture,
    city,
    tagline,
    price,
    getUserCardDOM,
    getUserPageDOM,
    getInsertDOM,
  };
}