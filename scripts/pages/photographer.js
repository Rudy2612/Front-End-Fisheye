import { fetchData } from "../utils/fetchData.js";

import { filterByLikes, filterByDate, filterByTitle } from "../utils/filter.js"
import { openLightbox } from "../utils/lightbox.js"
import { likeIncrement } from "../utils/likes.js"

// Import factory
import photographerFactory from "../factories/photographer.js"
import formFactory from "../factories/form.js"
import mediaFactory from "../factories/media.js"

// Variables globales accessible pour toutes les fonctions
let medias = []
let photographer = []



//  ------- Récupération des informations du photographe -------
async function getData() {
    // Récupération de l'ID photographe dans les pramètres de l'url
    var idPhotographer = (new URL(window.location.href)).searchParams.get('id');
    var data = await fetchData("../data/photographers.json");

    let photographerInformations = data.photographers.find((element) => element.id === Number(idPhotographer));
    let media = data.media.filter((element) => element.photographerId === Number(idPhotographer));

    // Assigne aux variables globales les informations et créations du photographe
    medias = media;
    photographer = photographerInformations;
}


//  ------- Affichage du bandeau avec les informations -------
function displayHeader(photographer) {
    const photographersHeader = document.querySelector(".photograph-header");

    // Appel à la factory Photographer pour générer les nodes list à afficher
    const photographerModel = photographerFactory(photographer);

    // Retourne 2 node (noms et photo), à implémenter en 2 fois dans le header
    const photographerHeaderPart = photographerModel.createPhotographerHeader();
    photographersHeader.prepend(photographerHeaderPart.div_name)
    photographersHeader.append(photographerHeaderPart.div_img)
}


//  ------- Affichage des medias via la factory et fonction de trie + init les likes -------
function displayMedias(filter) {

    // Instanciation factory media
    const mediaModel = mediaFactory(medias);

    // Container des medias
    const pictureContainer = document.querySelector("#pictures-list");

    /* Ajout des cartes sur le dom via factory */
    var mediaDOM = mediaModel.getMediaCardDOM(filter(medias));
    pictureContainer.append(mediaDOM);

    /* Mise à jour de la variable globale en fonction du trie en paramètre */
    medias = filter(medias)

    /* Initiation incrémentation des likes sur les posts */
    document.querySelectorAll('.media-heart').forEach((element) => {
        element.addEventListener('click', (event) => {
            let id = event.target.id;
            medias = likeIncrement(id, medias)
            setInformations(photographer, medias);
        })
    })

    // Gérer l'ouverture de la lightbox lors d'un clic sur un media
    lightboxListener(filter(medias))

}


//  ------- Function pour gérer le formulaire -------
function formListener(photographer) {

    // Instanciation de la factory avec la phrase personnalisé a afficher en haut du formulaire avec nom du photographe
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
        e.preventDefault();

        if (formModel.submit(e) === true) {
            console.log('Formulaire envoyé')
        }
        else {
            console.log('Erreur dans le formulaire');
        }

    })
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

    // Selection du conteneur de media et du select des filtres
    const pictureContainer = document.querySelector("#pictures-list");
    var filter_selector = document.getElementById('filter-select');

    // Event listener filtre pour effectuer le trie des medias
    filter_selector.addEventListener('change', (event) => {

        // Supprime toutes les vignettes de photos
        pictureContainer.innerHTML = ""

        // Affiche tous les medias du photographe en fonction du filtre choisi
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

// Fonction éxécuté au lancement de la page
async function init() {

    // Récupération des informations du photographe sélectionné
    await getData();

    // Affichage des informations du photographe dans l'entête
    displayHeader(photographer);

    // Afficher les medias du photographe
    displayMedias(filterByLikes);

    // Gérer le formulaire de contact 
    formListener(photographer);

    // Gérer le trie des vignettes
    filterListener();

    // Ajout des informations du photographe (prix et likes totaux) dans le bandeau pied de page
    setInformations(photographer, medias);


};



init();