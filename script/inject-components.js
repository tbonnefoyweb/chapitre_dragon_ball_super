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