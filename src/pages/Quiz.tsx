import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import QuizCard from '@/components/quiz/QuizCard';
import { quizQuestions } from '@/data/quizQuestions';
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
      // Calculate results
      const result = calculateRecommendation(studentDetails, quizAnswers);
      setQuizResult(result);
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isLastQuestion = currentQuestion === quizQuestions.length - 1;
  const currentAnswer = quizAnswers[quizQuestions[currentQuestion].id];

  return (
    <Layout>
      <div className="bg-gradient-to-br from-background via-background to-secondary/30 py-12 sm:py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h1 className="mb-2 font-display text-3xl font-bold text-foreground">
                Aptitude Assessment
              </h1>
              <p className="text-muted-foreground">
                Answer these questions to discover your ideal career stream
              </p>
            </div>

            {/* Info banner */}
            {!studentDetails.name && (
              <div className="mb-6 flex items-start gap-3 rounded-xl bg-accent/10 p-4 text-accent-foreground">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-medium text-foreground">Complete your profile for better recommendations</p>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-accent underline"
                    onClick={() => navigate('/details')}
                  >
                    Add your details
                  </Button>
                </div>
              </div>
            )}

            {/* Quiz Card */}
            <QuizCard
              question={quizQuestions[currentQuestion]}
              selectedAnswer={currentAnswer}
              onSelectAnswer={handleSelectAnswer}
              questionNumber={currentQuestion + 1}
              totalQuestions={quizQuestions.length}
            />

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={!currentAnswer}
                className="group"
              >
                {isLastQuestion ? 'See Results' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;
