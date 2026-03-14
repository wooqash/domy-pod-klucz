import gsap from "gsap";
import { Expo } from "gsap";
import { releaseFocusTrap, trapFocus } from "./utils";

export function animateNav(locomotiveScroll: LocomotiveScroll) {
  const hamburger: HTMLDivElement | null = document.querySelector(".open_nav");
  const sideMenu: HTMLDivElement | null = document.querySelector(".side-menu");
  const sideMenuContent: HTMLDivElement | null = document.querySelector(
    ".side-menu .form-container"
  );
  const sideMenuOpenElements: NodeListOf<HTMLButtonElement> | null =
    document.querySelectorAll(".open-side-menu");
  const button: HTMLDivElement | null = document.querySelector(".hamburger");
  const closeButton: HTMLDivElement | null =
    document.querySelector(".side-menu .close");
  const overlay: HTMLDivElement | null = document.querySelector("#overlay");
  const overlay2: HTMLDivElement | null = document.querySelector("#overlay2");
  const navigation = createNavigationTimeline();
  const sideNav = createSideNavTimeline();
  const contactForm = document.querySelector("#contactFormContainer");
  const offerForm = document.querySelector("#offerFormContainer");
  const offerType = document.querySelector(".offer-type");
  const formMsg = document.querySelector(".form-msg");
  const body = document.querySelector("body");
  const menuLinks: NodeListOf<HTMLButtonElement> | null =
    document.querySelectorAll(".menu-link");

  function toggleNavigation() {
    if (navigation && navigation.progress() === 1) {
      navigation.reverse().eventCallback("onReverseComplete", () => {
        overlay?.classList.remove("active");
        body?.classList.remove("lock");
      });
    } else {
      navigation.play();
      overlay?.classList.add("active");
      body?.classList.add("lock");
    }
    button?.classList.toggle("-menu-open");
  }

  function toggleSideNav(e: Event) {
    const target =
      e.type !== "keydown"
        ? (e?.currentTarget as HTMLAnchorElement | HTMLButtonElement)
        : null;
    const formType = target?.getAttribute("data-form-type");

    if (sideNav && sideNav.progress() === 1) {
      sideNav.reverse().eventCallback("onReverseComplete", () => {
        overlay2?.classList.remove("active");
        if (sideMenuContent) releaseFocusTrap(sideMenuContent);
      });
      contactForm?.classList.remove("show");
      offerForm?.classList.remove("show");
      if (formMsg) {
        formMsg.textContent = "";
        formMsg.classList.add("hidden");
      }
    } else {
      sideNav.play();
      overlay2?.classList.add("active");
      if (sideMenu) trapFocus(sideMenu);
      setTimeout(() => {
        closeButton?.focus();
      }, 500);
      if (formType === "contactFormContainer") {
        contactForm?.classList.add("show");
      }
      if (formType === "offerFormContainer") {
        offerForm?.classList.add("show");

        if (offerType) {
          offerType.textContent = setOfferType(target as HTMLButtonElement);
        }
      }
    }
    closeButton?.classList.toggle("-menu-open");
  }

  function createNavigationTimeline() {
    return gsap
      .timeline({ paused: true })
      .from(".navigation_menu", {
        autoAlpha: 0,
        delay: 0.1,
        ease: Expo.easeOut,
        duration: 0.8,
        xPercent: 20,
      })
      .from(
        ".navigation_cnt",
        {
          opacity: 0,
          x: 40,
        },
        "-=.5"
      );
  }

  function createSideNavTimeline() {
    return gsap
      .timeline({ paused: true })
      .from(".side-menu", {
        autoAlpha: 0,
        delay: 0.1,
        ease: Expo.easeOut,
        duration: 0.8,
        xPercent: 20,
      })
      .from(
        ".form-container",
        {
          opacity: 0,
          x: 40,
        },
        "-=.5"
      );
  }

  function setOfferType(target: HTMLButtonElement) {
    const offerType = target.getAttribute("data-offer-type");
    switch (offerType) {
      case "standard":
        return "standard";
      case "comfort":
        return "komfort";
      case "premium":
        return "premium";
      default:
        return "komfort";
    }
  }

  const handleClick = (e: Event) => {
    e.preventDefault();
    const hash = (e?.target as HTMLAnchorElement).hash;
    const target = document.querySelector(hash) as HTMLElement;

    if (target) {
      toggleNavigation();
      window.setTimeout(() => {
        locomotiveScroll.scrollTo(target, {});
      }, 1000);
    }
  };

  hamburger?.addEventListener("click", toggleNavigation);
  closeButton?.addEventListener("click", toggleSideNav);
  sideMenuOpenElements?.forEach(el => {
    el.addEventListener("click", toggleSideNav);
  });
  overlay?.addEventListener("click", toggleNavigation);
  overlay2?.addEventListener("click", toggleSideNav);
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (!overlay2?.classList.contains("active")) return;
    if (e.key === "Escape") toggleSideNav(e);
  });
  menuLinks.forEach(link => link.addEventListener("click", handleClick));
}
