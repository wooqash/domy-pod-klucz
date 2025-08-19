export function marquee() {
    const root = document.documentElement;
    const marqueeElementsDisplayed = parseInt(getComputedStyle(root).getPropertyValue("--marquee-elements-displayed"));
    const marqueeContent: HTMLUListElement | null = document.querySelector("ul.marquee-content");

    root.style.setProperty("--marquee-elements", marqueeContent?.children.length.toString() || null);

    for (let i = 0; i < marqueeElementsDisplayed; i++) {
        marqueeContent?.appendChild(marqueeContent.children[i].cloneNode(true));
    }
}