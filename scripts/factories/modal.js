function modalFactory(id) {

    function openModal() {
        const modal = document.getElementById(id);
        modal.style.display = "block";
    }

    function closeModal() {
        const modal = document.getElementById(id);
        modal.style.display = "none";
    }


    return ({ openModal, closeModal })

}

//contact_modal