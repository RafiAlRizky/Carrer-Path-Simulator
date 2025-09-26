import type { SimulationHistoryItem } from '../types';

const HISTORY_KEY = 'career_simulation_history';

export const getHistory = (): SimulationHistoryItem[] => {
  try {
    const storedHistory = localStorage.getItem(HISTORY_KEY);
    if (storedHistory) {
      return JSON.parse(storedHistory);
    }
  } catch (error) {
    console.error("Gagal mem-parsing riwayat dari localStorage", error);
    // Jika parsing gagal, kembalikan array kosong untuk mencegah aplikasi crash
    return [];
  }
  return [];
};

export const saveHistory = (history: SimulationHistoryItem[]): void => {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error)
    {
    console.error("Gagal menyimpan riwayat ke localStorage", error);
  }
};
