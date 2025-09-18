
export interface CareerPathTimelineItem {
  duration: string;
  role: string;
  description: string;
}

export interface CareerPathProspects {
  indonesia: string;
  global: string;
  demand: string;
}

export interface SkillLevels {
  fundamental: string[];
  intermediate: string[];
  advanced: string[];
}

export interface CareerPath {
  summary: string;
  skills: SkillLevels;
  timeline: CareerPathTimelineItem[];
  prospects: CareerPathProspects;
  alternatives: string[];
  tips: string[];
}

export interface SimulationHistoryItem {
  id: string;
  query: string;
  timestamp: string;
  result: CareerPath;
}
