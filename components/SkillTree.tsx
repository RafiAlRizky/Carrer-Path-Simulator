import React from 'react';
import type { SkillLevels } from '../types';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface SkillTreeProps {
    skills: SkillLevels;
    endorsedSkills: string[];
    onEndorse: (skill: string) => void;
}

interface SkillColumnProps {
    title: string;
    skills: string[];
    color: string;
    delay: number;
    endorsedSkills: string[];
    onEndorse: (skill: string) => void;
}

const SkillColumn: React.FC<SkillColumnProps> = ({ title, skills, color, delay, endorsedSkills, onEndorse }) => (
    <div style={{ animationDelay: `${delay}s` }} className={`flex-1 w-full bg-gray-900/50 p-4 rounded-lg border border-gray-700 animate-fade-in-up`}>
        <h3 className={`text-lg font-bold text-center mb-4 ${color}`}>{title}</h3>
        <div className="space-y-3">
            {skills.map((skill, index) => {
                const isEndorsed = endorsedSkills.includes(skill);
                return (
                    <div key={index} className="bg-gray-700/50 text-gray-300 p-3 rounded-md shadow-md transition-colors hover:bg-gray-700 flex items-center justify-between gap-2">
                        <span className="text-sm flex-grow">{skill}</span>
                        <button
                            onClick={() => onEndorse(skill)}
                            aria-pressed={isEndorsed}
                            className={`text-xs font-semibold px-3 py-1 rounded-md transition-all duration-200 shrink-0 ${
                                isEndorsed
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                            }`}
                        >
                            {isEndorsed ? 'Endorsed ✓' : 'Endorse'}
                        </button>
                    </div>
                );
            })}
        </div>
    </div>
);


const SkillTree: React.FC<SkillTreeProps> = ({ skills, endorsedSkills, onEndorse }) => {
    return (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 md:gap-2">
            <SkillColumn 
                title="Fundamental" 
                skills={skills.fundamental} 
                color="text-cyan-400" 
                delay={0.2}
                endorsedSkills={endorsedSkills}
                onEndorse={onEndorse}
            />
            <div className="self-center transform rotate-90 md:rotate-0 p-2 animate-fade-in-up" style={{ animationDelay: '0.4s'}}>
              <ArrowRightIcon className="w-8 h-8 text-gray-600" />
            </div>
            <SkillColumn 
                title="Intermediate" 
                skills={skills.intermediate} 
                color="text-blue-400" 
                delay={0.6}
                endorsedSkills={endorsedSkills}
                onEndorse={onEndorse}
            />
            <div className="self-center transform rotate-90 md:rotate-0 p-2 animate-fade-in-up" style={{ animationDelay: '0.8s'}}>
              <ArrowRightIcon className="w-8 h-8 text-gray-600" />
            </div>
            <SkillColumn 
                title="Advanced" 
                skills={skills.advanced} 
                color="text-indigo-400" 
                delay={1.0}
                endorsedSkills={endorsedSkills}
                onEndorse={onEndorse}
            />
        </div>
    );
};

export default SkillTree;