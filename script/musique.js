function initMusicToggle() {
  const music = document.getElementById("bg-music");
  const musicToggle = document.getElementById("music-toggle");
  const musicIcon = document.getElementById("music-icon");
  const musicVolume = document.getElementById("music-volume");

  if (!music || !musicToggle || !musicIcon || !musicVolume) return;

  // --- Chargement des paramètres enregistrés ---
  let volume = parseFloat(localStorage.getItem("musicVolume")) || 1;
  let isMutedManually = localStorage.getItem("musicMuted") === "true";

  // Applique le volume
  music.volume = volume;
  musicVolume.value = volume;

  // Si mute, on pause la musique
  if (isMutedManually || volume === 0) {
    music.pause();
  } else {
    music.play().catch(() => {}); // éviter l'erreur si autoplay bloqué
  }

  function updateIconAndSound() {
    if (isMutedManually || volume === 0) {
      musicIcon.className = "bi bi-volume-mute-fill";
      musicToggle.setAttribute("aria-label", "Musique coupée");
      music.pause();
    } else if (volume <= 0.5) {
      musicIcon.className = "bi bi-volume-down-fill";
      musicToggle.setAttribute("aria-label", "Volume faible");
      if (music.paused) music.play().catch(() => {});
    } else {
      musicIcon.className = "bi bi-volume-up-fill";
      musicToggle.setAttribute("aria-label", "Volume élevé");
      if (music.paused) music.play().catch(() => {});
    }
  }

  musicToggle.addEventListener("click", () => {
    isMutedManually = !isMutedManually;
    localStorage.setItem("musicMuted", isMutedManually); // ➕ sauvegarde du mute
    if (isMutedManually) {
      music.pause();
    } else {
      music.volume = volume;
      musicVolume.value = volume;
      music.play().catch(() => {});
    }
    updateIconAndSound();
  });

  musicVolume.addEventListener("input", () => {
    volume = parseFloat(musicVolume.value);
    isMutedManually = (volume === 0);
    music.volume = volume;
    localStorage.setItem("musicVolume", volume);           // ➕ sauvegarde volume
    localStorage.setItem("musicMuted", isMutedManually);   // ➕ mise à jour mute
    if (!isMutedManually && music.paused) music.play().catch(() => {});
    updateIconAndSound();
  });

  // --- Affichage slider volume ---
  const volumeWrapper = document.querySelector(".volume-wrapper");
  function showSlider() {
    musicVolume.classList.remove("hidden-slider");
    musicVolume.classList.add("visible-slider");
  }
  function hideSlider() {
    musicVolume.classList.remove("visible-slider");
    musicVolume.classList.add("hidden-slider");
  }

  // Appliquer l’icône initiale
  updateIconAndSound();
}

// Appelle l'init
initMusicToggle();


// === SAUVEGARDE de la position musicale à chaque changement de page ===
window.addEventListener("beforeunload", () => {
  const music = document.getElementById("bg-music");
  if (music) {
    localStorage.setItem("musicCurrentTime", music.currentTime);
  }
});

// === RESTAURATION automatique de la position musicale au chargement ===
window.addEventListener("load", () => {
  const music = document.getElementById("bg-music");
  const savedTime = parseFloat(localStorage.getItem("musicCurrentTime"));
  if (music && !isNaN(savedTime)) {
    music.currentTime = savedTime;
  }
});