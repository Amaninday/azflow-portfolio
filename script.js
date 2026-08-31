document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const slides = [...gallery.querySelectorAll(".gallery-slide")];
  const previousButton = gallery.querySelector(".gallery-arrow.prev");
  const nextButton = gallery.querySelector(".gallery-arrow.next");
  const counter = gallery.querySelector(".gallery-count");

  if (!slides.length) return;

  let currentIndex = 0;

  function showSlide(index) {
    const currentVideo = slides[currentIndex].querySelector("video");

    if (currentVideo) currentVideo.pause();

    slides[currentIndex].classList.remove("active");
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add("active");

    if (counter) {
      counter.textContent = `${currentIndex + 1} / ${slides.length}`;
    }
  }

  if (slides.length === 1) {
    if (previousButton) previousButton.hidden = true;
    if (nextButton) nextButton.hidden = true;
    if (counter) counter.hidden = true;
    return;
  }

  previousButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    showSlide(currentIndex - 1);
  });

  nextButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    showSlide(currentIndex + 1);
  });

  gallery.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showSlide(currentIndex - 1);
    if (event.key === "ArrowRight") showSlide(currentIndex + 1);
  });
});
