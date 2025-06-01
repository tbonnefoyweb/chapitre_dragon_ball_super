document.addEventListener("DOMContentLoaded", function () {
  const includes = document.querySelectorAll("[data-include]");

  includes.forEach(async function (el) {
    const file = el.getAttribute("data-include");
    const resp = await fetch(file);
    const content = await resp.text();
    el.innerHTML = content;
  });

  // ⏳ On attend un peu que tout soit bien injecté, puis on initialise le reste
  setTimeout(() => {
    if (typeof initThemeToggle === "function") initThemeToggle();
    if (typeof initMusicToggle === "function") initMusicToggle();
  }, 100); // délai de sécurité

// 2. Application des images de fond pour les éléments avec .banner-blur
  const banners = document.querySelectorAll('.banner-blur[data-img]');

  banners.forEach(banner => {
    const img = banner.dataset.img;
    if (img) {
      banner.style.backgroundImage = `url(${img})`;
    }
  });
});

// 3. Effet couverture tome 5
  let isAlternate = false;

  function toggleCover() {
    const coverImg = document.getElementById('coverImage');
    const coverText = document.getElementById('coverText');
    const bannerBlur = document.getElementById('bannerBlur');

    // Supprime le popover existant si besoin
    bootstrap.Popover.getInstance(coverImg)?.dispose();

    if (!isAlternate) {
      // Version hommage
      const newSrc = "img/cover/5_altern.jpeg";
      coverImg.src = newSrc;
      coverImg.alt = "Couverture hommage à Trunks";
      bannerBlur.setAttribute('data-img', newSrc);
      bannerBlur.style.backgroundImage = `url('${newSrc}')`;

      // Ajoute les attributs Bootstrap pour le popover
      coverImg.setAttribute('data-bs-toggle', 'popover');
      coverImg.setAttribute('data-bs-trigger', 'hover focus');
      coverImg.setAttribute('data-bs-placement', 'right');
      coverImg.setAttribute('data-bs-title', 'Hommage à Trunks');
      coverImg.setAttribute('data-bs-content', "Cette couverture alternative marque la fin de l’arc Trunks du futur. Elle rend hommage à ce personnage emblématique et à son combat contre Black Goku.");

      // Initialise le popover
      const popover = new bootstrap.Popover(coverImg, {
        container: 'body',
        boundary: 'viewport',
        trigger: 'hover focus'
      });

      // Si la souris est déjà sur l’image, affiche immédiatement le popover
      if (coverImg.matches(':hover')) {
        popover.show();
      }

    } else {
      // Version normale
      const newSrc = "img/cover/5.jpeg";
      coverImg.src = newSrc;
      coverImg.alt = "Couverture normale";
      bannerBlur.setAttribute('data-img', newSrc);
      bannerBlur.style.backgroundImage = `url('${newSrc}')`;

      // Nettoyage des attributs liés au popover
      coverImg.removeAttribute('data-bs-toggle');
      coverImg.removeAttribute('data-bs-trigger');
      coverImg.removeAttribute('data-bs-placement');
      coverImg.removeAttribute('data-bs-title');
      coverImg.removeAttribute('data-bs-content');
    }

    isAlternate = !isAlternate;
  }