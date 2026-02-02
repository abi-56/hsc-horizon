import React from 'react';
import { GraduationCap, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-sm font-semibold text-foreground">
              Future Higher Studies Decision Support System
            </span>
          </div>

          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 text-accent" /> for students choosing their future
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
