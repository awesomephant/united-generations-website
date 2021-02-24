function initEvents() {
  const cards = document.querySelectorAll(".events .event")
  const now = new Date()
  cards.forEach(c => {
    const date = new Date(c.getAttribute("data-date"))
    if (date > now) {
      const eyebrow = c.querySelector(".card--eyebrow")
      const span = document.createElement("span")
      span.classList.add("upcoming")
      span.innerText = "Upcoming"
      eyebrow.insertAdjacentElement("beforeend", span)
      c.classList.add("is-upcoming")
    }
  })
}
export { initEvents };
