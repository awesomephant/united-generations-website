function initEvents() {
  const cards = document.querySelectorAll(".events-list .event")
  const now = new Date()
  cards.forEach(c => {
    const date = new Date(c.getAttribute("data-date"))
    const eyebrow = c.querySelector(".card--eyebrow")
    const span = document.createElement("span")
    if (date > now) {
      span.classList.add("upcoming")
      span.innerText = "Upcoming"
      eyebrow.insertAdjacentElement("beforeend", span)
      c.classList.add("is-upcoming")
    } else {
    }
  })
}
export { initEvents };
