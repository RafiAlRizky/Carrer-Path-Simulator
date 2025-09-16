
import React, { useState, useCallback, useEffect } from 'react';
import type { CareerPath, SimulationHistoryItem } from './types';
import { simulateCareerPath } from './services/geminiService';
import Header from './components/Header';
import InputForm from './components/InputForm';
import CareerPathDisplay from './components/CareerPathDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Welcome from './components/Welcome';
import HistoryList from './components/HistoryList';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [careerPathData, setCareerPathData] = useState<CareerPath | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SimulationHistoryItem[]>([]);
  
  // Load history from localStorage on initial render
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('simulationHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Failed to load history from localStorage:", e);
      setError("Gagal memuat riwayat simulasi Anda.");
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('simulationHistory', JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history to localStorage:", e);
    }
  }, [history]);

  const handleSimulate = useCallback(async (simulationQuery: string) => {
    if (!simulationQuery.trim()) {
      setError('Please enter a career path or interest to simulate.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setCareerPathData(null);

    try {
      const data = await simulateCareerPath(simulationQuery);
      setCareerPathData(data);
      
      const newHistoryItem: SimulationHistoryItem = {
        id: `hist_${new Date().getTime()}`,
        query: simulationQuery,
        result: data,
        timestamp: new Date().toISOString(),
      };
      setHistory(prevHistory => [newHistoryItem, ...prevHistory].slice(0, 50));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleFormSubmit = useCallback(() => {
    handleSimulate(userInput);
  }, [userInput, handleSimulate]);

  const handleViewHistory = (item: SimulationHistoryItem) => {
    setError(null);
    setCareerPathData(item.result);
    setUserInput(item.query);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResimulate = (item: SimulationHistoryItem) => {
    setUserInput(item.query);
    handleSimulate(item.query);
  };
  
  const handleDeleteHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };
  
  const handleClearHistory = () => {
    setHistory([]);
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
            onResimulate={handleResimulate}
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
