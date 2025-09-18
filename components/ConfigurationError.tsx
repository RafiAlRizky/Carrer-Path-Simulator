import React, { useState } from 'react';
import { WarningIcon } from './icons/WarningIcon';

interface ConfigurationErrorProps {
  onKeySubmit: (key: string) => void;
}

const ConfigurationError: React.FC<ConfigurationErrorProps> = ({ onKeySubmit }) => {
  const [keyInput, setKeyInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyInput.trim()) {
      onKeySubmit(keyInput.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg animate-fade-in divide-y divide-gray-600">
        
        <div className="pb-6 text-center">
            <WarningIcon className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
            <h1 className="text-3xl font-bold mb-2 text-white">Konfigurasi Dibutuhkan</h1>
            <p className="mb-6 text-gray-400">
              Aplikasi ini memerlukan API Key dari Google AI Studio untuk berfungsi.
            </p>
        </div>

        <div className="py-6">
            <h2 className="font-semibold text-lg mb-3 text-left text-white">Opsi 1: Gunakan Kunci Sementara (Cepat)</h2>
            <p className="text-sm text-gray-400 mb-4 text-left">
              Masukkan API Key Anda di bawah ini untuk memulai sesi sementara. Kunci tidak akan disimpan secara permanen.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                 <input
                    type="password"
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                    placeholder="Masukkan API Key Anda di sini..."
                    className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow duration-200 text-gray-200 placeholder-gray-500"
                    aria-label="Gemini API Key Input"
                 />
                 <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50"
                    disabled={!keyInput.trim()}
                 >
                    Mulai Sesi
                 </button>
            </form>
        </div>

        <div className="pt-6">
          <h2 className="font-semibold text-lg mb-3 text-left text-white">Opsi 2: Konfigurasi Permanen (Direkomendasikan)</h2>
          <p className="text-sm text-gray-400 mb-4 text-left">
            Untuk penggunaan jangka panjang, atur API Key Anda sebagai environment variable di platform hosting Anda (misalnya Vercel, Netlify).
          </p>
          <div className="text-left bg-gray-900/50 p-4 rounded-md border border-gray-600">
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
              <li>Buka dasbor proyek Anda di Vercel.</li>
              <li>Navigasi ke tab <strong>Settings</strong> &gt; <strong>Environment Variables</strong>.</li>
              <li>
                Buat variabel baru dengan nama <code className="bg-gray-700 px-2 py-1 rounded-md text-indigo-300">API_KEY</code>.
              </li>
              <li>
                Masukkan API Key Google AI Studio Anda sebagai nilainya.
              </li>
              <li>Simpan dan lakukan <strong>Redeploy</strong> pada deployment terakhir Anda.</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ConfigurationError;