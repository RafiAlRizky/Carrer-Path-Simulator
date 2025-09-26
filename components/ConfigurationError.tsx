import React from 'react';
import { WarningIcon } from './icons/WarningIcon';

const ConfigurationError: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg animate-fade-in">
        
        <div className="pb-6 text-center border-b border-gray-600">
            <WarningIcon className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
            <h1 className="text-3xl font-bold mb-2 text-white">Konfigurasi Dibutuhkan</h1>
            <p className="mb-6 text-gray-400">
              Aplikasi ini memerlukan API Key dari Google AI Studio untuk berfungsi.
            </p>
        </div>

        <div className="pt-6">
          <h2 className="font-semibold text-lg mb-3 text-left text-white">Langkah Konfigurasi</h2>
          <p className="text-sm text-gray-400 mb-4 text-left">
            Untuk Vercel atau platform hosting modern lainnya, Anda perlu mengatur API Key Anda sebagai environment variable.
          </p>
          <div className="text-left bg-gray-900/50 p-4 rounded-md border border-gray-600">
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
              <li>Di dasbor Vercel Anda, buka proyek lalu ke <strong>Settings</strong> &gt; <strong>Environment Variables</strong>.</li>
              <li>
                Buat variabel baru dengan nama <code className="bg-gray-700 px-2 py-1 rounded-md text-indigo-300">VITE_API_KEY</code>.
              </li>
              <li>
                Paste API Key Anda sebagai nilainya.
              </li>
              <li>Simpan dan <strong>Redeploy</strong> proyek Anda agar perubahan diterapkan.</li>
            </ol>
            <p className="text-xs text-gray-500 mt-4">
              (Untuk lingkungan lain, aplikasi ini juga akan mencoba membaca variabel bernama `API_KEY`.)
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ConfigurationError;