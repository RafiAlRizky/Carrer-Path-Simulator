
import React, { useState, useCallback, useEffect } from 'react';
// FIX: Updated imports to use the Firebase v8 namespaced API, which resolves the module export errors.
import firebase from 'firebase/app';
import 'firebase/auth';
import type { CareerPath, SimulationHistoryItem } from './types';
import { simulateCareerPath } from './services/geminiService';
import { getUserHistory, addSimulationToHistory, deleteHistoryItem, clearUserHistory } from './services/firestoreService';
import { auth } from './firebase';
import Header from './components/Header';
import InputForm from './components/InputForm';
import CareerPathDisplay from './components/CareerPathDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Welcome from './components/Welcome';
import HistoryList from './components/HistoryList';
import Login from './components/Login';

const API_KEY = typeof process !== 'undefined' && process.env ? process.env.API_KEY : undefined;

const App: React.FC = () => {
  // FIX: Switched to firebase.User type from the v8 SDK.
  const [user, setUser] = useState<firebase.User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [userInput, setUserInput] = useState<string>('');
  const [careerPathData, setCareerPathData] = useState<CareerPath | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SimulationHistoryItem[]>([]);
  
  const isApiConfigured = !!API_KEY;

  useEffect(() => {
    // FIX: Used the onAuthStateChanged method from the v8 auth instance.
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchHistory = async () => {
        try {
          const userHistory = await getUserHistory(user.uid);
          setHistory(userHistory);
        } catch (e) {
          console.error("Failed to load history from Firestore:", e);
          setError("Gagal memuat riwayat simulasi Anda.");
        }
      };
      fetchHistory();
    } else {
      setHistory([]); // Clear history on logout
    }
  }, [user]);

  const handleSimulate = useCallback(async (simulationQuery: string) => {
    if (!user) {
      setError('Anda harus login untuk memulai simulasi.');
      return;
    }
    if (!isApiConfigured) {
      setError('Configuration Error: The API key is missing.');
      return;
    }
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
      
      const newHistoryItem = {
        query: simulationQuery,
        result: data,
        timestamp: new Date().toISOString(),
        userId: user.uid,
      };
      const addedItemId = await addSimulationToHistory(newHistoryItem);
      setHistory(prevHistory => [{ ...newHistoryItem, id: addedItemId }, ...prevHistory].slice(0, 50));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [isApiConfigured, user]);
  
  const handleLogout = () => {
    // FIX: Used the signOut method from the v8 auth instance.
    auth.signOut().catch((error) => console.error('Logout failed', error));
  };

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
  
  const handleDeleteHistory = async (id: string) => {
    try {
        await deleteHistoryItem(id);
        setHistory(prev => prev.filter(item => item.id !== id));
    } catch (e) {
        console.error("Failed to delete history item:", e);
        setError("Gagal menghapus item riwayat.");
    }
  };
  
  const handleClearHistory = async () => {
    if (!user) return;
    try {
        await clearUserHistory(user.uid);
        setHistory([]);
    } catch (e) {
        console.error("Failed to clear history:", e);
        setError("Gagal membersihkan riwayat.");
    }
  };
  
  if (authLoading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center"><LoadingSpinner /></div>;
  }
  
  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header user={user} onLogout={handleLogout} />
        <main>
          {!isApiConfigured && (
             <div className="mb-4">
               <ErrorMessage message="Configuration Error: The application is not properly configured. An API key is required to use the simulation service." />
             </div>
          )}
          <InputForm
            userInput={userInput}
            setUserInput={setUserInput}
            onSimulate={handleFormSubmit}
            isLoading={isLoading}
            disabled={!isApiConfigured}
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
