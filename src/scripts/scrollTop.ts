import type { ScrollToTarget, ScrollToOptions } from "locomotive-scroll";

const scrollTopBtn: HTMLButtonElement | null =
  document.querySelector("#scrollToTopBtn");
const logoLink: HTMLAnchorElement | null = document.querySelector(".logo-link");
const hero: HTMLElement | null = document.getElementById("hero");

export const initScrollToTopBtn = (locomotiveScroll: LocomotiveScroll) => {
  function scrollTo({
    target,
    options,
  }: {
    target: ScrollToTarget;
    options?: ScrollToOptions;
  }) {
    // const { target, options } = params;
    locomotiveScroll.scrollTo(target, options);
  }

  function isBelowHero() {
    if (!hero) return window.scrollY > 100;
    const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
    return window.scrollY > heroBottom - 40;
  }

  function toggleBtn() {
    if (scrollTopBtn) {
      if (isBelowHero()) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    }
  }

  logoLink?.addEventListener("click", e => {
    e.preventDefault();
    if (hero) {
      scrollTo({ target: hero });
    }
  });
  scrollTopBtn?.addEventListener("click", e => {
    e.preventDefault();
    if (hero) {
      scrollTo({ target: hero });
    }
  });
  locomotiveScroll.on("scroll", toggleBtn);
  window.addEventListener("resize", toggleBtn);
};
