import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, BookOpen, Target, Trophy } from 'lucide-react';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    { icon: BookOpen, text: 'Explore 6+ career streams' },
    { icon: Target, text: 'Personalized assessment' },
    { icon: Trophy, text: 'Smart recommendations' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/30 py-16 sm:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary animate-fade-in">
            <Sparkles className="h-4 w-4" />
            <span>Free Career Guidance for HSC Students</span>
          </div>

          {/* Main heading */}
          <h1 className="mb-6 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl animate-slide-up">
            Find Your Perfect
            <span className="gradient-text block">Higher Studies Path</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Confused about what to study after 12th? Our intelligent assessment system 
            analyzes your interests, strengths, and goals to recommend the ideal career stream for you.
          </p>

          {/* CTA Button */}
          <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate('/details')}
              className="group"
            >
              Find My Higher Studies Path
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {features.map(({ icon: Icon, text }, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-card"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
