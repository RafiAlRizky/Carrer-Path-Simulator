

import React, { useState } from 'react';
// FIX: Import firebase to get access to the firebase.auth.Error type.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth, googleProvider } from '../firebase';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { GoogleIcon } from './icons/GoogleIcon';
import AuthForm from './AuthForm';

const Login: React.FC = () => {
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<{ email: boolean; google: boolean }>({ email: false, google: false });

    const handleEmailSubmit = async (email: string, pass: string) => {
        setIsLoading(prev => ({ ...prev, email: true }));
        setError(null);
        try {
            if (isRegisterMode) {
                await auth.createUserWithEmailAndPassword(email, pass);
            } else {
                await auth.signInWithEmailAndPassword(email, pass);
            }
        } catch (err: any) {
            const firebaseError = err as firebase.auth.Error;
            switch (firebaseError.code) {
                case 'auth/user-not-found':
                    setError('Tidak ada pengguna yang ditemukan dengan email ini.');
                    break;
                case 'auth/wrong-password':
                    setError('Password salah. Silakan coba lagi.');
                    break;
                case 'auth/email-already-in-use':
                     setError('Email ini sudah terdaftar. Silakan masuk.');
                    break;
                default:
                    setError(firebaseError.message || 'Terjadi kesalahan. Silakan coba lagi.');
            }
        } finally {
            setIsLoading(prev => ({ ...prev, email: false }));
        }
    };
    
    const handleGoogleSignIn = async () => {
        setIsLoading(prev => ({ ...prev, google: true }));
        setError(null);
        try {
            await auth.signInWithPopup(googleProvider);
        } catch (err: any) {
            setError((err as Error).message || 'Gagal masuk dengan Google. Silakan coba lagi.');
        } finally {
             setIsLoading(prev => ({ ...prev, google: false }));
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-2xl">
                <div className="text-center mb-8 animate-fade-in">
                    <BriefcaseIcon className="w-16 h-16 mx-auto text-indigo-400 mb-4" />
                    <h1 className="text-3xl font-bold text-white mb-2">Career Path Simulator</h1>
                    <p className="text-gray-400">
                        Masuk atau buat akun untuk memulai.
                    </p>
                </div>

                <AuthForm 
                    isRegisterMode={isRegisterMode}
                    onSubmit={handleEmailSubmit}
                    isLoading={isLoading.email}
                />
                
                <div className="my-6 flex items-center animate-fade-in">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-sm">ATAU</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>

                <button
                    onClick={handleGoogleSignIn}
                    disabled={isLoading.email || isLoading.google}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in"
                >
                    <GoogleIcon />
                    {isLoading.google ? 'Memproses...' : 'Lanjutkan dengan Google'}
                </button>
                
                <div className="mt-6 text-center animate-fade-in">
                    <button 
                        onClick={() => {
                            setIsRegisterMode(!isRegisterMode);
                            setError(null);
                        }} 
                        className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                        {isRegisterMode ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar'}
                    </button>
                </div>

                {error && <p className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg mt-6 text-sm text-center animate-fade-in">{error}</p>}
            </div>
        </div>
    );
};

export default Login;