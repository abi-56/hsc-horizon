import React from 'react';
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
  question,
  selectedAnswer,
  onSelectAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-card animate-scale-in sm:p-8">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="font-semibold text-primary">
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h3 className="mb-6 font-display text-xl font-semibold text-foreground sm:text-2xl">
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option.category;

          return (
            <button
              key={index}
              onClick={() => onSelectAnswer(option.category)}
              className={cn(
                'w-full rounded-xl border-2 p-4 text-left transition-all duration-200',
                isSelected
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                    isSelected
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground/30'
                  )}
                >
                  {isSelected ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium text-muted-foreground">
                      {String.fromCharCode(65 + index)}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    'font-medium',
                    isSelected ? 'text-primary' : 'text-foreground'
                  )}
                >
                  {option.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizCard;
