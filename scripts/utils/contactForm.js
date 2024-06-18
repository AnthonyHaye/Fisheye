// Fonction pour afficher le modal de contact
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

// Fonction pour fermer le modal de contact
export function closeModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto'; // Réactive le défilement de l'arrière-plan
}

// Ajouter un écouteur d'événement pour soumettre le formulaire
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Ajoutez ici la logique pour gérer l'envoi du formulaire
    alert('Message envoyé !');
    closeModal();
});

// Ajouter un écouteur d'événement pour ouvrir le modal de contact
document.querySelector('.contact_button').addEventListener('click', displayModal);

// Ajouter un écouteur d'événement pour fermer le modal de contact
document.querySelector('.close-modal').addEventListener('click', closeModal);
