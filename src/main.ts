import "./loco.css";
import "./style.css";
import { animateNav } from "./scripts/nav";
import LocomotiveScroll from "locomotive-scroll";
import { marquee } from "./scripts/marquee";
import initGallery from "./scripts/gallery";
import { initContactForm } from "./scripts/contact-form";
import { copyrightDate, protectInfo } from "./scripts/protect-info";

document.addEventListener("DOMContentLoaded", function () {
  const mainElement: HTMLElement | null = document.querySelector("#main");
  let locoScroll;

  locoScroll = new LocomotiveScroll({
    el: mainElement || undefined,
    smooth: true,
    getDirection: true,
    smartphone: {
      smooth: true,
    },
    tablet: {
      smooth: true,
      breakpoint: 0,
    },
    // tablet: {
    //   smooth: true,
    //   // inertia: 0.8,
    //   // getDirection: true,
    // },
  });

  if (mainElement) {
    new ResizeObserver(() => locoScroll.update()).observe(mainElement);
  }
  animateNav();
  marquee();
  initGallery();
  initContactForm();
  protectInfo();
  copyrightDate();
});
