import Link from "next/link";
import { portfolioContent } from "@/content/portfolioContent";
import styles from "./page.module.css";

export const metadata = {
  title: "Credentials | Manash Hada",
  description:
    "All certifications, recognition, and participation highlights for Manash Hada with public or official links where available.",
};

function CredentialRow({ item }) {
  const content = (
    <>
      <div className={styles.rowHead}>
        <h3 className={styles.rowTitle}>{item.title}</h3>
        <p className={styles.rowIssuer}>{item.issuer}</p>
      </div>
      {item.note ? <p className={styles.rowNote}>{item.note}</p> : null}
    </>
  );

  if (!item.href) {
    return (
      <article className={styles.rowStatic}>
        {content}
      </article>
    );
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className={styles.rowLink}
      style={{ "--credential-accent": item.accent }}
    >
      {content}
    </a>
  );
}

export default function CredentialsPage() {
  const { credentials, otherCredentials } = portfolioContent;

  const groups = [
    {
      label: "Verified Credentials",
      title: "Primary certifications with direct public verification or issuer pages.",
      items: credentials,
    },
    {
      label: "Additional Credentials",
      title: "Recognition, participation, and additional course completions in portfolio order.",
      items: otherCredentials,
    },
  ];

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link href="/#stack" className={styles.backLink}>
          Back to portfolio
        </Link>

        <header className={styles.header}>
          <p className={styles.eyebrow}>Credentials</p>
          <h1 className={styles.title}>All certifications, recognition, and participation in one place.</h1>
          <p className={styles.copy}>
            Public verification and official course or organization pages are linked where
            available. Everything else is still listed in the same sequence as the portfolio.
          </p>
        </header>

        <div className={styles.sections}>
          {groups.map((group) => (
            <section key={group.label} className={styles.section} aria-label={group.label}>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionLabel}>{group.label}</p>
                <h2 className={styles.sectionTitle}>{group.title}</h2>
              </div>

              <div className={styles.list}>
                {group.items.map((item) => (
                  <CredentialRow key={`${item.title}-${item.issuer}`} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
