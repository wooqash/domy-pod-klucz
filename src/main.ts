import "./styles/loco.css";
import "./styles/style.css";
import "./styles/silktide-consent-manager.css";
import { animateNav } from "./scripts/nav";
import LocomotiveScroll from "locomotive-scroll";
import { marquee } from "./scripts/marquee";
import initGallery from "./scripts/gallery";
import { initForms } from "./scripts/forms";
import { copyrightDate, protectInfo } from "./scripts/protect-info";
import { initScrollToTopBtn } from "./scripts/scrollTop";
import initTestimonialSlider from "./scripts/testimonials";

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
    animateNav(locoScroll);
  }

  marquee();
  initGallery();
  initForms();
  protectInfo();
  copyrightDate();
  initTestimonialSlider();
});
