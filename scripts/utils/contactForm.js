// Exportation de la fonction openCloseFormContact
export const openCloseFormContact = () => {
    // Sélection du bouton de contact
    const contactBtn = document.querySelector(".contact_button");
    // Sélection de la modale de contact
    const contactModal = document.querySelector("#contact_modal");
    // Sélection du bouton de fermeture de la modale
    const closeModal = document.querySelector(".close-modal");
  
    // Ajout d'un écouteur d'événement au bouton de contact pour afficher la modale
    contactBtn.addEventListener("click", () => {
      contactModal.style.display = "flex";
      closeModal.focus(); // Mise au focus du bouton de fermeture
    });
  
    // Ajout d'un écouteur d'événement au bouton de fermeture pour masquer la modale
    closeModal.addEventListener("click", () => contactModal.style.display = "none");
  };
  

// Exportation de la fonction validateForm
export const validateForm = () => {
    // Sélection du formulaire dans la modale
    const form = document.querySelector('#contactForm');
    // Sélection des champs du formulaire
    const Prenom = document.querySelector("#prenom");
    const Nom = document.querySelector("#nom");
    const email = document.querySelector("#email");
    const message = document.querySelector("#message");
  
    // Ajout d'un écouteur d'événement 'input' pour chaque modification dans le formulaire
    form.addEventListener('input', () => displayCustomMessage());
  
    // Ajout d'un écouteur d'événement 'submit' pour gérer la soumission du formulaire
    form.addEventListener('submit', e => {
      e.preventDefault(); // Empêche l'envoi par défaut du formulaire
      // Si le formulaire n'est pas valide, affiche les messages d'erreur
      if (!form.checkValidity()) displayCustomMessage();
      else {
        // Si le formulaire est valide, crée un objet contenant les données du formulaire
        const formDatas = {
          Prenom: Prenom.value,
          Nom: Nom.value,
          email: email.value,
          message: message.value,
        };
        console.log(JSON.stringify(formDatas)); // Affiche les données dans la console (peut être remplacé par un envoi à un serveur)
        // Réinitialise les champs du formulaire
        document.querySelectorAll('.formField').forEach(input => input.classList.remove('valid'));
        form.reset();
      }
    });
  
    // Fonction pour vérifier la validité d'un champ donné
    const checkInputValidity = (input, regex) => {
      const errorMessage = input.dataset.error; // Message d'erreur personnalisé
      const messageProvider = input.nextElementSibling; // Élément pour afficher le message d'erreur
      const isValid = regex.test(input.value); // Vérifie la valeur du champ par rapport au regex
  
      if (isValid) {
        messageProvider.innerHTML = ""; // Efface le message d'erreur
        messageProvider.removeAttribute("role");
        input.removeAttribute("aria-invalid");
      } else {
        messageProvider.innerHTML = errorMessage; // Affiche le message d'erreur
        messageProvider.setAttribute("role", "alert");
        input.setAttribute("aria-invalid", "true");
      }
  
      input.classList.toggle('invalid', !isValid); // Ajoute/enlève la classe 'invalid' en fonction de la validité
      input.classList.toggle('valid', isValid); // Ajoute/enlève la classe 'valid' en fonction de la validité
    };
  
    // Fonction pour afficher les messages d'erreur personnalisés pour chaque champ
    const displayCustomMessage = () => {
      // Définition des regex pour la validation des champs
      const regexName = /^([A-Za-z|\s]{3,15})?([-]{0,1})?([A-Za-z|\s]{3,15})$/;
      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const regexMessage = /^[A-Za-z0-9|\s]{10,100}$/;
  
      // Vérification de la validité de chaque champ
      checkInputValidity(Nom, regexName);
      checkInputValidity(Prenom, regexName);
      checkInputValidity(email, regexEmail);
      checkInputValidity(message, regexMessage);
    };
  };
  