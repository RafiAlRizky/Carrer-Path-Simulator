import React from 'react';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { SitemapIcon } from './icons/SitemapIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay: number;
}

const FeatureCard = ({ icon, title, children, delay }: FeatureCardProps) => (
    <div
      className="bg-gray-800/60 p-4 rounded-lg border border-gray-700/80 flex items-start space-x-4 animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
        <div className="text-indigo-400 mt-1 shrink-0">{icon}</div>
        <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-400">{children}</p>
        </div>
    </div>
);

const Welcome: React.FC = () => {
    return (
        <div className="space-y-12">
            <div className="text-center p-8 bg-gray-800/50 rounded-lg border border-gray-700 animate-fade-in-up" style={{ animationDelay: '0s' }}>
                <LightbulbIcon className="w-12 h-12 mx-auto mb-4 text-indigo-400" />
                <h2 className="text-2xl font-bold text-white mb-2">Selamat Datang!</h2>
                <p className="text-gray-400 mb-6">Masukkan jalur karir, minat, atau pertanyaan untuk memulai simulasi AI.</p>
                <div className="text-left max-w-md mx-auto bg-gray-900/50 p-4 rounded-md border border-gray-700">
                  <p className="text-sm text-gray-400 font-semibold mb-2">Contoh yang bisa Anda coba:</p>
                  <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                      <li>"Jalur karir untuk menjadi AI Engineer"</li>
                      <li>"Prospek menjadi UI/UX Designer di Indonesia"</li>
                      <li>"Saya suka menulis dan teknologi, karir apa yang cocok?"</li>
                  </ul>
                </div>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-xl font-bold text-center text-white mb-6">Fitur Unggulan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* FIX: Add missing children prop to FeatureCard components */}
                    <FeatureCard
                        icon={<BriefcaseIcon className="w-6 h-6" />}
                        title="Simulasi Karir Komprehensif"
                        delay={0.4}
                    >
                        Dapatkan gambaran lengkap perjalanan karir Anda, dari junior hingga senior.
                    </FeatureCard>
                    <FeatureCard
                        icon={<SitemapIcon className="w-6 h-6" />}
                        title="Peta Kompetensi Detail"
                        delay={0.5}
                    >
                        Ketahui skill fundamental, intermediate, hingga advanced yang perlu dikuasai.
                    </FeatureCard>
                    <FeatureCard
                        icon={<TrendingUpIcon className="w-6 h-6" />}
                        title="Prospek & Perkiraan Gaji"
                        delay={0.6}
                    >
                        Lihat estimasi gaji di pasar lokal (Indonesia) dan global, serta tren permintaan.
                    </FeatureCard>
                    <FeatureCard
                        icon={<LightbulbIcon className="w-6 h-6" />}
                        title="Tips & Alternatif Karir"
                        delay={0.7}
                    >
                        Temukan rekomendasi langkah-langkah praktis dan jelajahi jalur karir alternatif.
                    </FeatureCard>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
