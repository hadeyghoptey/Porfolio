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
      "/#main"
    );

    expect(screen.getByRole("link", { name: "Portfolio" })).toHaveAttribute(
      "href",
      "/portfolio"
    );

    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "href",
      "/projects"
    );

    expect(screen.getByRole("link", { name: "Gallery" })).toHaveAttribute("href", "/gallery");
    expect(screen.queryByRole("link", { name: "Contact" })).not.toBeInTheDocument();
  });

  it("opens photos in a lightbox and supports keyboard and click navigation", () => {
    render(<GalleryRoute />);

    fireEvent.click(screen.getByRole("button", { name: /^open flagforge showcase$/i }));

    expect(
      screen.getByRole("dialog", { name: /flagforge showcase enlarged view/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "FlagForge Showcase" })).toBeInTheDocument();
    expect(
      screen.getByText(/live project showcase/i)
    ).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "ArrowRight" });

    expect(
      screen.getByRole("dialog", { name: /team flagforge enlarged view/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Team FlagForge" })).toBeInTheDocument();
    expect(
      screen.getByText(/project build and showcase phase/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /next photo/i }));

    expect(
      screen.getByRole("dialog", { name: /flagforge showcase graphic enlarged view/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "FlagForge Showcase Graphic" })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /next photo/i }));

    expect(
      screen.getByRole("dialog", { name: /team safastack - waste hackathon enlarged view/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Team SafaStack - Waste Hackathon" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/safastack collaboration/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /previous photo/i }));

    expect(
      screen.getByRole("dialog", { name: /flagforge showcase graphic enlarged view/i })
    ).toBeInTheDocument();
  });
});
