export interface StudentDetails {
  name: string;
  hscStream: 'science' | 'commerce' | 'arts' | '';
  hscSubjects: 'pcm' | 'pcb' | 'commerce' | 'humanities' | '';
  educationLevel: 'hsc' | 'ug' | 'pg' | '';
  interest: string;
  academicStrength: 'theory' | 'practical' | 'analytical' | '';
  areaOfInterest: 'technology' | 'medical' | 'management' | 'creative' | 'research' | '';
  careerGoal: 'job' | 'research' | 'entrepreneurship' | 'higher-studies' | '';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    category: StreamCategory;
  }[];
  /** Which subjects/interests this question is relevant to (undefined = universal) */
  relevantTo?: string[];
}

export type StreamCategory = 
  | 'engineering'
  | 'medical'
  | 'science'
  | 'commerce'
  | 'arts'
  | 'creative';

export interface StreamInfo {
  id: StreamCategory;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  eligibility: string[];
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  careers: string[];
  courses: string[];
  skills: string[];
  entranceExams: string[];
}

export interface QuizResult {
  scores: Record<StreamCategory, number>;
  primaryRecommendation: StreamCategory;
  alternativeOptions: StreamCategory[];
  explanation: string;
}
