
import React, { useState } from 'react';

// Embedded icons to reduce file count
const MailIcon: React.FC<{className?: string}> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const LockIcon: React.FC<{className?: string}> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);


interface AuthFormProps {
  isRegisterMode: boolean;
  onSubmit: (email: string, pass: string) => Promise<void>;
  isLoading: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isRegisterMode, onSubmit, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || isLoading) return;
    onSubmit(email, password);
  };

  const title = isRegisterMode ? 'Daftar Akun Baru' : 'Masuk dengan Email';
  const buttonText = isRegisterMode ? 'Buat Akun' : 'Masuk';
  const loadingButtonText = isRegisterMode ? 'Mendaftarkan...' : 'Masuk...';

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <MailIcon />
            </div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow duration-200 text-gray-200 placeholder-gray-400"
                disabled={isLoading}
            />
        </div>
        
        <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <LockIcon />
            </div>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                minLength={6}
                className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow duration-200 text-gray-200 placeholder-gray-400"
                disabled={isLoading}
            />
        </div>

        <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
            {isLoading ? loadingButtonText : buttonText}
        </button>
    </form>
  );
};

export default AuthForm;
