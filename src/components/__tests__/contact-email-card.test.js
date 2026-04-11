import React from "react";
import { act, render, screen } from "@testing-library/react";
import ContactEmailCard from "@/components/portfolio/ContactEmailCard";
import { HomeFirstLoadReadyContext } from "@/components/portfolio/HomeFirstLoadGate";

const EMAIL = "manashada@proton.me";

describe("ContactEmailCard", () => {
  const OriginalIntersectionObserver = window.IntersectionObserver;
  let observers = [];

  beforeEach(() => {
    jest.useFakeTimers();
    observers = [];

    window.IntersectionObserver = class MockIntersectionObserver {
      constructor(callback) {
        this.callback = callback;
        this.target = null;
        observers.push(this);
      }

      observe = (target) => {
        this.target = target;
      };

      unobserve = () => {};

      disconnect = () => {};

      trigger = (isIntersecting = true) => {
        this.callback([{ isIntersecting, target: this.target }]);
      };
    };
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    window.IntersectionObserver = OriginalIntersectionObserver;
  });

  it("types the email address once the card intersects", () => {
    render(<ContactEmailCard email={EMAIL} href={`mailto:${EMAIL}`} />);

    expect(screen.getByLabelText(EMAIL)).not.toHaveTextContent(EMAIL);
    expect(observers).toHaveLength(1);

    act(() => {
      observers[0].trigger(true);
    });

    expect(screen.getByLabelText(EMAIL)).not.toHaveTextContent(EMAIL);

    act(() => {
      window.dispatchEvent(new Event("scroll"));
      jest.advanceTimersByTime(EMAIL.length * 55 + 50);
    });

    expect(screen.getByLabelText(EMAIL)).toHaveTextContent(EMAIL);
  });

  it("waits for the homepage loader gate before starting the typing animation", () => {
    const { rerender } = render(
      <HomeFirstLoadReadyContext.Provider value={false}>
        <ContactEmailCard email={EMAIL} href={`mailto:${EMAIL}`} />
      </HomeFirstLoadReadyContext.Provider>
    );

    expect(screen.getByLabelText(EMAIL)).not.toHaveTextContent(EMAIL);
    expect(observers).toHaveLength(0);

    rerender(
      <HomeFirstLoadReadyContext.Provider value={true}>
        <ContactEmailCard email={EMAIL} href={`mailto:${EMAIL}`} />
      </HomeFirstLoadReadyContext.Provider>
    );

    expect(observers).toHaveLength(1);

    act(() => {
      observers[0].trigger(true);
    });

    expect(screen.getByLabelText(EMAIL)).not.toHaveTextContent(EMAIL);

    act(() => {
      window.dispatchEvent(new Event("scroll"));
      jest.advanceTimersByTime(EMAIL.length * 55 + 50);
    });

    expect(screen.getByLabelText(EMAIL)).toHaveTextContent(EMAIL);
  });
});
