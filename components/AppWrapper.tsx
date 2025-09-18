import React from 'react';
import App from '../App';

const AppWrapper: React.FC = () => {
  // Since Firebase authentication is removed, we directly render the main App component.
  return <App />;
};

export default AppWrapper;