import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import GalleryRoute from "@/app/gallery/page";

describe("gallery page", () => {
  it("renders the photo gallery route and back link", () => {
    render(<GalleryRoute />);

    expect(
      screen.getByRole("heading", {
        name: /project, event, and team photos collected in one place/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /back to portfolio/i })).toHaveAttribute(
      "href",
      "/#top"
    );
  });

  it("opens photos in a lightbox and supports keyboard and click navigation", () => {
    render(<GalleryRoute />);

    fireEvent.click(screen.getByRole("button", { name: /open flagforge showcase/i }));

    expect(
      screen.getByRole("dialog", { name: /flagforge showcase enlarged view/i })
    ).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "ArrowRight" });

    expect(
      screen.getByRole("dialog", { name: /team flagforge enlarged view/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /next photo/i }));

    expect(
      screen.getByRole("dialog", { name: /team safastack enlarged view/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /previous photo/i }));

    expect(
      screen.getByRole("dialog", { name: /team flagforge enlarged view/i })
    ).toBeInTheDocument();
  });
});
