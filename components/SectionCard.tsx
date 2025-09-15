
import React from 'react';

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-lg backdrop-blur-sm">
      <div className="flex items-center mb-4">
        <div className="text-cyan-400 mr-3">{icon}</div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default SectionCard;
