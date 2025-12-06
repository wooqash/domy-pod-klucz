// document.addEventListener('DOMContentLoaded', () => {
function initTestimonialSlider() {
  const slides = Array.from(document.querySelectorAll(".testimonial"));
  const prevBtn = document.querySelector(".testimonial-slider__btn.prev");
  const nextBtn = document.querySelector(".testimonial-slider__btn.next");
  const stopBtn = document.querySelector(".testimonial-slider__btn.stop");
  const playBtn = document.querySelector(".testimonial-slider__btn.play");

  let currentIndex = 0;
  let isPaused = false;
  let intervalId = null;
  const INTERVAL = 5000;

  function showSlide(index: number) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  function startAuto() {
    if (intervalId) return;
    intervalId = setInterval(() => {
      if (!isPaused) nextSlide();
    }, INTERVAL);
  }

  function stopAuto() {
    clearInterval(intervalId);
    intervalId = null;
  }

  nextBtn?.addEventListener("click", () => {
    nextSlide();
  });

  prevBtn?.addEventListener("click", () => {
    prevSlide();
  });

  stopBtn?.addEventListener("click", () => {
    isPaused = !isPaused;
    stopBtn.setAttribute("aria-pressed", String(isPaused));
    stopAuto();
  });

  playBtn?.addEventListener("click", () => {
    console.log(isPaused);
    isPaused = !isPaused;
    playBtn.setAttribute("aria-pressed", String(isPaused));
    startAuto();
  });

  // start
  showSlide(currentIndex);
  startAuto();
  // });
}
export default initTestimonialSlider;
