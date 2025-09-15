
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
        Career Path Simulator
      </h1>
      <p className="text-lg text-gray-400">
        Jelajahi masa depan karir Anda dengan simulasi AI.
      </p>
    </header>
  );
};

export default Header;
