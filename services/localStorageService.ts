import type { SimulationHistoryItem } from '../types';

const HISTORY_KEY = 'careerPathSimulatorHistory';

export const getHistory = (): SimulationHistoryItem[] => {
  try {
    const storedHistory = localStorage.getItem(HISTORY_KEY);
    if (storedHistory) {
      const parsed = JSON.parse(storedHistory);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error("Failed to parse history from localStorage", error);
    localStorage.removeItem(HISTORY_KEY);
    return [];
  }
  return [];
};

export const saveHistory = (history: SimulationHistoryItem[]): void => {
  try {
    const historyToSave = history.slice(0, 50); // Limit history size to the 50 most recent items
    localStorage.setItem(HISTORY_KEY, JSON.stringify(historyToSave));
  } catch (error) {
    console.error("Failed to save history to localStorage", error);
  }
};
