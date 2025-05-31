function initMusicToggle() {
  // Récupération des éléments du DOM liés à la musique
  const music = document.getElementById("bg-music");         // élément <audio> de la musique de fond
  const musicToggle = document.getElementById("music-toggle"); // bouton pour activer/désactiver la musique
  const musicIcon = document.getElementById("music-icon");     // icône indiquant l'état du volume
  const musicVolume = document.getElementById("music-volume"); // curseur pour régler le volume

  // Si l'un des éléments est introuvable, on arrête l'initialisation
  if (!music || !musicToggle || !musicIcon || !musicVolume) return;

  // Récupérer le volume sauvegardé ou valeur par défaut
  let volume = parseFloat(localStorage.getItem("musicVolume")) || parseFloat(musicVolume.value) || 1;

  // Récupérer l'état mute sauvegardé (true/false)
  let savedMuted = localStorage.getItem("musicMuted");
  let isMutedManually = savedMuted === "true";

  // Synchroniser visuellement le slider avec le volume restauré
  musicVolume.value = volume;

  // Fonction qui met à jour l'icône du volume et l'état sonore selon le volume et le mute
  function updateIconAndSound() {
    if (isMutedManually || volume === 0) {
      musicIcon.className = "bi bi-volume-mute-fill"; // icône "muet"
      musicToggle.setAttribute("aria-label", "Musique coupée");
      music.pause();
    } else if (volume <= 0.5) {
      musicIcon.className = "bi bi-volume-down-fill"; // icône volume faible
      musicToggle.setAttribute("aria-label", "Volume faible");
      if (music.paused) music.play();
    } else {
      musicIcon.className = "bi bi-volume-up-fill"; // icône volume fort
      musicToggle.setAttribute("aria-label", "Volume élevé");
      if (music.paused) music.play();
    }
  }

  // Événement au clic sur le bouton toggle pour mute/unmute
  musicToggle.addEventListener("click", () => {
    isMutedManually = !isMutedManually; // inverse l'état mute
    localStorage.setItem("musicMuted", isMutedManually);    // sauvegarde l'état mute
    if (isMutedManually) {
      music.pause();
    } else {
      music.volume = volume;
      musicVolume.value = music.volume;
      music.play();
    }
    updateIconAndSound();
  });

  // Événement quand on change le volume via le slider
  musicVolume.addEventListener("input", () => {
    volume = parseFloat(musicVolume.value);
    isMutedManually = (volume === 0);
    music.volume = volume;
    localStorage.setItem("musicVolume", volume);   // sauvegarde volume
    localStorage.setItem("musicMuted", isMutedManually);  // sauvegarde mute si volume à 0
    if (!isMutedManually && music.paused) music.play();
    updateIconAndSound();
  });

  // --- Gestion de la visibilité du slider ---
  const volumeWrapper = document.querySelector(".volume-wrapper"); // wrapper slider (utilisé ailleurs)

  function showSlider() {
    musicVolume.classList.remove("hidden-slider");
    musicVolume.classList.add("visible-slider");
  }

  function hideSlider() {
    musicVolume.classList.remove("visible-slider");
    musicVolume.classList.add("hidden-slider");
  }

  // Initialisation : appliquer le volume et l’état mute restaurés
  music.volume = volume;
  if (isMutedManually) {
    music.pause();
  } else {
    music.play();
  }
  updateIconAndSound();
}

// Démarrer l'initialisation
initMusicToggle();