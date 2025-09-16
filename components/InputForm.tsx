import React from 'react';

interface InputFormProps {
  userInput: string;
  setUserInput: (value: string) => void;
  onSimulate: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ userInput, setUserInput, onSimulate, isLoading }) => {
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      onSimulate();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., 'Data Analyst' atau 'suka desain tapi lemah matematika'"
        className="flex-grow p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow duration-200 text-gray-200 placeholder-gray-500"
        disabled={isLoading}
      />
      <button
        onClick={onSimulate}
        disabled={isLoading || !userInput.trim()}
        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? 'Menganalisis...' : 'Simulasikan'}
      </button>
    </div>
  );
};

export default InputForm;