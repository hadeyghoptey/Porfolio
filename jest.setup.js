// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

if (typeof window !== "undefined") {
  window.matchMedia =
    window.matchMedia ||
    function matchMedia() {
      return {
        matches: false,
        media: "",
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      };
    };

  window.IntersectionObserver =
    window.IntersectionObserver ||
    class IntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
}
