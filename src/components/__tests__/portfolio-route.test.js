import React from "react";
import { render, screen } from "@testing-library/react";
import PortfolioRoute from "@/app/portfolio/page";

describe("portfolio route", () => {
  it("renders the shared top and contact sections with experience, education, and download content", () => {
    render(<PortfolioRoute />);

    expect(
      screen.getByRole("heading", {
        name: /offensive security work built close to the terminal/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /recent roles across teaching, delivery, and technical collaboration/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /formal study supported by constant self-driven lab work/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /a direct download for the formal profile/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /^contact$/i })).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: /projects built close to offensive security workflows/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: /tooling depth across offensive security, scripting, web, and hardware/i,
      })
    ).not.toBeInTheDocument();
  });

  it("uses the simplified page-level nav on the portfolio route", () => {
    render(<PortfolioRoute />);

    expect(screen.getByRole("link", { name: "Manash Hada" })).toHaveAttribute(
      "href",
      "/"
    );

    expect(screen.getByRole("link", { name: "Portfolio" })).toHaveAttribute(
      "href",
      "/portfolio"
    );

    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: "Gallery" })).toHaveAttribute("href", "/gallery");
    expect(screen.queryByRole("link", { name: "Experience" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Stack" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Education" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Contact" })).not.toBeInTheDocument();
  });

  it("keeps the portfolio pdf download on the dedicated route", () => {
    render(<PortfolioRoute />);

    const resumeLink = screen.getByRole("link", {
      name: /download portfolio/i,
    });

    expect(resumeLink).toHaveAttribute("href", "/Manash Hada.pdf");
    expect(resumeLink).toHaveAttribute("download", "Manash-Hada.pdf");
  });
});
