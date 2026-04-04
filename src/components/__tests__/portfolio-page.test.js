import React from "react";
import { act, render, screen } from "@testing-library/react";
import Home from "@/app/page";
import {
  HOMEPAGE_LOADER_DURATION_MS,
  HOMEPAGE_LOADER_STORAGE_KEY,
} from "@/components/portfolio/HomeFirstLoadGate";

function renderHomePage({ skipInitialLoader = true } = {}) {
  window.sessionStorage.clear();

  if (skipInitialLoader) {
    window.sessionStorage.setItem(HOMEPAGE_LOADER_STORAGE_KEY, "true");
  }

  return render(<Home />);
}

describe("portfolio homepage", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("shows the loading animation before revealing the homepage on first visit", () => {
    jest.useFakeTimers();

    renderHomePage({ skipInitialLoader: false });

    expect(screen.getByLabelText(/loading homepage/i)).toBeInTheDocument();
    expect(window.sessionStorage.getItem(HOMEPAGE_LOADER_STORAGE_KEY)).toBe("true");

    act(() => {
      jest.advanceTimersByTime(HOMEPAGE_LOADER_DURATION_MS);
    });

    expect(screen.queryByLabelText(/loading homepage/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /projects built close to offensive security workflows/i,
      })
    ).toBeInTheDocument();
  });

  it("renders the rebuilt editorial sections in order and removes terminal-era UI", () => {
    renderHomePage();

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
    renderHomePage();

    const resumeLink = screen.getByRole("link", {
      name: /download portfolio/i,
    });

    expect(resumeLink).toHaveAttribute("href", "/Manash Hada.pdf");
    expect(resumeLink).toHaveAttribute("download", "Manash-Hada.pdf");
  });

  it("renders primary credentials and the other page link", () => {
    renderHomePage();

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
    renderHomePage();

    expect(screen.getByRole("link", { name: "Gallery" })).toHaveAttribute(
      "href",
      "/gallery"
    );
  });

  it("renders the footer email CTA, social marks, and education website links", async () => {
    renderHomePage();

    expect(screen.getByLabelText("manashada@proton.me")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /\[\s*copy email\s*\]/i })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /\[\s*open in email client\s*\]/i })).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:manashada@proton.me")
    );

    expect(screen.getByRole("link", { name: "GitHub profile" })).toHaveAttribute(
      "href",
      "https://github.com/hadeyghoptey"
    );

    expect(screen.getByRole("link", { name: "LinkedIn profile" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/manash-hada-12694u/"
    );

    expect(screen.getByRole("link", { name: "Hack The Box profile" })).toHaveAttribute(
      "href",
      "https://profile.hackthebox.com/profile/019cfb4f-f67e-7359-b0d1-083445e3c8c4"
    );

    expect(screen.getByRole("link", { name: "TryHackMe profile" })).toHaveAttribute(
      "href",
      "https://tryhackme.com/p/hadeyghoptey"
    );

    expect(screen.getByRole("link", { name: "Medium profile" })).toHaveAttribute(
      "href",
      "https://medium.com/@hadamanash2023"
    );

    expect(screen.queryByRole("link", { name: "FlagForge profile" })).not.toBeInTheDocument();

    expect(screen.getByLabelText(/discord hadeyghopte/i)).toBeInTheDocument();
    expect(screen.getByText("Built with")).toBeInTheDocument();
    expect(screen.getByText("Next.js 15")).toBeInTheDocument();
    expect(screen.queryByText("Powered by")).not.toBeInTheDocument();
    expect(screen.queryByText("React 19")).not.toBeInTheDocument();
    expect(screen.getByText("Styled in")).toBeInTheDocument();
    expect(screen.getByText("CSS Modules")).toBeInTheDocument();
    expect(screen.getByText("Deployed on")).toBeInTheDocument();
    expect(screen.getByText("Vercel")).toBeInTheDocument();
    expect(screen.getByText(/kathmandu now/i)).toBeInTheDocument();
    expect(await screen.findByText(/^Week \d+$/i)).toBeInTheDocument();

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
    renderHomePage();

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

  it("renders the footer copyright line", () => {
    renderHomePage();

    expect(screen.getByText(/copyright © 2026/i)).toHaveTextContent(
      "Copyright © 2026 hadeyghoptey. Not a corporation. All rights reserved."
    );
    expect(screen.getByRole("link", { name: "hadeyghoptey" })).toHaveAttribute(
      "href",
      "https://github.com/hadeyghoptey"
    );
  });
});
