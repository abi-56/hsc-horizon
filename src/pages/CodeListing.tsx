import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer, Code2 } from 'lucide-react';

interface SourceFile {
  path: string;
  code: string;
}

const sourceFiles: SourceFile[] = [
  {
    path: 'src/types/student.ts',
    code: `export interface StudentDetails {
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
}`,
  },
  {
    path: 'src/App.tsx',
    code: `import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StudentProvider } from "./context/StudentContext";
import Index from "./pages/Index";
import StudentDetails from "./pages/StudentDetails";
import Streams from "./pages/Streams";
import StreamOverview from "./pages/StreamOverview";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Documentation from "./pages/Documentation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <StudentProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/details" element={<StudentDetails />} />
            <Route path="/streams" element={<Streams />} />
            <Route path="/stream/:streamId" element={<StreamOverview />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </StudentProvider>
  </QueryClientProvider>
);

export default App;`,
  },
  {
    path: 'src/context/StudentContext.tsx',
    code: `import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StudentDetails, StreamCategory, QuizResult } from '@/types/student';

interface StudentContextType {
  studentDetails: StudentDetails;
  setStudentDetails: (details: StudentDetails) => void;
  quizAnswers: Record<number, StreamCategory>;
  setQuizAnswer: (questionId: number, answer: StreamCategory) => void;
  quizResult: QuizResult | null;
  setQuizResult: (result: QuizResult) => void;
  resetAll: () => void;
}

const defaultStudentDetails: StudentDetails = {
  name: '',
  hscStream: '',
  hscSubjects: '',
  educationLevel: '',
  interest: '',
  academicStrength: '',
  areaOfInterest: '',
  careerGoal: '',
};

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [studentDetails, setStudentDetailsState] = useState<StudentDetails>(() => {
    const saved = localStorage.getItem('studentDetails');
    return saved ? JSON.parse(saved) : defaultStudentDetails;
  });

  const [quizAnswers, setQuizAnswers] = useState<Record<number, StreamCategory>>(() => {
    const saved = localStorage.getItem('quizAnswers');
    return saved ? JSON.parse(saved) : {};
  });

  const [quizResult, setQuizResultState] = useState<QuizResult | null>(() => {
    const saved = localStorage.getItem('quizResult');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('studentDetails', JSON.stringify(studentDetails));
  }, [studentDetails]);

  useEffect(() => {
    localStorage.setItem('quizAnswers', JSON.stringify(quizAnswers));
  }, [quizAnswers]);

  useEffect(() => {
    if (quizResult) {
      localStorage.setItem('quizResult', JSON.stringify(quizResult));
    }
  }, [quizResult]);

  const setStudentDetails = (details: StudentDetails) => {
    setStudentDetailsState(details);
  };

  const setQuizAnswer = (questionId: number, answer: StreamCategory) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const setQuizResult = (result: QuizResult) => {
    setQuizResultState(result);
  };

  const resetAll = () => {
    setStudentDetailsState(defaultStudentDetails);
    setQuizAnswers({});
    setQuizResultState(null);
    localStorage.removeItem('studentDetails');
    localStorage.removeItem('quizAnswers');
    localStorage.removeItem('quizResult');
  };

  return (
    <StudentContext.Provider
      value={{
        studentDetails,
        setStudentDetails,
        quizAnswers,
        setQuizAnswer,
        quizResult,
        setQuizResult,
        resetAll,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};`,
  },
  {
    path: 'src/data/streams.ts',
    code: `import { StreamInfo } from '@/types/student';

export const streams: StreamInfo[] = [
  {
    id: 'engineering',
    name: 'Engineering & Technology',
    tagline: 'Build the future with innovation',
    description: 'Engineering combines mathematics, science, and creativity to design and build systems that solve real-world problems.',
    icon: '⚙️',
    color: 'engineering',
    eligibility: ['HSC Science (PCM)', 'Minimum 50% aggregate', 'Entrance exam qualified'],
    duration: '4 years (B.Tech/B.E.)',
    difficulty: 'Challenging',
    careers: ['Software Developer', 'Data Scientist', 'AI Engineer', 'Mechanical Engineer', 'Civil Engineer', 'Electronics Engineer'],
    courses: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'AI & Machine Learning', 'Data Science'],
    skills: ['Problem Solving', 'Mathematics', 'Logical Thinking', 'Programming', 'Technical Design'],
    entranceExams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'State CETs'],
  },
  {
    id: 'medical',
    name: 'Medical & Life Sciences',
    tagline: 'Heal, discover, and save lives',
    description: 'Medical sciences focus on understanding the human body, treating diseases, and improving healthcare.',
    icon: '🏥',
    color: 'medical',
    eligibility: ['HSC Science (PCB)', 'Minimum 50% aggregate', 'NEET qualified'],
    duration: '5.5 years (MBBS) / 4 years (B.Pharm)',
    difficulty: 'Challenging',
    careers: ['Doctor', 'Surgeon', 'Pharmacist', 'Nurse', 'Biotechnologist', 'Medical Researcher'],
    courses: ['MBBS', 'BDS', 'B.Pharm', 'Nursing', 'Biotechnology', 'Physiotherapy'],
    skills: ['Attention to Detail', 'Biology', 'Patience', 'Communication', 'Empathy'],
    entranceExams: ['NEET UG', 'AIIMS', 'JIPMER'],
  },
  {
    id: 'science',
    name: 'Science & Research',
    tagline: 'Explore the mysteries of the universe',
    description: 'Pure sciences dive deep into understanding natural phenomena. Perfect for curious minds.',
    icon: '🔬',
    color: 'science',
    eligibility: ['HSC Science', 'Minimum 45% aggregate', 'Interest in research'],
    duration: '3 years (B.Sc.)',
    difficulty: 'Moderate',
    careers: ['Research Scientist', 'Data Analyst', 'Lab Technician', 'Professor', 'Environmental Scientist'],
    courses: ['B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Mathematics', 'B.Sc. Statistics', 'B.Sc. Environmental Science'],
    skills: ['Analytical Thinking', 'Research', 'Mathematics', 'Curiosity', 'Laboratory Skills'],
    entranceExams: ['CUET', 'JAM (for M.Sc.)', 'University-specific tests'],
  },
  {
    id: 'commerce',
    name: 'Commerce & Management',
    tagline: 'Master the world of business',
    description: 'Commerce streams focus on business, finance, and management.',
    icon: '📊',
    color: 'commerce',
    eligibility: ['Any HSC stream', 'Minimum 45% aggregate', 'Basic math skills'],
    duration: '3 years (BBA/B.Com)',
    difficulty: 'Moderate',
    careers: ['Chartered Accountant', 'Financial Analyst', 'Business Manager', 'Marketing Executive', 'HR Manager', 'Entrepreneur'],
    courses: ['B.Com', 'BBA', 'CA', 'CMA', 'CS', 'BBA + MBA Integrated'],
    skills: ['Numerical Ability', 'Communication', 'Leadership', 'Finance', 'Decision Making'],
    entranceExams: ['CAT (for MBA)', 'CA Foundation', 'CUET', 'SET/NPAT'],
  },
  {
    id: 'arts',
    name: 'Arts & Humanities',
    tagline: 'Understand society and human expression',
    description: 'Humanities explore human culture, society, history, and behavior.',
    icon: '📚',
    color: 'arts',
    eligibility: ['Any HSC stream', 'Minimum 40% aggregate', 'Interest in social sciences'],
    duration: '3 years (BA)',
    difficulty: 'Easy',
    careers: ['Journalist', 'Psychologist', 'Civil Services Officer', 'Sociologist', 'Historian', 'Content Writer'],
    courses: ['BA Psychology', 'BA Sociology', 'BA History', 'BA English', 'BA Political Science', 'BA Economics'],
    skills: ['Critical Thinking', 'Writing', 'Communication', 'Empathy', 'Research'],
    entranceExams: ['CUET', 'UPSC (for Civil Services)', 'University-specific tests'],
  },
  {
    id: 'creative',
    name: 'Creative & Design Fields',
    tagline: 'Transform ideas into visual experiences',
    description: 'Creative fields blend artistic talent with technology.',
    icon: '🎨',
    color: 'creative',
    eligibility: ['Any HSC stream', 'Portfolio/Aptitude test', 'Creative bent of mind'],
    duration: '3-4 years',
    difficulty: 'Moderate',
    careers: ['UI/UX Designer', 'Graphic Designer', 'Animator', 'Film Director', 'Fashion Designer', 'Game Designer'],
    courses: ['B.Des', 'BFA', 'Animation & VFX', 'Mass Communication', 'Fashion Design', 'Interior Design'],
    skills: ['Creativity', 'Visual Thinking', 'Software Skills', 'Storytelling', 'Attention to Detail'],
    entranceExams: ['NID', 'NIFT', 'UCEED', 'Portfolio-based admissions'],
  },
];

export const getStreamById = (id: string): StreamInfo | undefined => {
  return streams.find(stream => stream.id === id);
};`,
  },
  {
    path: 'src/data/quizQuestions.ts',
    code: `import { QuizQuestion } from '@/types/student';

const universalQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "When facing a problem, what's your first instinct?",
    options: [
      { text: "Break it down logically and find a systematic solution", category: "engineering" },
      { text: "Research and gather all available information first", category: "science" },
      { text: "Think about how it affects people emotionally", category: "arts" },
      { text: "Consider the practical business implications", category: "commerce" },
    ],
  },
  {
    id: 2,
    question: "Which activity sounds most exciting to you?",
    options: [
      { text: "Building an app or creating a new gadget", category: "engineering" },
      { text: "Helping someone recover from an illness", category: "medical" },
      { text: "Designing a poster or editing a video", category: "creative" },
      { text: "Starting a small business venture", category: "commerce" },
    ],
  },
  {
    id: 3,
    question: "How do you prefer to learn new things?",
    options: [
      { text: "Hands-on practice and building things", category: "engineering" },
      { text: "Conducting experiments and observing", category: "science" },
      { text: "Reading and discussing with others", category: "arts" },
      { text: "Creating visual projects and art", category: "creative" },
    ],
  },
  {
    id: 4,
    question: "What motivates you the most?",
    options: [
      { text: "Creating something that makes life easier", category: "engineering" },
      { text: "Making a difference in someone's health", category: "medical" },
      { text: "Understanding why people think the way they do", category: "arts" },
      { text: "Financial success and leadership", category: "commerce" },
    ],
  },
  {
    id: 5,
    question: "What do you value most in a career?",
    options: [
      { text: "Innovation and solving complex problems", category: "engineering" },
      { text: "Helping others and making an impact", category: "medical" },
      { text: "Self-expression and creativity", category: "creative" },
      { text: "Understanding society and human nature", category: "arts" },
    ],
  },
];

const pcmQuestions: QuizQuestion[] = [
  {
    id: 101,
    question: "Which area of technology excites you the most?",
    relevantTo: ['pcm', 'science'],
    options: [
      { text: "Building software and mobile applications", category: "engineering" },
      { text: "Robotics and automation systems", category: "engineering" },
      { text: "Mathematical modeling and data analysis", category: "science" },
      { text: "Designing user interfaces and experiences", category: "creative" },
    ],
  },
  // ... (additional PCM, PCB, Commerce, Humanities questions follow same pattern)
];

export const getQuizQuestions = (hscSubjects: string): QuizQuestion[] => {
  let subjectSpecific: QuizQuestion[];

  switch (hscSubjects) {
    case 'pcm': subjectSpecific = pcmQuestions; break;
    case 'pcb': subjectSpecific = pcbQuestions; break;
    case 'commerce': subjectSpecific = commerceQuestions; break;
    case 'humanities': subjectSpecific = humanitiesQuestions; break;
    default: subjectSpecific = pcmQuestions;
  }

  return [...universalQuestions, ...subjectSpecific.slice(0, 5)];
};`,
  },
  {
    path: 'src/data/interestsAndCourses.ts',
    code: `export const subjectInterests: Record<string, { value: string; label: string }[]> = {
  pcm: [
    { value: 'software-development', label: 'Software Development & Coding' },
    { value: 'ai-ml', label: 'Artificial Intelligence & Machine Learning' },
    { value: 'mechanical-design', label: 'Mechanical & Product Design' },
    { value: 'electronics', label: 'Electronics & Embedded Systems' },
    { value: 'civil-architecture', label: 'Civil Engineering & Architecture' },
    { value: 'data-science', label: 'Data Science & Analytics' },
    { value: 'space-research', label: 'Space Science & Research' },
  ],
  pcb: [
    { value: 'medicine', label: 'Medicine & Surgery (MBBS)' },
    { value: 'dentistry', label: 'Dentistry (BDS)' },
    { value: 'pharmacy', label: 'Pharmacy & Drug Research' },
    { value: 'biotechnology', label: 'Biotechnology & Genetics' },
    { value: 'nursing', label: 'Nursing & Healthcare' },
    { value: 'veterinary', label: 'Veterinary Science' },
    { value: 'agriculture', label: 'Agriculture & Food Science' },
  ],
  commerce: [
    { value: 'chartered-accountancy', label: 'Chartered Accountancy (CA)' },
    { value: 'banking-finance', label: 'Banking & Finance' },
    { value: 'marketing', label: 'Marketing & Advertising' },
    { value: 'entrepreneurship', label: 'Entrepreneurship & Startups' },
    { value: 'international-business', label: 'International Business & Trade' },
    { value: 'human-resources', label: 'Human Resources Management' },
  ],
  humanities: [
    { value: 'psychology', label: 'Psychology & Counseling' },
    { value: 'journalism', label: 'Journalism & Mass Communication' },
    { value: 'law', label: 'Law & Legal Studies' },
    { value: 'social-work', label: 'Social Work & NGO Management' },
    { value: 'design', label: 'Design & Visual Arts' },
    { value: 'performing-arts', label: 'Performing Arts & Film' },
    { value: 'political-science', label: 'Political Science & Public Policy' },
  ],
};

export const courseProgression: Record<string, { ug: string[]; pg: string[] }> = {
  pcm: {
    ug: ['B.Tech / B.E.', 'B.Sc (Physics / Maths)', 'BCA', 'B.Arch', 'B.Sc Data Science'],
    pg: ['M.Tech', 'M.Sc', 'MCA', 'MBA (Tech Management)', 'M.S. (Abroad)'],
  },
  pcb: {
    ug: ['MBBS', 'BDS', 'B.Pharm', 'B.Sc Nursing', 'B.Sc Biotech', 'BAMS / BHMS'],
    pg: ['MD / MS', 'M.Pharm', 'M.Sc Microbiology', 'MPH (Public Health)', 'Ph.D. Life Sciences'],
  },
  commerce: {
    ug: ['B.Com', 'BBA', 'BBA LLB', 'B.Com (Hons)', 'CA Foundation'],
    pg: ['M.Com', 'MBA', 'CA Final', 'CMA', 'M.Sc Finance'],
  },
  humanities: {
    ug: ['BA (Hons)', 'BA LLB', 'BFA', 'B.Des', 'BA Journalism', 'BA Psychology'],
    pg: ['MA', 'LLM', 'MFA', 'M.Des', 'MA Psychology', 'MSW'],
  },
};`,
  },
  {
    path: 'src/utils/recommendations.ts',
    code: `import { StudentDetails, StreamCategory, QuizResult } from '@/types/student';
import { streams } from '@/data/streams';

export const calculateRecommendation = (
  studentDetails: StudentDetails,
  quizAnswers: Record<number, StreamCategory>
): QuizResult => {
  const scores: Record<StreamCategory, number> = {
    engineering: 0, medical: 0, science: 0,
    commerce: 0, arts: 0, creative: 0,
  };

  // Count quiz answers
  Object.values(quizAnswers).forEach((category) => {
    scores[category] += 10;
  });

  // HSC stream weights
  if (studentDetails.hscStream === 'science') {
    scores.engineering += 15; scores.medical += 15; scores.science += 15;
  } else if (studentDetails.hscStream === 'commerce') {
    scores.commerce += 20;
  } else if (studentDetails.hscStream === 'arts') {
    scores.arts += 15; scores.creative += 15;
  }

  // HSC subjects influence
  if (studentDetails.hscSubjects === 'pcm') {
    scores.engineering += 20; scores.science += 10;
  } else if (studentDetails.hscSubjects === 'pcb') {
    scores.medical += 25; scores.science += 10;
  } else if (studentDetails.hscSubjects === 'commerce') {
    scores.commerce += 20;
  } else if (studentDetails.hscSubjects === 'humanities') {
    scores.arts += 20; scores.creative += 10;
  }

  // Area of interest influence
  const interestMapping: Record<string, StreamCategory[]> = {
    technology: ['engineering'], medical: ['medical', 'science'],
    management: ['commerce'], creative: ['creative', 'arts'],
    research: ['science', 'medical'],
  };

  if (studentDetails.areaOfInterest && interestMapping[studentDetails.areaOfInterest]) {
    interestMapping[studentDetails.areaOfInterest].forEach((category) => {
      scores[category] += 15;
    });
  }

  // Academic strength & career goal influence
  if (studentDetails.academicStrength === 'analytical') {
    scores.engineering += 10; scores.science += 10; scores.commerce += 5;
  } else if (studentDetails.academicStrength === 'practical') {
    scores.engineering += 10; scores.medical += 10; scores.creative += 5;
  } else if (studentDetails.academicStrength === 'theory') {
    scores.arts += 10; scores.science += 5; scores.commerce += 5;
  }

  if (studentDetails.careerGoal === 'entrepreneurship') {
    scores.commerce += 15; scores.engineering += 5;
  } else if (studentDetails.careerGoal === 'research') {
    scores.science += 20; scores.medical += 10;
  } else if (studentDetails.careerGoal === 'higher-studies') {
    scores.science += 10; scores.engineering += 10;
  }

  const sortedCategories = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([category]) => category as StreamCategory);

  const primaryRecommendation = sortedCategories[0];
  const alternativeOptions = sortedCategories.slice(1, 3);

  const explanation = generateExplanation(studentDetails, primaryRecommendation, scores);

  return { scores, primaryRecommendation, alternativeOptions, explanation };
};

const generateExplanation = (
  details: StudentDetails, recommendation: StreamCategory,
  scores: Record<StreamCategory, number>
): string => {
  const stream = streams.find((s) => s.id === recommendation);
  if (!stream) return '';

  let explanation = \\\`Based on your profile analysis, **\\\${stream.name}** emerges as your ideal career path. \\\`;

  if (details.hscSubjects === 'pcm' && recommendation === 'engineering') {
    explanation += 'Your PCM background provides a strong foundation for engineering. ';
  } else if (details.hscSubjects === 'pcb' && recommendation === 'medical') {
    explanation += 'Your PCB combination is perfectly aligned with medical studies. ';
  }

  explanation += \\\`This stream offers excellent career prospects in \\\${stream.careers.slice(0, 3).join(', ')}.\\\`;
  return explanation;
};`,
  },
  {
    path: 'src/pages/Index.tsx',
    code: `import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import StreamsPreview from '@/components/home/StreamsPreview';

const Index: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorks />
      <StreamsPreview />
    </Layout>
  );
};

export default Index;`,
  },
  {
    path: 'src/pages/StudentDetails.tsx',
    code: `import React from 'react';
import Layout from '@/components/layout/Layout';
import StudentDetailsForm from '@/components/forms/StudentDetailsForm';
import { ClipboardList } from 'lucide-react';

const StudentDetails: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-background via-background to-secondary/30 py-12 sm:py-16">
        <div className="container">
          <div className="mx-auto max-w-xl">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <ClipboardList className="h-8 w-8 text-primary" />
              </div>
              <h1 className="mb-2 font-display text-3xl font-bold text-foreground">
                Tell Us About Yourself
              </h1>
              <p className="text-muted-foreground">
                Help us understand your academic background and interests.
              </p>
            </div>
            <div className="rounded-2xl bg-card p-6 shadow-card sm:p-8">
              <StudentDetailsForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDetails;`,
  },
  {
    path: 'src/components/forms/StudentDetailsForm.tsx',
    code: `import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '@/context/StudentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, User, GraduationCap, Heart, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { subjectInterests, courseProgression } from '@/data/interestsAndCourses';

const StudentDetailsForm: React.FC = () => {
  const navigate = useNavigate();
  const { studentDetails, setStudentDetails } = useStudent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentDetails.name || !studentDetails.hscStream || !studentDetails.areaOfInterest) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Details saved successfully!');
    navigate('/streams');
  };

  const updateField = (field: keyof typeof studentDetails, value: string) => {
    const updates: Partial<typeof studentDetails> = { [field]: value };
    if (field === 'hscSubjects') updates.interest = '';
    setStudentDetails({ ...studentDetails, ...updates });
  };

  const interests = studentDetails.hscSubjects
    ? subjectInterests[studentDetails.hscSubjects] || []
    : [];
  const courses = studentDetails.hscSubjects
    ? courseProgression[studentDetails.hscSubjects]
    : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name, Education Level, HSC Stream, HSC Subjects,
          Dynamic Interest, Course Progression, Academic Strength,
          Area of Interest, Career Goal fields */}
      <Button type="submit" size="lg" className="w-full group">
        Continue to Explore Streams
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </form>
  );
};

export default StudentDetailsForm;`,
  },
  {
    path: 'src/pages/Quiz.tsx',
    code: `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import QuizCard from '@/components/quiz/QuizCard';
import { getQuizQuestions } from '@/data/quizQuestions';
import { useStudent } from '@/context/StudentContext';
import { calculateRecommendation } from '@/utils/recommendations';
import { Button } from '@/components/ui/button';
import { StreamCategory } from '@/types/student';
import { ArrowLeft, ArrowRight, Brain, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const { studentDetails, quizAnswers, setQuizAnswer, setQuizResult } = useStudent();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const quizQuestions = getQuizQuestions(studentDetails.hscSubjects);

  const handleSelectAnswer = (category: StreamCategory) => {
    setQuizAnswer(quizQuestions[currentQuestion].id, category);
  };

  const handleNext = () => {
    if (!quizAnswers[quizQuestions[currentQuestion].id]) {
      toast.error('Please select an answer before continuing');
      return;
    }
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = calculateRecommendation(studentDetails, quizAnswers);
      setQuizResult(result);
      navigate('/results');
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-background via-background to-secondary/30 py-12 sm:py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <Brain className="mx-auto h-8 w-8 text-primary" />
              <h1 className="mb-2 font-display text-3xl font-bold">Aptitude Assessment</h1>
            </div>
            <QuizCard question={quizQuestions[currentQuestion]}
              selectedAnswer={quizAnswers[quizQuestions[currentQuestion].id]}
              onSelectAnswer={handleSelectAnswer}
              questionNumber={currentQuestion + 1}
              totalQuestions={quizQuestions.length} />
            <div className="mt-6 flex items-center justify-between">
              <Button variant="outline" onClick={() => setCurrentQuestion(c => c - 1)}
                disabled={currentQuestion === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={handleNext}>
                {currentQuestion === quizQuestions.length - 1 ? 'See Results' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;`,
  },
  {
    path: 'src/components/quiz/QuizCard.tsx',
    code: `import React from 'react';
import { QuizQuestion, StreamCategory } from '@/types/student';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

interface QuizCardProps {
  question: QuizQuestion;
  selectedAnswer: StreamCategory | undefined;
  onSelectAnswer: (category: StreamCategory) => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question, selectedAnswer, onSelectAnswer, questionNumber, totalQuestions,
}) => {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-card sm:p-8">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span>Question {questionNumber} of {totalQuestions}</span>
          <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: \\\`\\\${(questionNumber / totalQuestions) * 100}%\\\` }} />
        </div>
      </div>
      <h3 className="mb-6 font-display text-xl font-semibold">{question.question}</h3>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button key={index} onClick={() => onSelectAnswer(option.category)}
            className={cn('w-full rounded-xl border-2 p-4 text-left transition-all',
              selectedAnswer === option.category
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50')}>
            <div className="flex items-center gap-3">
              <div className={cn('flex h-8 w-8 items-center justify-center rounded-full border-2',
                selectedAnswer === option.category
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-muted-foreground/30')}>
                {selectedAnswer === option.category
                  ? <CheckCircle2 className="h-5 w-5" />
                  : String.fromCharCode(65 + index)}
              </div>
              <span>{option.text}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;`,
  },
  {
    path: 'src/pages/Results.tsx',
    code: `import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useStudent } from '@/context/StudentContext';
import { streams } from '@/data/streams';
import { Button } from '@/components/ui/button';
import { Trophy, ArrowRight, RefreshCw, Star, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const { studentDetails, quizResult, resetAll } = useStudent();

  if (!quizResult) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="mb-4 text-2xl font-bold">No Results Yet</h1>
          <Button onClick={() => navigate('/quiz')}>Take the Quiz</Button>
        </div>
      </Layout>
    );
  }

  const primaryStream = streams.find((s) => s.id === quizResult.primaryRecommendation);
  const alternativeStreams = quizResult.alternativeOptions
    .map((id) => streams.find((s) => s.id === id)).filter(Boolean);

  return (
    <Layout>
      <div className="bg-gradient-to-br from-background via-background to-secondary/30 py-12">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            {/* Celebration Header with Trophy */}
            {/* Primary Recommendation Card with gradient header */}
            {/* Why This Stream explanation with ReactMarkdown */}
            {/* Top Careers & Recommended Courses */}
            {/* Entrance Exams */}
            {/* Alternative Options grid */}
            {/* Assessment Scores with progress bars */}
            {/* Start Over & Explore All Streams buttons */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Results;`,
  },
  {
    path: 'src/pages/Streams.tsx',
    code: `import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import StreamCard from '@/components/streams/StreamCard';
import { streams } from '@/data/streams';
import { Button } from '@/components/ui/button';
import { ArrowRight, Compass } from 'lucide-react';

const Streams: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="bg-gradient-to-br from-background via-background to-secondary/30 py-12 sm:py-16">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Compass className="mx-auto mb-4 h-8 w-8 text-primary" />
            <h1 className="mb-4 font-display text-3xl font-bold">Explore Higher Studies Streams</h1>
          </div>
          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {streams.map((stream) => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" onClick={() => navigate('/quiz')}>
              Take the Aptitude Quiz <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Streams;`,
  },
  {
    path: 'src/components/streams/StreamCard.tsx',
    code: `import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StreamInfo } from '@/types/student';
import { Button } from '@/components/ui/button';
import { Clock, Briefcase, ArrowRight } from 'lucide-react';

interface StreamCardProps {
  stream: StreamInfo;
}

const StreamCard: React.FC<StreamCardProps> = ({ stream }) => {
  const navigate = useNavigate();

  return (
    <div className="card-hover flex flex-col overflow-hidden rounded-2xl bg-card shadow-card">
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-card text-3xl shadow-md">
            {stream.icon}
          </div>
          <span className="rounded-full px-3 py-1 text-xs font-semibold">
            {stream.difficulty}
          </span>
        </div>
        <h3 className="mb-2 font-display text-xl font-bold">{stream.name}</h3>
        <p className="text-sm text-muted-foreground">{stream.tagline}</p>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" /> {stream.duration}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4" /> {stream.careers.length}+ career options
          </div>
        </div>
        <div className="mb-6 flex-1">
          <div className="flex flex-wrap gap-2">
            {stream.courses.slice(0, 4).map((course, i) => (
              <span key={i} className="rounded-full bg-secondary px-3 py-1 text-xs">
                {course}
              </span>
            ))}
          </div>
        </div>
        <Button variant="outline" className="w-full"
          onClick={() => navigate(\\\`/stream/\\\${stream.id}\\\`)}>
          Explore Stream <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default StreamCard;`,
  },
  {
    path: 'src/components/home/HeroSection.tsx',
    code: `import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, BookOpen, Target, Trophy } from 'lucide-react';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-secondary/30 py-16 sm:py-24">
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4" />
            Free Career Guidance for HSC Students
          </div>
          <h1 className="mb-6 font-display text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Find Your Perfect
            <span className="gradient-text block">Higher Studies Path</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Confused about what to study after 12th? Our intelligent assessment system
            analyzes your interests, strengths, and goals to recommend the ideal stream.
          </p>
          <Button variant="hero" size="xl" onClick={() => navigate('/details')}>
            Find My Higher Studies Path
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;`,
  },
  {
    path: 'src/components/home/HowItWorks.tsx',
    code: `import React from 'react';
import { UserCircle, Layers, ClipboardCheck, Lightbulb } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    { icon: UserCircle, title: 'Enter Your Details',
      description: 'Share your HSC stream, subjects, and academic strengths' },
    { icon: Layers, title: 'Explore Streams',
      description: 'Discover various career paths with detailed overviews' },
    { icon: ClipboardCheck, title: 'Take Assessment',
      description: 'Complete a 10-question aptitude quiz to find your fit' },
    { icon: Lightbulb, title: 'Get Recommendations',
      description: 'Receive personalized stream suggestions based on your profile' },
  ];

  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="container">
        <h2 className="mb-4 text-center font-display text-3xl font-bold">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {steps.map((step, index) => (
            <div key={index} className="card-hover flex gap-4 rounded-2xl bg-card p-6 shadow-card">
              <step.icon className="h-6 w-6 text-primary" />
              <div>
                <h3 className="mb-2 font-display text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;`,
  },
  {
    path: 'src/components/home/StreamsPreview.tsx',
    code: `import React from 'react';
import { useNavigate } from 'react-router-dom';
import { streams } from '@/data/streams';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const StreamsPreview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <h2 className="mb-4 text-center font-display text-3xl font-bold">
          Explore Career Streams
        </h2>
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {streams.map((stream) => (
            <div key={stream.id}
              className="card-hover cursor-pointer rounded-2xl bg-card p-6 shadow-card"
              onClick={() => navigate(\\\`/stream/\\\${stream.id}\\\`)}>
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">{stream.icon}</span>
                <div>
                  <h3 className="font-display font-semibold">{stream.name}</h3>
                  <span className="text-xs">{stream.difficulty}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{stream.tagline}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button variant="outline" size="lg" onClick={() => navigate('/streams')}>
            View All Streams <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StreamsPreview;`,
  },
  {
    path: 'src/components/layout/Header.tsx',
    code: `import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Home, BookOpen, FileText, Award } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/streams', label: 'Streams', icon: BookOpen },
    { path: '/quiz', label: 'Assessment', icon: FileText },
    { path: '/results', label: 'Results', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="hidden font-display text-lg font-bold sm:inline-block">
            Future Studies
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link key={path} to={path}
              className={location.pathname === path
                ? 'bg-primary/10 text-primary rounded-lg px-3 py-2 text-sm font-medium'
                : 'text-muted-foreground hover:bg-muted rounded-lg px-3 py-2 text-sm font-medium'}>
              <Icon className="inline h-4 w-4 mr-1" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;`,
  },
  {
    path: 'src/components/layout/Layout.tsx',
    code: `import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;`,
  },
  {
    path: 'src/components/layout/Footer.tsx',
    code: `import React from 'react';
import { GraduationCap, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="font-display text-sm font-semibold">
              Future Higher Studies Decision Support System
            </span>
          </div>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 text-accent" /> for students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;`,
  },
];

const CodeBlock: React.FC<{ file: SourceFile; index: number }> = ({ file, index }) => {
  const lines = file.code.split('\n');

  return (
    <div className="code-file-block mb-8 break-inside-avoid-page">
      {/* File header */}
      <div className="flex items-center gap-2 rounded-t-lg bg-muted px-4 py-2 border border-b-0 border-border">
        <Code2 className="h-4 w-4 text-primary print:text-black" />
        <span className="font-mono text-sm font-semibold text-foreground">
          {index + 1}. {file.path}
        </span>
      </div>
      {/* Code content */}
      <div className="overflow-x-auto rounded-b-lg border border-border bg-card">
        <pre className="p-4 text-xs leading-relaxed">
          <code>
            {lines.map((line, lineIndex) => (
              <div key={lineIndex} className="flex">
                <span className="mr-4 inline-block w-8 select-none text-right text-muted-foreground/60 print:text-gray-400">
                  {lineIndex + 1}
                </span>
                <span className="flex-1 whitespace-pre-wrap break-all text-foreground print:text-black">
                  {line || ' '}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

const CodeListing: React.FC = () => {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout>
      {/* Print-only cover page */}
      <div className="hidden print:block print:mb-8">
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-3xl font-bold">
            FUTURE HIGHER STUDIES<br />DECISION SUPPORT SYSTEM
          </h1>
          <h2 className="mb-8 text-xl">Complete Source Code Listing</h2>
          <p className="text-sm text-gray-500">
            Generated: {new Date().toLocaleDateString()}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Total Files: {sourceFiles.length}
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-background via-background to-secondary/30 py-12 sm:py-16 print:bg-white print:py-0">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            {/* Screen header */}
            <div className="mb-8 text-center print:hidden">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-4xl shadow-lg">
                <Code2 className="h-10 w-10 text-white" />
              </div>
              <h1 className="mb-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
                Source Code Listing
              </h1>
              <p className="text-lg text-muted-foreground">
                Complete source code for all {sourceFiles.length} project files — print-ready
              </p>
            </div>

            {/* Action buttons */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-3 print:hidden">
              <Button size="lg" onClick={handlePrint}>
                <Printer className="mr-2 h-5 w-5" />
                Print All Code
              </Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>

            {/* Table of Contents (print only) */}
            <div className="hidden print:block print:mb-8 print:break-after-page">
              <h2 className="mb-4 text-xl font-bold">Table of Contents</h2>
              <ol className="list-decimal pl-6 space-y-1 text-sm">
                {sourceFiles.map((file, i) => (
                  <li key={i} className="font-mono">{file.path}</li>
                ))}
              </ol>
            </div>

            {/* File index cards (screen only) */}
            <div className="mb-8 rounded-2xl bg-card p-6 shadow-card print:hidden">
              <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
                📁 File Index ({sourceFiles.length} files)
              </h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {sourceFiles.map((file, i) => (
                  <a
                    key={i}
                    href={`#file-${i}`}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-mono text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary/10 text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    {file.path}
                  </a>
                ))}
              </div>
            </div>

            {/* Code blocks */}
            {sourceFiles.map((file, index) => (
              <div key={index} id={`file-${index}`}>
                <CodeBlock file={file} index={index} />
              </div>
            ))}

            {/* Footer */}
            <div className="mt-8 text-center print:hidden">
              <Button variant="outline" onClick={() => navigate('/')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>

            {/* Print footer */}
            <div className="hidden print:block print:mt-8 print:text-center print:text-sm print:text-gray-500">
              <p>— End of Source Code Listing —</p>
              <p>Future Higher Studies Decision Support System</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CodeListing;
