function initImages() {
  const images = document.querySelectorAll("img");
  let paragraphs = document.querySelectorAll(
    ".post--content p"
  );
  for (let i = 0; i < paragraphs.length; i++) {
    let image = paragraphs[i].querySelector("img, video, iframe");
    if (image) {
      paragraphs[i].classList.add("hasimage");
    }
  }
  

  images.forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded");
      img.classList.add("cached");
    }
    img.addEventListener("load", () => {
      img.classList.add("loaded");
    });
  });
}

export { initImages };
