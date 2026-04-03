import React from "react";
import { act, render, screen } from "@testing-library/react";
import StickyNav from "@/components/portfolio/StickyNav";

describe("StickyNav", () => {
  beforeEach(() => {
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

    window.requestAnimationFrame = (callback) => {
      callback();
      return 1;
    };

    window.cancelAnimationFrame = () => {};

    ["projects", "stack", "portfolio"].forEach((id, index) => {
      const section = document.createElement("section");
      section.id = id;
      Object.defineProperty(section, "offsetTop", {
        value: index * 1000,
        configurable: true,
      });
      document.body.appendChild(section);
    });
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("links to the right sections and updates the active item while scrolling", () => {
    render(
        <StickyNav
        items={[
          { id: "projects", label: "Projects" },
          { id: "stack", label: "Stack" },
          { href: "/gallery", label: "Gallery" },
          { id: "portfolio", label: "Portfolio PDF" },
        ]}
        name="Manash Hada"
        role="Offensive Security"
        status="Available"
      />
    );

    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "href",
      "#projects"
    );
    expect(screen.getByRole("link", { name: "Stack" })).toHaveAttribute(
      "href",
      "#stack"
    );
    expect(screen.getByRole("link", { name: "Gallery" })).toHaveAttribute(
      "href",
      "/gallery"
    );

    act(() => {
      window.scrollY = 1100;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(screen.getByRole("link", { name: "Stack" })).toHaveAttribute(
      "aria-current",
      "location"
    );

    act(() => {
      window.scrollY = 3300;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(screen.getByRole("link", { name: "Portfolio PDF" })).toHaveAttribute(
      "aria-current",
      "location"
    );
  });
});
