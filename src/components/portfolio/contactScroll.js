export const CONTACT_SCROLL_STORAGE_KEY = "portfolio-scroll-to-contact";

export function scrollToContact({ behavior = "smooth" } = {}) {
  if (typeof document === "undefined") {
    return false;
  }

  const contactSection = document.getElementById("contact");

  if (contactSection) {
    contactSection.scrollIntoView({ behavior, block: "start" });
    return true;
  }

  return false;
}
