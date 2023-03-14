export default function formFactory(titleForm) {

    // Modal <dialog> du formulaire
    let modalDOM = document.getElementById('contact_modal')

    // Ouvrir le formulaire
    function openModal() {
        modalDOM.show()
        modalDOM.ariaHidden = "false"

        document.body.addEventListener('focus', accessibilityFocus, true)
    }

    // Fermer le formulaire
    function closeModal() {
        document.body.removeEventListener('focus', accessibilityFocus, true)
        modalDOM.close()
        modalDOM.ariaHidden = "true"
    }

    // Fonction pour garder le focus dans le modal dialog
    function accessibilityFocus(element) {
        let modalNodes = modalDOM.getElementsByTagName('*')
        let isInclude = Array.from(modalNodes).filter((e) => e.isEqualNode(element.target))
        console.log(element.target)
        if (isInclude.length === 0)
            document.getElementById('contact-firstName').focus()
    }



    //  ------- Function pour tester les entrées -------
    function checkMinLength(string, length) {
        if (string.length >= length)
            return true;
        return false;
    }

    function validateEmail(email) {
        var regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regexEmail.test(email);
    }

    // Fonction innerText pour écrire une erreur pour un champ donné
    function writeError(id, message) {
        document.getElementById(id).innerText = message
    }



    //  ------- Function éxécutée à la soumission du formulaire -------
    function submit(e) {

        e.preventDefault();

        var firstName = document.getElementById('contact-firstName').value;
        var lastName = document.getElementById('contact-lastName').value;
        var email = document.getElementById('contact-email').value;
        var message = document.getElementById('contact-message').value;

        if (checkMinLength(firstName, 1) && checkMinLength(lastName, 1) && validateEmail(email) && checkMinLength(message, 10)) {
            console.log(firstName, lastName, email, message)
            return true
        }
        else {
            // Écriture des erreurs du formulaire
            if (!checkMinLength(firstName, 1))
                writeError('error-firstName', "Veuillez renseignez le champs");

            if (!checkMinLength(lastName, 1))
                writeError('error-lastName', "Veuillez renseignez le champs");

            if (!validateEmail(email))
                writeError('error-email', "Le format de l'email n'est pas correct.");

            if (!checkMinLength(email))
                writeError('error-message', "Veuillez renseigner un message");

            return false
        }

    }




    //  ------- Function de test pour les champs de text -------

    function eventListenerFormLength(id, length, idError, error) {
        document.getElementById(id).addEventListener('input', (e) => {
            if (!checkMinLength(e.target.value, length))
                writeError(idError, error);
            else
                writeError(idError, "");
        })
    }

    function eventListenerFormEmail(id, idError, error) {
        document.getElementById(id).addEventListener('input', (e) => {
            if (!validateEmail(e.target.value))
                writeError(idError, error);
            else
                writeError(idError, "");
        })
    }



    //  ------- Function éxécutée à l'instanciation de la factory -------
    
    function init() {
        // Créer un titre personnalisé sur la modal portant le nom du photographe
        var title = document.getElementById('title-form');
        title.innerHTML = titleForm;

        // Créer les éventListener sur les champs du formulaire
        eventListenerFormLength('contact-firstName', 1, 'error-firstName', 'Veuillez renseignez le champs');
        eventListenerFormLength('contact-lastName', 1, 'error-lastName', 'Veuillez renseignez le champs');
        eventListenerFormEmail('contact-email', 'error-email', 'Le format de l\'email n\'est pas correct.');
        eventListenerFormLength('contact-message', 10, 'error-message', 'Veuillez renseigner un message de plus de 10 caractères');

    }

    init()

    return ({ openModal, closeModal, submit, checkMinLength, validateEmail, writeError })
}