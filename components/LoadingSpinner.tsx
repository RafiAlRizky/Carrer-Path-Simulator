
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-400">AI sedang memetakan jalur karir Anda...</p>
    </div>
  );
};

export default LoadingSpinner;
