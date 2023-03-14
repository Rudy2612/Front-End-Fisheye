
// Filtrer les medias par nombre de likes
function filterByLikes(medias) {
    medias.sort((a, b) => (a.likes > b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0))
    return medias
}

// Filtrer les medias par date
function filterByDate(medias) {
    medias.sort((a, b) => (new Date(a.date) > new Date(b.date)) ? 1 : ((new Date(b.date) > new Date(a.date)) ? -1 : 0))
    return medias

}

// Filtrer les medias par titre
function filterByTitle(medias) {
    medias.sort((a, b) => {
        if (a.title < b.title) { return -1; }
        if (a.title > b.title) { return 1; }
        return 0;
    })
    return medias;
}


export { filterByLikes, filterByDate, filterByTitle }