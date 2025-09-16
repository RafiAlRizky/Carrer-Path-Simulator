
import React from 'react';
import type { SimulationHistoryItem } from '../types';
import { EyeIcon } from './icons/EyeIcon';
import { RefreshIcon } from './icons/RefreshIcon';
import { TrashIcon } from './icons/TrashIcon';

interface HistoryListProps {
  items: SimulationHistoryItem[];
  onView: (item: SimulationHistoryItem) => void;
  onResimulate: (item: SimulationHistoryItem) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
  disabled: boolean;
}

const HistoryList: React.FC<HistoryListProps> = ({ items, onView, onResimulate, onDelete, onClear, disabled }) => {
  if (items.length === 0) {
    return null; // Don't render anything if history is empty
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Riwayat Simulasi</h2>
        <button
          onClick={onClear}
          disabled={disabled}
          className="text-sm text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Bersihkan Riwayat
        </button>
      </div>
      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-900/60 rounded-md gap-4"
          >
            <div className="flex-grow">
              <p className="font-semibold text-indigo-300 truncate" title={item.query}>
                {item.query}
              </p>
              <p className="text-xs text-gray-500">{formatDate(item.timestamp)}</p>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center">
               <button
                onClick={() => onView(item)}
                title="Lihat Lagi"
                disabled={disabled}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <EyeIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => onResimulate(item)}
                title="Simulasi Ulang"
                disabled={disabled}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                title="Hapus"
                disabled={disabled}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/50 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
