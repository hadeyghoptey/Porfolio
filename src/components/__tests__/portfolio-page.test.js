import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("portfolio homepage", () => {
  it("renders the rebuilt editorial sections in order and removes terminal-era UI", () => {
    render(<Home />);

    const headings = screen
      .getAllByRole("heading")
      .map((heading) => heading.textContent);

    const orderedTitles = [
      "Projects built close to offensive security workflows.",
      "Recent roles across teaching, delivery, and technical collaboration.",
      "Tooling depth across offensive security, scripting, web, and hardware.",
      "Formal study supported by constant self-driven lab work.",
      "A direct download for the formal profile.",
    ];

    let lastIndex = -1;
    orderedTitles.forEach((title) => {
      const index = headings.indexOf(title);
      expect(index).toBeGreaterThan(lastIndex);
      lastIndex = index;
    });

    expect(
      screen.queryByText(/type 'help' for available commands/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/who's browsing\?/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ctf & labs/i)).not.toBeInTheDocument();
  });

  it("exposes the portfolio pdf download link", () => {
    render(<Home />);

    const resumeLink = screen.getByRole("link", {
      name: /download portfolio/i,
    });

    expect(resumeLink).toHaveAttribute("href", "/Manash Hada.pdf");
    expect(resumeLink).toHaveAttribute("download", "Manash-Hada.pdf");
  });

  it("renders primary credentials and the other page link", () => {
    render(<Home />);

    expect(
      screen.getByRole("link", { name: /junior penetration tester/i })
    ).toHaveAttribute(
      "href",
      "https://certs.ine.com/db5052a5-334e-4515-9948-12d2cfaad9c2#acc.zTXFNJQl"
    );

    expect(screen.getByRole("link", { name: /view all/i })).toHaveAttribute(
      "href",
      "/credentials"
    );
  });

  it("links to the separate gallery page", () => {
    render(<Home />);

    expect(screen.getByRole("link", { name: "Gallery" })).toHaveAttribute(
      "href",
      "/gallery"
    );
  });

  it("renders cyber platform contact links and education website links", () => {
    render(<Home />);

    expect(screen.getByText("Discord")).toBeInTheDocument();
    expect(screen.getByText(/^hadeyghopte$/)).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /tryhackme hadeyghoptey/i })).toHaveAttribute(
      "href",
      "https://tryhackme.com/p/hadeyghoptey"
    );

    expect(screen.getByRole("link", { name: /hack the box hadeyghoptey/i })).toHaveAttribute(
      "href",
      "https://profile.hackthebox.com/profile/019cfb4f-f67e-7359-b0d1-083445e3c8c4"
    );

    expect(screen.getByRole("link", { name: /flagforge manash-hada/i })).toHaveAttribute(
      "href",
      "https://www.flagforgectf.com/user/Manash-Hada"
    );

    expect(
      screen
        .getAllByRole("link", { name: /visit presidential graduate school/i })
        .some((link) => link.getAttribute("href") === "https://www.presidential.edu.np/")
    ).toBe(true);

    expect(
      screen
        .getAllByRole("link", { name: /visit flagforge/i })
        .some((link) => link.getAttribute("href") === "https://www.flagforgectf.com/")
    ).toBe(true);

    expect(screen.getByRole("link", { name: /visit secyourflow/i })).toHaveAttribute(
      "href",
      "https://secyourflow.vercel.app/"
    );
  });

  it("renders experience organization website links", () => {
    render(<Home />);

    expect(screen.getByRole("link", { name: /visit guru institute of engineering and technology/i })).toHaveAttribute(
      "href",
      "https://nepguru.com/"
    );

    expect(screen.getByRole("link", { name: /visit pgs software club/i })).toHaveAttribute(
      "href",
      "https://soft-club.presidential.edu.np/"
    );

    expect(screen.getAllByRole("link", { name: /visit flagforge/i })[0]).toHaveAttribute(
      "href",
      "https://www.flagforgectf.com/"
    );
  });
});
