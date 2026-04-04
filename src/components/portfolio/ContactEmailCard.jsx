"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./portfolio.module.css";

const TYPE_DELAY_MS = 55;
const COPY_FEEDBACK_MS = 1800;

async function copyToClipboard(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export default function ContactEmailCard({ email, href }) {
  const cardRef = useRef(null);
  const copyResetRef = useRef(null);
  const typingTimerRef = useRef(null);
  const hasTypedRef = useRef(false);
  const [typedEmail, setTypedEmail] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const clearTypingTimer = () => {
      if (typingTimerRef.current) {
        window.clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };

    const revealImmediately = () => {
      clearTypingTimer();
      hasTypedRef.current = true;
      setTypedEmail(email);
    };

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      revealImmediately();
      return () => {
        clearTypingTimer();
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasTypedRef.current) return;

          hasTypedRef.current = true;
          let index = 0;

          const typeNextCharacter = () => {
            index += 1;
            setTypedEmail(email.slice(0, index));

            if (index < email.length) {
              typingTimerRef.current = window.setTimeout(typeNextCharacter, TYPE_DELAY_MS);
            } else {
              typingTimerRef.current = null;
            }
          };

          setTypedEmail("");
          typingTimerRef.current = window.setTimeout(typeNextCharacter, TYPE_DELAY_MS);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.45,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      clearTypingTimer();
    };
  }, [email]);

  useEffect(() => {
    return () => {
      if (copyResetRef.current) {
        window.clearTimeout(copyResetRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await copyToClipboard(email);
      setCopied(true);

      if (copyResetRef.current) {
        window.clearTimeout(copyResetRef.current);
      }

      copyResetRef.current = window.setTimeout(() => {
        setCopied(false);
      }, COPY_FEEDBACK_MS);
    } catch {
      setCopied(false);
    }
  }

  const displayValue = typedEmail || "\u00A0";
  const isTypingComplete = typedEmail.length === email.length;

  return (
    <div ref={cardRef} className={styles.footerMailCard}>
      <span className={styles.mailCardEyebrow}>Email</span>
      <div className={styles.mailCardAddressWrap}>
        <strong className={styles.mailCardAddress} aria-label={email}>
          {displayValue}
        </strong>
        {!isTypingComplete ? <span aria-hidden="true" className={styles.mailCardCursor} /> : null}
      </div>
      <div className={styles.mailCardDivider} aria-hidden="true" />
      <div className={styles.mailCardActions}>
        <button
          type="button"
          className={styles.mailCardAction}
          onClick={handleCopy}
        >
          {copied ? "[ Copied! ]" : "[ Copy Email ]"}
        </button>
        <a href={href} className={styles.mailCardAction} target="_blank" rel="noreferrer">
          [ Open in Email Client ]
        </a>
      </div>
    </div>
  );
}
