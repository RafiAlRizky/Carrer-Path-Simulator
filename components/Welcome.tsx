
import React from 'react';
import { LightbulbIcon } from './icons/LightbulbIcon';

const Welcome: React.FC = () => {
    return (
        <div className="text-center p-8 bg-gray-800/50 rounded-lg border border-gray-700">
            <LightbulbIcon className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white mb-2">Selamat Datang!</h2>
            <p className="text-gray-400 mb-6">Masukkan jalur karir, minat, atau pertanyaan untuk memulai simulasi.</p>
            <div className="text-left max-w-md mx-auto space-y-2">
                <p className="text-gray-500 font-semibold">Contoh yang bisa Anda coba:</p>
                <ul className="list-disc list-inside text-gray-400">
                    <li>"Jalur karir untuk menjadi AI Engineer"</li>
                    <li>"Prospek menjadi UI/UX Designer di Indonesia"</li>
                    <li>"Saya suka menulis dan teknologi, karir apa yang cocok?"</li>
                </ul>
            </div>
        </div>
    );
};

export default Welcome;
