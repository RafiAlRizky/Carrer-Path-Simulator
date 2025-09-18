import type { SimulationHistoryItem } from '../types';

const HISTORY_KEY = 'careerPathSimulatorHistory';

export const getHistory = (): SimulationHistoryItem[] => {
  try {
    const storedHistory = localStorage.getItem(HISTORY_KEY);
    if (storedHistory) {
      const parsed = JSON.parse(storedHistory);
      // Basic validation to ensure it's an array of items with IDs
      if (Array.isArray(parsed) && parsed.every(item => typeof item.id === 'string')) {
          return parsed;
      }
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
    // Limit history size to the 50 most recent items
    const historyToSave = history.slice(0, 50); 
    localStorage.setItem(HISTORY_KEY, JSON.stringify(historyToSave));
  } catch (error) {
    console.error("Failed to save history to localStorage", error);
  }
};

export const addSimulationToHistory = (itemData: Omit<SimulationHistoryItem, 'id'>): SimulationHistoryItem => {
    const history = getHistory();
    const newHistoryItem: SimulationHistoryItem = {
        ...itemData,
        id: new Date().toISOString() + Math.random().toString(36).substring(2, 9), // simple unique ID
    };
    const updatedHistory = [newHistoryItem, ...history];
    saveHistory(updatedHistory);
    return newHistoryItem;
};

export const deleteHistoryItem = (id: string): void => {
    const history = getHistory();
    const updatedHistory = history.filter(item => item.id !== id);
    saveHistory(updatedHistory);
};

export const clearHistory = (): void => {
    saveHistory([]);
};