import React from 'react';
import App from '../App';
import ConfigurationError from './ConfigurationError';

// FIX: Per the guidelines, the API key must come exclusively from `process.env.API_KEY`.
// The UI for submitting a key has been removed.
const AppWrapper: React.FC = () => {
    if (!process.env.API_KEY) {
        // FIX: The onKeySubmit prop is removed from ConfigurationError as there is no longer a user-facing key submission form.
        return <ConfigurationError />;
    }
    
    return <App apiKey={process.env.API_KEY} />;
};

export default AppWrapper;
