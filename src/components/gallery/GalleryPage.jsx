"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  portfolioContent,
  getNavigationItemsForPath,
  getStatusHrefForPath,
} from "@/content/portfolioContent";
import StickyNav from "@/components/portfolio/StickyNav";
import styles from "./gallery.module.css";

function getWrappedIndex(index, length) {
  return (index + length) % length;
}

const galleryItems = portfolioContent.gallery.items.filter(
  (item) => !item.src.includes("-page.")
);

export default function GalleryPage() {
  const { site } = portfolioContent;
  const [activeIndex, setActiveIndex] = useState(null);
  const [transitionDirection, setTransitionDirection] = useState("open");
  const galleryNavigation = getNavigationItemsForPath("/gallery");

  const isOpen = activeIndex !== null;
  const activeItem = activeIndex === null ? null : galleryItems[activeIndex];
  const previousIndex =
    activeIndex === null ? null : getWrappedIndex(activeIndex - 1, galleryItems.length);
  const nextIndex =
    activeIndex === null ? null : getWrappedIndex(activeIndex + 1, galleryItems.length);

  useEffect(() => {
    if (activeIndex === null || typeof window === "undefined") return undefined;

    [previousIndex, nextIndex].forEach((index) => {
      if (index === null) return;

      const preloadedImage = new window.Image();
      preloadedImage.src = galleryItems[index].src;
    });

    return undefined;
  }, [activeIndex, nextIndex, previousIndex]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        return;
      }

      if (event.key === "ArrowRight") {
        setTransitionDirection("next");
        setActiveIndex((current) =>
          current === null ? 0 : getWrappedIndex(current + 1, galleryItems.length)
        );
      }

      if (event.key === "ArrowLeft") {
        setTransitionDirection("prev");
        setActiveIndex((current) =>
          current === null
            ? galleryItems.length - 1
            : getWrappedIndex(current - 1, galleryItems.length)
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const openItem = (index) => {
    setTransitionDirection("open");
    setActiveIndex(index);
  };
  const closeModal = () => setActiveIndex(null);
  const showPrevious = () => {
    setTransitionDirection("prev");
    setActiveIndex((current) =>
      current === null ? galleryItems.length - 1 : getWrappedIndex(current - 1, galleryItems.length)
    );
  };
  const showNext = () => {
    setTransitionDirection("next");
    setActiveIndex((current) =>
      current === null ? 0 : getWrappedIndex(current + 1, galleryItems.length)
    );
  };

  return (
    <main className={styles.page}>
      <StickyNav
        items={galleryNavigation}
        name={site.name}
        role={site.role}
        status={site.status}
        statusHref={getStatusHrefForPath("/gallery")}
        homeHref="/#main"
        activeHref="/gallery"
      />

      <div className={styles.shell}>
        <Link href="/#main" className={styles.backLink}>
          Back to portfolio
        </Link>

        <header className={styles.header}>
          <p className={styles.eyebrow}>Gallery</p>
          <h1 className={styles.title}>Project, event, and team photos collected in one place.</h1>
          <p className={styles.copy}>
            Click any photo to expand it. Use the left and right arrow keys on your keyboard, or
            the on-screen previous and next controls, to move through the gallery.
          </p>
        </header>

        <section className={styles.grid} aria-label="Photo gallery">
          {galleryItems.map((item, index) => {
            const isLargeCard =
              (index % 6 === 0 || index % 6 === 3) && item.width >= 1500;

            return (
              <button
                key={item.src}
                type="button"
                className={isLargeCard ? `${styles.card} ${styles.cardLarge}` : styles.card}
                onClick={() => openItem(index)}
                aria-label={`Open ${item.title}`}
              >
                <span className={styles.cardMedia}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={
                      isLargeCard
                        ? "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 66vw"
                        : "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    }
                    className={styles.cardImage}
                  />
                </span>
              </button>
            );
          })}
        </section>
      </div>

      {activeItem ? (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.title} enlarged view`}
          onClick={closeModal}
        >
          <button
            type="button"
            className={`${styles.modalControl} ${styles.modalClose}`}
            onClick={closeModal}
            aria-label="Close gallery"
          >
            <span aria-hidden="true">&times;</span>
            <span className={styles.controlText}>Close</span>
          </button>

          <button
            type="button"
            className={`${styles.modalControl} ${styles.modalPrev}`}
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Previous photo"
          >
            <span aria-hidden="true">&#8592;</span>
            <span className={styles.controlText}>Prev</span>
          </button>

          <div
            key={activeItem.src}
            className={styles.modalPanel}
            data-direction={transitionDirection}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalMedia}>
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                width={activeItem.width}
                height={activeItem.height}
                sizes="(max-width: 1600px) 94vw, 1400px"
                className={styles.modalImage}
                priority
                unoptimized
              />
            </div>

            <div className={styles.modalCaption}>
              <h2 className={styles.modalTitle}>{activeItem.title}</h2>
              <p className={styles.modalDescription}>
                {activeItem.description ?? activeItem.note}
              </p>
              <p className={styles.modalCount}>
                {activeIndex + 1} / {galleryItems.length}
              </p>
            </div>
          </div>

          <button
            type="button"
            className={`${styles.modalControl} ${styles.modalNext}`}
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next photo"
          >
            <span className={styles.controlText}>Next</span>
            <span aria-hidden="true">&#8594;</span>
          </button>
        </div>
      ) : null}
    </main>
  );
}
