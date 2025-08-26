function initGallery() {
  const projects = document.querySelectorAll<HTMLElement>(".project");
  const modal = document.querySelector<HTMLDivElement>(".modal")!;
  const modalContent =
    document.querySelector<HTMLDivElement>(".modal-content")!;
  const btnClose = document.querySelector<HTMLButtonElement>(".close-btn")!;
  const btnPrev = document.getElementById("prev") as HTMLButtonElement;
  const btnNext = document.getElementById("next") as HTMLButtonElement;
  const counter = document.getElementById("counter")!;
  const backdrop = document.getElementById("backdrop") as HTMLDivElement;

  let focusableElements: HTMLElement[] = [];
  let firstFocusableEl: HTMLElement | null = null;
  let lastFocusableEl: HTMLElement | null = null;
  let focusTrapActive = false;

  type GalleryMap = {
    [key: string]: string[];
  };

  const galleries: GalleryMap = {
    p1: [
      "2017/ruda_bugaj/ruda_bugaj_001",
      "2017/ruda_bugaj/ruda_bugaj_002",
      "2017/ruda_bugaj/ruda_bugaj_003",
      "2017/ruda_bugaj/ruda_bugaj_004",
      "2017/ruda_bugaj/ruda_bugaj_005",
      "2017/ruda_bugaj/ruda_bugaj_006",
      "2017/ruda_bugaj/ruda_bugaj_007",
      "2017/ruda_bugaj/ruda_bugaj_008",
      "2017/ruda_bugaj/ruda_bugaj_009",
      "2017/ruda_bugaj/ruda_bugaj_010",
      "2017/ruda_bugaj/ruda_bugaj_011",
      "2017/ruda_bugaj/ruda_bugaj_012",
    ],
    p2: [
      "2019/osiedle_zgierz/osiedle_zgierz_001",
      "2019/osiedle_zgierz/osiedle_zgierz_002",
      "2019/osiedle_zgierz/osiedle_zgierz_003",
      "2019/osiedle_zgierz/osiedle_zgierz_004",
      "2019/osiedle_zgierz/osiedle_zgierz_005",
      "2019/osiedle_zgierz/osiedle_zgierz_006",
      "2019/osiedle_zgierz/osiedle_zgierz_007",
    ],
    p3: [
      "2019/samotnik/samotnik_001",
      "2019/samotnik/samotnik_002",
      "2019/samotnik/samotnik_003",
      "2019/samotnik/samotnik_004",
      "2019/samotnik/samotnik_005",
      "2019/samotnik/samotnik_006",
      "2019/samotnik/samotnik_007",
      "2019/samotnik/samotnik_008",
      "2019/samotnik/samotnik_009",
      "2019/samotnik/samotnik_010",
      "2019/samotnik/samotnik_011",
      "2019/samotnik/samotnik_012",
      "2019/samotnik/samotnik_013",
      "2019/samotnik/samotnik_014",
      "2019/samotnik/samotnik_015",
      "2019/samotnik/samotnik_016",
      "2019/samotnik/samotnik_017",
      "2019/samotnik/samotnik_018",
      "2019/samotnik/samotnik_019",
      "2019/samotnik/samotnik_020",
      "2019/samotnik/samotnik_021",
      "2019/samotnik/samotnik_022",
      "2019/samotnik/samotnik_023",
      "2019/samotnik/samotnik_024",
      "2019/samotnik/samotnik_025",
    ],
    p4: [
      "2020/energosfera/energosfera_001",
      "2020/energosfera/energosfera_002",
      "2020/energosfera/energosfera_003",
      "2020/energosfera/energosfera_004",
      "2020/energosfera/energosfera_005",
      "2020/energosfera/energosfera_006",
      "2020/energosfera/energosfera_007",
      "2020/energosfera/energosfera_008",
      "2020/energosfera/energosfera_009",
      "2020/energosfera/energosfera_010",
      "2020/energosfera/energosfera_011",
      "2020/energosfera/energosfera_012",
      "2020/energosfera/energosfera_013",
      "2020/energosfera/energosfera_014",
      "2020/energosfera/energosfera_015",
      "2020/energosfera/energosfera_016",
      "2020/energosfera/energosfera_017",
      "2020/energosfera/energosfera_018",
      "2020/energosfera/energosfera_019",
      "2020/energosfera/energosfera_020",
      "2020/energosfera/energosfera_021",
      "2020/energosfera/energosfera_022",
      "2020/energosfera/energosfera_023",
      "2020/energosfera/energosfera_024",
      "2020/energosfera/energosfera_025",
      "2020/energosfera/energosfera_026",
      "2020/energosfera/energosfera_027",
      "2020/energosfera/energosfera_028",
    ],
    p5: [
      "2021/lodz_budynek_przemyslowy/lodz_budynek_przemyslowy_001",
      "2021/lodz_budynek_przemyslowy/lodz_budynek_przemyslowy_002",
      "2021/lodz_budynek_przemyslowy/lodz_budynek_przemyslowy_003",
      "2021/lodz_budynek_przemyslowy/lodz_budynek_przemyslowy_004",
      "2021/lodz_budynek_przemyslowy/lodz_budynek_przemyslowy_005",
      "2021/lodz_budynek_przemyslowy/lodz_budynek_przemyslowy_006",
    ],
    p6: [
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_001",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_002",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_003",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_004",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_005",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_006",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_007",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_008",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_009",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_010",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_011",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_012",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_013",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_014",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_015",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_016",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_017",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_018",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_019",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_020",
      "2023/budynek_wielokondygnacyjny/budynek_wielokondygnacyjny_021",
    ],
    p7: [
      "2023/dom_35m2/dom_35m2_001",
      "2023/dom_35m2/dom_35m2_002",
      "2023/dom_35m2/dom_35m2_003",
      "2023/dom_35m2/dom_35m2_004",
      "2023/dom_35m2/dom_35m2_005",
    ],
    p8: [
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_001",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_002",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_003",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_004",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_005",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_006",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_007",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_008",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_009",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_010",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_011",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_012",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_013",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_014",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_015",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_016",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_017",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_018",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_019",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_020",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_021",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_022",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_023",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_024",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_025",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_026",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_027",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_028",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_029",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_030",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_031",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_032",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_033",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_034",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_035",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_036",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_037",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_038",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_039",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_040",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_041",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_042",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_043",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_044",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_045",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_046",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_047",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_048",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_049",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_050",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_051",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_052",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_053",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_054",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_055",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_056",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_057",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_058",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_059",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_060",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_061",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_062",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_063",
      "2023/grotniki_budynek_mieszkalny/grotniki_budynek_mieszkalny_064",
    ],
    p9: [
      "2023/stacja_uzdatniania_wody/stacja_uzdatniania_wody_001",
      "2023/stacja_uzdatniania_wody/stacja_uzdatniania_wody_002",
      "2023/stacja_uzdatniania_wody/stacja_uzdatniania_wody_003",
      "2023/stacja_uzdatniania_wody/stacja_uzdatniania_wody_004",
      "2023/stacja_uzdatniania_wody/stacja_uzdatniania_wody_005",
      "2023/stacja_uzdatniania_wody/stacja_uzdatniania_wody_006",
      "2023/stacja_uzdatniania_wody/stacja_uzdatniania_wody_007",
      "2023/stacja_uzdatniania_wody/stacja_uzdatniania_wody_008",
      "2023/stacja_uzdatniania_wody/stacja_uzdatniania_wody_009",
      "2023/stacja_uzdatniania_wody/stacja_uzdatniania_wody_010",
      "2023/stacja_uzdatniania_wody/stacja_uzdatniania_wody_011",
      "2023/stacja_uzdatniania_wody/stacja_uzdatniania_wody_012",
      "2023/stacja_uzdatniania_wody/stacja_uzdatniania_wody_013",
      "2023/stacja_uzdatniania_wody/stacja_uzdatniania_wody_014",
      "2023/stacja_uzdatniania_wody/stacja_uzdatniania_wody_015",
      "2023/stacja_uzdatniania_wody/stacja_uzdatniania_wody_016",
      "2023/stacja_uzdatniania_wody/stacja_uzdatniania_wody_017",
    ],
    p10: [
      "2024/grotniki_budynek_przemyslowy/grotniki_budynek_przemyslowy_001",
      "2024/grotniki_budynek_przemyslowy/grotniki_budynek_przemyslowy_002",
      "2024/grotniki_budynek_przemyslowy/grotniki_budynek_przemyslowy_003",
      "2024/grotniki_budynek_przemyslowy/grotniki_budynek_przemyslowy_004",
      "2024/grotniki_budynek_przemyslowy/grotniki_budynek_przemyslowy_005",
      "2024/grotniki_budynek_przemyslowy/grotniki_budynek_przemyslowy_006",
      "2024/grotniki_budynek_przemyslowy/grotniki_budynek_przemyslowy_007",
      "2024/grotniki_budynek_przemyslowy/grotniki_budynek_przemyslowy_008",
      "2024/grotniki_budynek_przemyslowy/grotniki_budynek_przemyslowy_009",
      "2024/grotniki_budynek_przemyslowy/grotniki_budynek_przemyslowy_010",
    ],
    p11: [
      "2025/starowa_gora_budynek_mieszkalny/starowa_gora_budynek_mieszkalny_001",
      "2025/starowa_gora_budynek_mieszkalny/starowa_gora_budynek_mieszkalny_002",
      "2025/starowa_gora_budynek_mieszkalny/starowa_gora_budynek_mieszkalny_003",
      "2025/starowa_gora_budynek_mieszkalny/starowa_gora_budynek_mieszkalny_004",
      "2025/starowa_gora_budynek_mieszkalny/starowa_gora_budynek_mieszkalny_005",
      "2025/starowa_gora_budynek_mieszkalny/starowa_gora_budynek_mieszkalny_006",
      "2025/starowa_gora_budynek_mieszkalny/starowa_gora_budynek_mieszkalny_007",
      "2025/starowa_gora_budynek_mieszkalny/starowa_gora_budynek_mieszkalny_008",
    ],
  };

  let currentGallery: string[] = [];
  let currentIndex = 0;
  let lastFocusedElement: HTMLElement | null = null;

  function trapFocus(element: HTMLElement) {
    if (focusTrapActive) return;
    focusTrapActive = true;
    focusableElements = Array.from(
      element.querySelectorAll<HTMLElement>(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]'
      )
    );
    firstFocusableEl = focusableElements[0] || null;
    lastFocusableEl = focusableElements[focusableElements.length - 1] || null;
    lastFocusedElement = document.activeElement as HTMLElement;
    console.log(lastFocusedElement);

    element.addEventListener("keydown", focusTrapHandler);
  }

  function releaseFocusTrap() {
    if (!focusTrapActive) return;
    focusTrapActive = false;
    modalContent.removeEventListener("keydown", focusTrapHandler);
    console.log(lastFocusedElement);
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function focusTrapHandler(e: KeyboardEvent) {
    if (e.key !== "Tab") return;
    if (focusableElements.length === 0) {
      e.preventDefault();
      return;
    }

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusableEl) {
        e.preventDefault();
        lastFocusableEl?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusableEl) {
        e.preventDefault();
        firstFocusableEl?.focus();
      }
    }
  }

  function openModal(galleryId: string | undefined): void {
    if (!galleryId || !(galleryId in galleries)) return;
    trapFocus(modal);
    currentGallery = galleries[galleryId];
    currentIndex = 0;
    showImage();
    modal.classList.add("active");
    btnClose.focus();
  }

  function closeModal(): void {
    modal.classList.remove("active");
    releaseFocusTrap();
  }

  function showImage(): void {
    if (!currentGallery.length) return;
    const baseName = currentGallery[currentIndex].replace(
      /\.(jpe?g|png|webp|avif)$/i,
      ""
    );

    // Składanie ścieżek do plików
    const webp1x = `./images/gallery/${baseName}-1200.webp`;
    const webp2x = `./images/gallery/${baseName}-2400.webp`;
    const jpg1x = `./images/gallery/${baseName}-1200.jpg`;

    const picture = document.getElementById("modal-picture");
    if (picture) {
      const img = picture.querySelector("img");
      picture.querySelectorAll("source")[0].srcset = `${webp2x} 2x`;
      picture.querySelectorAll("source")[1].srcset = `${webp1x} 1x`;
      picture.querySelectorAll("source")[2].srcset = `${jpg1x} 1x`;
      if (img) {
        img.src = jpg1x;
        img.alt = `Zdjęcie ${currentIndex + 1} z ${currentGallery.length}`;
      }
    }
    counter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
  }

  function nextImage(): void {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    showImage();
  }

  function prevImage(): void {
    currentIndex =
      (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    showImage();
  }

  projects.forEach(p => {
    p.addEventListener("click", () => openModal(p.dataset.gallery));
  });

  btnClose.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  btnNext.addEventListener("click", nextImage);
  btnPrev.addEventListener("click", prevImage);

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });
}

export default initGallery;
