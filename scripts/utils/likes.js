function likeIncrement(id, data) {

    let medias = data;

    medias.forEach((media) => {
        if (media.id === Number(id)) {
            media.likes = media.likes + 1;
            event.target.innerText = Number(event.target.textContent) + 1;
        }
    })

    document.getElementById(`like-text-${id}`).innerText = Number(document.getElementById(`like-text-${id}`).innerText) + 1

    return medias;
}

export { likeIncrement }