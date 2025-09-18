import React from 'react';
import { WarningIcon } from './icons/WarningIcon';

const ConfigurationError: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-red-900/50 border border-red-700 text-red-200 p-8 rounded-lg text-center shadow-lg animate-fade-in">
        <WarningIcon className="w-16 h-16 mx-auto mb-4 text-red-300" />
        <h1 className="text-3xl font-bold mb-2">Kesalahan Konfigurasi</h1>
        <p className="mb-6">
          Aplikasi tidak dapat berjalan karena variabel lingkungan (environment variable) untuk Gemini API belum diatur.
        </p>
        <div className="text-left bg-gray-800/60 p-6 rounded-md border border-gray-600">
          <h2 className="font-semibold text-lg mb-3">Langkah-langkah untuk Memperbaiki (di Vercel):</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Buka dasbor proyek Anda di Vercel.</li>
            <li>Navigasi ke tab <strong>Settings</strong> &gt; <strong>Environment Variables</strong>.</li>
            {/* FIX: Updated environment variable name to API_KEY to align with Gemini API guidelines. */}
            <li>
              Buat variabel baru dengan nama <code className="bg-gray-700 px-2 py-1 rounded-md text-indigo-300">API_KEY</code>.
            </li>
            <li>
              Masukkan API Key Google AI Studio Anda sebagai nilainya (value).
            </li>
            <li>Simpan dan lakukan <strong>Redeploy</strong> pada deployment terakhir Anda agar perubahan diterapkan.</li>
          </ol>
        </div>
        <p className="mt-6 text-sm text-red-300/80">
          Setelah API Key diatur dengan benar, aplikasi akan berfungsi.
        </p>
      </div>
    </div>
  );
};

export default ConfigurationError;