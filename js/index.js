let slider;
let currentX = 0;
let loopPoint = null;

function sliderLoop() {
  if (loopPoint !== null) {
    if (currentX > loopPoint) {
      currentX = loopPoint - currentX;
    }
  }
  slider.style.transform = `translateX(${currentX * -1}px)`;
  currentX += 1.8;
  window.requestAnimationFrame(sliderLoop);
}

function setLoopPoint(lastSlide) {
  let box = lastSlide.getBoundingClientRect();
  loopPoint = box.x;
}

function initSliderAnimation() {
  // We start the animation as soon as possible
  // Then we figure out the position of the last slide,
  // which is where we need to loop back to the beginning.

  slider = document.querySelector(".hero-slider");
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
