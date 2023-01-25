function photographerFactory(photographer) {

    const { id, name, portrait, city, country, tagline } = photographer;

    const picture = `assets/photographers/${portrait}`;

    function getPhotographerCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        const a = document.createElement('a')
        a.href = `photographer.html?id=${id}`
        article.appendChild(a)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        a.appendChild(img);
        a.appendChild(h2);
        return (article);
    }

    // Fonction pour créer l'entête de la page
    function createPhotographerHeader() {
        const div_name = document.createElement('div');
        div_name.classList.add('photograph-header-name')
        const h1_name = document.createElement('h1');
        h1_name.innerText = name;
        div_name.appendChild(h1_name);
        const h2_name = document.createElement('h2');
        h2_name.innerText = `${city}, ${country}`;
        div_name.appendChild(h2_name);
        const p_name = document.createElement('p');
        p_name.innerText = tagline;
        div_name.appendChild(p_name);


        const div_img = document.createElement('div');
        div_img.classList.add('photograph-header-picture')

        const img = document.createElement('img');
        img.setAttribute('src', picture)
        div_img.appendChild(img);

        return ({ div_name, div_img });
    }

    return { name, picture, getPhotographerCardDOM, createPhotographerHeader }
}