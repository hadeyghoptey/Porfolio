'use client';

import { useRef, useEffect } from 'react';

/**
 * ScreenEffectController Component
 * 
 * Applies shake and tremble effects to the viewport during the kamehameha animation.
 * Uses the Web Animations API to create synchronized screen shake effects.
 * 
 * @param {Object} props - Component props
 * @param {number} props.intensity - Shake intensity from 0 to 1 (0 = no shake, 1 = maximum shake)
 * @param {boolean} props.active - Whether the shake effect is currently active
 * 
 * Requirements: 3.1, 3.2
 */
export default function ScreenEffectController({ intensity = 0, active = false, children }) {
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Cancel any existing animation
    if (animationRef.current) {
      animationRef.current.cancel();
      animationRef.current = null;
    }

    // Start animation when active is true
    if (active && intensity > 0) {
      // Create shake keyframes based on intensity
      const shakeKeyframes = [
        { transform: 'translate(0, 0) rotate(0deg)' },
        { transform: `translate(${intensity * 10}px, ${intensity * -8}px) rotate(${intensity * 2}deg)` },
        { transform: `translate(${intensity * -8}px, ${intensity * 10}px) rotate(${intensity * -2}deg)` },
        { transform: `translate(${intensity * 12}px, ${intensity * 6}px) rotate(${intensity * 1.5}deg)` },
        { transform: 'translate(0, 0) rotate(0deg)' }
      ];

      // Apply animation using Web Animations API
      animationRef.current = containerRef.current.animate(shakeKeyframes, {
        duration: 100,
        iterations: Infinity,
        easing: 'ease-in-out'
      });
    }

    // Cleanup function to cancel animation when component unmounts or active becomes false
    return () => {
      if (animationRef.current) {
        animationRef.current.cancel();
        animationRef.current = null;
      }
    };
  }, [active, intensity]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    >
      {children}
    </div>
  );
}
