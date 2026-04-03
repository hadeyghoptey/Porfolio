import styles from "./route-loading.module.css";

export default function RouteLoading({ label = "Loading page" }) {
  return (
    <main className={styles.page} aria-busy="true" aria-live="polite" aria-label={label}>
      <div className={styles.loader} aria-hidden="true">
        <span className={styles.ball}>
          <span className={styles.ballCenter} />
        </span>
      </div>
      <span className={styles.srOnly}>{label}</span>
    </main>
  );
}
