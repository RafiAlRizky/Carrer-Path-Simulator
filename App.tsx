
import React, { useState, useCallback } from 'react';
import type { CareerPath } from './types';
import { simulateCareerPath } from './services/geminiService';
import Header from './components/Header';
import InputForm from './components/InputForm';
import CareerPathDisplay from './components/CareerPathDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Welcome from './components/Welcome';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [careerPathData, setCareerPathData] = useState<CareerPath | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSimulate = useCallback(async () => {
    if (!userInput.trim()) {
      setError('Please enter a career path or interest to simulate.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setCareerPathData(null);

    try {
      const data = await simulateCareerPath(userInput);
      setCareerPathData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        <main>
          <InputForm
            userInput={userInput}
            setUserInput={setUserInput}
            onSimulate={handleSimulate}
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
        </main>
      </div>
    </div>
  );
};

export default App;
