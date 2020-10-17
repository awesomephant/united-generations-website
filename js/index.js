window.addEventListener("DOMContentLoaded", () => {
  if (window.scrollY > 10) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
  window.addEventListener("scroll", (e) => {
    document.body.style.setProperty("--y", window.scrollY);
    if (window.scrollY > 10) {
      document.body.classList.add("scrolled");
    } else {
      document.body.classList.remove("scrolled");
    }
  });
});
