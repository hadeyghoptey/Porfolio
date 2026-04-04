"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CONTACT_SCROLL_STORAGE_KEY,
  scrollToContact,
} from "./contactScroll";
import styles from "./portfolio.module.css";

const NAV_HIDE_OFFSET = 96;
const NAV_SCROLL_DELTA = 12;

export default function StickyNav({
  items,
  name,
  role,
  status,
  statusHref = null,
  homeHref = "#main",
  activeHref = null,
}) {
  const router = useRouter();
  const [activeId, setActiveId] = useState(
    items.find((item) => item.id)?.id ?? null
  );
  const [isVisible, setIsVisible] = useState(true);
  const isExternalStatusHref =
    typeof statusHref === "string" &&
    /^(https?:)?\/\//.test(statusHref);
  const isInternalStatusAction =
    typeof statusHref === "string" && !isExternalStatusHref;

  const handleStatusClick = (event) => {
    if (!isInternalStatusAction) return;

    event.preventDefault();
    setIsVisible(true);

    if (scrollToContact()) {
      return;
    }

    window.sessionStorage.setItem(CONTACT_SCROLL_STORAGE_KEY, "true");
    router.push("/");
  };

  useEffect(() => {
    const trackedItems = items.filter((item) => item.id);
    const sections = trackedItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    let lastScrollY = window.scrollY;

    const updateActiveSection = () => {
      if (sections.length === 0) {
        setActiveId(null);
        return;
      }

      const marker = window.scrollY + window.innerHeight * 0.32;
      let currentSection = sections[0];

      for (const section of sections) {
        if (section.offsetTop <= marker) {
          currentSection = section;
          continue;
        }

        break;
      }

      const nearPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8;

      if (nearPageBottom) {
        currentSection = sections[sections.length - 1];
      }

      setActiveId((previous) =>
        previous === currentSection.id ? previous : currentSection.id
      );
    };

    const updateNavVisibility = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      if (currentScrollY <= NAV_SCROLL_DELTA) {
        setIsVisible(true);
      } else if (
        scrollDelta > NAV_SCROLL_DELTA &&
        currentScrollY > NAV_HIDE_OFFSET
      ) {
        setIsVisible(false);
      } else if (scrollDelta < -NAV_SCROLL_DELTA) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    const handlePositionChange = () => {
      updateActiveSection();
      updateNavVisibility();
    };

    handlePositionChange();
    window.addEventListener("scroll", handlePositionChange, { passive: true });
    window.addEventListener("resize", handlePositionChange);
    window.addEventListener("hashchange", handlePositionChange);

    return () => {
      window.removeEventListener("scroll", handlePositionChange);
      window.removeEventListener("resize", handlePositionChange);
      window.removeEventListener("hashchange", handlePositionChange);
    };
  }, [items]);

  return (
    <header
      className={[styles.navShell, !isVisible ? styles.navShellHidden : ""]
        .filter(Boolean)
        .join(" ")}
      onFocusCapture={() => setIsVisible(true)}
    >
      <div className={styles.navInner}>
        <div className={styles.navMeta}>
          {homeHref.startsWith("#") ? (
            <a href={homeHref} className={styles.navName}>
              {name}
            </a>
          ) : (
            <Link href={homeHref} className={styles.navName}>
              {name}
            </Link>
          )}
          <p className={styles.navRole}>{role}</p>
        </div>

        <nav aria-label="Primary" className={styles.navLinks}>
          {items.map((item) => {
            if (item.href) {
              const isActive = activeHref === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  prefetch={false}
                  aria-current={isActive ? "location" : undefined}
                  className={isActive ? styles.navLinkActive : styles.navLink}
                >
                  {item.label}
                </Link>
              );
            }

            const isActive = activeId === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveId(item.id)}
                aria-current={isActive ? "location" : undefined}
                className={isActive ? styles.navLinkActive : styles.navLink}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className={styles.navStatus}>
          <span className={styles.statusDot} aria-hidden="true" />
          {!statusHref ? (
            <span className={styles.statusLink}>{status}</span>
          ) : isExternalStatusHref ? (
            <a
              href={statusHref}
              target="_blank"
              rel="noreferrer"
              className={styles.statusLink}
            >
              {status}
            </a>
          ) : isInternalStatusAction ? (
            <a
              href={statusHref}
              className={styles.statusLink}
              onClick={handleStatusClick}
            >
              {status}
            </a>
          ) : (
            <Link href={statusHref} className={styles.statusLink} onClick={handleStatusClick}>
              {status}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
