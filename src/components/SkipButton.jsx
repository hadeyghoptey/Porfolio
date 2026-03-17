'use client';

import styled from 'styled-components';

/**
 * SkipButton Component
 * 
 * Provides a skip control for the kamehameha animation.
 * Positioned in bottom-right corner with high z-index and accessibility features.
 * 
 * @param {Object} props
 * @param {Function} props.onClick - Callback when button is clicked
 * @param {boolean} props.visible - Controls whether the button is rendered
 */
export default function SkipButton({ onClick, visible }) {
  // Only render when visible prop is true
  if (!visible) {
    return null;
  }

  return (
    <StyledButton 
      onClick={onClick}
      aria-label="Skip animation"
      type="button"
    >
      Skip Animation
    </StyledButton>
  );
}

// Styled button with positioning, z-index, and accessibility states
const StyledButton = styled.button`
  /* Positioning - bottom-right corner of viewport */
  position: fixed;
  bottom: 30px;
  right: 30px;
  
  /* High z-index to ensure it's above other elements */
  z-index: 1000;
  
  /* Visual styling */
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  font-family: inherit;
  
  /* Semi-transparent background that doesn't interfere with animation */
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  cursor: pointer;
  
  /* Smooth transitions for interactive states */
  transition: all 0.3s ease;
  
  /* Hover state for accessibility */
  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  /* Focus state for keyboard accessibility */
  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.8);
    box-shadow: 
      0 0 0 3px rgba(255, 255, 255, 0.2),
      0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  /* Active state for click feedback */
  &:active {
    transform: translateY(0);
    background-color: rgba(255, 255, 255, 0.35);
  }
  
  /* Ensure button is visually clear but not interfering */
  pointer-events: auto;
`;
