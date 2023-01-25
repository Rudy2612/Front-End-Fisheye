import { fetchData } from "../utils/fetchData.js";



// Créer les cartes des photographes sur la page d'accueil
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getPhotographerCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};


async function init() {

    // Récupère les datas des photographes via la fonction fetch
    const { photographers } = await fetchData("../data/photographers.json")
    displayData(photographers);

};

init();

