const { initFilters } = require("./initFilters");

let slider;
let currentX = 0;
let loopPoint = null;

function sliderLoop() {
  if (loopPoint !== null) {
    if (currentX > loopPoint) {
      currentX = loopPoint - currentX;
    }
  }
  slider.style.transform = `translateX(${currentX * -.5}px)`;
  currentX += 1;
  window.requestAnimationFrame(sliderLoop);
}

function setLoopPoint(lastSlide) {
  let box = lastSlide.getBoundingClientRect();
  loopPoint = box.x;
}

function initSliderAnimation(slider) {
  // We start the animation as soon as possible
  // Then we figure out the position of the last slide,
  // which is where we need to loop back to the beginning.
  let loadedSlides = 0;
  window.setTimeout(() => {
    slider.classList.add("loaded");
    sliderLoop();
  }, 1500);

  const slides = document.querySelectorAll(".slide img");
  slides.forEach((slide) => {
    slide.addEventListener("load", (e) => {
      loadedSlides++;
      if (loadedSlides === slides.length) {
        setLoopPoint(slides[slides.length - 1]);
        window.addEventListener("resize", (e) => {
          setLoopPoint(slides[slides.length - 1]);
        });
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  slider = document.querySelector(".hero-slider");
  if (slider) {
    initSliderAnimation(slider);
  }
  initFilters();
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
