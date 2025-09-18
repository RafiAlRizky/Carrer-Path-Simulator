import React, { useState, useCallback, useEffect } from 'react';
import type { CareerPath, SimulationHistoryItem } from './types';
import { simulateCareerPath } from './services/geminiService';
import { getHistory, saveHistory } from './services/localStorageService';
import Header from './components/Header';
import InputForm from './components/InputForm';
import CareerPathDisplay from './components/CareerPathDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Welcome from './components/Welcome';
import HistoryList from './components/HistoryList';
import ConfigurationError from './components/ConfigurationError';

const App: React.FC = () => {
  // Check for API Key configuration first.
  // FIX: Adhering to the Gemini API guidelines to use `process.env.API_KEY` which resolves the `import.meta.env` TypeScript error.
  if (!process.env.API_KEY || process.env.API_KEY === "") {
    return <ConfigurationError />;
  }

  const [userInput, setUserInput] = useState<string>('');
  const [careerPathData, setCareerPathData] = useState<CareerPath | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SimulationHistoryItem[]>([]);

  useEffect(() => {
    // Load history from local storage on initial render
    setHistory(getHistory());
  }, []);

  const handleSimulate = useCallback(async (simulationQuery: string) => {
    if (!simulationQuery.trim()) {
      setError('Please enter a career path or interest to simulate.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setCareerPathData(null);
    window.scrollTo(0, 0); // Scroll to top for better UX

    try {
      const data = await simulateCareerPath(simulationQuery);
      setCareerPathData(data);
      
      const newHistoryItem: SimulationHistoryItem = {
        id: new Date().toISOString(),
        query: simulationQuery,
        timestamp: new Date().toISOString(),
        result: data,
      };
      
      const updatedHistory = [newHistoryItem, ...history];
      setHistory(updatedHistory);
      saveHistory(updatedHistory);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [history]);

  const handleFormSubmit = useCallback(() => {
    handleSimulate(userInput);
  }, [userInput, handleSimulate]);

  // History handlers
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
    setCareerPathData(null); // Clear current view to avoid confusion
    document.querySelector('input')?.focus();
    window.scrollTo(0, 0);
  };

  const handleDeleteHistory = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    saveHistory(updatedHistory);
  };

  const handleClearHistory = () => {
    if (window.confirm('Anda yakin ingin menghapus semua riwayat simulasi?')) {
      setHistory([]);
      saveHistory([]);
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