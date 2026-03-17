import { useState, useEffect } from 'react';

const STORAGE_KEY = 'goku-intro-seen';

/**
 * Custom hook to detect first-time visitors
 * @returns {Object} { isFirstVisit: boolean, markVisited: function }
 */
export function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    try {
      const visited = localStorage.getItem(STORAGE_KEY);
      setIsFirstVisit(!visited);
    } catch (error) {
      console.warn('localStorage unavailable, treating as first visit:', error);
      // Keep isFirstVisit as true for SSR safety
    }
  }, []);

  const markVisited = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        seen: true,
        timestamp: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Failed to mark visit:', error);
      // Non-critical error, continue execution
    }
  };

  return { isFirstVisit, markVisited };
}
