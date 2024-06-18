export function displayModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    // modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Empêche le défilement de l'arrière-plan
}

// export function closeModal() {
//     const modal = document.getElementById('contact_modal');
//     modal.setAttribute('aria-hidden', 'true');
//     modal.style.display = 'none';
// }

export function closeModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto'; // Réactive le défilement de l'arrière-plan
}

// Ajouter un écouteur d'événement pour ouvrir le modal de contact
document.getElementById('contactButton').addEventListener('click', displayModal);

// Ajouter un écouteur d'événement pour soumettre le formulaire
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Ajoutez ici la logique pour gérer l'envoi du formulaire
    alert('Message envoyé !');
    closeModal();
});