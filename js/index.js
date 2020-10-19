function initSliderAnimation() {
  const container = document.querySelector(".hero-slides");
  const slides = document.querySelectorAll(".hero-slides .slide");
  const containerBox = container.getBoundingClientRect();
  const lastSlideBox = slides[slides.length - 1].getBoundingClientRect();

  // We need to calculate where the left edge of the last slide
  // is in relation to the width of the slider. If we animate
  // to this point, the animation should loop correctly.
  const position = lastSlideBox.x / containerBox.width;
  document.body.style.setProperty("--last-slide-position", (position * -100) + '%');
  console.log(position);
}

window.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slides .slide");
  let loadedSlides = 0;
  slides.forEach((s) => {
    s.addEventListener("load", (e) => {
      loadedSlides++;
      if (loadedSlides === slides.length) {
        initSliderAnimation();
        window.addEventListener('resize', initSliderAnimation)
      }
    });
  });

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
