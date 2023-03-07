
let lightbox = document.getElementById('lightbox-modal')

let medias = ''

function openLightbox(data, position) {

    lightbox.show()
    lightbox.ariaHidden = "false"

    medias = data

    displayMediaLightbox(data, position)

    document.addEventListener('keyup', listenerKey) // navigation clavier
    document.body.addEventListener('focus', accessibilityFocus, true) // focus blocked modal
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox)
    document.getElementById('lightbox-next').addEventListener('click', nextSlide)
    document.getElementById('lightbox-previous').addEventListener('click', previousSlide)
}


function closeLightbox() {
    lightbox.close()
    lightbox.ariaHidden = "true"

    document.removeEventListener('keyup', listenerKey)
    document.body.removeEventListener('focus', accessibilityFocus, true)
    document.getElementById('lightbox-close').removeEventListener('click', closeLightbox)
    document.getElementById('lightbox-next').removeEventListener('click', nextSlide)
    document.getElementById('lightbox-previous').removeEventListener('click', previousSlide)
}



function accessibilityFocus(element) {
    let modalNodes = lightbox.getElementsByTagName('*')
    console.log(modalNodes)
    let isInclude = Array.from(modalNodes).filter((e) => e.isEqualNode(element.target))
    if (isInclude.length === 0)
        document.getElementById('lightbox-next').focus()
}


function listenerKey(e) {
    switch (e.key) {
        case 'ArrowRight':
            nextSlide();
            break;
        case 'ArrowLeft':
            previousSlide();
            break;
        case 'Escape':
            closeLightbox();
            break;
    }
}


function nextSlide() {
    let current_position = Number(document.querySelector('.lightbox-img').dataset.current_position);
    if (current_position + 1 < medias.length) {
        displayMediaLightbox(medias, current_position + 1)
    }
    else {
        displayMediaLightbox(medias, 0)
    }
}

function previousSlide() {
    let current_position = Number(document.querySelector('.lightbox-img').dataset.current_position);
    if (current_position - 1 >= 0) {
        displayMediaLightbox(medias, current_position - 1)
    }
    else {
        displayMediaLightbox(medias, medias.length - 1)
    }
}



function displayMediaLightbox(medias, position) {

    let lightboxContent = document.getElementById('lightbox-content')
    lightboxContent.innerHTML = ""

    let media = medias[position]

    if (media.image) {
        let img = document.createElement('img')
        img.tabIndex = 2
        img.classList.add('lightbox-img')
        img.setAttribute('data-current_position', position)
        img.setAttribute('src', `assets/images/${media.image}`);
        img.alt = media.image.replaceAll('_', " ").replaceAll('.jpg', "");

        let h2 = document.createElement('h2');
        h2.innerText = media.title;
        h2.classList.add('lightbox-title');

        lightboxContent.append(img)
        lightboxContent.append(h2)
    }
    else {
        let video = document.createElement('video')
        video.tabIndex = 2
        video.classList.add('lightbox-img');
        video.setAttribute('controls', true)
        video.setAttribute('data-current_position', position)
        video.setAttribute('src', `assets/images/${media.video}`);
        video.alt = media.video.replaceAll('_', " ").replaceAll('.mp4', "");
        video.play()

        let h2 = document.createElement('h2');
        h2.innerText = media.title;
        h2.classList.add('lightbox-title');

        lightboxContent.append(video)
        lightboxContent.append(h2)
    }

}

export { openLightbox, closeLightbox, displayMediaLightbox }