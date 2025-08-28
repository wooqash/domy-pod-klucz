let focusableElements: HTMLElement[] = [];
let firstFocusableEl: HTMLElement | null = null;
let lastFocusableEl: HTMLElement | null = null;
let focusTrapActive = false;
let lastFocusedElement: HTMLElement | null = null;

export function trapFocus(element: HTMLElement) {
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

  element.addEventListener("keydown", focusTrapHandler);
}

export function releaseFocusTrap(element: HTMLElement) {
  if (!focusTrapActive) return;
  focusTrapActive = false;
  element.removeEventListener("keydown", focusTrapHandler);
  console.log(lastFocusedElement);
  if (lastFocusedElement) lastFocusedElement.focus();
}

export function focusTrapHandler(e: KeyboardEvent) {
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
