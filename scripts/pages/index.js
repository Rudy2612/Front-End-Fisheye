import { fetchData } from "../utils/fetchData.js";

// Import factory
import photographerFactory from "../factories/photographer.js"



//  ------- Création des cartes des photographes sur la page d'accueil -------
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    // Pour tous les photographe, on fait appel à la factory pour générer une vignette
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getPhotographerCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};


// Function lancé à l'affichage de la page
async function init() {
    // Récupère les datas des photographes via la fonction fetch et affiche les vignettes photographes
    const { photographers } = await fetchData("../data/photographers.json")
    displayData(photographers);
};

init();

