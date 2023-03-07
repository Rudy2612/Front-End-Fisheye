import { fetchData } from "../utils/fetchData.js";

import { openLightbox, closeLightbox, displayMediaLightbox } from "../utils/lightbox.js"

let medias = []
let photographer = []


//  ------- Fetch le fichier et récupération des informations et médias -------
async function getData() {
    var idPhotographer = (new URL(window.location.href)).searchParams.get('id');
    var data = await fetchData("../data/photographers.json");

    let photographerInformations = data.photographers.find((element) => element.id === Number(idPhotographer));
    let media = data.media.filter((element) => element.photographerId === Number(idPhotographer));

    medias = media;
    photographer = photographerInformations;
}


//  ------- Affichage du bandeau avec les informations -------
function displayHeader(photographer) {
    const photographersHeader = document.querySelector(".photograph-header");
    const photographerModel = photographerFactory(photographer);
    // Retourne 2 node (noms et photo), à implémenter en 2 fois dans le header
    const photographerHeaderPart = photographerModel.createPhotographerHeader();
    photographersHeader.prepend(photographerHeaderPart.div_name)
    photographersHeader.append(photographerHeaderPart.div_img)
}


//  ------- Function pour gérer le formulaire -------
function formListener(photographer) {
    let formModel = formFactory("Contactez-moi \n" + photographer.name);


    // Ouvrir le formulaire (bouton contact)
    document.getElementById('contact-openForm').addEventListener('click', () => formModel.openModal())

    // Fermer le formulaire (clic croix sur le modal)
    document.getElementById('contact-closeForm').addEventListener('click', () => formModel.closeModal())

    // Fermer le formulaire (entrer croix sur le modal)
    document.getElementById('contact-closeForm').addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            formModel.closeModal()
        }
    })

    // Submission du formulaire
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault()
        if (formModel.submit(e) === true) {
            console.log('Formulaire envoyé')
        }
        else {
            console.log('Erreur dans le formulaire');
        }
    })
}



//  ------- Affichage des medias via la factory et fonction de trie + init les likes -------
function displayMedias(filter) {

    // Ajout factory media
    const mediaModel = mediaFactory(medias);

    // Container des medias
    const pictureContainer = document.querySelector("#pictures-list");

    /* Ajout des cartes sur le dom via factory */
    var mediaDOM = mediaModel.getMediaCardDOM(filter(medias));
    pictureContainer.append(mediaDOM);

    /* Mise à jour de la variable globale en fonction du trie */
    medias = filter(medias)


    /* Initiation des likes sur les posts*/
    document.querySelectorAll('.media-heart').forEach((element) => {
        element.addEventListener('click', (event) => {
            let id = event.target.id;
            medias = likeIncrement(id, medias)
            setInformations(photographer, medias);
        })
    })


    lightboxListener(filter(medias))


}



//  ------- Gérer la navigation sur la lightbox -------
function lightboxListener(data) {

    // Ouverture de la lightbox en cliquand sur une image
    document.querySelectorAll('.media-img').forEach((element) => {
        element.addEventListener('click', (event) => {
            var position = event.target.dataset.media_position;
            openLightbox(data, position)
        })
        element.addEventListener('keypress', (e) => {
            if (e.key === "Enter") {
                var position = event.target.dataset.media_position;
                openLightbox(data, position)
            }
        })
    })

}




//  ------- Function pour le select des filtres -------
function filterListener() {

    const pictureContainer = document.querySelector("#pictures-list");

    var filter_selector = document.getElementById('filter-select');

    // Clique pour effectuer un trie sur les choix
    filter_selector.addEventListener('change', (event) => {
        console.log(event.target.value)

        // Supprime toutes les vignettes de photos
        pictureContainer.innerHTML = ""

        switch (event.target.value) {
            case "Date":
                displayMedias(filterByDate)
                break;
            case "Popularité":
                displayMedias(filterByLikes)
                break;
            case "Titre":
                displayMedias(filterByTitle)
                break;
        }
    })

}





//  ------- Function pour afficher les informations prix du photographe -------
function setInformations(photographer, medias) {
    // Afficher le tarrif d'un photographe
    let phrase = photographer.price + '€/jour'
    document.getElementById('photograph-price').innerText = phrase


    var likes = 0
    medias.forEach(e => likes = likes + e.likes)
    document.getElementById('photograph-likes').innerText = likes

}

async function init() {

    await getData();

    displayHeader(photographer);

    // Display media, filter by Likes is default for dropdown filter
    displayMedias(filterByLikes);

    formListener(photographer);
    filterListener();

    setInformations(photographer, medias);


};



init();