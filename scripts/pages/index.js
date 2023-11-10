import { photographerFactory } from "/scripts/factories/photographer.js";
import { dataApi } from "/scripts/utils/dataApi.js";

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const { getPhotographers } = dataApi();
  const photographers = await getPhotographers();

  await displayData(photographers);
}

init().then(() => {});
