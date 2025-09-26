import React from 'react';
import { WarningIcon } from './icons/WarningIcon';

// FIX: Removed the onKeySubmit prop. Per the guidelines,
// the application must not provide any UI for entering or managing the API key.
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
          <h2 className="font-semibold text-lg mb-3 text-left text-white">Konfigurasi Environment Variable</h2>
          <p className="text-sm text-gray-400 mb-4 text-left">
            Atur API Key Anda sebagai environment variable di platform hosting Anda (misalnya Vercel, Netlify) untuk mengaktifkan aplikasi.
          </p>
          <div className="text-left bg-gray-900/50 p-4 rounded-md border border-gray-600">
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
              <li>Buka dasbor proyek Anda di Vercel atau platform hosting Anda.</li>
              <li>Navigasi ke bagian <strong>Settings</strong> &gt; <strong>Environment Variables</strong>.</li>
              <li>
                Buat variabel baru dengan nama <code className="bg-gray-700 px-2 py-1 rounded-md text-indigo-300">API_KEY</code>.
              </li>
              <li>
                Masukkan API Key Google AI Studio Anda sebagai nilainya.
              </li>
              <li>Simpan dan lakukan <strong>Redeploy</strong> pada deployment terakhir Anda agar perubahan diterapkan.</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ConfigurationError;
