// Écouteur d'événements global sur le document pour détecter les appuis clavier
document.addEventListener('keydown', function(event) {

  // Si l'utilisateur appuie sur la flèche droite
  if (event.key === 'ArrowRight') {
    // On cherche le lien "Suivant" dans la pagination
    const nextBtn = document.querySelector('.pagination .arrow-right');

    // Vérifie que le bouton existe et qu'il n'est pas désactivé (classe Bootstrap "disabled")
    if (nextBtn && !nextBtn.closest('.page-item').classList.contains('disabled')) {
      // Redirige l'utilisateur vers l'URL du lien "Suivant"
      window.location.href = nextBtn.getAttribute('href');
    }
  }

  // Si l'utilisateur appuie sur la flèche gauche
  if (event.key === 'ArrowLeft') {
    // On cherche le lien "Précédent" dans la pagination
    const prevBtn = document.querySelector('.pagination .arrow-left');

    // Vérifie que le bouton existe et qu'il n'est pas désactivé
    if (prevBtn && !prevBtn.closest('.page-item').classList.contains('disabled')) {
      // Redirige l'utilisateur vers l'URL du lien "Précédent"
      window.location.href = prevBtn.getAttribute('href');
    }
  }
});
