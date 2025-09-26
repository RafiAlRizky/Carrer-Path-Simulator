
import React from 'react';
import type { SimulationHistoryItem } from '../types';
import { EyeIcon } from './icons/EyeIcon';
import { RefreshIcon } from './icons/RefreshIcon';
import { TrashIcon } from './icons/TrashIcon';
import { CompareIcon } from './icons/CompareIcon';

interface HistoryListProps {
  items: SimulationHistoryItem[];
  onView: (item: SimulationHistoryItem) => void;
  onEdit: (item: SimulationHistoryItem) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
  disabled: boolean;
  // Props baru untuk perbandingan
  comparisonSelection: string[];
  onToggleSelection: (id: string) => void;
  onCompare: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ 
  items, 
  onView, 
  onEdit, 
  onDelete, 
  onClear, 
  disabled, 
  comparisonSelection, 
  onToggleSelection,
  onCompare
}) => {
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

  const canSelectMore = comparisonSelection.length < 2;

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
      
      {items.length > 1 && (
        <div className="mb-4 bg-gray-800/50 p-3 rounded-lg border border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-400">
                Pilih dua item untuk dibandingkan. ({comparisonSelection.length}/2)
            </p>
            <button
                onClick={onCompare}
                disabled={disabled || comparisonSelection.length !== 2}
                className="w-full sm:w-auto px-5 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                <CompareIcon className="w-5 h-5" />
                Bandingkan Pilihan
            </button>
        </div>
      )}

      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 space-y-3 max-h-96 overflow-y-auto">
        {items.map((item) => {
          const isSelected = comparisonSelection.includes(item.id);
          const isDisabledForSelection = !isSelected && !canSelectMore;
          return (
            <div
              key={item.id}
              className={`flex items-start sm:items-center p-3 bg-gray-900/60 rounded-md gap-3 transition-colors ${isSelected ? 'ring-2 ring-cyan-500' : 'ring-0'}`}
            >
              {items.length > 1 && (
                 <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleSelection(item.id)}
                  disabled={disabled || isDisabledForSelection}
                  className="mt-1 sm:mt-0 w-5 h-5 bg-gray-700 border-gray-600 rounded text-cyan-500 focus:ring-cyan-600 focus:ring-2 disabled:opacity-50 cursor-pointer"
                  aria-label={`Pilih ${item.query} untuk perbandingan`}
                />
              )}
              <div className="flex-grow min-w-0">
                <p className="font-semibold text-indigo-300 truncate" title={item.query}>
                  {item.query}
                </p>
                <p className="text-xs text-gray-500">{formatDate(item.timestamp)}</p>
              </div>
              <div className="flex items-center gap-2 self-center shrink-0">
                 <button
                  onClick={() => onView(item)}
                  title="Lihat Lagi"
                  disabled={disabled}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <EyeIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onEdit(item)}
                  title="Edit & Simulasi Ulang"
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
          )
        })}
      </div>
    </div>
  );
};

export default HistoryList;