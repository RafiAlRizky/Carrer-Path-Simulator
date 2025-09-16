import React from 'react';
import type { User } from 'firebase/auth';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1"></div>
        <div className="text-center flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-2">
            Career Path Simulator
          </h1>
          <p className="text-lg text-gray-400">
            Jelajahi masa depan karir Anda dengan simulasi AI.
          </p>
        </div>
        <div className="flex-1 flex justify-end items-center">
          {user && (
            <div className="flex items-center gap-4">
               <div className="text-right">
                 <p className="font-semibold text-white text-sm">{user.displayName}</p>
                 <p className="text-xs text-gray-400">{user.email}</p>
               </div>
               <img src={user.photoURL || undefined} alt="User" className="w-12 h-12 rounded-full border-2 border-indigo-500"/>
               <button
                onClick={onLogout}
                className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors duration-200 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;