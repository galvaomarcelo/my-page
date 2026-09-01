document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  const carousel = document.querySelector("[data-carousel]");
  if (carousel) {
    const slides = [...carousel.querySelectorAll(".phone-slide")];
    const dots = [...carousel.querySelectorAll(".dot")];
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const nextBtn = carousel.querySelector(".carousel-btn.next");
    const track = carousel.querySelector(".carousel-track");

    let currentIndex = 0;

    const showSlide = (index) => {
      if (!slides.length || !track) return;

      const maxIndex = Math.max(0, slides.length - 1);
      currentIndex = Math.min(maxIndex, Math.max(0, index));

      const slideWidth = slides[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).gap) || 24;
      const offset = currentIndex * (slideWidth + gap);

      track.scrollTo({
        left: offset,
        behavior: "smooth"
      });

      slides.forEach((slide, idx) => {
        slide.classList.toggle("is-active", idx === currentIndex);
      });

      dots.forEach((dot, idx) => {
        dot.classList.toggle("is-active", idx === currentIndex);
      });
    };

    prevBtn?.addEventListener("click", () => showSlide(currentIndex - 1));
    nextBtn?.addEventListener("click", () => showSlide(currentIndex + 1));

    dots.forEach(dot => {
      dot.addEventListener("click", () => showSlide(Number(dot.dataset.slide)));
    });

    window.addEventListener("resize", () => showSlide(currentIndex));
    showSlide(0);
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Hide the video placeholder after a video is loaded.
  document.querySelectorAll(".video-frame video").forEach(video => {
    const placeholder = video.parentElement.querySelector(".video-placeholder");
    if (!placeholder) return;

    const hidePlaceholder = () => {
      placeholder.style.opacity = "0";
    };

    video.addEventListener("loadeddata", hidePlaceholder);
    video.addEventListener("play", hidePlaceholder);
  });
});
