import React from "react";
import { render, screen } from "@testing-library/react";
import CredentialsPage from "@/app/credentials/page";

describe("credentials page", () => {
  it("renders the combined credentials route and links back to the portfolio", () => {
    render(<CredentialsPage />);

    expect(
      screen.getByRole("heading", {
        name: /all certifications, recognition, and participation in one place/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /back to portfolio/i })
    ).toHaveAttribute("href", "/projects#stack");

    expect(
      screen.getByRole("link", { name: /certified associate penetration tester \(capt\) hackviser/i })
    ).toHaveAttribute("href", "https://hackviser.com/capt");

    expect(
      screen.getByRole("link", { name: /introduction to cybersecurity cisco/i })
    ).toHaveAttribute("href", "https://www.netacad.com/cybersecurity");
  });
});
