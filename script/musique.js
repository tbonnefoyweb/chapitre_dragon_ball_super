function initMusicToggle() {
  // Récupération des éléments du DOM liés à la musique
  const music = document.getElementById("bg-music");         // élément <audio> de la musique de fond
  const musicToggle = document.getElementById("music-toggle"); // bouton pour activer/désactiver la musique
  const musicIcon = document.getElementById("music-icon");     // icône indiquant l'état du volume
  const musicVolume = document.getElementById("music-volume"); // curseur pour régler le volume

  // Si l'un des éléments est introuvable, on arrête l'initialisation
  if (!music || !musicToggle || !musicIcon || !musicVolume) return;

  // Variable indiquant si la musique est coupée manuellement par l'utilisateur
  let isMutedManually = false;
  // Valeur du volume initiale, convertie en nombre, défaut à 1 (max)
  let volume = parseFloat(musicVolume.value) || 1;

  // Fonction qui met à jour l'icône du volume et l'état sonore selon le volume et le mute
  function updateIconAndSound() {
    if (isMutedManually || volume === 0) {
      // Son coupé
      musicIcon.className = "bi bi-volume-mute-fill"; // icône "muet"
      musicToggle.setAttribute("aria-label", "Musique coupée"); // label accessibilité
      music.pause(); // pause la musique
    } else if (volume <= 0.5) {
      // Volume faible
      musicIcon.className = "bi bi-volume-down-fill"; // icône volume faible
      musicToggle.setAttribute("aria-label", "Volume faible");
      if (music.paused) music.play(); // joue la musique si en pause
    } else {
      // Volume élevé
      musicIcon.className = "bi bi-volume-up-fill"; // icône volume fort
      musicToggle.setAttribute("aria-label", "Volume élevé");
      if (music.paused) music.play();
    }
  }

  // Événement au clic sur le bouton toggle pour mute/unmute
  musicToggle.addEventListener("click", () => {
    isMutedManually = !isMutedManually; // on inverse l'état mute
    if (isMutedManually) {
      music.pause(); // pause la musique si mute activé
    } else {
      music.volume = volume;      // remet le volume précédent
      musicVolume.value = music.volume; // met à jour le slider visuel
      music.play();               // relance la musique
    }
    updateIconAndSound(); // mise à jour de l'icône et son état
  });

  // Événement quand on change le volume via le slider
  musicVolume.addEventListener("input", () => {
    volume = parseFloat(musicVolume.value);        // récupère la valeur du slider
    isMutedManually = (volume === 0);               // mute si volume à 0
    music.volume = volume;                           // applique le volume à la musique
    if (!isMutedManually && music.paused) music.play(); // joue si volume > 0 et musique en pause
    updateIconAndSound();                            // met à jour l'icône et état sonore
  });

  // --- Gestion de la visibilité du slider ---

  const volumeWrapper = document.querySelector(".volume-wrapper"); // wrapper slider (utilisé ailleurs)

  // Fonction pour afficher le slider de volume
  function showSlider() {
    musicVolume.classList.remove("hidden-slider");
    musicVolume.classList.add("visible-slider");
  }

  // Fonction pour cacher le slider de volume
  function hideSlider() {
    musicVolume.classList.remove("visible-slider");
    musicVolume.classList.add("hidden-slider");
  }

  // Initialisation : applique le volume initial et met à jour l'interface
  music.volume = volume;
  updateIconAndSound();
}

// Appelle la fonction pour lancer l'initialisation au chargement
initMusicToggle();