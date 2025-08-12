"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { cmdMap } from "@/components/data/commands";

/* ---------- cursor pulse ---------- */
const pulse = keyframes`
  0%   { opacity: 1; }
  50%  { opacity: 0.25; }
  100% { opacity: 1; }
`;

/* ---------- colours ---------- */
const BROWN = "#b5651d";
const BLUE = "#1e90ff";
const GREEN = "#009400";
const YELLOW = "#ffff00";

/* ---------- layout ---------- */
const Container = styled.div`
  background: #000;
  min-height: 100vh;
  padding: 1rem 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  font-family: "Fira Code", monospace;
  font-size: 0.8rem;
  line-height: 1.2;
`;

const AsciiContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const AsciiColumn = styled.div`
  flex: 1;
  font-size: 0.9rem;
  line-height: ;
  padding-bottom: 1rem;
`;

const Prompt = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const PromptLabel = styled.span`
  color: ${GREEN};
  user-select: none;
  font-size: 1.1rem;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 0.6rem;
  height: 1.1rem;
  background: ${GREEN};
  border-radius: 2px;
  animation: ${pulse} 1.2s ease-in-out infinite;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  font-size: 1.1rem;
`;

const Line = styled.div`
  white-space: pre-wrap;
`;

function TypingLine({ line, color, onDone, delay = 0, style = {} }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      if (onDone) {
        setTimeout(onDone, 150);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, onDone]);

  // Render either string or JSX
  return visible ? (
    <Line style={{ color, ...style }}>
      {typeof line === "string" &&
      (line.includes("<a href") || line.includes("<span")) ? (
        <SafeLink html={line} />
      ) : (
        line
      )}
    </Line>
  ) : null;
}
// Render links safely
function SafeLink({ html }) {
  const clean = html.replace(
    /<a\s+(href="[^"]+")/g,
    '<a $1 target="_blank" rel="noopener noreferrer"'
  );
  return <span dangerouslySetInnerHTML={{ __html: clean }} />;
}
/* ---------- main ---------- */
export default function Terminal() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [showCompanyText, setShowCompanyText] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const inputRef = useRef(null);

  /* ---------- banner & welcome lines ---------- */
  const companyText = "HadeyGhoptey Not A Corporation. All rights reserved.";

  const pikachuLines = [
    "⢰⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀",
    "⠀⣿⣿⣿⣷⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣶⣾⣿",
    "⠀⠘⢿⣿⣿⣿⣿⣦⣀⣀⣀⣄⣀⣀⣠⣀⣤⣶⣿⣿⣿⣿⣿⠇",
    "⠀⠀⠈⠻⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀",
    "⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⠋⠀⠀⠀",
    "⠀⠀⠀⢠⣿⣿⡏⠆⢹⣿⣿⣿⣿⣿⣿⠒⠈⣿⣿⣿⣇⠀⠀⠀",
    "⠀⠀⠀⣼⣿⣿⣷⣶⣿⣿⣛⣻⣿⣿⣿⣶⣾⣿⣿⣿⣿⡀⠀⠀",
    "⠀⠀⠀⡁⠀⠈⣿⣿⣿⣿⢟⣛⡻⣿⣿⣿⣟⠀⠀⠈⣿⡇⠀⠀",
    "⠀⠀⠀⢿⣶⣿⣿⣿⣿⣿⡻⣿⡿⣿⣿⣿⣿⣶⣶⣾⣿⣿⠀⠀",
    "⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀",
    "⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀",
  ];

  const hadeyLines = [
    "                                                                          ",
    "                                                                          ",
    "    __  __          __           ________                __            ",
    "   / / / /___ _____/ /__  __  __/ ____/ /_  ____  ____  / /____  __  __",
    "  / /_/ / __ `/ __  / _ \\  / / / / __/ __ \\/ __ \\/ __ \\/ __/ _ \\/ / / /",
    " / __  / /_/ / /_/ /  __/ /_/ / /_/ / / / / /_/ / /_/ / /_/  __/ /_/ / ",
    "/_/ /_/\\__,_/\\__,_/\\___/\\__, /\\____/_/ /_/\\____/ .___/\\__/\\___/\\__, /  ",
    "                       /____/                 /_/             /____/   ",
  ];

  const welcomeLines = [
    "Welcome to my terminal portfolio. (Version 1.1)",
    "-----------------------------------------",
    "For a list of available commands, type 'help'.",
  ];

  /* ---------- command handling ---------- */
  const run = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const entry = cmdMap[trimmed];
    const output = entry
      ? entry.action()
      : [`Command not found: ${trimmed}. Type 'help' for list.`];

    setHistory((h) => [
      ...h,
      { cmd, output, prompt: `[guest@arch][~]$ ${trimmed}` },
    ]);
    setInput("");
  }, []);

  const handleKey = (e) => {
    if (e.key === "Enter") run(input);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

  /* ---------- show texts timing ---------- */
  useEffect(() => {
    // Show company text quickly
    const companyTimer = setTimeout(() => {
      setShowCompanyText(true);
    }, 300);

    // Calculate typing duration for Pikachu and Hadey lines (max lines * delay per line + buffer)
    const totalLines = Math.max(pikachuLines.length, hadeyLines.length);
    const typingDuration = totalLines * 100 + 500;

    // Show welcome and prompt after ASCII art done typing
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true);
    }, typingDuration);

    return () => {
      clearTimeout(companyTimer);
      clearTimeout(welcomeTimer);
    };
  }, []);

  /* ---------- render ---------- */
  return (
    <Container onClick={() => inputRef.current?.focus()}>
      {/* Company text at top */}
      {showCompanyText && (
        <TypingLine
          line={<span style={{ fontSize: "1rem" }}>{companyText}</span>}
          color={BROWN}
          delay={0}
        />
      )}

      {/* ASCII art side by side */}
      <AsciiContainer>
        {/* Pikachu column */}
        <AsciiColumn>
          {pikachuLines.map((l, i) => (
            <TypingLine
              key={`pika-${i}`}
              line={l}
              color={YELLOW}
              delay={i * 100}
            />
          ))}
        </AsciiColumn>

        {/* HadeyGhoptey column */}
        <AsciiColumn>
          {hadeyLines.map((l, i) => (
            <TypingLine
              key={`hadey-${i}`}
              line={l}
              color={GREEN}
              delay={i * 100}
            />
          ))}
        </AsciiColumn>
      </AsciiContainer>

      {/* Welcome block typing with "help" in blue */}
      {showWelcome &&
        showCompanyText &&
        welcomeLines.map((l, i) => {
          if (l.includes("help")) {
            const parts = l.split("help");
            const jsxLine = (
              <span style={{ fontSize: "1rem" }}>
                {parts[0]}
                <span style={{ color: BLUE }}>help</span>
                {parts[1]}
              </span>
            );
            return (
              <TypingLine
                key={`welcome-${i}`}
                line={jsxLine}
                color={BROWN}
                delay={(i + 3) * 50}
              />
            );
          }
          const fontSize = i === 0 ? "1.1rem" : "1.1rem"; // First line bigger
          return (
            <TypingLine
              key={`welcome-${i}`}
              line={<span style={{ fontSize }}>{l}</span>}
              color={BROWN}
              delay={(i + 3) * 50}
            />
          );
        })}

      {/* command history */}
      {history.map((h, i) => (
        <div key={i}>
          {h.prompt && (
            <Prompt>
              <PromptLabel style={{ fontSize: "1.1rem" }}>
                {h.prompt}
              </PromptLabel>
            </Prompt>
          )}
          {h.output.map((line, j) =>
            line === "__GALLERY__" ? (
              <GalleryGrid key={j} />
            ) : (
              <TypingLine
                key={j}
                line={line}
                color={h.cmd.trim().toLowerCase() === "help" ? BROWN : BLUE}
                delay={j * 100}
                style={{ fontSize: "1.1rem" }}
              />
            )
          )}
        </div>
      ))}

      {/* live prompt */}
      {showWelcome && showCompanyText && (
        <Prompt>
          <PromptLabel>[guest@arch][~]$</PromptLabel>
          <HiddenInput
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <span style={{ color: BLUE, fontSize: "1.1rem" }}>{input}</span>
          <Cursor />
        </Prompt>
      )}
    </Container>
  );
}
/* ---------- images + gallery ---------- */
const images = [
  {
    src: "assets/FlagForge.png",
    desc: "Wi-Fi & Bluetooth Deauth and adb hacking",
    date: "2025-08-09",
    month: "August",
  },
  {
    src: "assets/TeamFlagForge.png",
    desc: "FlagForge",
    date: "2025-08-9",
    month: "August",
  },
  {
    src: "assets/TeamSafaStack.png",
    desc: "SafaStack squad",
    date: "2025-06-05",
    month: "June",
  },
];
/* ---------- gallery grid ---------- */
function GalleryGrid() {
  const [idx, setIdx] = useState(null);
  const [zoom, setZoom] = useState(1);

  const open = (i) => {
    setIdx(i);
    setZoom(1);
  };
  const close = () => setIdx(null);

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  /* keyboard navigation */
  useEffect(() => {
    if (idx === null) return;
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [idx]);

  /* mouse-wheel zoom */
  useEffect(() => {
    if (idx === null) return;
    const handleWheel = (e) => {
      e.preventDefault();
      setZoom((z) => Math.max(0.5, Math.min(3, z - e.deltaY * 0.002)));
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel);
  }, [idx]);

  // Group images by month
  const groupedImages = images.reduce((acc, img, originalIndex) => {
    if (!acc[img.month]) {
      acc[img.month] = [];
    }
    acc[img.month].push({ ...img, originalIndex });
    return acc;
  }, {});

  // Order months (June first, then August)
  const monthOrder = ["June", "August"];
  const orderedMonths = monthOrder.filter((month) => groupedImages[month]);

  return (
    <>
      {orderedMonths.map((month, monthIndex) => (
        <div
          key={month}
          style={{
            marginBottom: monthIndex < orderedMonths.length - 1 ? "2rem" : "0",
          }}
        >
          {/* month/date header */}
          <div
            style={{
              marginBottom: "0.9rem",
              marginTop: monthIndex === 0 ? "0.7rem" : "1.5rem",
            }}
          >
            <div
              style={{
                marginBottom: "0.4rem",
                fontSize: "1.1rem",
                color: GREEN,
                fontFamily: "Fira Code",
              }}
            >
              {month}
            </div>
            <div style={{ fontSize: "1rem", color: BROWN }}>
              Date: {groupedImages[month][0]?.date}
            </div>
          </div>

          {/* thumbnails for this month */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {groupedImages[month].map(
              ({ src, desc, date, originalIndex }, i) => (
                <div
                  key={`${month}-${i}`}
                  style={{
                    position: "relative",
                    width: "340px",
                    height: "190px",
                    overflow: "hidden",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                  onClick={() => open(originalIndex)}
                >
                  <img
                    src={src}
                    alt={desc}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      // Show description on hover
                      const overlay = e.currentTarget.nextElementSibling;
                      if (overlay) overlay.style.opacity = "1";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      // Hide description when not hovering
                      const overlay = e.currentTarget.nextElementSibling;
                      if (overlay) overlay.style.opacity = "0";
                    }}
                  />
                  {/* description overlay - bottom and hidden by default */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "rgba(0,0,0,0.8)",
                      color: "#fff",
                      fontSize: "0.8rem",
                      fontFamily: "Fira Code",
                      padding: "0.6rem 1rem",
                      pointerEvents: "none",
                      opacity: "0",
                      transition: "opacity 0.3s ease",
                      whiteSpace: "normal",
                      textAlign: "center",
                      lineHeight: "1.2",
                    }}
                  >
                    {desc}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ))}

      {/* modal */}
      {idx !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
          onClick={close}
        >
          <img
            src={images[idx].src}
            alt={images[idx].desc}
            style={{
              maxWidth: "80vw",
              maxHeight: "80vh",
              border: `2px solid ${GREEN}`,
              borderRadius: 4,
              transform: `scale(${zoom})`,
              transition: "transform 0.1s",
            }}
          />
        </div>
      )}
    </>
  );
}
