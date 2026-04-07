"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ContactEmailCard from "./ContactEmailCard";
import { copyToClipboard } from "./copyToClipboard";
import { portfolioContent, getNavigationItemsForPath, getStatusHrefForPath } from "@/content/portfolioContent";
import {
  CONTACT_SCROLL_STORAGE_KEY,
  scrollToContact,
} from "./contactScroll";
import FooterNowCard from "./FooterNowCard";
import Reveal from "./Reveal";
import { HackTheBox, TryHackMe } from "./SocialIcons";
import StickyNav from "./StickyNav";
import styles from "./portfolio.module.css";

const INITIAL_PROJECT_CARD_COUNT = 2;
const DEFAULT_GMAIL_SUBJECT = "Security collaboration";
const DEFAULT_GMAIL_BODY = "Hi Manash,\n\nI found your portfolio and wanted to reach out.\n\n";
const COPY_FEEDBACK_MS = 1800;

function buildGmailComposeHref(email, subject = DEFAULT_GMAIL_SUBJECT, body = DEFAULT_GMAIL_BODY) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

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

function GitHubMark({ className = styles.resourceIcon }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.31 6.84 9.66.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.35 1.11 2.92.85.09-.67.35-1.11.64-1.36-2.22-.26-4.56-1.15-4.56-5.1 0-1.13.39-2.05 1.03-2.77-.1-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.06A9.3 9.3 0 0 1 12 6.83c.85 0 1.7.12 2.5.36 1.9-1.34 2.74-1.06 2.74-1.06.56 1.43.21 2.48.11 2.74.64.72 1.03 1.64 1.03 2.77 0 3.96-2.34 4.83-4.58 5.09.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.24 10.24 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
}

function LinkedInMark({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3C4.16 3 3.28 3.89 3.28 4.98c0 1.08.88 1.97 1.97 1.97 1.08 0 1.97-.89 1.97-1.97C7.22 3.89 6.33 3 5.25 3ZM20.72 13.04c0-3.46-1.84-5.08-4.3-5.08-1.99 0-2.88 1.1-3.38 1.87V8.5H9.66c.04.88 0 11.5 0 11.5h3.38v-6.42c0-.34.03-.68.12-.92.27-.68.89-1.38 1.93-1.38 1.36 0 1.9 1.04 1.9 2.56V20H20.7l.02-6.96Z"
      />
    </svg>
  );
}

function DiscordMark({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M20.32 4.37A19.93 19.93 0 0 0 15.9 3c-.2.35-.42.8-.57 1.16a18.44 18.44 0 0 0-5.48 0c-.16-.36-.37-.81-.57-1.16A19.83 19.83 0 0 0 4.86 4.37C2.06 8.61 1.3 12.74 1.67 16.82a19.78 19.78 0 0 0 5.99 3.01c.49-.66.92-1.37 1.29-2.11a13 13 0 0 1-2.03-.98c.17-.12.33-.25.49-.39a14.1 14.1 0 0 0 12.18 0c.16.14.33.27.49.39-.65.38-1.33.71-2.03.98.37.74.8 1.45 1.29 2.11a19.83 19.83 0 0 0 5.99-3.01c.45-4.73-.77-8.82-3.67-12.45ZM8.03 14.42c-1.18 0-2.15-1.08-2.15-2.42s.95-2.42 2.15-2.42c1.21 0 2.17 1.1 2.15 2.42 0 1.34-.95 2.42-2.15 2.42Zm7.95 0c-1.18 0-2.15-1.08-2.15-2.42s.95-2.42 2.15-2.42c1.21 0 2.17 1.1 2.15 2.42 0 1.34-.94 2.42-2.15 2.42Z"
      />
    </svg>
  );
}

function MediumMark({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M4.4 7.2H6.9l3.37 7.56L13.6 7.2h2.43V16.8h-1.8V10.82l-2.73 5.98h-1.49L7.29 10.82v5.98H5.5V7.2h-1.1Z"
      />
      <circle fill="currentColor" cx="18.7" cy="12" r="2.15" />
    </svg>
  );
}

function NextJsMark({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 15.8V8.2l8 7.6V8.2"
      />
    </svg>
  );
}

function CssModulesMark({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 7H5v10h2m10-10h2v10h-2M10 8.2h4v7.6h-4z"
      />
    </svg>
  );
}

function VercelMark({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path fill="currentColor" d="M12 4 20 18H4L12 4Z" />
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

function PortfolioHeroSection() {
  const { hero, contacts } = portfolioContent;
  const emailContact = contacts.find((item) => item.label === "Email");
  const heroEmail = emailContact?.value ?? "manashada@proton.me";
  const heroEmailHref = buildGmailComposeHref(heroEmail);

  return (
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
                  href={heroEmailHref}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.heroEmailLink}
                >
                  {heroEmail}
                </a>
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ProjectsSection() {
  const { projects } = portfolioContent;
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [featuredProject, ...projectList] = projects;
  const visibleProjectList = showAllProjects
    ? projectList
    : projectList.slice(0, INITIAL_PROJECT_CARD_COUNT);
  const hasHiddenProjects = projectList.length > visibleProjectList.length;

  return (
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
              [
                featuredProject.media.length === 1
                  ? styles.mediaGridSingle
                  : styles.mediaGrid,
                featuredProject.media.every((asset) => asset.hideOnMobile)
                  ? styles.hideOnMobile
                  : "",
              ]
                .filter(Boolean)
                .join(" ")
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
        {visibleProjectList.map((project, index) => (
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
                  <figure
                    className={[
                      styles.projectInlineMedia,
                      project.media[0].hideOnMobile ? styles.hideOnMobile : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
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

      {hasHiddenProjects ? (
        <div className={styles.buttonRow}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => setShowAllProjects(true)}
          >
            Show all projects
          </button>
        </div>
      ) : null}
    </section>
  );
}

function ExperienceSection() {
  const { experience } = portfolioContent;

  return (
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
  );
}

function StackSection() {
  const { credentials, skills } = portfolioContent;

  return (
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
            <Link href="/credentials" prefetch={false} className={styles.secondaryButton}>
              View all
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function EducationSection() {
  const { education } = portfolioContent;

  return (
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
  );
}

function ResumeSection() {
  const { resume } = portfolioContent;

  return (
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

        <a href={resume.href} download={resume.downloadName} className={styles.resumeButton}>
          {resume.label}
        </a>
      </Reveal>
    </section>
  );
}

function PortfolioFooterSection() {
  const { contacts, hero, site } = portfolioContent;
  const discordCopyResetRef = useRef(null);
  const [discordCopied, setDiscordCopied] = useState(false);
  const emailContact = contacts.find((item) => item.label === "Email");
  const githubContact = contacts.find((item) => item.label === "GitHub");
  const linkedInContact = contacts.find((item) => item.label === "LinkedIn");
  const discordContact = contacts.find((item) => item.label === "Discord");
  const tryHackMeContact = contacts.find((item) => item.label === "TryHackMe");
  const hackTheBoxContact = contacts.find((item) => item.label === "Hack The Box");
  const mediumContact = contacts.find((item) => item.label === "Medium");
  const directMailHref = buildGmailComposeHref(emailContact.value);

  useEffect(() => {
    return () => {
      if (discordCopyResetRef.current) {
        window.clearTimeout(discordCopyResetRef.current);
      }
    };
  }, []);

  async function handleDiscordCopy() {
    if (!discordContact?.value) return;

    try {
      await copyToClipboard(discordContact.value);
      setDiscordCopied(true);

      if (discordCopyResetRef.current) {
        window.clearTimeout(discordCopyResetRef.current);
      }

      discordCopyResetRef.current = window.setTimeout(() => {
        setDiscordCopied(false);
      }, COPY_FEEDBACK_MS);
    } catch {
      setDiscordCopied(false);
    }
  }

  const socialMarks = [
    {
      label: "GitHub",
      href: githubContact?.href ?? null,
      ariaLabel: "GitHub",
      hoverClass: styles.socialBrandGitHub,
      icon: <GitHubMark className={styles.socialIconSvg} />,
    },
    {
      label: "LinkedIn",
      href: linkedInContact?.href ?? null,
      ariaLabel: "LinkedIn ",
      hoverClass: styles.socialBrandLinkedIn,
      icon: <LinkedInMark className={styles.socialIconSvg} />,
    },
    {
      label: "Discord",
      href: null,
      copyValue: discordContact?.value ?? "",
      ariaLabel: discordCopied
        ? `${discordContact?.label ?? "Discord"} ${discordContact?.value ?? ""} copied`
        : `Copy ${discordContact?.label ?? "Discord"} ${discordContact?.value ?? ""}`.trim(),
      hoverClass: styles.socialBrandDiscord,
      hoverLabel: discordCopied ? "Copied" : discordContact?.value ?? "",
      feedbackVisible: discordCopied,
      icon: <DiscordMark className={styles.socialIconSvg} />,
    },
    {
      label: "Medium",
      href: mediumContact?.href ?? null,
      ariaLabel: "Medium ",
      hoverClass: styles.socialBrandMedium,
      icon: <MediumMark className={styles.socialIconSvg} />,
    },
    {
      label: "Hack The Box",
      href: hackTheBoxContact?.href ?? null,
      ariaLabel: "Hack The Box",
      hoverClass: styles.socialBrandHackTheBox,
      icon: <HackTheBox className={styles.socialIconSvg} />,
    },
    {
      label: "TryHackMe",
      href: tryHackMeContact?.href ?? null,
      ariaLabel: "TryHackMe",
      hoverClass: styles.socialBrandTryHackMe,
      icon: <TryHackMe className={styles.socialIconSvg} />,
    },
  ];
  const buildItems = [
    {
      label: "Built with",
      value: "Next.js 15",
      accent: "#ffffff",
      icon: <NextJsMark className={styles.buildIconSvg} />,
    },
    {
      label: "Styled in",
      value: "CSS Modules",
      accent: "#4ba3ff",
      icon: <CssModulesMark className={styles.buildIconSvg} />,
    },
    {
      label: "Deployed on",
      value: "Vercel",
      accent: "#ffffff",
      icon: <VercelMark className={styles.buildIconSvg} />,
    },
  ];

  return (
    <footer id="contact" className={styles.footer} aria-labelledby="contact-title">
      <Reveal className={styles.footerContent}>
        <div className={styles.footerLead}>
          <p className={styles.sectionLabel}>Let&apos;s talk</p>
          <h2 id="contact-title" className={styles.footerTitle}>
            Contact
          </h2>
          <p className={styles.footerCopy}>
            {site.availability} If you have a project, internship, or collaboration in
            mind, send a direct email and I&apos;ll reply there.
          </p>
          <p className={styles.footerLocation}>Location: {hero.location}</p>
        </div>

        <ContactEmailCard email={emailContact.value} href={directMailHref} />
      </Reveal>

      <Reveal className={styles.footerMetaStrip} delay={80}>
        <div className={styles.footerSocials} aria-label="Social brand marks">
          {socialMarks.map((item) => {
            const sharedProps = {
              className: [
                item.copyValue
                  ? styles.socialButton
                  : item.href
                    ? styles.socialLink
                    : styles.socialStatic,
                item.hoverClass,
                item.hoverLabel ? styles.socialHoverLabel : null,
              ]
                .filter(Boolean)
                .join(" "),
              "aria-label": item.ariaLabel ?? item.label,
              title: item.copyValue && item.feedbackVisible ? "Copied" : item.ariaLabel ?? item.label,
              ...(item.hoverLabel ? { "data-hover-label": item.hoverLabel } : {}),
              ...(item.copyValue
                ? { "data-feedback-visible": item.feedbackVisible ? "true" : "false" }
                : {}),
            };

            if (item.copyValue) {
              return (
                <button
                  key={item.label}
                  type="button"
                  {...sharedProps}
                  onClick={handleDiscordCopy}
                >
                  {item.icon}
                </button>
              );
            }

            if (!item.href) {
              return (
                <span key={item.label} role="img" {...sharedProps}>
                  {item.icon}
                </span>
              );
            }

            return (
              <a
                key={item.label}
                {...sharedProps}
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                {item.icon}
              </a>
            );
          })}
        </div>

        <div className={styles.footerBuild}>
          {buildItems.map((item) => (
            <p key={item.label} className={styles.footerBuildRow}>
              <span className={styles.footerBuildLabel}>{item.label}</span>
              <span
                className={styles.footerBuildIcon}
                style={{ "--build-accent": item.accent }}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <span className={styles.footerBuildValue}>{item.value}</span>
            </p>
          ))}
        </div>

        <FooterNowCard />
      </Reveal>

      <p className={styles.footerLegal}>
        Copyright © 2026{" "}
        <a
          href={githubContact?.href ?? "https://github.com/hadeyghoptey"}
          target="_blank"
          rel="noreferrer"
          className={styles.footerLegalLink}
        >
          hadeyghoptey
        </a>
        . Not a corporation.{" "}
        <span className={styles.footerLegalReserved}>All rights reserved.</span>
      </p>
    </footer>
  );
}

const sectionComponentMap = {
  projects: ProjectsSection,
  experience: ExperienceSection,
  stack: StackSection,
  education: EducationSection,
  portfolio: ResumeSection,
};

export default function PortfolioRoutePage({
  currentPath,
  sections = [],
  skipHref = "#contact",
  skipLabel = "contact",
}) {
  const { site } = portfolioContent;
  const navigationItems = getNavigationItemsForPath(currentPath);
  const homeHref = currentPath === "/" ? "#main" : "/#main";
  const statusHref = getStatusHrefForPath(currentPath);
  const activeHref = currentPath === "/" ? null : currentPath;

  useEffect(() => {
    if (window.sessionStorage.getItem(CONTACT_SCROLL_STORAGE_KEY) !== "true") {
      return;
    }

    window.sessionStorage.removeItem(CONTACT_SCROLL_STORAGE_KEY);

    window.requestAnimationFrame(() => {
      scrollToContact();
    });
  }, []);

  return (
    <>
      <a href={skipHref} className={styles.skipLink}>
        Skip to {skipLabel}
      </a>

      <div id="main" className={styles.page}>
        <StickyNav
          items={navigationItems}
          name={site.name}
          role={site.role}
          status={site.status}
          statusHref={statusHref}
          homeHref={homeHref}
          activeHref={activeHref}
        />

        <main className={styles.main}>
          <PortfolioHeroSection />

          {sections.map((section) => {
            const SectionComponent = sectionComponentMap[section];
            return <SectionComponent key={section} />;
          })}
        </main>

        <PortfolioFooterSection />
      </div>
    </>
  );
}
