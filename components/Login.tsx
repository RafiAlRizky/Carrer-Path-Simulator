import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../firebase';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { GoogleIcon } from './icons/GoogleIcon';

const Login: React.FC = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGoogleLogin = async () => {
        setIsLoggingIn(true);
        setError(null);
        try {
            await signInWithPopup(auth, googleAuthProvider);
        } catch (error) {
            console.error("Google login error:", error);
            setError("Gagal masuk dengan Google. Silakan coba lagi.");
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-2xl animate-fade-in-up">
                <BriefcaseIcon className="w-16 h-16 mx-auto text-indigo-400 mb-4" />
                <h1 className="text-3xl font-bold text-white mb-2">Career Path Simulator</h1>
                <p className="text-gray-400 mb-8">
                    Masuk untuk menyimpan dan mengelola riwayat simulasi karir Anda.
                </p>

                {error && <p className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg mb-6">{error}</p>}
                
                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoggingIn}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-wait"
                >
                    <GoogleIcon className="w-6 h-6" />
                    {isLoggingIn ? 'Membuka...' : 'Masuk dengan Google'}
                </button>
                <p className="text-xs text-gray-500 mt-6">
                    Dengan masuk, Anda setuju untuk menyimpan data simulasi Anda secara aman.
                </p>
            </div>
        </div>
    );
};

export default Login;