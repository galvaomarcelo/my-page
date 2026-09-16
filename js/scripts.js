document.addEventListener("DOMContentLoaded", () => {

  // Mobile navigation
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
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


  // Carousels
  document.querySelectorAll("[data-carousel]").forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const slides = [...carousel.querySelectorAll(".carousel-slide")];
    const dots = [...carousel.querySelectorAll(".dot")];
    const prev = carousel.querySelector(".carousel-btn.prev");
    const next = carousel.querySelector(".carousel-btn.next");
    let index = 0;

    if (!track || !slides.length) return;

    const show = (i, smooth = true) => {
      index = Math.max(0, Math.min(i, slides.length - 1));
      track.scrollTo({
        left: index * track.clientWidth,
        behavior: smooth ? "smooth" : "auto"
      });

      slides.forEach((s, i) =>
        s.classList.toggle("is-active", i === index)
      );

      dots.forEach((d, i) =>
        d.classList.toggle("is-active", i === index)
      );
    };

    prev?.addEventListener("click", () => show(index - 1));
    next?.addEventListener("click", () => show(index + 1));

    dots.forEach(dot =>
      dot.addEventListener("click", () =>
        show(Number(dot.dataset.slide))
      )
    );

    window.addEventListener("resize", () => show(index, false));
    show(0, false);
  });


  // Current year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();


  // Video placeholders
  document.querySelectorAll(".video-frame video").forEach(video => {
    const placeholder =
      video.parentElement.querySelector(".video-placeholder");

    if (!placeholder) return;

    const hide = () => placeholder.style.opacity = "0";

    video.addEventListener("loadeddata", hide);
    video.addEventListener("play", hide);
  });

});