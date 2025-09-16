import React, { useState } from 'react';
// Fix: Remove direct imports of auth functions; they are now methods on the auth object.
import type firebase from 'firebase/app';
import { auth, googleAuthProvider } from '../firebase';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { GoogleIcon } from './icons/GoogleIcon';
import AuthForm from './AuthForm';

// Embedded Icons
const MailIcon: React.FC<{className?: string}> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);
const ArrowLeftIcon: React.FC<{className?: string}> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);


type AuthView = 'options' | 'login' | 'register';

// Fix: Use firebase.auth.AuthError for v8 compatibility.
const getFirebaseErrorMessage = (error: firebase.auth.AuthError): string => {
    switch (error.code) {
        case 'auth/invalid-email':
            return 'Format email tidak valid.';
        case 'auth/user-disabled':
            return 'Akun pengguna ini telah dinaktifkan.';
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
            return 'Email atau password salah.';
        case 'auth/email-already-in-use':
            return 'Email ini sudah terdaftar. Silakan masuk.';
        case 'auth/weak-password':
            return 'Password terlalu lemah. Gunakan minimal 6 karakter.';
        default:
            return 'Terjadi kesalahan. Silakan coba lagi.';
    }
}

const Login: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [view, setView] = useState<AuthView>('options');

    const handleAuthAction = async (action: Promise<any>) => {
        setIsLoading(true);
        setError(null);
        try {
            await action;
        } catch (err) {
            console.error("Auth error:", err);
            // Fix: Cast error to the correct v8 AuthError type.
            setError(getFirebaseErrorMessage(err as firebase.auth.AuthError));
            setIsLoading(false); // Ensure loading is stopped on error
        }
        // Don't set loading to false on success, as the component will unmount
    }

    // Fix: Use auth.signInWithPopup method from the v8 auth service.
    const handleGoogleLogin = () => handleAuthAction(auth.signInWithPopup(googleAuthProvider));

    const handleEmailPasswordSubmit = async (email: string, pass: string) => {
        if (view === 'login') {
            // Fix: Use auth.signInWithEmailAndPassword method from the v8 auth service.
            await handleAuthAction(auth.signInWithEmailAndPassword(email, pass));
        } else {
            // Fix: Use auth.createUserWithEmailAndPassword and user.updateProfile methods.
            const action = auth.createUserWithEmailAndPassword(email, pass).then(userCredential => {
              if (userCredential.user) {
                  const nameFromEmail = email.substring(0, email.indexOf('@'));
                  return userCredential.user.updateProfile({ displayName: nameFromEmail });
              }
            });
            await handleAuthAction(action);
        }
    };
    
    const renderContent = () => {
        switch(view) {
            case 'login':
            case 'register':
                return (
                    <div className="w-full flex flex-col items-center">
                        <AuthForm 
                            isRegisterMode={view === 'register'}
                            onSubmit={handleEmailPasswordSubmit}
                            isLoading={isLoading}
                        />
                        <button onClick={() => { setView(view === 'login' ? 'register' : 'login'); setError(null); }} className="mt-4 text-sm text-indigo-400 hover:underline">
                            {view === 'login' ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Masuk'}
                        </button>
                    </div>
                );
            case 'options':
            default:
                return (
                    <div className="w-full animate-fade-in">
                         <BriefcaseIcon className="w-16 h-16 mx-auto text-indigo-400 mb-4" />
                         <h1 className="text-3xl font-bold text-white mb-2">Career Path Simulator</h1>
                         <p className="text-gray-400 mb-8">
                           Masuk untuk menyimpan dan mengelola riwayat simulasi karir Anda.
                         </p>
                        <div className="space-y-4">
                            <button
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-wait"
                            >
                                <GoogleIcon className="w-6 h-6" />
                                {isLoading ? 'Membuka...' : 'Masuk dengan Google'}
                            </button>
                            <button
                                onClick={() => { setView('login'); setError(null); }}
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-70"
                            >
                                <MailIcon className="w-6 h-6" />
                                Lanjutkan dengan Email
                            </button>
                        </div>
                    </div>
                );
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-2xl relative">
                {view !== 'options' && (
                     <button onClick={() => { setView('options'); setError(null); }} className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeftIcon className="w-6 h-6"/>
                    </button>
                )}
                
                {renderContent()}

                {error && <p className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg mt-6 text-sm">{error}</p>}

                {view === 'options' && (
                    <p className="text-xs text-gray-500 mt-6">
                        Dengan masuk, Anda setuju untuk menyimpan data simulasi Anda secara aman.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;