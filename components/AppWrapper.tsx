import React from 'react';
import App from '../App';
import ConfigurationError from './ConfigurationError';

const AppWrapper: React.FC = () => {
    // FIX: Use optional chaining to prevent a crash when `import.meta.env` is undefined.
    // Fall back to process.env.API_KEY for broader environment compatibility.
    const apiKey = (import.meta as any).env?.VITE_API_KEY || process.env.API_KEY;

    if (!apiKey) {
        return <ConfigurationError />;
    }
    
    return <App apiKey={apiKey} />;
};

export default AppWrapper;