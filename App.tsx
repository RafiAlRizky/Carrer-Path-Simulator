import React, { useState, useCallback, useEffect } from 'react';
import type { CareerPath, SimulationHistoryItem } from './types';
import { simulateCareerPath } from './services/geminiService';
import { getHistory, addSimulationToHistory, deleteHistoryItem, clearHistory } from './services/localStorageService';
import Header from './components/Header';
import InputForm from './components/InputForm';
import CareerPathDisplay from './components/CareerPathDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Welcome from './components/Welcome';
import HistoryList from './components/HistoryList';

interface AppProps {
  apiKey: string;
}

const App: React.FC<AppProps> = ({ apiKey }) => {
  const [userInput, setUserInput] = useState<string>('');
  const [careerPathData, setCareerPathData] = useState<CareerPath | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SimulationHistoryItem[]>([]);

  useEffect(() => {
    try {
        const localHistory = getHistory();
        setHistory(localHistory);
    } catch (err) {
        setError("Gagal memuat riwayat simulasi dari penyimpanan lokal.");
        console.error(err);
    }
  }, []);

  const handleSimulate = useCallback(async (simulationQuery: string) => {
    if (!simulationQuery.trim()) {
      setError('Please enter a career path or interest to simulate.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setCareerPathData(null);
    window.scrollTo(0, 0);

    try {
      const data = await simulateCareerPath(simulationQuery, apiKey);
      setCareerPathData(data);
      
      const newHistoryData: Omit<SimulationHistoryItem, 'id'> = {
        query: simulationQuery,
        timestamp: new Date().toISOString(),
        result: data,
      };

      const newHistoryItem = addSimulationToHistory(newHistoryData);
      
      setHistory(prevHistory => [newHistoryItem, ...prevHistory]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  const handleFormSubmit = useCallback(() => {
    handleSimulate(userInput);
  }, [userInput, handleSimulate]);

  const handleViewHistory = (item: SimulationHistoryItem) => {
    if (isLoading) return;
    setCareerPathData(item.result);
    setUserInput(item.query);
    setError(null);
    window.scrollTo(0, 0);
  };
  
  const handleEditHistory = (item: SimulationHistoryItem) => {
    if (isLoading) return;
    setUserInput(item.query);
    setCareerPathData(null);
    document.querySelector('input')?.focus();
    window.scrollTo(0, 0);
  };

  const handleDeleteHistory = (id: string) => {
    try {
      deleteHistoryItem(id);
      const updatedHistory = history.filter(item => item.id !== id);
      setHistory(updatedHistory);
    } catch (e) {
      console.error("Failed to delete history item:", e);
      setError("Gagal menghapus item riwayat. Silakan coba lagi.");
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Anda yakin ingin menghapus semua riwayat simulasi?')) {
      try {
        clearHistory();
        setHistory([]);
      } catch(e) {
        console.error("Failed to clear history:", e);
        setError("Gagal membersihkan riwayat. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        <main>
          <InputForm
            userInput={userInput}
            setUserInput={setUserInput}
            onSimulate={handleFormSubmit}
            isLoading={isLoading}
          />
          <div className="mt-8">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {careerPathData ? (
              <CareerPathDisplay data={careerPathData} />
            ) : (
              !isLoading && !error && <Welcome />
            )}
          </div>
          <HistoryList 
            items={history}
            onView={handleViewHistory}
            onEdit={handleEditHistory}
            onDelete={handleDeleteHistory}
            onClear={handleClearHistory}
            disabled={isLoading}
          />
        </main>
      </div>
    </div>
  );
};

export default App;