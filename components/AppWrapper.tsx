import React, { useState } from 'react';
import App from '../App';
import ConfigurationError from './ConfigurationError';

const AppWrapper: React.FC = () => {
  // This component now manages the API key state for the application.
  // It prioritizes the environment variable, but falls back to a session-based key
  // provided by the user if the environment variable is not available.

  const [sessionApiKey, setSessionApiKey] = useState<string | null>(null);

  const effectiveApiKey = process.env.API_KEY || sessionApiKey;

  const handleKeySubmit = (key: string) => {
    setSessionApiKey(key);
  };
  
  if (!effectiveApiKey) {
    // If no API key is available from either the environment or the session state,
    // render the configuration error screen to prompt the user.
    return <ConfigurationError onKeySubmit={handleKeySubmit} />;
  }

  // Once an API key is available, render the main application component
  // and pass the key down as a prop.
  return <App apiKey={effectiveApiKey} />;
};

export default AppWrapper;
