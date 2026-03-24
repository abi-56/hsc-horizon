import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Download, MonitorPlay, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import pptxgen from 'pptxgenjs';

const PresentationPage: React.FC = () => {
  const navigate = useNavigate();

  const generatePPT = () => {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_WIDE';
    pptx.author = 'Future Higher Studies DSS';
    pptx.title = 'Future Higher Studies Decision Support System';

    const colors = {
      primary: '4F46E5',
      accent: '7C3AED',
      dark: '1E1B4B',
      light: 'EEF2FF',
      white: 'FFFFFF',
      gray: '6B7280',
      text: '1F2937',
    };

    // ── Slide 1: Title
    let slide = pptx.addSlide();
    slide.background = { fill: colors.dark };
    slide.addText('FUTURE HIGHER STUDIES\nDECISION SUPPORT SYSTEM', {
      x: 0.8, y: 1.5, w: 11.5, h: 2,
      fontSize: 36, bold: true, color: colors.white, align: 'center', lineSpacingMultiple: 1.3,
    });
    slide.addText('Find Your Perfect Higher Studies Path', {
      x: 0.8, y: 3.8, w: 11.5, h: 0.8,
      fontSize: 20, color: 'C7D2FE', align: 'center',
    });
    slide.addText('A Web-Based Career Guidance System for HSC/12th Standard Students', {
      x: 0.8, y: 5, w: 11.5, h: 0.6,
      fontSize: 14, color: 'A5B4FC', align: 'center',
    });

    // ── Slide 2: Introduction
    slide = pptx.addSlide();
    slide.background = { fill: colors.white };
    slide.addText('Introduction', {
      x: 0.8, y: 0.4, w: 11.5, h: 0.8,
      fontSize: 28, bold: true, color: colors.primary,
    });
    slide.addText(
      'The Future Higher Studies Decision Support System is a web-based application designed to assist HSC/12th Standard students in making informed decisions about their higher education pathway.\n\nMany students face confusion when choosing the right stream. This system provides personalized, data-driven guidance using aptitude assessment and weighted scoring algorithms.',
      { x: 0.8, y: 1.4, w: 11.5, h: 2.5, fontSize: 16, color: colors.text, lineSpacingMultiple: 1.5 }
    );
    slide.addText('Objectives:', {
      x: 0.8, y: 4.2, w: 11.5, h: 0.5, fontSize: 18, bold: true, color: colors.primary,
    });
    const objectives = [
      'Help students understand higher education options after 12th standard',
      'Assess student aptitude through scientifically designed questionnaires',
      'Provide data-driven recommendations for career streams',
      'Make career counseling accessible and free for all students',
    ];
    objectives.forEach((obj, i) => {
      slide.addText(`•  ${obj}`, {
        x: 1, y: 4.8 + i * 0.45, w: 11, h: 0.4,
        fontSize: 14, color: colors.text,
      });
    });

    // ── Slide 3: Streams Covered
    slide = pptx.addSlide();
    slide.background = { fill: colors.light };
    slide.addText('Higher Education Streams', {
      x: 0.8, y: 0.4, w: 11.5, h: 0.8,
      fontSize: 28, bold: true, color: colors.primary,
    });
    const streams = [
      { name: 'Engineering & Technology', desc: 'B.Tech, B.E., Computer Science, IT, Electronics' },
      { name: 'Medical & Life Sciences', desc: 'MBBS, BDS, Pharmacy, Nursing, Biotechnology' },
      { name: 'Science & Research', desc: 'B.Sc., M.Sc., Physics, Chemistry, Mathematics' },
      { name: 'Commerce & Management', desc: 'BBA, B.Com, CA, MBA, Finance' },
      { name: 'Arts & Humanities', desc: 'BA, Law, Psychology, Political Science' },
      { name: 'Creative & Design Fields', desc: 'B.Des, Fine Arts, Architecture, Media' },
    ];
    streams.forEach((s, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.8 + col * 6.2, y: 1.5 + row * 1.7, w: 5.8, h: 1.4,
        fill: { color: colors.white }, shadow: { type: 'outer', blur: 6, opacity: 0.15, offset: 2, color: '000000' },
        rectRadius: 0.15,
      });
      slide.addText(s.name, {
        x: 1.1 + col * 6.2, y: 1.6 + row * 1.7, w: 5.4, h: 0.5,
        fontSize: 16, bold: true, color: colors.primary,
      });
      slide.addText(s.desc, {
        x: 1.1 + col * 6.2, y: 2.1 + row * 1.7, w: 5.4, h: 0.5,
        fontSize: 12, color: colors.gray,
      });
    });

    // ── Slide 4: Technology Stack
    slide = pptx.addSlide();
    slide.background = { fill: colors.white };
    slide.addText('Technology Stack', {
      x: 0.8, y: 0.4, w: 11.5, h: 0.8,
      fontSize: 28, bold: true, color: colors.primary,
    });
    const techGroups = [
      { title: 'Frontend', items: ['React 18 + TypeScript', 'Tailwind CSS', 'Shadcn/UI + Radix UI', 'React Router DOM'] },
      { title: 'Build & Dev', items: ['Vite', 'ESLint', 'PostCSS'] },
      { title: 'State & Data', items: ['React Context API', 'localStorage Persistence', 'Custom Hooks'] },
      { title: 'Libraries', items: ['Lucide Icons', 'jsPDF', 'Framer Motion', 'Recharts'] },
    ];
    techGroups.forEach((g, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      slide.addText(g.title, {
        x: 0.8 + col * 6.2, y: 1.5 + row * 2.8, w: 5.8, h: 0.5,
        fontSize: 18, bold: true, color: colors.accent,
      });
      g.items.forEach((item, j) => {
        slide.addText(`▸  ${item}`, {
          x: 1 + col * 6.2, y: 2.1 + row * 2.8 + j * 0.45, w: 5.4, h: 0.4,
          fontSize: 14, color: colors.text,
        });
      });
    });

    // ── Slide 5: System Architecture / User Flow
    slide = pptx.addSlide();
    slide.background = { fill: colors.light };
    slide.addText('System Architecture & User Flow', {
      x: 0.8, y: 0.4, w: 11.5, h: 0.8,
      fontSize: 28, bold: true, color: colors.primary,
    });
    const flowSteps = ['Home Page', 'Student Details', 'Explore Streams', 'Take Quiz', 'View Results'];
    flowSteps.forEach((step, i) => {
      const x = 0.6 + i * 2.5;
      slide.addShape(pptx.ShapeType.roundRect, {
        x, y: 2, w: 2.2, h: 1, fill: { color: colors.primary }, rectRadius: 0.15,
      });
      slide.addText(step, {
        x, y: 2, w: 2.2, h: 1, fontSize: 13, bold: true, color: colors.white, align: 'center', valign: 'middle',
      });
      if (i < flowSteps.length - 1) {
        slide.addText('→', { x: x + 2.2, y: 2, w: 0.3, h: 1, fontSize: 20, color: colors.primary, align: 'center', valign: 'middle' });
      }
    });
    slide.addText('Core Modules:', {
      x: 0.8, y: 3.8, w: 11.5, h: 0.5, fontSize: 18, bold: true, color: colors.primary,
    });
    const modules = [
      'Home Module – Landing page with system introduction',
      'Student Details Module – Academic & personal info collection',
      'Streams Module – Six higher education streams display',
      'Quiz Module – 10-question aptitude assessment',
      'Results Module – Personalized recommendations with scoring',
    ];
    modules.forEach((m, i) => {
      slide.addText(`•  ${m}`, {
        x: 1, y: 4.4 + i * 0.45, w: 11, h: 0.4, fontSize: 13, color: colors.text,
      });
    });

    // ── Slide 6: Quiz & Recommendation Algorithm
    slide = pptx.addSlide();
    slide.background = { fill: colors.white };
    slide.addText('Quiz & Recommendation Algorithm', {
      x: 0.8, y: 0.4, w: 11.5, h: 0.8,
      fontSize: 28, bold: true, color: colors.primary,
    });
    slide.addText('Assessment Design:', {
      x: 0.8, y: 1.5, w: 5.5, h: 0.5, fontSize: 18, bold: true, color: colors.accent,
    });
    const quizFeatures = [
      '10 carefully designed questions',
      '5 universal + 5 subject-tailored',
      'Multiple choice format',
      'Progress tracking with visual bar',
      'Automatic scoring & analysis',
    ];
    quizFeatures.forEach((f, i) => {
      slide.addText(`•  ${f}`, {
        x: 1, y: 2.1 + i * 0.45, w: 5, h: 0.4, fontSize: 14, color: colors.text,
      });
    });
    slide.addText('Scoring Algorithm:', {
      x: 7, y: 1.5, w: 5.5, h: 0.5, fontSize: 18, bold: true, color: colors.accent,
    });
    const scoring = [
      'HSC Stream: +15–20 points',
      'Quiz Answers: +10 points each',
      'Weighted total → Top 3 streams',
    ];
    scoring.forEach((s, i) => {
      slide.addText(`▸  ${s}`, {
        x: 7.2, y: 2.1 + i * 0.45, w: 5, h: 0.4, fontSize: 14, color: colors.text,
      });
    });

    // ── Slide 7: Existing vs Proposed System
    slide = pptx.addSlide();
    slide.background = { fill: colors.light };
    slide.addText('Existing vs Proposed System', {
      x: 0.8, y: 0.4, w: 11.5, h: 0.8,
      fontSize: 28, bold: true, color: colors.primary,
    });
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.5, y: 1.5, w: 5.8, h: 5, fill: { color: 'FEE2E2' }, rectRadius: 0.15,
    });
    slide.addText('Existing System (Problems)', {
      x: 0.7, y: 1.6, w: 5.4, h: 0.5, fontSize: 16, bold: true, color: 'DC2626',
    });
    const existing = ['Limited counselor availability', 'Expensive (₹2000–₹10000/session)', 'Subjective & biased advice', 'No scientific assessment', 'Not accessible in rural areas'];
    existing.forEach((e, i) => {
      slide.addText(`✗  ${e}`, { x: 0.9, y: 2.3 + i * 0.5, w: 5, h: 0.4, fontSize: 13, color: '991B1B' });
    });
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 6.8, y: 1.5, w: 5.8, h: 5, fill: { color: 'DCFCE7' }, rectRadius: 0.15,
    });
    slide.addText('Proposed System (Solution)', {
      x: 7, y: 1.6, w: 5.4, h: 0.5, fontSize: 16, bold: true, color: '16A34A',
    });
    const proposed = ['Free & accessible 24/7', 'Scientific aptitude assessment', 'Personalized recommendations', 'Unbiased data-driven guidance', 'Works on all devices'];
    proposed.forEach((p, i) => {
      slide.addText(`✓  ${p}`, { x: 7.2, y: 2.3 + i * 0.5, w: 5, h: 0.4, fontSize: 13, color: '166534' });
    });

    // ── Slide 8: Testing & Implementation
    slide = pptx.addSlide();
    slide.background = { fill: colors.white };
    slide.addText('Testing & Implementation', {
      x: 0.8, y: 0.4, w: 11.5, h: 0.8,
      fontSize: 28, bold: true, color: colors.primary,
    });
    const testTypes = [
      { title: 'Unit Testing', items: ['Component testing', 'Algorithm validation', 'State management tests'] },
      { title: 'Integration Testing', items: ['Page data flow', 'localStorage persistence', 'Navigation & routing'] },
      { title: 'UAT', items: ['End-to-end flows', 'Mobile responsiveness', 'Cross-browser testing'] },
    ];
    testTypes.forEach((t, i) => {
      slide.addText(t.title, {
        x: 0.5 + i * 4.2, y: 1.5, w: 3.8, h: 0.5, fontSize: 16, bold: true, color: colors.accent,
      });
      t.items.forEach((item, j) => {
        slide.addText(`•  ${item}`, {
          x: 0.7 + i * 4.2, y: 2.2 + j * 0.45, w: 3.6, h: 0.4, fontSize: 13, color: colors.text,
        });
      });
    });
    slide.addText('Implementation Phases:', {
      x: 0.8, y: 4, w: 11.5, h: 0.5, fontSize: 18, bold: true, color: colors.primary,
    });
    const phases = ['Core UI & Structure', 'State Management', 'Quiz & Scoring', 'Results & Recommendations', 'Testing & Optimization'];
    phases.forEach((p, i) => {
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.5 + i * 2.5, y: 4.8, w: 2.2, h: 0.8, fill: { color: colors.primary }, rectRadius: 0.1,
      });
      slide.addText(`Phase ${i + 1}\n${p}`, {
        x: 0.5 + i * 2.5, y: 4.8, w: 2.2, h: 0.8, fontSize: 10, bold: true, color: colors.white, align: 'center', valign: 'middle',
      });
    });

    // ── Slide 9: Future Enhancements
    slide = pptx.addSlide();
    slide.background = { fill: colors.light };
    slide.addText('Future Enhancements', {
      x: 0.8, y: 0.4, w: 11.5, h: 0.8,
      fontSize: 28, bold: true, color: colors.primary,
    });
    const enhancements = [
      { title: 'AI-Powered Chatbot', desc: 'Interactive career counseling with AI assistance' },
      { title: 'College Database Integration', desc: 'Real-time admission info and college recommendations' },
      { title: 'Multi-Language Support', desc: 'Regional language accessibility for wider reach' },
      { title: 'Advanced Analytics', desc: 'Detailed insights and progress tracking dashboards' },
      { title: 'PDF Reports', desc: 'Comprehensive offline career guidance reports' },
      { title: 'Peer Mentoring', desc: 'Connect students with alumni and mentors' },
    ];
    enhancements.forEach((e, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.8 + col * 6.2, y: 1.5 + row * 1.6, w: 5.8, h: 1.3, fill: { color: colors.white },
        shadow: { type: 'outer', blur: 4, opacity: 0.1, offset: 2, color: '000000' }, rectRadius: 0.15,
      });
      slide.addText(e.title, {
        x: 1.1 + col * 6.2, y: 1.6 + row * 1.6, w: 5.4, h: 0.5, fontSize: 15, bold: true, color: colors.primary,
      });
      slide.addText(e.desc, {
        x: 1.1 + col * 6.2, y: 2.1 + row * 1.6, w: 5.4, h: 0.4, fontSize: 12, color: colors.gray,
      });
    });

    // ── Slide 10: Thank You
    slide = pptx.addSlide();
    slide.background = { fill: colors.dark };
    slide.addText('Thank You!', {
      x: 0.8, y: 2, w: 11.5, h: 1.5,
      fontSize: 44, bold: true, color: colors.white, align: 'center',
    });
    slide.addText('Future Higher Studies Decision Support System', {
      x: 0.8, y: 3.8, w: 11.5, h: 0.8,
      fontSize: 18, color: 'C7D2FE', align: 'center',
    });
    slide.addText('Questions & Discussion', {
      x: 0.8, y: 5, w: 11.5, h: 0.6,
      fontSize: 16, color: 'A5B4FC', align: 'center',
    });

    pptx.writeFile({ fileName: 'Future_Higher_Studies_DSS_Presentation.pptx' });
  };

  const slides = [
    'Title Slide',
    'Introduction & Objectives',
    'Higher Education Streams',
    'Technology Stack',
    'System Architecture & User Flow',
    'Quiz & Recommendation Algorithm',
    'Existing vs Proposed System',
    'Testing & Implementation',
    'Future Enhancements',
    'Thank You',
  ];

  return (
    <Layout>
      <div className="bg-gradient-to-br from-background via-background to-secondary/30 py-12 sm:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-4xl shadow-lg">
                <MonitorPlay className="h-10 w-10 text-white" />
              </div>
              <h1 className="mb-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
                Project Presentation
              </h1>
              <p className="text-lg text-muted-foreground">
                Download a professional PowerPoint presentation of the project
              </p>
            </div>

            <div className="mb-8 overflow-hidden rounded-2xl bg-card shadow-lg">
              <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
                <div className="flex items-center gap-4">
                  <MonitorPlay className="h-8 w-8" />
                  <div>
                    <h2 className="font-display text-xl font-bold">10-Slide Presentation</h2>
                    <p className="text-white/80">PowerPoint (.pptx) format</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6 rounded-xl bg-muted/50 p-4">
                  <h3 className="mb-3 font-semibold text-foreground">Slide Contents:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {slides.map((s, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                          {i + 1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button size="lg" onClick={generatePPT} className="w-full">
                  <Download className="mr-2 h-5 w-5" />
                  Download PowerPoint Presentation
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" onClick={() => navigate('/')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PresentationPage;
