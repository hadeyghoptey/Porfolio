"use client";

import { useEffect, useState } from "react";
import styles from "./portfolio.module.css";

const TIME_ZONE = "Asia/Kathmandu";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

const TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZoneName: "short",
});

const ZONED_PARTS_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function getZonedDateParts(date) {
  const entries = ZONED_PARTS_FORMATTER.formatToParts(date)
    .filter((part) => part.type !== "literal")
    .map((part) => [part.type, part.value]);

  const parts = Object.fromEntries(entries);

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
  };
}

function getIsoWeek(dateParts) {
  const normalizedDate = new Date(
    Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day)
  );
  const dayNumber = normalizedDate.getUTCDay() || 7;

  normalizedDate.setUTCDate(normalizedDate.getUTCDate() + 4 - dayNumber);

  const weekYear = normalizedDate.getUTCFullYear();
  const yearStart = new Date(Date.UTC(weekYear, 0, 1));
  const weekNumber = Math.ceil(
    ((normalizedDate - yearStart) / 86400000 + 1) / 7
  );

  return {
    weekNumber,
    weekYear,
  };
}

function formatNow(date = new Date()) {
  const zonedDate = getZonedDateParts(date);
  const isoWeek = getIsoWeek(zonedDate);

  return {
    dateLabel: DATE_FORMATTER.format(date),
    timeLabel: TIME_FORMATTER.format(date),
    weekLabel: `Week ${isoWeek.weekNumber}`,
  };
}

export default function FooterNowCard() {
  const [nowState, setNowState] = useState(null);

  useEffect(() => {
    const updateNow = () => {
      setNowState(formatNow());
    };

    updateNow();

    let intervalId = null;

    const scheduleMinuteUpdates = () => {
      const now = new Date();
      const delayUntilNextMinute =
        (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

      return window.setTimeout(() => {
        updateNow();
        intervalId = window.setInterval(updateNow, 60000);
      }, delayUntilNextMinute);
    };

    const timeoutId = scheduleMinuteUpdates();

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <div className={styles.footerNowCard}>
      <p className={styles.footerNowEyebrow}>Kathmandu now</p>
      <p className={styles.footerNowDate}>{nowState?.dateLabel ?? "Loading live date..."}</p>
      <p className={styles.footerNowTime}>{nowState?.timeLabel ?? "Loading live time..."}</p>
      <p className={styles.footerNowWeek}>{nowState?.weekLabel ?? "Week --"}</p>
    </div>
  );
}
