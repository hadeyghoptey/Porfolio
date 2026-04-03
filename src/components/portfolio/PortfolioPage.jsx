import Image from "next/image";
import Link from "next/link";
import { portfolioContent } from "@/content/portfolioContent";
import Reveal from "./Reveal";
import StickyNav from "./StickyNav";
import styles from "./portfolio.module.css";

function SectionIntro({ label, title, description, titleId }) {
  return (
    <div className={styles.sectionIntro}>
      <p className={styles.sectionLabel}>{label}</p>
      <h2 id={titleId} className={styles.sectionTitle}>
        {title}
      </h2>
      {description ? <p className={styles.sectionDescription}>{description}</p> : null}
    </div>
  );
}

function GitHubMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={styles.resourceIcon}
    >
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.31 6.84 9.66.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.35 1.11 2.92.85.09-.67.35-1.11.64-1.36-2.22-.26-4.56-1.15-4.56-5.1 0-1.13.39-2.05 1.03-2.77-.1-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.06A9.3 9.3 0 0 1 12 6.83c.85 0 1.7.12 2.5.36 1.9-1.34 2.74-1.06 2.74-1.06.56 1.43.21 2.48.11 2.74.64.72 1.03 1.64 1.03 2.77 0 3.96-2.34 4.83-4.58 5.09.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.24 10.24 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
}

function ResourceLinkList({ items, showValue = true }) {
  return (
    <div className={styles.resourceList}>
      {items.map((item) => (
        <a
          key={`${item.label}-${item.href}`}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className={styles.resourceRow}
          style={{ "--resource-accent": item.accent }}
          aria-label={item.ariaLabel ?? [item.label, item.value].filter(Boolean).join(" ")}
        >
          <span className={styles.resourceLabel}>
            {item.label === "GitHub" ? <GitHubMark /> : null}
            <span>{item.label}</span>
          </span>
          {showValue && item.value ? (
            <strong className={styles.resourceValue}>{item.value}</strong>
          ) : null}
        </a>
      ))}
    </div>
  );
}

function SkillGroup({ label, items }) {
  return (
    <div className={styles.skillGroup}>
      <h3>{label}</h3>
      <div className={styles.tagRow}>
        {items.map((item) => (
          <span key={item} className={styles.tag}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const {
    site,
    navigation,
    hero,
    projects,
    experience,
    credentials,
    skills,
    education,
    resume,
    contacts,
  } =
    portfolioContent;
  const [featuredProject, ...projectList] = projects;

  return (
    <>
      <a href="#projects" className={styles.skipLink}>
        Skip to projects
      </a>

      <div id="top" className={styles.page}>
        <StickyNav
          items={navigation}
          name={site.name}
          role={site.role}
          status={site.status}
          statusHref={site.statusHref}
        />

        <main className={styles.main}>
          <section className={styles.heroSection} aria-labelledby="hero-title">
            <Reveal className={styles.heroGrid}>
              <div className={styles.heroLead}>
                <p className={styles.heroEyebrow}>{hero.eyebrow}</p>
                <h1 id="hero-title" className={styles.heroTitle}>
                  {hero.title}
                </h1>
              </div>

              <div className={styles.heroBody}>
                <p className={styles.heroIntro}>{hero.intro}</p>

                <div className={styles.heroDetails}>
                  <div>
                    <span className={styles.detailLabel}>Location</span>
                    <p>{hero.location}</p>
                  </div>
                  <div>
                    <span className={styles.detailLabel}>Current focus</span>
                    <p>
                      Currently building security-focused projects while studying BScIT at{" "}
                      <a
                        href="https://www.presidential.edu.np/"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.heroFocusLink}
                      >
                        Presidential Graduate School
                      </a>
                      .
                    </p>
                  </div>
                  <div>
                    <span className={styles.detailLabel}>Reach me</span>
                    <p>
                      <a
                        href="mailto:manashada@proton.me"
                        className={styles.heroEmailLink}
                      >
                        manashada@proton.me
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <section id="projects" className={styles.section} aria-labelledby="projects-title">
            <SectionIntro
              label="Projects"
              titleId="projects-title"
              title="Projects built close to offensive security workflows."
              description="The strongest work here stays practical: hardware-backed attack experiments, backend systems, and toolmaking shaped by hands-on security learning."
            />

            <Reveal
              as="article"
              className={styles.featuredCard}
              style={{ "--project-accent": featuredProject.titleAccent ?? featuredProject.links[0]?.accent }}
            >
              <div className={styles.projectMeta}>
                <p>{featuredProject.category}</p>
              </div>

              <div className={styles.projectBody}>
                <div className={styles.projectCopy}>
                  <h3 className={styles.projectTitle}>
                    {featuredProject.titleHref ? (
                      <a
                        href={featuredProject.titleHref}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.projectTitleLink}
                        style={{ "--project-title-accent": featuredProject.titleAccent }}
                        aria-label={`Visit ${featuredProject.title}`}
                      >
                        {featuredProject.title}
                      </a>
                    ) : (
                      featuredProject.title
                    )}
                  </h3>
                  <p>{featuredProject.summary}</p>
                  <p className={styles.projectImpact}>{featuredProject.impact}</p>

                  <div className={styles.tagRow}>
                    {featuredProject.stack.map((item) => (
                      <span key={item} className={styles.tag}>
                        {item}
                      </span>
                    ))}
                  </div>

                  {featuredProject.links.length > 0 ? (
                    <ResourceLinkList items={featuredProject.links} showValue={false} />
                  ) : null}
                </div>

                <div
                  className={
                    featuredProject.media.length === 1
                      ? styles.mediaGridSingle
                      : styles.mediaGrid
                  }
                >
                  {featuredProject.media.map((asset) => (
                    <figure
                      key={asset.src}
                      className={
                        asset.kind === "screenshot"
                          ? `${styles.mediaCard} ${styles.mediaCardScreenshot}`
                          : styles.mediaCard
                      }
                    >
                      <Image
                        src={asset.src}
                        alt={asset.alt}
                        width={1920}
                        height={970}
                        sizes="(max-width: 900px) 100vw, (max-width: 1480px) 58vw, 820px"
                        priority={asset.kind === "screenshot"}
                        unoptimized={asset.kind === "screenshot"}
                        className={
                          asset.kind === "screenshot"
                            ? `${styles.mediaImage} ${styles.mediaImageScreenshot}`
                            : styles.mediaImage
                        }
                      />
                    </figure>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className={styles.projectList}>
              {projectList.map((project, index) => (
                <Reveal
                  as="article"
                  key={project.slug}
                  className={styles.projectCard}
                  delay={index * 70}
                  style={{ "--project-accent": project.titleAccent ?? project.links[0]?.accent }}
                >
                  <div className={styles.projectMeta}>
                    <p>{project.category}</p>
                  </div>

                  <div className={styles.projectCardBody}>
                    <div>
                      <h3 className={styles.projectTitle}>
                        {project.titleHref ? (
                          <a
                            href={project.titleHref}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.projectTitleLink}
                            style={{ "--project-title-accent": project.titleAccent }}
                            aria-label={`Visit ${project.title}`}
                          >
                            {project.title}
                          </a>
                        ) : (
                          project.title
                        )}
                      </h3>
                      <p>{project.summary}</p>
                    </div>

                    <div>
                      <p className={styles.projectImpact}>{project.impact}</p>

                      <div className={styles.tagRow}>
                        {project.stack.map((item) => (
                          <span key={item} className={styles.tag}>
                            {item}
                          </span>
                        ))}
                      </div>

                      <ResourceLinkList items={project.links} showValue={false} />

                      {project.media?.length ? (
                        <figure className={styles.projectInlineMedia}>
                          <Image
                            src={project.media[0].src}
                            alt={project.media[0].alt}
                            width={1920}
                            height={970}
                            sizes="(max-width: 900px) 100vw, (max-width: 1480px) 54vw, 780px"
                            unoptimized={project.media[0].kind === "screenshot"}
                            className={`${styles.projectInlineImage} ${styles.mediaImageScreenshot}`}
                          />
                        </figure>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="experience" className={styles.section} aria-labelledby="experience-title">
            <SectionIntro
              label="Experience"
              titleId="experience-title"
              title="Recent roles across teaching, delivery, and technical collaboration."
              description="The timeline is short but focused: shipping project work, contributing in student technical environments, and teaching clearly."
            />

            <div className={styles.timeline}>
              {experience.map((item, index) => (
                <Reveal
                  as="article"
                  key={`${item.org}-${item.role}`}
                  className={styles.timelineItem}
                  delay={index * 55}
                  style={{ "--experience-accent": item.accent }}
                >
                  <div className={styles.timelinePeriod}>
                    <span>{item.start}</span>
                    <span>{item.end}</span>
                  </div>
                  <div className={styles.timelineBody}>
                    <h3 className={styles.timelineTitle}>{item.role}</h3>
                    <ResourceLinkList
                      items={[
                        {
                          label: item.org,
                          value: "",
                          href: item.href,
                          accent: item.accent,
                          ariaLabel: `Visit ${item.org}`,
                        },
                      ]}
                    />
                    <p>{item.summary}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="stack" className={styles.section} aria-labelledby="stack-title">
            <SectionIntro
              label="Skills / Tools / Certifications"
              titleId="stack-title"
              title="Tooling depth across offensive security, scripting, web, and hardware."
              description="The stack reflects how I work in practice: enumerate, validate, script what matters, and stay comfortable across both applications and devices."
            />

            <div className={styles.stackLayout}>
              <Reveal className={styles.skillPanel}>
                <h3 id="stack-title" className={styles.stackHeading}>
                  Skills and tools
                </h3>
                <SkillGroup label="Offensive Security" items={skills.offensive} />
                <SkillGroup label="Web Development" items={skills.web} />
                <SkillGroup label="Scripting" items={skills.scripting} />
                <SkillGroup label="Hardware" items={skills.hardware} />
                <SkillGroup label="Platforms" items={skills.platforms} />
              </Reveal>

              <Reveal className={styles.credentialPanel} delay={80}>
                <h3 className={styles.stackHeading}>Credentials</h3>
                <div className={styles.credentialList}>
                  {credentials.map((credential) => (
                    <article key={credential.title} className={styles.credentialItem}>
                      <a
                        href={credential.href}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.credentialLink}
                        style={{ "--link-accent": credential.accent }}
                      >
                        <h4>{credential.title}</h4>
                      </a>
                      <p>{credential.issuer}</p>
                    </article>
                  ))}
                </div>
                <div className={styles.buttonRow}>
                  <Link href="/credentials" className={styles.secondaryButton}>
                    View all
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>

          <section id="education" className={styles.section} aria-labelledby="education-title">
            <SectionIntro
              label="Education"
              titleId="education-title"
              title="Formal study supported by constant self-driven lab work."
              description="The academic path is current, but most of the portfolio energy comes from building, breaking, and learning by doing."
            />

            <div className={styles.educationList}>
              {education.map((item, index) => (
                <Reveal
                  as="article"
                  key={item.institution}
                  className={styles.educationItem}
                  delay={index * 55}
                  style={{ "--education-accent": item.accent }}
                >
                  <div className={styles.educationPeriod}>
                    <span>{item.start}</span>
                    <span>{item.end}</span>
                  </div>
                  <div>
                    <h3 className={styles.timelineTitle}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.educationLink}
                        aria-label={`Visit ${item.institution}`}
                      >
                        {item.institution}
                      </a>
                    </h3>
                    <p>{item.award}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="portfolio" className={styles.section} aria-labelledby="portfolio-title">
            <SectionIntro
              label="Portfolio"
              titleId="portfolio-title"
              title="A direct download for the formal profile."
              description="For recruiters, collaborators, or anyone who prefers a condensed offline version."
            />

            <Reveal className={styles.resumeCard}>
              <div>
                <p className={styles.cardEyebrow}>Document</p>
                <h3 className={styles.resumeTitle}>Manash Hada.pdf</h3>
                <p className={styles.resumeCopy}>
                  Includes the current summary, experience, education history, and
                  certifications in a compact format.
                </p>
              </div>

              <a
                href={resume.href}
                download={resume.downloadName}
                className={styles.resumeButton}
              >
                {resume.label}
              </a>
            </Reveal>
          </section>
        </main>

        <footer id="contact" className={styles.footer} aria-labelledby="contact-title">
          <Reveal className={styles.footerContent}>
            <div className={styles.footerLead}>
              <p className={styles.sectionLabel}>Contact</p>
              <h2 id="contact-title" className={styles.footerTitle}>
                Let&apos;s talk about security work that needs hands-on thinking.
              </h2>
              <p className={styles.footerCopy}>{site.availability}</p>
            </div>

            <div className={styles.contactList}>
              {contacts.map((item) => {
                const content = (
                  <>
                    <span className={styles.contactLabel}>{item.label}</span>
                    <strong className={styles.contactValue}>{item.value}</strong>
                  </>
                );

                if (!item.href) {
                  return (
                    <div
                      key={item.label}
                      className={styles.contactRow}
                      style={{ "--contact-accent": item.accent }}
                    >
                      {content}
                    </div>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    className={styles.contactRow}
                    style={{ "--contact-accent": item.accent }}
                  >
                    {content}
                  </a>
                );
              })}
            </div>
          </Reveal>
        </footer>
      </div>
    </>
  );
}
