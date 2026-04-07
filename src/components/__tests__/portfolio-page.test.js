import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
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
        name: /offensive security work built close to the terminal/i,
      })
    ).toBeInTheDocument();
  });

  it("renders only the hero and shared contact sections on the homepage", () => {
    renderHomePage();

    expect(
      screen.getByRole("heading", {
        name: /offensive security work built close to the terminal/i,
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
        name: /recent roles across teaching, delivery, and technical collaboration/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: /tooling depth across offensive security, scripting, web, and hardware/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: /formal study supported by constant self-driven lab work/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: /a direct download for the formal profile/i,
      })
    ).not.toBeInTheDocument();

    expect(screen.getByRole("link", { name: "manashada@proton.me" })).toHaveAttribute(
      "href",
      expect.stringContaining("https://mail.google.com/mail/?view=cm&fs=1&to=manashada%40proton.me")
    );

    expect(screen.queryByRole("link", { name: /download portfolio/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /view all/i })).not.toBeInTheDocument();
  });

  it("renders the simplified three-link nav on home", () => {
    renderHomePage();

    expect(screen.getByRole("link", { name: "Portfolio" })).toHaveAttribute(
      "href",
      "/portfolio"
    );

    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "href",
      "/projects"
    );

    expect(screen.getByRole("link", { name: "Gallery" })).toHaveAttribute("href", "/gallery");
    expect(screen.queryByRole("link", { name: "Experience" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Stack" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Education" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Contact" })).not.toBeInTheDocument();
  });

  it("renders the footer email CTA, social marks, and build metadata", async () => {
    renderHomePage();

    expect(screen.getByLabelText("manashada@proton.me")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /\[\s*copy email\s*\]/i })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /\[\s*open email client\s*\]/i })).toHaveAttribute(
      "href",
      expect.stringContaining("https://mail.google.com/mail/?view=cm&fs=1&to=manashada%40proton.me")
    );

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/hadeyghoptey"
    );

    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/manash-hada-12694u/"
    );

    expect(screen.getByRole("link", { name: "Hack The Box" })).toHaveAttribute(
      "href",
      "https://app.hackthebox.com/public/users/3018982"
    );

    expect(screen.getByRole("link", { name: "TryHackMe" })).toHaveAttribute(
      "href",
      "https://tryhackme.com/p/hadeyghoptey"
    );

    expect(screen.getByRole("link", { name: "Medium" })).toHaveAttribute(
      "href",
      "https://medium.com/@hadamanash2023"
    );

    expect(screen.getByLabelText(/discord hadeyghopte/i)).toBeInTheDocument();
    expect(screen.getByText("Built with")).toBeInTheDocument();
    expect(screen.getByText("Next.js 15")).toBeInTheDocument();
    expect(screen.getByText("Styled in")).toBeInTheDocument();
    expect(screen.getByText("CSS Modules")).toBeInTheDocument();
    expect(screen.getByText("Deployed on")).toBeInTheDocument();
    expect(screen.getByText("Vercel")).toBeInTheDocument();
    expect(screen.getByText(/kathmandu now/i)).toBeInTheDocument();
    expect(await screen.findByText(/^Week \d+$/i)).toBeInTheDocument();
  });

  it("copies the discord handle from the footer and shows copied feedback", async () => {
    jest.useFakeTimers();

    const writeText = jest.fn().mockResolvedValue(undefined);

    Object.defineProperty(window.navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    renderHomePage();

    const discordButton = screen.getByRole("button", { name: /copy discord hadeyghoptey/i });

    expect(discordButton).toHaveAttribute("data-hover-label", "hadeyghoptey");
    expect(discordButton).toHaveAttribute("data-feedback-visible", "false");

    await act(async () => {
      fireEvent.click(discordButton);
    });

    expect(writeText).toHaveBeenCalledWith("hadeyghoptey");
    expect(discordButton).toHaveAttribute("data-hover-label", "Copied");
    expect(discordButton).toHaveAttribute("data-feedback-visible", "true");

    act(() => {
      jest.advanceTimersByTime(1800);
    });

    expect(discordButton).toHaveAttribute("data-hover-label", "hadeyghoptey");
    expect(discordButton).toHaveAttribute("data-feedback-visible", "false");
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
