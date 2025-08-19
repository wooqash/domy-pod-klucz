import './loco.css';
import './style.css';
import { animateNav } from './scripts/nav';
import LocomotiveScroll from 'locomotive-scroll';
import { marquee } from './scripts/marquee';

document.addEventListener("DOMContentLoaded", function () {
  const mainElement: HTMLElement | null = document.querySelector("#main");
  let locoScroll;

  locoScroll = new LocomotiveScroll({
      el: mainElement || undefined,
      smooth: true,
      getDirection: true,
      mobile: {
          smooth: true,
          inertia: 0.8,
          getDirection: true,
      },
      tablet: {
          smooth: true,
          inertia: 0.8,
          getDirection: true,
      },
  });

  if(mainElement){
  new ResizeObserver(() => locoScroll.update()).observe(
      mainElement
  );
}
  animateNav();
  marquee();
})
