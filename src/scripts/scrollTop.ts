import LocomotiveScroll from "locomotive-scroll";

const scrollTopBtn: HTMLButtonElement | null =
  document.querySelector("#scrollToTopBtn");
const logoLink: HTMLAnchorElement | null = document.querySelector(".logo-link");
const hero: HTMLElement | null = document.getElementById("hero");

export const initScrollToTopBtn = locomotiveScroll => {
  // const mainElement: HTMLElement | null = document.querySelector(
  //   "[data-scroll-container]"
  // );

  // const locomotiveScroll = new LocomotiveScroll({
  //   el: mainElement || undefined,
  //   smooth: true,
  // });

  function scrollTo(params) {
    const { target, options } = params;
    locomotiveScroll.scrollTo(target, options);
  }

  function isBelowHero() {
    //   //   console.log(hero);
    if (!hero) return window.scrollY > 100;
    const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
    return window.scrollY > heroBottom - 40;
  }

  // function scrollTo(e: Event) {
  //   e.preventDefault();
  //   console.log("scroll");
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }

  // btn?.addEventListener("click", scrollTo);

  function toggleBtn() {
    if (scrollTopBtn) {
      if (isBelowHero()) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    }
  }

  // togglescrollTopBtn();
  // console.log(logoLink);
  logoLink?.addEventListener("click", e => {
    e.preventDefault();
    scrollTo({ target: hero });
  });
  scrollTopBtn?.addEventListener("click", e => {
    e.preventDefault();
    scrollTo({ target: hero });
  });
  locomotiveScroll.on("scroll", toggleBtn);
  // window.addEventListener("scroll", toggleBtn);
  window.addEventListener("resize", toggleBtn);
};
