
export interface SpecialistInfo {
  specialistName: string;
  category: string;
  description: string;
  commonConditions: string[];
  whenToSeeThem: string;
  urgencyWarning?: string;
}

export interface SearchResult {
  specialist: SpecialistInfo;
  explanation: string;
}

export enum AppView {
  Home = 'home',
  Search = 'search',
  Browse = 'browse',
  About = 'about'
}
