"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  '[role="button"]',
  "input",
  "textarea",
  "select",
  "summary",
  "label",
  '[data-cursor="interactive"]',
].join(", ");

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointerQuery.matches) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ring = ringRef.current;
    const dot = dotRef.current;

    if (!ring || !dot) return undefined;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    let frameId = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let dotX = targetX;
    let dotY = targetY;

    const ringEase = reduceMotion ? 1 : 0.18;
    const dotEase = reduceMotion ? 1 : 0.36;

    const setVisibility = (value) => {
      const nextValue = value ? "true" : "false";
      ring.dataset.visible = nextValue;
      dot.dataset.visible = nextValue;
    };

    const setInteractive = (value) => {
      const nextValue = value ? "true" : "false";
      ring.dataset.interactive = nextValue;
      dot.dataset.interactive = nextValue;
    };

    const setPressed = (value) => {
      const nextValue = value ? "true" : "false";
      ring.dataset.pressed = nextValue;
      dot.dataset.pressed = nextValue;
    };

    const syncInteractiveState = (target) => {
      if (!(target instanceof Element)) {
        setInteractive(false);
        return;
      }

      setInteractive(Boolean(target.closest(INTERACTIVE_SELECTOR)));
    };

    const render = () => {
      ringX += (targetX - ringX) * ringEase;
      ringY += (targetY - ringY) * ringEase;
      dotX += (targetX - dotX) * dotEase;
      dotY += (targetY - dotY) * dotEase;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

      frameId = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      setVisibility(true);
      syncInteractiveState(event.target);
    };

    const handlePointerDown = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      setPressed(true);
      syncInteractiveState(event.target);
    };

    const handlePointerUp = (event) => {
      setPressed(false);
      syncInteractiveState(event.target);
    };

    const handleWindowExit = (event) => {
      if (event.relatedTarget !== null) return;
      setVisibility(false);
      setInteractive(false);
      setPressed(false);
    };

    const handleWindowBlur = () => {
      setVisibility(false);
      setInteractive(false);
      setPressed(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) handleWindowBlur();
    };

    frameId = window.requestAnimationFrame(render);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("mouseout", handleWindowExit);
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("mouseout", handleWindowExit);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      root.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <span ref={ringRef} className="customCursor customCursorRing" aria-hidden="true" />
      <span ref={dotRef} className="customCursor customCursorDot" aria-hidden="true" />
    </>
  );
}
