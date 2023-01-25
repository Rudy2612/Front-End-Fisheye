async function fetchData(url) {

    let photographers = []

    console.log(url)

    let response = await fetch(url);


    if (response.ok) {

        let data = await response.json();
        return data

    } else {
        console.log("HTTP-Error: " + response.status);
        return {}
    }

}

export { fetchData }