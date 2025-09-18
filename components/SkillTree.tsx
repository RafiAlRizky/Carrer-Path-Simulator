import React from 'react';
import type { SkillLevels } from '../types';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface SkillTreeProps {
    skills: SkillLevels;
}

interface SkillColumnProps {
    title: string;
    skills: string[];
    color: string;
    delay: number;
}

const SkillColumn: React.FC<SkillColumnProps> = ({ title, skills, color, delay }) => (
    <div style={{ animationDelay: `${delay}s` }} className={`flex-1 w-full bg-gray-900/50 p-4 rounded-lg border border-gray-700 animate-fade-in-up`}>
        <h3 className={`text-lg font-bold text-center mb-4 ${color}`}>{title}</h3>
        <div className="space-y-3">
            {skills.map((skill, index) => (
                <div key={index} className="bg-gray-700/50 text-gray-300 p-3 rounded-md shadow-md text-center">
                    <span className="text-sm">{skill}</span>
                </div>
            ))}
        </div>
    </div>
);


const SkillTree: React.FC<SkillTreeProps> = ({ skills }) => {
    return (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 md:gap-2">
            <SkillColumn 
                title="Fundamental" 
                skills={skills.fundamental} 
                color="text-indigo-400" 
                delay={0.2}
            />
            <div className="self-center transform rotate-90 md:rotate-0 p-2 animate-fade-in-up" style={{ animationDelay: '0.4s'}}>
              <ArrowRightIcon className="w-8 h-8 text-gray-600" />
            </div>
            <SkillColumn 
                title="Intermediate" 
                skills={skills.intermediate} 
                color="text-purple-400" 
                delay={0.6}
            />
            <div className="self-center transform rotate-90 md:rotate-0 p-2 animate-fade-in-up" style={{ animationDelay: '0.8s'}}>
              <ArrowRightIcon className="w-8 h-8 text-gray-600" />
            </div>
            <SkillColumn 
                title="Advanced" 
                skills={skills.advanced} 
                color="text-fuchsia-400" 
                delay={1.0}
            />
        </div>
    );
};

export default SkillTree;
