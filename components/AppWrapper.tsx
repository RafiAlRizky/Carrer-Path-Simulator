import React, { useState } from 'react';
import App from '../App';
import ConfigurationError from './ConfigurationError';

const AppWrapper: React.FC = () => {
  const [sessionApiKey, setSessionApiKey] = useState<string | null>(null);

  const effectiveApiKey = process.env.API_KEY || sessionApiKey;

  const handleKeySubmit = (key: string) => {
    setSessionApiKey(key);
  };
  
  if (!effectiveApiKey) {
    return <ConfigurationError onKeySubmit={handleKeySubmit} />;
  }

  return <App apiKey={effectiveApiKey} />;
};

export default AppWrapper;