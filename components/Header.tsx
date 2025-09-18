import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="mb-8 pt-4 sm:pt-12">
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-2">
                Career Path Simulator
            </h1>
            <p className="text-lg text-gray-400">
                Jelajahi masa depan karir Anda dengan simulasi AI.
            </p>
        </div>
    </header>
  );
};

export default Header;