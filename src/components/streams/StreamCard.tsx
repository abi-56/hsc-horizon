import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StreamInfo } from '@/types/student';
import { Button } from '@/components/ui/button';
import { Clock, BarChart3, Briefcase, ArrowRight } from 'lucide-react';

interface StreamCardProps {
  stream: StreamInfo;
}

const StreamCard: React.FC<StreamCardProps> = ({ stream }) => {
  const navigate = useNavigate();

  const difficultyColors = {
    Easy: 'bg-success/10 text-success',
    Moderate: 'bg-amber-500/10 text-amber-600',
    Challenging: 'bg-accent/10 text-accent',
  };

  return (
    <div className="card-hover flex flex-col overflow-hidden rounded-2xl bg-card shadow-card">
      {/* Header */}
      <div className={`bg-stream-${stream.color}/10 p-6`}>
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-card text-3xl shadow-md">
            {stream.icon}
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${difficultyColors[stream.difficulty]}`}>
            {stream.difficulty}
          </span>
        </div>
        <h3 className="mb-2 font-display text-xl font-bold text-foreground">
          {stream.name}
        </h3>
        <p className="text-sm text-muted-foreground">{stream.tagline}</p>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        {/* Quick info */}
        <div className="mb-4 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{stream.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            <span>{stream.careers.length}+ career options</span>
          </div>
        </div>

        {/* Eligibility */}
        <div className="mb-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Eligibility
          </h4>
          <ul className="space-y-1">
            {stream.eligibility.slice(0, 2).map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                <span className={`h-1.5 w-1.5 rounded-full bg-stream-${stream.color}`} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Courses preview */}
        <div className="mb-6 flex-1">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Popular Courses
          </h4>
          <div className="flex flex-wrap gap-2">
            {stream.courses.slice(0, 4).map((course, i) => (
              <span
                key={i}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {course}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Button
          variant="outline"
          className="w-full group"
          onClick={() => navigate(`/stream/${stream.id}`)}
        >
          Explore Stream
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default StreamCard;
