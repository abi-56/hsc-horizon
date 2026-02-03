import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Download, FileText, BookOpen, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

const Documentation: React.FC = () => {
  const navigate = useNavigate();

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const lineHeight = 7;
    let y = margin;

    const addNewPage = () => {
      doc.addPage();
      y = margin;
    };

    const checkPageBreak = (requiredSpace: number = 20) => {
      if (y + requiredSpace > pageHeight - margin) {
        addNewPage();
      }
    };

    const addTitle = (text: string, size: number = 16) => {
      checkPageBreak(20);
      doc.setFontSize(size);
      doc.setFont('helvetica', 'bold');
      doc.text(text, pageWidth / 2, y, { align: 'center' });
      y += lineHeight + 5;
    };

    const addSubtitle = (text: string) => {
      checkPageBreak(15);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(text, margin, y);
      y += lineHeight + 3;
    };

    const addHeading = (text: string) => {
      checkPageBreak(12);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(text, margin, y);
      y += lineHeight + 2;
    };

    const addParagraph = (text: string) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
      lines.forEach((line: string) => {
        checkPageBreak(8);
        doc.text(line, margin, y);
        y += lineHeight - 1;
      });
      y += 3;
    };

    const addBullet = (text: string) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(text, pageWidth - 2 * margin - 10);
      checkPageBreak(8);
      doc.text('•', margin, y);
      lines.forEach((line: string, index: number) => {
        doc.text(line, margin + 8, y);
        if (index < lines.length - 1) {
          y += lineHeight - 1;
          checkPageBreak(8);
        }
      });
      y += lineHeight - 1;
    };

    const addSpace = (space: number = 10) => {
      y += space;
    };

    // Title Page
    y = 80;
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('FUTURE HIGHER STUDIES', pageWidth / 2, y, { align: 'center' });
    y += 12;
    doc.text('DECISION SUPPORT SYSTEM', pageWidth / 2, y, { align: 'center' });
    y += 20;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('Find Your Perfect Higher Studies Path', pageWidth / 2, y, { align: 'center' });
    y += 40;
    doc.setFontSize(12);
    doc.text('A Web-Based Career Guidance System', pageWidth / 2, y, { align: 'center' });
    y += 10;
    doc.text('for HSC/12th Standard Students', pageWidth / 2, y, { align: 'center' });
    y += 30;
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, y, { align: 'center' });

    // Table of Contents
    addNewPage();
    addTitle('TABLE OF CONTENTS', 18);
    addSpace(10);
    
    const tocItems = [
      { title: 'Synopsis', page: '3' },
      { title: '1. Introduction', page: '4' },
      { title: '   1.1 About The Project', page: '4' },
      { title: '   1.2 System Specification', page: '5' },
      { title: '   1.3 System Description', page: '6' },
      { title: '2. System Study', page: '7' },
      { title: '   2.1 Existing System', page: '7' },
      { title: '   2.2 Proposed System', page: '8' },
      { title: '3. System Design', page: '9' },
      { title: '   3.1 File Design', page: '9' },
      { title: '   3.2 Input/Output Design', page: '10' },
      { title: '   3.3 Module Description', page: '11' },
      { title: '4. Testing & Implementation', page: '12' },
      { title: '5. Conclusion', page: '13' },
      { title: '6. Bibliography', page: '14' },
    ];

    tocItems.forEach((item) => {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(item.title, margin, y);
      doc.text(item.page, pageWidth - margin, y, { align: 'right' });
      y += lineHeight;
    });

    // Synopsis
    addNewPage();
    addTitle('SYNOPSIS', 18);
    addSpace(5);
    addParagraph('The Future Higher Studies Decision Support System is a web-based application designed to assist students who have completed their Higher Secondary Certificate (HSC/12th Standard) examination in making informed decisions about their higher education pathway.');
    addSpace(5);
    addParagraph('Many students face confusion and uncertainty when choosing the right stream for higher studies. This system addresses this challenge by:');
    addSpace(3);
    addBullet('Collecting Student Information: Gathering academic background, interests, and career aspirations');
    addBullet('Providing Stream Overviews: Offering detailed information about various higher education streams');
    addBullet('Conducting Aptitude Assessment: Evaluating students through a comprehensive 10-question quiz');
    addBullet('Generating Personalized Recommendations: Using a weighted scoring algorithm to suggest the most suitable career path');
    addSpace(5);
    addHeading('The system covers six major higher education streams:');
    addBullet('Engineering & Technology');
    addBullet('Medical & Life Sciences');
    addBullet('Science & Research');
    addBullet('Commerce & Management');
    addBullet('Arts & Humanities');
    addBullet('Creative & Design Fields');
    addSpace(5);
    addHeading('Key Technologies Used:');
    addBullet('Frontend: React.js, TypeScript, Tailwind CSS');
    addBullet('Build Tool: Vite');
    addBullet('UI Components: Shadcn/UI, Lucide Icons');
    addBullet('State Management: React Context API');
    addBullet('Data Persistence: Browser localStorage');

    // Chapter 1: Introduction
    addNewPage();
    addTitle('CHAPTER 1: INTRODUCTION', 18);
    addSpace(5);
    addSubtitle('1.1 About The Project');
    addParagraph('The Future Higher Studies Decision Support System is an innovative web application that serves as a digital career counselor for HSC-completed students. The project aims to bridge the gap between academic completion and career path selection by providing personalized guidance based on multiple factors.');
    addSpace(5);
    addHeading('Objectives:');
    addBullet('To help students understand various higher education options available after 12th standard');
    addBullet('To assess student aptitude through scientifically designed questionnaires');
    addBullet('To provide data-driven recommendations for career streams');
    addBullet('To offer detailed information about eligibility, duration, and career prospects');
    addBullet('To make career counseling accessible and free for all students');
    addSpace(5);
    addHeading('Scope:');
    addParagraph('The system caters to students from all three major HSC streams (Science, Commerce, and Arts) and provides recommendations across six higher education categories. It considers multiple factors including academic background, personal interests, learning style, and career goals.');

    // System Specification
    addSpace(10);
    addSubtitle('1.2 System Specification');
    addHeading('Hardware Requirements (Development):');
    addBullet('Processor: Intel Core i3 or equivalent (2.0 GHz+)');
    addBullet('RAM: 4 GB minimum, 8 GB recommended');
    addBullet('Storage: 500 MB free disk space');
    addBullet('Display: 1280 x 720 resolution minimum');
    addSpace(5);
    addHeading('Software Requirements:');
    addBullet('Operating System: Windows 10/11, macOS, or Linux');
    addBullet('Node.js: Version 18.x or higher');
    addBullet('Browser: Chrome, Firefox, Safari, or Edge (latest versions)');
    addSpace(5);
    addHeading('Technology Stack:');
    addBullet('Frontend Framework: React 18.3.1 with TypeScript');
    addBullet('Build Tool: Vite');
    addBullet('CSS Framework: Tailwind CSS');
    addBullet('UI Components: Shadcn/UI, Radix UI, Lucide Icons');
    addBullet('Routing: React Router DOM 6.x');
    addBullet('State Management: React Context API with localStorage');

    // System Description
    addNewPage();
    addSubtitle('1.3 System Description');
    addParagraph('The system follows a modular architecture with clear separation of concerns:');
    addSpace(5);
    addHeading('Core Modules:');
    addBullet('Home Module: Landing page with system introduction and navigation');
    addBullet('Student Details Module: Form for collecting academic and personal information');
    addBullet('Streams Exploration Module: Display of all higher education streams with details');
    addBullet('Stream Overview Module: Detailed view of individual streams with demos');
    addBullet('Quiz Module: 10-question aptitude assessment');
    addBullet('Results Module: Personalized recommendation display with explanations');
    addSpace(5);
    addHeading('User Flow:');
    addParagraph('Home Page → Student Details → Explore Streams → Take Quiz → View Results');
    addSpace(5);
    addHeading('Key Features:');
    addBullet('Responsive Design: Works seamlessly on desktop, tablet, and mobile devices');
    addBullet('Progress Tracking: Visual progress indicators during quiz');
    addBullet('Weighted Scoring: Algorithm considers multiple factors for accurate recommendations');
    addBullet('Persistent State: User data saved in localStorage for session continuity');
    addBullet('Interactive UI: Smooth animations and transitions for better user experience');

    // Chapter 2: System Study
    addNewPage();
    addTitle('CHAPTER 2: SYSTEM STUDY', 18);
    addSpace(5);
    addSubtitle('2.1 Existing System');
    addParagraph('Currently, students seeking guidance for higher studies after completing HSC rely on:');
    addBullet('School Career Counselors: Limited availability, often one counselor for hundreds of students');
    addBullet('Private Career Consultants: Expensive services (₹2000-₹10000 per session)');
    addBullet('Family and Friends: Subjective advice based on personal experiences');
    addBullet('Online Articles: Generic information not personalized to individual needs');
    addBullet('Entrance Exam Coaching Centers: Biased towards specific streams they teach');
    addSpace(5);
    addHeading('Drawbacks of Existing System:');
    addBullet('Limited Accessibility: Rural students have minimal access to career counseling');
    addBullet('High Cost: Professional counseling is expensive');
    addBullet('Time Constraints: School counselors have limited time per student');
    addBullet('Bias: Coaches promote streams they teach regardless of student aptitude');
    addBullet('No Scientific Assessment: Most advice lacks data-driven analysis');
    
    addSpace(10);
    addSubtitle('2.2 Proposed System');
    addParagraph('The Future Higher Studies Decision Support System addresses all the drawbacks by providing:');
    addBullet('Free Access: Available to all students without any cost');
    addBullet('24/7 Availability: Accessible anytime, anywhere with internet');
    addBullet('Scientific Assessment: 10-question aptitude quiz with weighted scoring');
    addBullet('Personalized Recommendations: Algorithm considers individual student profile');
    addBullet('Comprehensive Information: Detailed stream information in one place');
    addBullet('Unbiased Guidance: No commercial interest in any particular stream');
    addBullet('User-Friendly Interface: Simple, intuitive design for easy navigation');

    // Chapter 3: System Design
    addNewPage();
    addTitle('CHAPTER 3: SYSTEM DESIGN', 18);
    addSpace(5);
    addSubtitle('3.1 File Design');
    addParagraph('The project follows a modular file structure organized by feature:');
    addBullet('src/components/ - Reusable UI components');
    addBullet('src/context/ - Global state management (StudentContext)');
    addBullet('src/data/ - Static data (streams, quiz questions)');
    addBullet('src/pages/ - Page components (Index, Quiz, Results, etc.)');
    addBullet('src/types/ - TypeScript interfaces');
    addBullet('src/utils/ - Utility functions (recommendation algorithm)');
    
    addSpace(10);
    addSubtitle('3.2 Input/Output Design');
    addHeading('Input Design - Student Details Form:');
    addBullet('Student Name: Text input for name entry');
    addBullet('HSC Stream: Select from Science, Commerce, Arts');
    addBullet('HSC Subjects: Select from PCM, PCB, Commerce, Humanities');
    addBullet('Academic Strength: Theory-based, Practical-based, or Analytical');
    addBullet('Area of Interest: Technology, Medical, Management, Creative, Research');
    addBullet('Career Goal: Job, Research, Entrepreneurship, Higher Studies');
    addSpace(5);
    addHeading('Output Design - Results Display:');
    addBullet('Primary Recommendation: Best-fit stream with detailed explanation');
    addBullet('Alternative Options: Two additional suitable streams');
    addBullet('Match Score: Visual representation of compatibility');
    addBullet('Career Paths: Suggested careers in recommended stream');
    addBullet('Entrance Exams: Relevant exams to prepare for');

    // Module Description
    addSpace(10);
    addSubtitle('3.3 Module Description');
    addHeading('Module 1: Home Page');
    addParagraph('Purpose: Introduce the system and guide users to start. Features welcome message, process explanation, and call-to-action buttons.');
    addSpace(3);
    addHeading('Module 2: Student Details');
    addParagraph('Purpose: Collect student academic and personal information through validated forms with data persistence.');
    addSpace(3);
    addHeading('Module 3: Streams Exploration');
    addParagraph('Purpose: Display all six higher education streams in a responsive grid layout with quick overview cards.');
    addSpace(3);
    addHeading('Module 4: Quiz Assessment');
    addParagraph('Purpose: 10-question aptitude test with progress tracking and automatic scoring.');
    addSpace(3);
    addHeading('Module 5: Results & Recommendations');
    addParagraph('Purpose: Display personalized recommendations with explanations, alternatives, and career guidance.');

    // Chapter 4: Testing
    addNewPage();
    addTitle('CHAPTER 4: TESTING & IMPLEMENTATION', 18);
    addSpace(5);
    addSubtitle('4.1 Testing Methodology');
    addHeading('Unit Testing:');
    addBullet('Individual component testing for forms, cards, and UI elements');
    addBullet('Function testing for recommendation algorithm');
    addBullet('State management testing for context providers');
    addSpace(5);
    addHeading('Integration Testing:');
    addBullet('Data flow testing between pages');
    addBullet('localStorage persistence verification');
    addBullet('Navigation and routing tests');
    addSpace(5);
    addHeading('User Acceptance Testing:');
    addBullet('End-to-end user flow testing');
    addBullet('Mobile responsiveness verification');
    addBullet('Browser compatibility testing');
    
    addSpace(10);
    addSubtitle('4.2 Implementation');
    addParagraph('The system was implemented using an iterative development approach:');
    addBullet('Phase 1: Core UI components and page structure');
    addBullet('Phase 2: State management and data persistence');
    addBullet('Phase 3: Quiz functionality and scoring algorithm');
    addBullet('Phase 4: Results display and recommendations');
    addBullet('Phase 5: Testing, bug fixes, and optimization');

    // Chapter 5: Conclusion
    addNewPage();
    addTitle('CHAPTER 5: CONCLUSION', 18);
    addSpace(5);
    addParagraph('The Future Higher Studies Decision Support System successfully achieves its objective of providing accessible, personalized career guidance to HSC-completed students. The system democratizes career counseling by making it free and available 24/7.');
    addSpace(5);
    addHeading('Key Achievements:');
    addBullet('User-friendly interface accessible to all students');
    addBullet('Scientific aptitude assessment with weighted scoring');
    addBullet('Comprehensive coverage of six major educational streams');
    addBullet('Personalized recommendations with clear explanations');
    addBullet('Responsive design for all devices');
    addSpace(5);
    addHeading('Future Enhancements:');
    addBullet('AI-powered chatbot for interactive career counseling');
    addBullet('Integration with college databases for admission information');
    addBullet('Multi-language support for regional accessibility');
    addBullet('Advanced analytics and tracking');
    addBullet('PDF report generation for offline reference');
    addSpace(5);
    addParagraph('The system serves as a valuable tool in helping students make informed decisions about their future, reducing confusion and providing data-driven guidance for one of the most important decisions of their academic journey.');

    // Chapter 6: Bibliography
    addNewPage();
    addTitle('CHAPTER 6: BIBLIOGRAPHY', 18);
    addSpace(5);
    addHeading('Books and Publications:');
    addBullet('React Documentation - react.dev');
    addBullet('TypeScript Handbook - typescriptlang.org');
    addBullet('Tailwind CSS Documentation - tailwindcss.com');
    addSpace(5);
    addHeading('Online Resources:');
    addBullet('MDN Web Docs - developer.mozilla.org');
    addBullet('Shadcn/UI Components - ui.shadcn.com');
    addBullet('Vite Documentation - vitejs.dev');
    addSpace(5);
    addHeading('Research References:');
    addBullet('Career Development and Counseling Theories');
    addBullet('Educational Psychology and Aptitude Testing');
    addBullet('User Experience Design Principles');

    // Save PDF
    doc.save('Future_Higher_Studies_Decision_Support_System_Documentation.pdf');
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-background via-background to-secondary/30 py-12 sm:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-4xl shadow-lg">
                <FileText className="h-10 w-10 text-white" />
              </div>
              <h1 className="mb-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
                Project Documentation
              </h1>
              <p className="text-lg text-muted-foreground">
                Complete documentation for the Future Higher Studies Decision Support System
              </p>
            </div>

            {/* Documentation Card */}
            <div className="mb-8 overflow-hidden rounded-2xl bg-card shadow-lg">
              <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
                <div className="flex items-center gap-4">
                  <BookOpen className="h-8 w-8" />
                  <div>
                    <h2 className="font-display text-xl font-bold">
                      Complete Project Report
                    </h2>
                    <p className="text-white/80">PDF format with all chapters</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6 rounded-xl bg-muted/50 p-4">
                  <h3 className="mb-3 font-semibold text-foreground">
                    Document Contents:
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Synopsis & Introduction
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      System Study (Existing vs Proposed)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      System Design & Development
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Module Descriptions
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Testing & Implementation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Conclusion & Bibliography
                    </li>
                  </ul>
                </div>

                <Button
                  size="lg"
                  onClick={generatePDF}
                  className="w-full group"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF Documentation
                </Button>
              </div>
            </div>

            {/* Back Button */}
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

export default Documentation;
