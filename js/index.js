function initSliderAnimation(totalWidth) {
  const container = document.querySelector(".hero-slides");
  container.classList.add('loaded')
  const slides = document.querySelectorAll(".hero-slides .slide");
  const lastSlideBox = slides[slides.length - 1].getBoundingClientRect();

  // We need to calculate where the left edge of the last slide
  // is in relation to the width of the slider. If we animate
  // to this point, the animation should loop correctly.
  const position = lastSlideBox.x / totalWidth;
  document.body.style.setProperty(
    "--last-slide-position",
    position * -100 + "%"
  );
}

function measureSlides(cb) {
  const slides = document.querySelectorAll(".hero-slides .slide");
  let loadedSlides = 0;
  let totalWidth = 0;
  slides.forEach((s) => {
    // We poll for the image width here so
    // we get it before the full image is loaded.
    let poll = setInterval(function () {
      if (s.naturalWidth) {
        clearInterval(poll);
        let box = s.getBoundingClientRect();
        loadedSlides++;
        totalWidth += box.width;
        if (loadedSlides === slides.length) {
          cb(totalWidth);
        }
      }
    }, 10);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  measureSlides((totalWidth) => {
    initSliderAnimation(totalWidth);
  });
  window.addEventListener("resize", (e) => {
    measureSlides((totalWidth) => {
      console.log(totalWidth);
      initSliderAnimation(totalWidth);
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
