import React from 'react';
import { WarningIcon } from './icons/WarningIcon';

const FirebaseConfigError: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-red-900/50 border border-red-700 text-red-200 p-8 rounded-lg text-center shadow-lg animate-fade-in">
        <WarningIcon className="w-16 h-16 mx-auto mb-4 text-red-300" />
        <h1 className="text-3xl font-bold mb-2">Kesalahan Konfigurasi Firebase</h1>
        <p className="mb-6">
          Aplikasi tidak dapat berjalan karena konfigurasi Firebase belum diatur. Silakan perbarui file <strong>firebase.ts</strong>.
        </p>
        <div className="text-left bg-gray-800/60 p-6 rounded-md border border-gray-600">
          <h2 className="font-semibold text-lg mb-3">Langkah-langkah untuk Memperbaiki:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Buka Firebase Console dan pilih proyek Anda.</li>
            <li>Jika belum ada, tambahkan Aplikasi Web baru (Web App).</li>
            <li>Navigasi ke <strong>Project Settings</strong> (ikon gerigi) &gt; <strong>General</strong>.</li>
            <li>Di bagian "Your apps", temukan objek konfigurasi Firebase (Firebase SDK snippet).</li>
            <li>Salin objek `firebaseConfig` tersebut.</li>
            <li>Tempelkan (paste) ke dalam file `firebase.ts` di proyek ini, menggantikan placeholder yang ada.</li>
            <li>Setelah memperbarui file, simpan dan deploy ulang aplikasi Anda.</li>
          </ol>
        </div>
        <p className="mt-6 text-sm text-red-300/80">
          Aplikasi memerlukan Firebase untuk autentikasi dan menyimpan riwayat simulasi.
        </p>
      </div>
    </div>
  );
};

export default FirebaseConfigError;