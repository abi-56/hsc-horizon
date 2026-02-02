import React from 'react';
import { UserCircle, Layers, ClipboardCheck, Lightbulb } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: UserCircle,
      title: 'Enter Your Details',
      description: 'Share your HSC stream, subjects, and academic strengths',
    },
    {
      icon: Layers,
      title: 'Explore Streams',
      description: 'Discover various career paths with detailed overviews',
    },
    {
      icon: ClipboardCheck,
      title: 'Take Assessment',
      description: 'Complete a 10-question aptitude quiz to find your fit',
    },
    {
      icon: Lightbulb,
      title: 'Get Recommendations',
      description: 'Receive personalized stream suggestions based on your profile',
    },
  ];

  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Four simple steps to discover your ideal career path
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-border md:block" />

          <div className="grid gap-8 md:grid-cols-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex gap-4 md:gap-6 ${isEven ? 'md:pr-12' : 'md:col-start-2 md:pl-12'}`}
                >
                  {/* Step number badge */}
                  <div className="absolute left-1/2 top-0 z-10 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground md:flex">
                    {index + 1}
                  </div>

                  <div className="card-hover flex flex-1 gap-4 rounded-2xl bg-card p-6 shadow-card">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary md:hidden">
                      <span className="text-lg font-bold">{index + 1}</span>
                    </div>
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 sm:flex">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
