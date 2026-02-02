import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
};
