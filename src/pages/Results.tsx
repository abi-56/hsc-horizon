import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useStudent } from '@/context/StudentContext';
import { streams } from '@/data/streams';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  ArrowRight, 
  RefreshCw, 
  Star,
  CheckCircle2,
  Sparkles,
  BookOpen
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const { studentDetails, quizResult, resetAll } = useStudent();

  if (!quizResult) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">No Results Yet</h1>
          <p className="mb-6 text-muted-foreground">
            Complete the assessment to see your personalized recommendations.
          </p>
          <Button onClick={() => navigate('/quiz')}>
            Take the Quiz
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Layout>
    );
  }

  const primaryStream = streams.find((s) => s.id === quizResult.primaryRecommendation);
  const alternativeStreams = quizResult.alternativeOptions
    .map((id) => streams.find((s) => s.id === id))
    .filter(Boolean);

  const handleStartOver = () => {
    resetAll();
    navigate('/');
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-background via-background to-secondary/30 py-12 sm:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            {/* Celebration Header */}
            <div className="mb-8 text-center animate-scale-in">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-4xl shadow-lg">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <h1 className="mb-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
                {studentDetails.name ? `${studentDetails.name}, ` : ''}Your Results Are Ready!
              </h1>
              <p className="text-lg text-muted-foreground">
                Based on your profile and assessment, here's your personalized recommendation
              </p>
            </div>

            {/* Primary Recommendation */}
            {primaryStream && (
              <div className="mb-8 overflow-hidden rounded-2xl bg-card shadow-lg animate-slide-up">
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r from-stream-${primaryStream.color} to-primary/80 p-6 text-white`}>
                  <div className="flex items-center gap-2 text-white/80 text-sm font-medium mb-2">
                    <Sparkles className="h-4 w-4" />
                    Best Match for You
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-4xl backdrop-blur-sm">
                      {primaryStream.icon}
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold sm:text-3xl">
                        {primaryStream.name}
                      </h2>
                      <p className="text-white/80">{primaryStream.tagline}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Explanation */}
                  <div className="mb-6 rounded-xl bg-muted/50 p-4">
                    <h3 className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                      <Star className="h-5 w-5 text-accent" />
                      Why This Stream?
                    </h3>
                    <div className="prose prose-sm text-muted-foreground">
                      <ReactMarkdown>{quizResult.explanation}</ReactMarkdown>
                    </div>
                  </div>

                  {/* Quick highlights */}
                  <div className="mb-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        Top Careers
                      </h4>
                      <ul className="space-y-1">
                        {primaryStream.careers.slice(0, 4).map((career, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                            <CheckCircle2 className="h-4 w-4 text-success" />
                            {career}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        Recommended Courses
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {primaryStream.courses.slice(0, 4).map((course, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Entrance exams */}
                  {primaryStream.entranceExams.length > 0 && (
                    <div className="mb-6">
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        Entrance Exams to Prepare
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {primaryStream.entranceExams.map((exam, i) => (
                          <span
                            key={i}
                            className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary"
                          >
                            {exam}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    size="lg"
                    onClick={() => navigate(`/stream/${primaryStream.id}`)}
                    className="w-full group"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Explore {primaryStream.name} in Detail
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Alternative Options */}
            {alternativeStreams.length > 0 && (
              <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="mb-4 font-display text-xl font-semibold text-foreground">
                  Alternative Options to Consider
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {alternativeStreams.map((stream, index) => (
                    stream && (
                      <div
                        key={stream.id}
                        className="card-hover cursor-pointer rounded-xl bg-card p-5 shadow-card"
                        onClick={() => navigate(`/stream/${stream.id}`)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-stream-${stream.color}/10 text-2xl`}>
                            {stream.icon}
                          </div>
                          <div>
                            <h4 className="font-display font-semibold text-foreground">
                              {stream.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">{stream.tagline}</p>
                          </div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Score breakdown (collapsible in future) */}
            <div className="mb-8 rounded-2xl bg-card p-6 shadow-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
                Your Assessment Scores
              </h3>
              <div className="space-y-3">
                {Object.entries(quizResult.scores)
                  .sort(([, a], [, b]) => b - a)
                  .map(([category, score]) => {
                    const stream = streams.find((s) => s.id === category);
                    const maxScore = 100;
                    const percentage = Math.min((score / maxScore) * 100, 100);

                    return (
                      <div key={category}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 font-medium text-foreground">
                            {stream?.icon} {stream?.name}
                          </span>
                          <span className="text-muted-foreground">{score} pts</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-secondary">
                          <div
                            className={`h-full rounded-full bg-stream-${category} transition-all duration-700`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button variant="outline" onClick={handleStartOver}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Start Over
              </Button>
              <Button onClick={() => navigate('/streams')}>
                Explore All Streams
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
