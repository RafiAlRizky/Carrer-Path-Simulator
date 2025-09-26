import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import Welcome from './components/Welcome';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import CareerPathDisplay from './components/CareerPathDisplay';
import HistoryList from './components/HistoryList';
import ComparisonDisplay from './components/ComparisonDisplay';

import { initializeGemini, generateCareerPath, compareCareerPaths } from './services/geminiService';
import { getHistory, saveHistory } from './services/localStorageService';
import type { CareerPath, SimulationHistoryItem, ComparisonSummary } from './types';

interface AppProps {
  apiKey: string;
}

type ViewState = 'welcome' | 'loading' | 'error' | 'result' | 'comparison';

const App: React.FC<AppProps> = ({ apiKey }) => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('welcome');
  
  const [simulationResult, setSimulationResult] = useState<CareerPath | null>(null);
  const [comparisonResult, setComparisonResult] = useState<ComparisonSummary | null>(null);
  const [history, setHistory] = useState<SimulationHistoryItem[]>([]);
  const [comparisonSelection, setComparisonSelection] = useState<string[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    initializeGemini(apiKey);
    const loadedHistory = getHistory();
    setHistory(loadedHistory);
    setIsMounted(true);
  }, [apiKey]);

  useEffect(() => {
    if (isMounted) {
      saveHistory(history);
    }
  }, [history, isMounted]);

  const handleSimulate = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setCurrentView('loading');
    setComparisonSelection([]); // Reset comparison on new simulation

    try {
      const result = await generateCareerPath(query);
      
      const newHistoryItem: SimulationHistoryItem = {
        id: new Date().toISOString(),
        query,
        result,
        timestamp: new Date().toISOString(),
      };

      setSimulationResult(result);
      setCurrentQuery(query);
      setHistory(prev => [newHistoryItem, ...prev]);
      setCurrentView('result');
      setUserInput('');

    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan yang tidak diketahui.');
      setCurrentView('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompare = async () => {
    if (comparisonSelection.length !== 2) return;

    const item1 = history.find(h => h.id === comparisonSelection[0]);
    const item2 = history.find(h => h.id === comparisonSelection[1]);

    if (!item1 || !item2) return;

    setIsLoading(true);
    setError(null);
    setCurrentView('loading');

    try {
        const result = await compareCareerPaths(
            { query: item1.query, data: item1.result },
            { query: item2.query, data: item2.result }
        );
        setComparisonResult(result);
        setCurrentView('comparison');
    } catch (err: any) {
        setError(err.message || 'Gagal membandingkan jalur karir.');
        setCurrentView('error');
    } finally {
        setIsLoading(false);
    }
  };

  const handleViewHistory = (item: SimulationHistoryItem) => {
    setSimulationResult(item.result);
    setCurrentQuery(item.query);
    setCurrentView('result');
    setError(null);
    window.scrollTo(0, 0);
  };
  
  const handleEditHistory = (item: SimulationHistoryItem) => {
    setUserInput(item.query);
    // Focus the input element
    const input = document.querySelector('input[type="text"]');
    if (input) {
      (input as HTMLInputElement).focus();
    }
  };

  const handleDeleteHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    setComparisonSelection(prev => prev.filter(selId => selId !== id));
  };
  
  const handleClearHistory = () => {
    setHistory([]);
    setComparisonSelection([]);
    saveHistory([]); // also clear from storage immediately
  };
  
  const handleToggleComparisonSelection = (id: string) => {
    setComparisonSelection(prev => {
        if (prev.includes(id)) {
            return prev.filter(selectedId => selectedId !== id);
        }
        if (prev.length < 2) {
            return [...prev, id];
        }
        return prev;
    });
  };

  const renderContent = () => {
    switch (currentView) {
      case 'loading':
        return <LoadingSpinner />;
      case 'error':
        return <ErrorMessage message={error || 'Terjadi kesalahan.'} />;
      case 'result':
        if (simulationResult) {
          return (
            <>
              <h2 className="text-3xl font-bold text-center text-white mb-6 animate-fade-in">{`Simulasi untuk: "${currentQuery}"`}</h2>
              <CareerPathDisplay data={simulationResult} />
            </>
          );
        }
        return <Welcome />;
      case 'comparison':
          if (comparisonResult) {
              return <ComparisonDisplay data={comparisonResult} onBack={() => { setCurrentView('welcome'); setComparisonSelection([]); }} />;
          }
          return <Welcome />;
      case 'welcome':
      default:
        return <Welcome />;
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        <main>
          <div className="mb-8">
            <InputForm
              userInput={userInput}
              setUserInput={setUserInput}
              onSimulate={() => handleSimulate(userInput)}
              isLoading={isLoading}
            />
          </div>

          {renderContent()}

          {currentView !== 'comparison' && history.length > 0 && (
            <HistoryList
                items={history}
                onView={handleViewHistory}
                onEdit={handleEditHistory}
                onDelete={handleDeleteHistory}
                onClear={handleClearHistory}
                disabled={isLoading}
                comparisonSelection={comparisonSelection}
                onToggleSelection={handleToggleComparisonSelection}
                onCompare={handleCompare}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
