import React, { useState, useEffect } from 'react';
import type { CareerPath } from '../types';
import SectionCard from './SectionCard';
import SkillTree from './SkillTree';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { SitemapIcon } from './icons/SitemapIcon';
import { TimelineIcon } from './icons/TimelineIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import { ShuffleIcon } from './icons/ShuffleIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';

interface CareerPathDisplayProps {
  data: CareerPath;
}

const CareerPathDisplay: React.FC<CareerPathDisplayProps> = ({ data }) => {
  const [endorsedSkills, setEndorsedSkills] = useState<string[]>(() => {
    try {
      const savedSkills = localStorage.getItem('endorsedSkills');
      return savedSkills ? JSON.parse(savedSkills) : [];
    } catch (error) {
      console.error("Failed to parse endorsed skills from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('endorsedSkills', JSON.stringify(endorsedSkills));
    } catch (error) {
      console.error("Failed to save endorsed skills to localStorage", error);
    }
  }, [endorsedSkills]);

  const handleEndorseSkill = (skillToEndorse: string) => {
    setEndorsedSkills(prevSkills =>
      prevSkills.includes(skillToEndorse)
        ? prevSkills.filter(skill => skill !== skillToEndorse)
        : [...prevSkills, skillToEndorse]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionCard title="Ringkasan Jalur Karir" icon={<BriefcaseIcon />}>
        <p className="text-gray-300">{data.summary}</p>
      </SectionCard>

      <SectionCard title="Peta Kompetensi (Skill Map)" icon={<SitemapIcon />}>
        <SkillTree 
          skills={data.skills} 
          endorsedSkills={endorsedSkills}
          onEndorse={handleEndorseSkill}
        />
      </SectionCard>
      
      <SectionCard title="Timeline Perjalanan Karir" icon={<TimelineIcon />}>
        <div className="relative border-l-2 border-cyan-700 ml-4 pl-8 space-y-8">
          {data.timeline.map((item, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-[39px] top-1 h-4 w-4 bg-cyan-500 rounded-full border-4 border-gray-800"></div>
              <p className="font-semibold text-cyan-400">{item.duration} - <span className="text-white">{item.role}</span></p>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid md:grid-cols-2 gap-6">
        <SectionCard title="Perkiraan Prospek & Gaji" icon={<TrendingUpIcon />}>
          <div className="space-y-3">
              <div className="flex items-start">
                  <span className="font-semibold text-gray-300 w-24 shrink-0">Indonesia:</span>
                  <span className="text-cyan-400 font-mono">{data.prospects.indonesia}</span>
              </div>
              <div className="flex items-start">
                  <span className="font-semibold text-gray-300 w-24 shrink-0">Global:</span>
                  <span className="text-cyan-400 font-mono">{data.prospects.global}</span>
              </div>
              <div className="flex items-start">
                  <span className="font-semibold text-gray-300 w-24 shrink-0">Permintaan:</span>
                  <span className="text-gray-300">{data.prospects.demand}</span>
              </div>
          </div>
        </SectionCard>

        <SectionCard title="Alternatif Jalur" icon={<ShuffleIcon />}>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {data.alternatives.map((alt, index) => (
              <li key={index}>{alt}</li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Tips & Rekomendasi" icon={<LightbulbIcon />}>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          {data.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
};

export default CareerPathDisplay;