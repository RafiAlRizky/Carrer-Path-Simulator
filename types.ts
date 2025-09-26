export interface SkillLevels {
  fundamental: string[];
  intermediate: string[];
  advanced: string[];
}

export interface CareerTimelineItem {
  duration: string;
  role: string;
  description: string;
}

export interface CareerProspects {
  indonesia: string;
  global: string;
  demand: string;
}

export interface CareerPath {
  summary: string;
  skills: SkillLevels;
  timeline: CareerTimelineItem[];
  prospects: CareerProspects;
  alternatives: string[];
  tips: string[];
}

export interface SimulationHistoryItem {
  id: string;
  query: string;
  result: CareerPath;
  timestamp: string;
}

export interface ComparisonSummary {
  career1: {
    title: string;
    pros: string[];
  };
  career2: {
    title: string;
    pros: string[];
  };
  verdict: string;
}
