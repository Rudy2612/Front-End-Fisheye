export default function mediaFactory(media) {

    //  ------- Création des vignette de media avec affichage titre et likes -------
    function getMediaCardDOM(media) {
        const div = document.createElement('div');
        div.classList.add('media-container');
        
        // Pour chaque médias, créer une vignette
        for (var i = 0; i < media.length; i++) {
            const divMedia = document.createElement('div');
            divMedia.classList.add('media-item');
            if (media[i].image) {
                const img = document.createElement('img');
                img.tabIndex = 10 + i;
                img.classList.add('media-img');
                img.setAttribute('data-media_position', i)
                img.setAttribute('aria-controls', "modal")
                img.setAttribute('src', `assets/images/${media[i].image.replaceAll(' ', '_')}`);
                img.alt = media[i].image.replaceAll('_', " ").replaceAll('.jpg', "");
                divMedia.append(img);
            }
            else {
                const video = document.createElement('video');
                video.tabIndex = 10 + i;
                video.classList.add('media-img');
                video.setAttribute('data-media_position', i)
                video.setAttribute('aria-controls', "modal")
                video.setAttribute('src', `assets/images/${media[i].video}`);
                video.alt = media[i].video.replaceAll('_', " ").replaceAll('.mp4', "");
                divMedia.append(video);
            }
            const mediaInfo = document.createElement('div');
            mediaInfo.classList.add('media-info');

            const mediaTitle = document.createElement('p');
            mediaTitle.classList.add('media-title');
            mediaTitle.innerText = media[i].title;
            mediaInfo.append(mediaTitle);

            const likeSection = document.createElement('div');
            const likeText = document.createElement('p');
            likeText.classList.add('media-likes');
            likeText.id = "like-text-" + media[i].id;
            likeText.innerText = media[i].likes;
            likeSection.append(likeText);

            const imgHeart = document.createElement('img')
            imgHeart.src = "../../assets/icons/heart.png"
            imgHeart.alt = "likes"
            imgHeart.id = media[i].id;
            imgHeart.classList.add('media-heart');
            likeSection.append(imgHeart);

            mediaInfo.append(likeSection);
            divMedia.append(mediaInfo);

            div.appendChild(divMedia);
        }

        // Return liste de plusieurs vignettes
        return div;
    }


    return { getMediaCardDOM }
}