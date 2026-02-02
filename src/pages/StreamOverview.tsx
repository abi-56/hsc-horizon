import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getStreamById } from '@/data/streams';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  GraduationCap, 
  Briefcase, 
  Lightbulb,
  CheckCircle2,
  BookOpen,
  FileText
} from 'lucide-react';

const StreamOverview: React.FC = () => {
  const { streamId } = useParams<{ streamId: string }>();
  const navigate = useNavigate();
  const stream = getStreamById(streamId || '');

  if (!stream) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">Stream Not Found</h1>
          <Button onClick={() => navigate('/streams')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Streams
          </Button>
        </div>
      </Layout>
    );
  }

  const difficultyColors = {
    Easy: 'bg-success/10 text-success border-success/20',
    Moderate: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    Challenging: 'bg-accent/10 text-accent border-accent/20',
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-background via-background to-secondary/30 py-8 sm:py-12">
        <div className="container">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/streams')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Streams
          </Button>

          {/* Hero */}
          <div className={`mb-8 rounded-2xl bg-stream-${stream.color}/10 p-6 sm:p-10`}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-card text-5xl shadow-lg">
                {stream.icon}
              </div>
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                    {stream.name}
                  </h1>
                  <span className={`rounded-full border px-4 py-1 text-sm font-semibold ${difficultyColors[stream.difficulty]}`}>
                    {stream.difficulty}
                  </span>
                </div>
                <p className="text-lg text-muted-foreground">{stream.tagline}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main content */}
            <div className="space-y-8 lg:col-span-2">
              {/* About */}
              <section className="rounded-2xl bg-card p-6 shadow-card">
                <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold text-foreground">
                  <BookOpen className="h-5 w-5 text-primary" />
                  About This Stream
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  {stream.description}
                </p>
              </section>

              {/* What You'll Learn */}
              <section className="rounded-2xl bg-card p-6 shadow-card">
                <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold text-foreground">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Skills You'll Develop
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {stream.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <span className="font-medium text-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Career Opportunities */}
              <section className="rounded-2xl bg-card p-6 shadow-card">
                <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold text-foreground">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Career Opportunities
                </h2>
                <div className="flex flex-wrap gap-2">
                  {stream.careers.map((career, index) => (
                    <span
                      key={index}
                      className={`rounded-full bg-stream-${stream.color}/10 px-4 py-2 text-sm font-medium text-foreground`}
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </section>

              {/* Demo/Preview Section */}
              <section className="rounded-2xl bg-card p-6 shadow-card">
                <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold text-foreground">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  What to Expect
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  {stream.id === 'engineering' && (
                    <div className="rounded-xl bg-muted/50 p-4">
                      <h3 className="mb-2 font-semibold text-foreground">Sample Challenge: Problem Solving</h3>
                      <p className="mb-3">Engineering is about solving real-world problems. Here's a taste:</p>
                      <div className="rounded-lg bg-card p-4 font-mono text-sm">
                        <p className="text-primary">// Write an algorithm to find the shortest path</p>
                        <p>function findPath(start, end) {'{'}</p>
                        <p className="pl-4">// Your logical thinking starts here!</p>
                        <p>{'}'}</p>
                      </div>
                    </div>
                  )}
                  {stream.id === 'medical' && (
                    <div className="rounded-xl bg-muted/50 p-4">
                      <h3 className="mb-2 font-semibold text-foreground">Case Study: Patient Diagnosis</h3>
                      <p className="mb-3">Medical professionals analyze symptoms to diagnose conditions:</p>
                      <p>A patient presents with fever, cough, and fatigue. As a medical student, you'll learn to connect symptoms, order tests, and determine the right treatment plan.</p>
                    </div>
                  )}
                  {stream.id === 'commerce' && (
                    <div className="rounded-xl bg-muted/50 p-4">
                      <h3 className="mb-2 font-semibold text-foreground">Business Scenario</h3>
                      <p className="mb-3">In commerce, you'll analyze business situations:</p>
                      <p>A startup has ₹10 lakh investment. How would you allocate budget across marketing, operations, and technology? This is the kind of decision-making you'll master.</p>
                    </div>
                  )}
                  {stream.id === 'arts' && (
                    <div className="rounded-xl bg-muted/50 p-4">
                      <h3 className="mb-2 font-semibold text-foreground">Critical Analysis Exercise</h3>
                      <p className="mb-3">Humanities explore human behavior and society:</p>
                      <p>How does social media affect youth mental health? In arts courses, you'll research, analyze, and present arguments on such topics.</p>
                    </div>
                  )}
                  {stream.id === 'science' && (
                    <div className="rounded-xl bg-muted/50 p-4">
                      <h3 className="mb-2 font-semibold text-foreground">Research Approach</h3>
                      <p className="mb-3">Pure science is about discovery through experimentation:</p>
                      <p>Hypothesis → Experiment → Data Analysis → Conclusion. You'll learn the scientific method to uncover new knowledge.</p>
                    </div>
                  )}
                  {stream.id === 'creative' && (
                    <div className="rounded-xl bg-muted/50 p-4">
                      <h3 className="mb-2 font-semibold text-foreground">Design Thinking</h3>
                      <p className="mb-3">Creative fields blend art with problem-solving:</p>
                      <p>Design an app interface for elderly users. How would you make it accessible, intuitive, and visually appealing? This is design thinking in action.</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="rounded-2xl bg-card p-6 shadow-card">
                <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
                  Quick Info
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium text-foreground">{stream.duration}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eligibility */}
              <div className="rounded-2xl bg-card p-6 shadow-card">
                <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
                  Eligibility
                </h3>
                <ul className="space-y-2">
                  {stream.eligibility.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Courses */}
              <div className="rounded-2xl bg-card p-6 shadow-card">
                <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
                  Popular Courses
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stream.courses.map((course, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Entrance Exams */}
              <div className="rounded-2xl bg-card p-6 shadow-card">
                <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                  <FileText className="h-5 w-5 text-primary" />
                  Entrance Exams
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stream.entranceExams.map((exam, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary"
                    >
                      {exam}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Button
                size="lg"
                onClick={() => navigate('/quiz')}
                className="w-full group"
              >
                Take Aptitude Quiz
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StreamOverview;
