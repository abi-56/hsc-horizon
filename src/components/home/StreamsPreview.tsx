import React from 'react';
import { useNavigate } from 'react-router-dom';
import { streams } from '@/data/streams';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const StreamsPreview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Explore Career Streams
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover diverse paths waiting for you after 12th standard
          </p>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {streams.map((stream, index) => (
            <div
              key={stream.id}
              className="card-hover group cursor-pointer rounded-2xl bg-card p-6 shadow-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/stream/${stream.id}`)}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-stream-${stream.color}/10 text-2xl`}>
                  {stream.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                    {stream.name}
                  </h3>
                  <span className={`text-xs font-medium text-stream-${stream.color}`}>
                    {stream.difficulty}
                  </span>
                </div>
              </div>
              <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                {stream.tagline}
              </p>
              <div className="flex flex-wrap gap-2">
                {stream.courses.slice(0, 3).map((course, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" onClick={() => navigate('/streams')}>
            View All Streams
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StreamsPreview;
