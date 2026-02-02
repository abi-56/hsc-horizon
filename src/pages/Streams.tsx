import React from 'react';
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
          {/* Header */}
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Compass className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Explore Higher Studies Streams
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover various career paths, understand eligibility criteria, duration, and career opportunities.
            </p>
          </div>

          {/* Stream Cards Grid */}
          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {streams.map((stream, index) => (
              <div
                key={stream.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <StreamCard stream={stream} />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="mb-4 text-muted-foreground">
              Ready to find your best-fit stream?
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/quiz')}
              className="group"
            >
              Take the Aptitude Quiz
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Streams;
