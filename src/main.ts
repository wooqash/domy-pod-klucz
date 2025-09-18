import "./loco.css";
import "./style.css";
import { animateNav } from "./scripts/nav";
import LocomotiveScroll from "locomotive-scroll";
import { marquee } from "./scripts/marquee";
import initGallery from "./scripts/gallery";
import { initForms } from "./scripts/forms";
import { copyrightDate, protectInfo } from "./scripts/protect-info";
import { initScrollToTopBtn } from "./scripts/scrollTop";

document.addEventListener("DOMContentLoaded", function () {
  const mainElement: HTMLElement | null = document.querySelector(
    "[data-scroll-container]"
  );

  if (mainElement) {
    const locoScroll = new LocomotiveScroll({
      el: mainElement,
      smooth: true,
      getDirection: true,
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
        breakpoint: 0,
      },
    });

    new ResizeObserver(() => locoScroll.update()).observe(mainElement);
    initScrollToTopBtn(locoScroll);
  }
  animateNav();
  marquee();
  initGallery();
  initForms();
  protectInfo();
  copyrightDate();
});
