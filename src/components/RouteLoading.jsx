import styles from "./route-loading.module.css";

function Triangle() {
  return (
    <svg viewBox="0 0 64 56" aria-hidden="true" className={styles.triangleSvg}>
      <polygon points="32 6 56 48 8 48" />
    </svg>
  );
}

export default function RouteLoading({ label = "Loading page" }) {
  return (
    <main className={styles.page} aria-busy="true" aria-live="polite" aria-label={label}>
      <div className={styles.loader} aria-hidden="true">
        <span className={`${styles.triangleLayer} ${styles.triangleMain}`}>
          <Triangle />
        </span>
      </div>
      <span className={styles.srOnly}>{label}</span>
    </main>
  );
}
