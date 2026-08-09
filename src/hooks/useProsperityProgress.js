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
      phase3Unlocked: prev.phase2TrackerDays >= 7,
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

  const getCurrentTask = () => {
    if (!progress.phase1Completed) {
      return {
        id: 'fase1',
        title: 'Fase 1: Romper el Amarre',
        subtitle: '5 min • Escucha una vez',
        actionLabel: 'Comenzar Fase 1',
        route: '/audio/1'
      };
    }
    
    if (progress.phase2TrackerDays < 7) {
      const currentNight = progress.phase2TrackerDays + 1;
      return {
        id: 'fase2',
        title: `Fase 2: Noche ${currentNight} de 7`,
        subtitle: 'Escúchalo antes de dormir',
        actionLabel: 'Activar Frecuencia',
        route: '/audio/2'
      };
    }

    return {
      id: 'fase3',
      title: 'Fase 3: Abrir los Caminos',
      subtitle: 'Ritual de Activación',
      actionLabel: 'Comenzar Fase 3',
      route: '/audio/3'
    };
  };

  // Add streak day based on phase 2 days + 1 (if phase 1 done)
  const getStreakDays = () => {
    let days = 0;
    if (progress.phase1Completed) days += 1;
    days += progress.phase2TrackerDays;
    return days;
  };

  return {
    ...progress,
    completePhase1,
    advancePhase2Day,
    getCurrentTask,
    streakDays: getStreakDays(),
  };
}
