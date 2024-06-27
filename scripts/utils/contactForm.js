// Ajouter un écouteur d'événement pour ouvrir le modal de contact
document.querySelector('.contact_button').addEventListener('click', () => {
  const photographerName = document.querySelector('.contact_button').dataset.photographerName;
  displayModal(photographerName);
});

// Ajouter un écouteur d'événement pour fermer le modal de contact
document.querySelector('.close-modal').addEventListener('click', closeModal);

export function displayModal(photographerName) {
  const modal = document.getElementById('contact_modal');
  const modalTitle = document.getElementById('photographer-name');

  if (modal && modalTitle) {
      // Met à jour le titre du modal avec le nom du photographe
      modalTitle.textContent = photographerName;
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Empêche le défilement de l'arrière-plan
  }    
}

export function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto'; // Réactive le défilement de l'arrière-plan
}

// Formulaire querySelector("#identifiant")
const form = document.querySelector('form');
const prenom = document.querySelector('#prenom');
const nom = document.querySelector('#nom');
const email = document.querySelector('#email');
const messagePourPhotographe = document.querySelector('#message');

// Regex Règles de validation
const regexNom = /^([A-Za-zÀ-ÿ|\s]{2,15})?([-]{0,1})?([A-Za-zÀ-ÿ|\s]{2,15})$/;
const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexMessagePourPhotographe = /^.{10,100}$/;

// Les messages d'erreurs
const message = {
MessPrenom: 'Veuillez entrer plus de 2 caractères',
MessNom: 'Veuillez entrer plus de 2 caractères',
MessEmail: 'Veuillez renseigner une adresse mail valide.',
MessMessagePourPhotographe: 'Vous devez entre 10 et 100 caractères.',
};

// // Ajouter un écouteur d'événement pour soumettre le formulaire
// document.getElementById('contactForm').addEventListener('submit', function(event) {
//   event.preventDefault();
//   alert('Message envoyé !');
//   closeModal();
// });

// Customize les erreurs
const setErrorMessage = (element, message) => {
  element.parentElement.setAttribute('data-error-visible', 'true');
  element.parentElement.setAttribute('data-error', message);
}

const hideErrorMessage = element => {
  element.parentElement.setAttribute('data-error-visible', '');
  element.parentElement.setAttribute('data-error', '');
}

function checkInputValue(regex, element, message) {
  if (!regex.test(element.value)) {
      setErrorMessage(element, message);
      return false;
  }
  hideErrorMessage(element);
  return true; 
}

// Vérifie les entrées avec l'écouteur d'événements
prenom.addEventListener('input', () => checkInputValue(regexNom, prenom, message.MessPrenom));
nom.addEventListener('input', () => checkInputValue(regexNom, nom, message.MessNom));
email.addEventListener('input', () => checkInputValue(regexEmail, email, message.MessEmail));
messagePourPhotographe.addEventListener('input', () => checkInputValue(regexMessagePourPhotographe, messagePourPhotographe, message.MessMessagePourPhotographe));

// Validation du formulaire
function validate(evenement) {
  evenement.preventDefault();

  try {
      const EmailOk = checkInputValue(regexEmail, email, message.MessEmail);
      const NomOk = checkInputValue(regexNom, nom, message.MessNom);
      const PrenomOk = checkInputValue(regexNom, prenom, message.MessPrenom);
      const MessageOk = checkInputValue(/^.{10,100}$/, messagePourPhotographe, message.MessMessagePourPhotographe);

      if (PrenomOk && NomOk && EmailOk && MessageOk) {
        console.log(prenom.value);
        console.log(nom.value);
        console.log(email.value);
        console.log(messagePourPhotographe.value);
        alert('Message envoyé !');
        form.reset();
        closeModal();
      }
  } catch(error) {
      console.error('Une erreur s\'est produite lors de la validation du formulaire :', error);
  }
}

form.addEventListener('submit', validate);

// form.addEventListener('submit', e => validate(e));
