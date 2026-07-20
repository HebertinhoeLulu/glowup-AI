export type Tab = 'home' | 'analise' | 'planos' | 'perfil' | 'journey';

export interface FacialMetric {
  id: string;
  name: string;
  value: string;
  percentage: number;
  description: string;
  category: 'HARMONIA' | 'ANGULARIDADE' | 'SAÚDE' | 'DIMORFISMO';
  icon: string;
}

export interface AnalysisResult {
  score: number;
  date: string;
  photoUrl: string;
  metrics: FacialMetric[];
  diagnosis: string;
  skincareRoutine: string[];
  facialExercises: string[];
  hairGrooming: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  streakDays: number;
  analysesCount: number;
  activePlan: 'free' | 'pro';
  preferences: {
    targetJawline: boolean;
    targetSkin: boolean;
    targetSymmetry: boolean;
    notifications: boolean;
  };
}
