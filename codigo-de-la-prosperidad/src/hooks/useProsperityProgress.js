import { useState, useEffect } from 'react';

const STORAGE_KEY = 'codigo_prosperidad_progress';

const defaultState = {
  phase1Completed: false,
  phase2TrackerDays: 0,
  phase3Unlocked: false,
};

export function useProsperityProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Error reading prosperity progress from localStorage', error);
    }
    return defaultState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.warn('Error saving prosperity progress to localStorage', error);
    }
  }, [progress]);

  const completePhase1 = () => {
    setProgress((prev) => ({
      ...prev,
      phase1Completed: true,
      phase3Unlocked: prev.phase2TrackerDays >= 7, // Unlock phase 3 if 2 is already somehow done
    }));
  };

  const advancePhase2Day = () => {
    setProgress((prev) => {
      const newDays = Math.min(prev.phase2TrackerDays + 1, 7);
      return {
        ...prev,
        phase2TrackerDays: newDays,
        phase3Unlocked: prev.phase1Completed && newDays >= 7,
      };
    });
  };

  return {
    ...progress,
    phase1Completed: true, // Enforce unlocked state
    phase3Unlocked: true,  // Enforce unlocked state
    completePhase1,
    advancePhase2Day,
  };
}
