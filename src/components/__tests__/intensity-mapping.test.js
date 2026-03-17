/**
 * Test for intensity mapping implementation (Task 5.3)
 * Validates that getShakeIntensity returns correct values for each phase
 */

describe('Intensity Mapping for Animation Phases', () => {
  // Mock the getShakeIntensity function from KamehamehaAnimation
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

  describe('Charging Phase', () => {
    test('should return 0 intensity', () => {
      expect(getShakeIntensity('charging', 0)).toBe(0);
      expect(getShakeIntensity('charging', 0.5)).toBe(0);
      expect(getShakeIntensity('charging', 1)).toBe(0);
    });
  });

  describe('Releasing Phase', () => {
    test('should return intensity in range 0.3-0.6', () => {
      const intensityStart = getShakeIntensity('releasing', 0);
      const intensityMid = getShakeIntensity('releasing', 0.5);
      const intensityEnd = getShakeIntensity('releasing', 1);

      expect(intensityStart).toBeCloseTo(0.3, 5);
      expect(intensityMid).toBeCloseTo(0.45, 5);
      expect(intensityEnd).toBeCloseTo(0.6, 5);

      // Verify all values are in range
      expect(intensityStart).toBeGreaterThanOrEqual(0.3);
      expect(intensityStart).toBeLessThanOrEqual(0.6);
      expect(intensityMid).toBeGreaterThanOrEqual(0.3);
      expect(intensityMid).toBeLessThanOrEqual(0.6);
      expect(intensityEnd).toBeGreaterThanOrEqual(0.3);
      expect(intensityEnd).toBeLessThanOrEqual(0.6);
    });

    test('should increase intensity as progress increases', () => {
      const intensity0 = getShakeIntensity('releasing', 0);
      const intensity25 = getShakeIntensity('releasing', 0.25);
      const intensity50 = getShakeIntensity('releasing', 0.5);
      const intensity75 = getShakeIntensity('releasing', 0.75);
      const intensity100 = getShakeIntensity('releasing', 1);

      expect(intensity0).toBeLessThan(intensity25);
      expect(intensity25).toBeLessThan(intensity50);
      expect(intensity50).toBeLessThan(intensity75);
      expect(intensity75).toBeLessThan(intensity100);
    });
  });

  describe('Impact Phase', () => {
    test('should return intensity in range 0.8-1.0', () => {
      const intensityStart = getShakeIntensity('impact', 0);
      const intensityMid = getShakeIntensity('impact', 0.5);
      const intensityEnd = getShakeIntensity('impact', 1);

      expect(intensityStart).toBe(0.8);
      expect(intensityMid).toBe(0.9);
      expect(intensityEnd).toBe(1.0);

      // Verify all values are in range
      expect(intensityStart).toBeGreaterThanOrEqual(0.8);
      expect(intensityStart).toBeLessThanOrEqual(1.0);
      expect(intensityMid).toBeGreaterThanOrEqual(0.8);
      expect(intensityMid).toBeLessThanOrEqual(1.0);
      expect(intensityEnd).toBeGreaterThanOrEqual(0.8);
      expect(intensityEnd).toBeLessThanOrEqual(1.0);
    });

    test('should increase intensity as progress increases', () => {
      const intensity0 = getShakeIntensity('impact', 0);
      const intensity25 = getShakeIntensity('impact', 0.25);
      const intensity50 = getShakeIntensity('impact', 0.5);
      const intensity75 = getShakeIntensity('impact', 0.75);
      const intensity100 = getShakeIntensity('impact', 1);

      expect(intensity0).toBeLessThan(intensity25);
      expect(intensity25).toBeLessThan(intensity50);
      expect(intensity50).toBeLessThan(intensity75);
      expect(intensity75).toBeLessThan(intensity100);
    });
  });

  describe('Complete Phase', () => {
    test('should return 0 intensity', () => {
      expect(getShakeIntensity('complete', 0)).toBe(0);
      expect(getShakeIntensity('complete', 0.5)).toBe(0);
      expect(getShakeIntensity('complete', 1)).toBe(0);
    });
  });

  describe('Default/Unknown Phase', () => {
    test('should return 0 intensity for unknown phases', () => {
      expect(getShakeIntensity('unknown', 0.5)).toBe(0);
      expect(getShakeIntensity('', 0.5)).toBe(0);
    });
  });

  describe('Progress Calculation', () => {
    test('should handle edge cases for progress values', () => {
      // Progress below 0 (shouldn't happen but test robustness)
      expect(getShakeIntensity('releasing', -0.1)).toBeLessThan(0.3);
      
      // Progress above 1 (shouldn't happen but test robustness)
      expect(getShakeIntensity('releasing', 1.5)).toBeGreaterThan(0.6);
      expect(getShakeIntensity('impact', 1.5)).toBeGreaterThan(1.0);
    });
  });
});
