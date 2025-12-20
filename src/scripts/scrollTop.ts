const scrollTopBtn: HTMLButtonElement | null =
  document.querySelector("#scrollToTopBtn");
const logoLink: HTMLAnchorElement | null = document.querySelector(".logo-link");
const hero: HTMLElement | null = document.getElementById("hero");

export const initScrollToTopBtn = (locomotiveScroll: LocomotiveScroll) => {
  const isBelowHero = () => {
    if (!hero) return window.scrollY > 100;
    const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
    return window.scrollY > heroBottom - 40;
  };

  const toggleBtn = () => {
    if (scrollTopBtn) {
      if (isBelowHero()) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    }
  };

  const handleClick = (e: Event) => {
    e.preventDefault();
    if (hero) {
      locomotiveScroll.scrollTo(hero, {});
    }
  };

  logoLink?.addEventListener("click", handleClick);
  scrollTopBtn?.addEventListener("click", handleClick);
  locomotiveScroll.on("scroll", toggleBtn);
  window.addEventListener("resize", toggleBtn);
};
