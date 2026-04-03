"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./portfolio.module.css";

export default function StickyNav({
  items,
  name,
  role,
  status,
  statusHref = null,
  homeHref = "#top",
  activeHref = null,
}) {
  const [activeId, setActiveId] = useState(
    items.find((item) => item.id)?.id ?? null
  );
  const isExternalStatusHref =
    typeof statusHref === "string" &&
    /^(https?:)?\/\//.test(statusHref);

  useEffect(() => {
    const trackedItems = items.filter((item) => item.id);
    const sections = trackedItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (sections.length === 0) return undefined;

    const updateActiveSection = () => {
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

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, [items]);

  return (
    <header className={styles.navShell}>
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
          ) : statusHref.startsWith("#") ? (
            <a href={statusHref} className={styles.statusLink}>
              {status}
            </a>
          ) : (
            <Link href={statusHref} className={styles.statusLink}>
              {status}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
