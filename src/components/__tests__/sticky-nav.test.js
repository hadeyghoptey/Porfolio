import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { CONTACT_SCROLL_STORAGE_KEY } from "@/components/portfolio/contactScroll";
import StickyNav from "@/components/portfolio/StickyNav";
import styles from "@/components/portfolio/portfolio.module.css";

describe("StickyNav", () => {
  beforeEach(() => {
    globalThis.__mockRouterPush.mockReset();
    window.sessionStorage.clear();

    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
      configurable: true,
    });

    Object.defineProperty(window, "innerHeight", {
      value: 1000,
      writable: true,
      configurable: true,
    });

    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 4000,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders the simplified route nav and marks the active page link", () => {
    render(
      <StickyNav
        items={[
          { href: "/portfolio", label: "Portfolio" },
          { href: "/projects", label: "Projects" },
          { href: "/gallery", label: "Gallery" },
        ]}
        name="Manash Hada"
        role="Offensive Security"
        status="Available"
        activeHref="/projects"
      />
    );

    expect(screen.getByRole("link", { name: "Portfolio" })).toHaveAttribute(
      "href",
      "/portfolio"
    );
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "href",
      "/projects"
    );
    expect(screen.getByRole("link", { name: "Gallery" })).toHaveAttribute(
      "href",
      "/gallery"
    );
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "aria-current",
      "location"
    );
    expect(screen.getByRole("link", { name: "Portfolio" })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("stays visible near the top, hides on downward scroll, and reappears on upward scroll", () => {
    render(
      <StickyNav
        items={[
          { href: "/portfolio", label: "Portfolio" },
          { href: "/projects", label: "Projects" },
          { href: "/gallery", label: "Gallery" },
        ]}
        name="Manash Hada"
        role="Offensive Security"
        status="Available"
      />
    );

    const header = document.querySelector("header");

    expect(header).not.toHaveClass(styles.navShellHidden);

    act(() => {
      window.scrollY = 160;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(header).toHaveClass(styles.navShellHidden);

    act(() => {
      window.scrollY = 120;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(header).not.toHaveClass(styles.navShellHidden);

    act(() => {
      window.scrollY = 0;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(header).not.toHaveClass(styles.navShellHidden);
  });

  it("shows again when focus moves into the nav after it has been hidden", () => {
    render(
      <StickyNav
        items={[
          { href: "/portfolio", label: "Portfolio" },
          { href: "/projects", label: "Projects" },
          { href: "/gallery", label: "Gallery" },
        ]}
        name="Manash Hada"
        role="Offensive Security"
        status="Available"
      />
    );

    const header = document.querySelector("header");

    act(() => {
      window.scrollY = 160;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(header).toHaveClass(styles.navShellHidden);

    fireEvent.focus(screen.getByRole("link", { name: "Gallery" }));

    expect(header).not.toHaveClass(styles.navShellHidden);
  });

  it("scrolls to the contact section on the current page when the status link is clicked", () => {
    const contactSection = document.createElement("footer");
    const scrollIntoView = jest.fn();

    contactSection.id = "contact";
    contactSection.scrollIntoView = scrollIntoView;
    document.body.appendChild(contactSection);

    render(
      <StickyNav
        items={[
          { href: "/portfolio", label: "Portfolio" },
          { href: "/projects", label: "Projects" },
          { href: "/gallery", label: "Gallery" },
        ]}
        name="Manash Hada"
        role="Offensive Security"
        status="Available for focused cyber work"
        statusHref="#contact"
      />
    );

    fireEvent.click(
      screen.getByRole("link", { name: "Available for focused cyber work" })
    );

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
    expect(globalThis.__mockRouterPush).not.toHaveBeenCalled();
  });

  it("queues a contact scroll and routes home when the current page has no contact section", () => {
    render(
      <StickyNav
        items={[
          { href: "/portfolio", label: "Portfolio" },
          { href: "/projects", label: "Projects" },
          { href: "/gallery", label: "Gallery" },
        ]}
        name="Manash Hada"
        role="Offensive Security"
        status="Available for focused cyber work"
        statusHref="/"
      />
    );

    fireEvent.click(
      screen.getByRole("link", { name: "Available for focused cyber work" })
    );

    expect(window.sessionStorage.getItem(CONTACT_SCROLL_STORAGE_KEY)).toBe("true");
    expect(globalThis.__mockRouterPush).toHaveBeenCalledWith("/");
  });
});
