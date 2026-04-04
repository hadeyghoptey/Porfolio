import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ProjectsRoute from "@/app/projects/page";

describe("projects page", () => {
  it("renders the shared top and contact sections with projects and stack content", () => {
    render(<ProjectsRoute />);

    expect(
      screen.getByRole("heading", {
        name: /practical offensive security, project-driven learning, and tooling built close to the terminal/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /projects built close to offensive security workflows/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /tooling depth across offensive security, scripting, web, and hardware/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /^contact$/i })).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: /recent roles across teaching, delivery, and technical collaboration/i,
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
  });

  it("uses the simplified page-level nav on the projects route", () => {
    render(<ProjectsRoute />);

    expect(screen.getByRole("link", { name: "Manash Hada" })).toHaveAttribute(
      "href",
      "/#main"
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

  it("keeps the credentials link on the stack section", () => {
    render(<ProjectsRoute />);

    expect(screen.getByRole("link", { name: /view all/i })).toHaveAttribute(
      "href",
      "/credentials"
    );
  });

  it("removes BAU_KO_PHONE and reveals lower-ranked projects only after clicking show all", () => {
    render(<ProjectsRoute />);

    expect(screen.queryByText("BAU_KO_PHONE")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /show all projects/i })
    ).toBeInTheDocument();

    expect(screen.getByText("SecYourFlow")).toBeInTheDocument();
    expect(screen.getByText("Raspberry Pi NIDS with Suricata")).toBeInTheDocument();
    expect(screen.queryByText("ESP32-Marauder")).not.toBeInTheDocument();
    expect(screen.queryByText("DEAUTH with Wi-Fi Dongle")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /show all projects/i }));

    expect(screen.getByText("ESP32-Marauder")).toBeInTheDocument();
    expect(screen.getByText("DEAUTH with Wi-Fi Dongle")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /show all projects/i })
    ).not.toBeInTheDocument();
  });
});
