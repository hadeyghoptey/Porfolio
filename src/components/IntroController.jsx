'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useFirstVisit } from '@/hooks/useFirstVisit';
import Terminal from './Terminal';
import KamehamehaAnimation from './KamehamehaAnimation';

/**
 * TerminalWrapper provides fade-in transition effect when terminal appears
 */
const TerminalWrapper = styled.div`
  animation: ${props => props.$isAnimating ? 'fadeIn 0.8s ease-in' : 'none'};
  pointer-events: ${props => props.$isAnimating ? 'none' : 'auto'};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

/**
 * IntroController orchestrates the intro experience flow
 * Manages state for animation display and reduced motion preferences
 */
export default function IntroController() {
  const { isFirstVisit, markVisited } = useFirstVisit();
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [assetError, setAssetError] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Detect prefers-reduced-motion preference
  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const listener = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      
      return () => mediaQuery.removeEventListener('change', listener);
    } catch (error) {
      console.warn('Failed to detect motion preference:', error);
      // Default to false (show animation)
    }
  }, []);

  // Preload animation assets with timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!assetsLoaded) {
        setAssetError(true);
        console.warn('Animation assets failed to load, showing terminal');
      }
    }, 3000); // 3 second timeout

    // Preload critical assets
    const img = new Image();
    img.onload = () => {
      setAssetsLoaded(true);
      clearTimeout(timeout);
    };
    img.onerror = () => {
      setAssetError(true);
      clearTimeout(timeout);
    };
    img.src = '/assets/kamehameha.gif';

    return () => clearTimeout(timeout);
  }, [assetsLoaded]);

  // Determine if animation should be shown
  useEffect(() => {
    if (isFirstVisit && !prefersReducedMotion) {
      setShowAnimation(true);
    }
  }, [isFirstVisit, prefersReducedMotion]);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
    setShowAnimation(false);
    setIsTransitioning(true);
    markVisited();
    
    // Enable interaction after transition completes (800ms)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  const handleSkip = () => {
    setAnimationComplete(true);
    setShowAnimation(false);
    setIsTransitioning(true);
    markVisited();
    
    // Enable interaction after transition completes (800ms)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  // Render Terminal directly for returning visitors or reduced motion preference
  if (prefersReducedMotion || !isFirstVisit) {
    return <Terminal />;
  }

  // Render Terminal if asset loading failed
  if (assetError) {
    return <Terminal />;
  }

  // Render Terminal after animation completes with transition effect
  if (animationComplete || !showAnimation) {
    return (
      <TerminalWrapper $isAnimating={isTransitioning}>
        <Terminal />
      </TerminalWrapper>
    );
  }

  // Render KamehamehaAnimation for first-time visitors
  return (
    <KamehamehaAnimation 
      onComplete={handleAnimationComplete}
      onSkip={handleSkip}
    />
  );
}
