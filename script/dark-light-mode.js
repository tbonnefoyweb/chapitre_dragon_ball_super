function initThemeToggle() {
  const html = document.documentElement;
  const toggleButton = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");

  if (!toggleButton || !icon) return;

  function applyTheme(theme) {
    html.setAttribute("data-bs-theme", theme);
    icon.className = theme === "dark" ? "bi bi-moon-fill" : "bi bi-sun-fill";
  }

  let theme = localStorage.getItem("theme");
  if (!theme) {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  applyTheme(theme);

  toggleButton.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });
}