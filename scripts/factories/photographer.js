function photographerFactory(photographer) {

    const { id, name, portrait, city, country, tagline, price } = photographer;

    const picture = `assets/photographers/${portrait}`;

    function getPhotographerCardDOM() {
        const article = document.createElement('article');

        const a = document.createElement('a');
        a.href = `photographer.html?id=${id}`;
        a.ariaLabel = `Photographe ${name}`;
        article.appendChild(a);

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        a.appendChild(img);

        const h2 = document.createElement('h2');
        h2.textContent = name;
        a.appendChild(h2);

        const container = document.createElement('div');

        const localisation = document.createElement('p')
        localisation.innerText = city + ", " + country
        localisation.classList.add('photographer_localisation')
        container.appendChild(localisation)

        const bio = document.createElement('p')
        bio.innerText = tagline
        bio.classList.add('photographer_bio')
        container.appendChild(bio)

        const budget = document.createElement('p')
        budget.innerText = price + "€/jour"
        budget.classList.add('photographer_budget')
        container.appendChild(budget)

        article.appendChild(a);
        article.appendChild(container);

        return (article);
    }

    // Fonction pour créer l'entête de la page
    function createPhotographerHeader() {
        const div_name = document.createElement('div');
        div_name.classList.add('photograph-header-name')
        const h1_name = document.createElement('h1');
        h1_name.innerText = name;
        div_name.appendChild(h1_name);
        const h2_country = document.createElement('h2');
        h2_country.innerText = `${city}, ${country}`;
        div_name.appendChild(h2_country);
        const p_name = document.createElement('p');
        p_name.innerText = tagline;
        div_name.appendChild(p_name);


        const div_img = document.createElement('div');
        div_img.classList.add('photograph-header-picture')

        const img = document.createElement('img');
        img.setAttribute('src', picture)
        img.alt = name
        div_img.appendChild(img);

        return ({ div_name, div_img });
    }

    return { name, picture, getPhotographerCardDOM, createPhotographerHeader }
}