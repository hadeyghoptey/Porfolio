'use client';

import styled, { keyframes } from 'styled-components';

/**
 * KamehamehaBeam Component
 * 
 * Renders an animated energy beam that expands from Goku's position to the screen edge.
 * Features glow effects and energy animations using CSS.
 * 
 * @param {Object} props
 * @param {boolean} props.visible - Controls whether the beam is rendered
 */
export default function KamehamehaBeam({ visible }) {
  // Only render when visible prop is true
  if (!visible) {
    return null;
  }

  return (
    <BeamContainer>
      <BeamCore />
      <BeamGlow />
      <BeamInnerGlow />
    </BeamContainer>
  );
}

// Keyframe animation for beam expansion from left to right
const expandBeam = keyframes`
  0% {
    width: 0%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    width: 100%;
    opacity: 1;
  }
`;

// Keyframe animation for pulsing glow effect
const pulseGlow = keyframes`
  0%, 100% {
    opacity: 0.8;
    filter: blur(20px);
  }
  50% {
    opacity: 1;
    filter: blur(30px);
  }
`;

// Keyframe animation for energy ripple effect
const energyRipple = keyframes`
  0% {
    transform: translateY(-50%) scaleY(1);
  }
  50% {
    transform: translateY(-50%) scaleY(1.2);
  }
  100% {
    transform: translateY(-50%) scaleY(1);
  }
`;

// Container for the beam - positioned to align with Goku sprite
const BeamContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translateY(-50%);
  width: 80%;
  height: 60px;
  pointer-events: none;
  z-index: 10;
`;

// Core beam element with expansion animation
const BeamCore = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 30px;
  background: linear-gradient(
    90deg,
    rgba(135, 206, 250, 1) 0%,
    rgba(100, 149, 237, 1) 50%,
    rgba(135, 206, 250, 1) 100%
  );
  border-radius: 15px;
  animation: ${expandBeam} 0.8s ease-out forwards,
             ${energyRipple} 0.3s ease-in-out infinite;
  box-shadow: 
    0 0 20px rgba(135, 206, 250, 0.8),
    0 0 40px rgba(100, 149, 237, 0.6),
    inset 0 0 20px rgba(255, 255, 255, 0.5);
`;

// Outer glow layer for enhanced visual effect
const BeamGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 50px;
  background: radial-gradient(
    ellipse at center,
    rgba(135, 206, 250, 0.6) 0%,
    rgba(100, 149, 237, 0.3) 50%,
    transparent 100%
  );
  animation: ${expandBeam} 0.8s ease-out forwards,
             ${pulseGlow} 0.5s ease-in-out infinite;
  filter: blur(20px);
`;

// Inner glow for bright center effect
const BeamInnerGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 15px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(200, 230, 255, 0.8) 50%,
    rgba(255, 255, 255, 0.9) 100%
  );
  border-radius: 8px;
  animation: ${expandBeam} 0.8s ease-out forwards;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.9);
`;
