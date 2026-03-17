'use client';

import styled, { keyframes } from 'styled-components';

/**
 * GokuSprite Component
 * 
 * Displays Goku sprite with different visual states based on animation phase.
 * Implements CSS animations for charging glow effect.
 * 
 * @param {Object} props
 * @param {string} props.phase - Current animation phase: 'charging', 'releasing', 'impact', 'complete'
 */
export default function GokuSprite({ phase }) {
  return (
    <SpriteContainer className={`phase-${phase}`}>
      <SpriteImage phase={phase}>
        {/* Placeholder text - actual Goku sprite asset will be added later */}
        <SpritePlaceholder>GOKU</SpritePlaceholder>
      </SpriteImage>
      
      {/* Charging glow effect - only visible during charging phase */}
      {phase === 'charging' && <GlowEffect />}
    </SpriteContainer>
  );
}

// Keyframe animation for charging glow effect
const pulseGlow = keyframes`
  0% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.2);
  }
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
`;

// Container for the sprite - positioned on left side, vertically centered
const SpriteContainer = styled.div`
  position: absolute;
  left: 20%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  
  /* Adjust positioning based on phase */
  &.phase-releasing,
  &.phase-impact {
    /* Slight forward lean during attack */
    transform: translate(-50%, -50%) translateX(10px);
  }
  
  &.phase-complete {
    /* Fade out on completion */
    opacity: 0;
    transition: opacity 0.5s ease-out;
  }
`;

// Sprite image container with phase-based styling
const SpriteImage = styled.div`
  width: 150px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  /* Phase-based visual effects */
  ${props => props.phase === 'charging' && `
    filter: brightness(1.2);
  `}
  
  ${props => props.phase === 'releasing' && `
    filter: brightness(1.5) contrast(1.2);
  `}
  
  ${props => props.phase === 'impact' && `
    filter: brightness(2) contrast(1.5);
  `}
  
  ${props => props.phase === 'complete' && `
    filter: brightness(1);
  `}
  
  transition: filter 0.3s ease-in-out;
`;

// Placeholder for actual sprite image
const SpritePlaceholder = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #ff8c00;
  text-shadow: 
    0 0 10px rgba(255, 140, 0, 0.8),
    0 0 20px rgba(255, 140, 0, 0.6),
    0 0 30px rgba(255, 140, 0, 0.4);
  letter-spacing: 2px;
`;

// Animated glow effect for charging phase
const GlowEffect = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 230px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 215, 0, 0.6) 0%,
    rgba(255, 140, 0, 0.4) 30%,
    rgba(255, 69, 0, 0.2) 60%,
    transparent 100%
  );
  animation: ${pulseGlow} 1.5s ease-in-out infinite;
  pointer-events: none;
  z-index: -1;
`;
