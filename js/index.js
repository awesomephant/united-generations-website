function initSliderAnimation() {
  const slideImages = document.querySelectorAll(".slide img");
  const slider = document.querySelector(".hero-slider");
  slideImages[0].addEventListener("load", (e) => {
    slider.classList.add('loaded')
  });
  slider.style.animationDuration = `${slideImages.length * 10}s`;
}

window.addEventListener("DOMContentLoaded", () => {
  initSliderAnimation();

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
