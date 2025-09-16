import React from 'react';

interface HeaderProps {
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="mb-8 relative">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-2">
          Career Path Simulator
        </h1>
        <p className="text-lg text-gray-400">
          Jelajahi masa depan karir Anda dengan simulasi AI.
        </p>
      </div>
      {onLogout && (
        <button
          onClick={onLogout}
          className="absolute top-0 right-0 px-4 py-2 text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700 rounded-lg transition-colors duration-200"
          aria-label="Logout"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;