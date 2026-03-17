'use client';

import { useState, useEffect } from 'react';
import GokuSprite from './GokuSprite';
import KamehamehaBeam from './KamehamehaBeam';
import SkipButton from './SkipButton';
// Placeholder imports - components will be implemented in task 5
// import ScreenEffectController from './ScreenEffectController';

/**
 * KamehamehaAnimation Component
 * 
 * Renders the Goku kamehameha animation sequence with multiple phases.
 * 
 * @param {Object} props
 * @param {Function} props.onComplete - Callback when animation finishes
 * @param {Function} props.onSkip - Callback when user skips animation
 */
export default function KamehamehaAnimation({ onComplete, onSkip }) {
  // Animation phase state: charging -> releasing -> impact -> complete
  const [phase, setPhase] = useState('charging');
  
  // Skip button visibility state
  const [showSkipButton, setShowSkipButton] = useState(true);
  
  // Track phase start time for progress calculation
  const [phaseStartTime, setPhaseStartTime] = useState(Date.now());
  
  // Phase timings in milliseconds
  const PHASE_TIMINGS = {
    charging: 2000,      // 0-2s
    releasing: 1500,     // 2-3.5s (duration: 1.5s)
    impact: 1000,        // 3.5-4.5s (duration: 1s)
    complete: 500        // 4.5-5s (duration: 0.5s)
  };

  /**
   * Calculate shake intensity based on animation phase and progress within phase
   * @param {string} currentPhase - Current animation phase
   * @param {number} progress - Progress within current phase (0 to 1)
   * @returns {number} Intensity value between 0 and 1
   */
  const getShakeIntensity = (currentPhase, progress = 0.5) => {
    switch (currentPhase) {
      case 'charging':
        return 0;
      case 'releasing':
        // Gradually increase from 0.3 to 0.6 based on progress
        return 0.3 + (progress * 0.3);
      case 'impact':
        // Gradually increase from 0.8 to 1.0 based on progress
        return 0.8 + (progress * 0.2);
      case 'complete':
        return 0;
      default:
        return 0;
    }
  };
  
  /**
   * Calculate current progress within the active phase (0 to 1)
   * @returns {number} Progress value between 0 and 1
   */
  const getPhaseProgress = () => {
    const elapsed = Date.now() - phaseStartTime;
    const duration = PHASE_TIMINGS[phase] || 1000;
    return Math.min(elapsed / duration, 1);
  };

  // Safety timeout effect - force completion after 6 seconds
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      console.warn('Animation timeout reached, forcing completion');
      if (onComplete) {
        onComplete();
      }
    }, 6000); // 6 seconds (1 second buffer beyond 5-second animation)

    return () => clearTimeout(safetyTimeout);
  }, [onComplete]);

  // Phase progression effect
  useEffect(() => {
    // Reset phase start time when phase changes
    setPhaseStartTime(Date.now());
    
    let timeoutId;

    // Progress through animation phases
    if (phase === 'charging') {
      timeoutId = setTimeout(() => setPhase('releasing'), PHASE_TIMINGS.charging);
    } else if (phase === 'releasing') {
      timeoutId = setTimeout(() => setPhase('impact'), PHASE_TIMINGS.releasing);
    } else if (phase === 'impact') {
      timeoutId = setTimeout(() => setPhase('complete'), PHASE_TIMINGS.impact);
    } else if (phase === 'complete') {
      timeoutId = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, PHASE_TIMINGS.complete);
    }

    // Cleanup timeout on unmount or phase change
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [phase, onComplete]);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#000',
      overflow: 'hidden'
    }}>
      {/* Animation container with all visual components */}
      
      {/* GokuSprite - receives current phase prop */}
      <GokuSprite phase={phase} />
      
      {/* KamehamehaBeam - visible only during releasing and impact phases */}
      <KamehamehaBeam visible={phase === 'releasing' || phase === 'impact'} />
      
      {/* ScreenEffectController - receives intensity and active props based on phase */}
      {/* Placeholder: <ScreenEffectController 
        intensity={getShakeIntensity(phase, getPhaseProgress())} 
        active={phase === 'releasing' || phase === 'impact'} 
      /> */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        color: '#fff',
        fontSize: '12px',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '5px'
      }}>
        [ScreenEffectController - Intensity: {getShakeIntensity(phase, getPhaseProgress()).toFixed(2)}, Active: {phase === 'releasing' || phase === 'impact' ? 'true' : 'false'}]
      </div>
      
      {/* SkipButton - rendered with onSkip handler and showSkipButton visibility */}
      <SkipButton onClick={onSkip} visible={showSkipButton} />
    </div>
  );
}
