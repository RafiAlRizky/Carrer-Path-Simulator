import React, { useState } from 'react';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { SitemapIcon } from './icons/SitemapIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';


interface LoginProps {
  onLogin: (success: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate network delay for better UX
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        onLogin(true);
      } else {
        setError('Invalid username or password.');
        onLogin(false);
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200 font-sans p-4 animate-fade-in">
      <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column / Top Section on Mobile */}
        <div className="text-center lg:text-left animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-4">
            Career Path Simulator
          </h1>
          <p className="text-lg text-gray-400 mb-6 max-w-lg mx-auto lg:mx-0">
            Jelajahi masa depan karir Anda dengan simulasi AI. Dapatkan peta jalan yang jelas, mulai dari skill yang dibutuhkan hingga prospek gaji di pasar global dan lokal.
          </p>
          <ul className="hidden lg:block space-y-4 text-gray-300 mt-8">
            <li className="flex items-start">
              <BriefcaseIcon className="w-6 h-6 text-indigo-400 mr-3 mt-1 shrink-0" />
              <span>Dapatkan gambaran perjalanan karir Anda dari junior hingga senior.</span>
            </li>
            <li className="flex items-start">
              <SitemapIcon className="w-6 h-6 text-indigo-400 mr-3 mt-1 shrink-0" />
              <span>Ketahui skill fundamental, intermediate, hingga advanced yang perlu dikuasai.</span>
            </li>
            <li className="flex items-start">
              <TrendingUpIcon className="w-6 h-6 text-indigo-400 mr-3 mt-1 shrink-0" />
              <span>Lihat estimasi gaji di pasar lokal dan global, serta tren permintaan.</span>
            </li>
          </ul>
        </div>

        {/* Right Column / Bottom Section on Mobile */}
        <div className="w-full max-w-md mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 shadow-lg backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Login to Continue
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow duration-200 text-gray-200 placeholder-gray-500"
                  disabled={isLoading}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow duration-200 text-gray-200 placeholder-gray-500"
                  disabled={isLoading}
                  required
                />
              </div>
              {error && (
                <div role="alert" className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg text-center text-sm">
                  <p>{error}</p>
                </div>
              )}
              <div>
                <button
                  type="submit"
                  disabled={isLoading || !username || !password}
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;