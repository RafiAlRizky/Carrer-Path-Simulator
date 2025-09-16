
import React from 'react';
// FIX: Imported the firebase object to use its User type, aligning with the v8 SDK.
import firebase from 'firebase/app';

interface HeaderProps {
  // FIX: Switched to firebase.User type from the v8 SDK.
  user: firebase.User;
  onLogout: () => void;
}

// FIX: Switched to firebase.User type from the v8 SDK.
const Avatar: React.FC<{ user: firebase.User }> = ({ user }) => {
  if (user.photoURL) {
    return <img src={user.photoURL} alt="User" className="w-12 h-12 rounded-full border-2 border-indigo-500 object-cover"/>;
  }

  const getInitials = (name: string | null, email: string | null): string => {
    if (name && name.trim()) {
      const parts = name.trim().split(' ');
      if (parts.length > 1 && parts[0] && parts[parts.length - 1]) {
          return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return '?';
  };

  const initials = getInitials(user.displayName, user.email);

  // Simple hash function for consistent background color
  const getAvatarColor = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      'bg-indigo-600', 'bg-purple-600', 'bg-pink-600',
      'bg-red-600', 'bg-green-600', 'bg-teal-600', 'bg-blue-600'
    ];
    return colors[Math.abs(hash) % colors.length];
  }
  
  const bgColor = getAvatarColor(user.uid);

  return (
    <div className={`w-12 h-12 rounded-full border-2 border-indigo-500 flex items-center justify-center ${bgColor} text-white font-bold text-lg`}>
      {initials}
    </div>
  );
};


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
                 <p className="font-semibold text-white text-sm">{user.displayName || user.email}</p>
                 <p className="text-xs text-gray-400">{user.email}</p>
               </div>
               <Avatar user={user} />
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
