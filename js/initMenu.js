function initMenu() {
  const toggleMenu = document.querySelector(".toggle-menu");
  toggleMenu.addEventListener("click", (e) => {
    if (document.body.classList.contains("menu-active")) {
      toggleMenu.innerText = "Menu";
      document.body.classList.remove("menu-active");
    } else {
      toggleMenu.innerText = "Close";
      document.body.classList.add("menu-active");
    }
  });
}
export { initMenu };
