import React from 'react';
import type { ComparisonSummary } from '../types';
import SectionCard from './SectionCard';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ScaleIcon } from './icons/ScaleIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { CheckIcon } from './icons/CheckIcon';

interface ComparisonDisplayProps {
  data: ComparisonSummary;
  onBack: () => void;
}

const ComparisonDisplay: React.FC<ComparisonDisplayProps> = ({ data, onBack }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Kembali ke Riwayat
        </button>
      </div>
      
      <SectionCard title="Perbandingan Karir" icon={<ScaleIcon />}>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Career 1 */}
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold text-indigo-300 mb-3 text-center">{data.career1.title}</h3>
            <ul className="space-y-2">
              {data.career1.pros.map((pro, index) => (
                <li key={index} className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-2 shrink-0 mt-1" />
                  <span className="text-gray-300">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Career 2 */}
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold text-cyan-300 mb-3 text-center">{data.career2.title}</h3>
            <ul className="space-y-2">
              {data.career2.pros.map((pro, index) => (
                <li key={index} className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-2 shrink-0 mt-1" />
                  <span className="text-gray-300">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Kesimpulan & Rekomendasi" icon={<SparklesIcon />}>
        <p className="text-gray-300 italic leading-relaxed">{data.verdict}</p>
      </SectionCard>
    </div>
  );
};

export default ComparisonDisplay;
