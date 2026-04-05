"use client";

import { useEffect, useRef } from "react";
import styles from "./portfolio.module.css";

export default function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  style,
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let fallbackTimerId = null;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      node.dataset.visible = "true";
      return;
    }

    const revealNode = () => {
      node.dataset.visible = "true";
    };

    const primeAboveFoldContent = () => {
      const { top } = node.getBoundingClientRect();

      if (top <= window.innerHeight * 0.9) {
        revealNode();
      }
    };

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(primeAboveFoldContent);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealNode();
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(node);

    // Fallback: avoid leaving content permanently hidden if the observer
    // misses a top-of-page element during route transitions on mobile.
    fallbackTimerId = window.setTimeout(revealNode, 900);

    return () => {
      observer.disconnect();

      if (fallbackTimerId !== null) {
        window.clearTimeout(fallbackTimerId);
      }
    };
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={[styles.reveal, className].filter(Boolean).join(" ")}
      style={{ ...style, "--reveal-delay": `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
