import styles from "./loading.module.css";

export default function GalleryLoading() {
  const skeletonItems = Array.from({ length: 6 }, (_, index) => index);

  return (
    <main className={styles.page} aria-busy="true" aria-live="polite">
      <div className={styles.shell}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Gallery</p>
          <h1 className={styles.title}>Loading gallery assets and preparing the lightbox.</h1>
          <p className={styles.copy}>
            Optimizing images and building the grid for a smoother transition.
          </p>
        </div>

        <div className={styles.progress} aria-hidden="true">
          <span className={styles.progressBar} />
        </div>

        <section className={styles.grid} aria-label="Gallery loading preview">
          {skeletonItems.map((item) => (
            <article key={item} className={styles.card}>
              <div className={styles.media} />
              <div className={styles.copyBlock}>
                <div className={styles.lineWide} />
                <div className={styles.lineNarrow} />
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
