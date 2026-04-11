"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { copyToClipboard } from "./copyToClipboard";
import { HomeFirstLoadReadyContext } from "./HomeFirstLoadGate";
import styles from "./portfolio.module.css";

const TYPE_DELAY_MS = 55;
const COPY_FEEDBACK_MS = 1800;
const EMAIL_REVEAL_THRESHOLD = 0.15;
const EMAIL_REVEAL_ROOT_MARGIN = "0px";

export default function ContactEmailCard({ email, href }) {
  const cardRef = useRef(null);
  const copyResetRef = useRef(null);
  const typingTimerRef = useRef(null);
  const hasTypedRef = useRef(false);
  const isPageReadyForAnimation = useContext(HomeFirstLoadReadyContext);
  const [typedEmail, setTypedEmail] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node || !isPageReadyForAnimation) return;
    let hasScrollTrigger = false;
    let isCardVisible = false;

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

    const startTyping = () => {
      if (hasTypedRef.current || !hasScrollTrigger || !isCardVisible) {
        return;
      }

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

    const handleScroll = () => {
      hasScrollTrigger = true;
      startTyping();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isCardVisible = entry.isIntersecting;

          if (!entry.isIntersecting || hasTypedRef.current) return;

          startTyping();

          if (hasTypedRef.current) {
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: EMAIL_REVEAL_THRESHOLD,
        rootMargin: EMAIL_REVEAL_ROOT_MARGIN,
      }
    );

    observer.observe(node);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      clearTypingTimer();
    };
  }, [email, isPageReadyForAnimation]);

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
          [ Open Email Client ]
        </a>
      </div>
    </div>
  );
}
