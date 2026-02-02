import { StudentDetails, StreamCategory, QuizResult } from '@/types/student';
import { streams } from '@/data/streams';

export const calculateRecommendation = (
  studentDetails: StudentDetails,
  quizAnswers: Record<number, StreamCategory>
): QuizResult => {
  // Initialize scores
  const scores: Record<StreamCategory, number> = {
    engineering: 0,
    medical: 0,
    science: 0,
    commerce: 0,
    arts: 0,
    creative: 0,
  };

  // Count quiz answers
  Object.values(quizAnswers).forEach((category) => {
    scores[category] += 10;
  });

  // Add weights based on student details
  if (studentDetails.hscStream === 'science') {
    scores.engineering += 15;
    scores.medical += 15;
    scores.science += 15;
  } else if (studentDetails.hscStream === 'commerce') {
    scores.commerce += 20;
  } else if (studentDetails.hscStream === 'arts') {
    scores.arts += 15;
    scores.creative += 15;
  }

  // HSC subjects influence
  if (studentDetails.hscSubjects === 'pcm') {
    scores.engineering += 20;
    scores.science += 10;
  } else if (studentDetails.hscSubjects === 'pcb') {
    scores.medical += 25;
    scores.science += 10;
  } else if (studentDetails.hscSubjects === 'commerce') {
    scores.commerce += 20;
  } else if (studentDetails.hscSubjects === 'humanities') {
    scores.arts += 20;
    scores.creative += 10;
  }

  // Area of interest influence
  const interestMapping: Record<string, StreamCategory[]> = {
    technology: ['engineering'],
    medical: ['medical', 'science'],
    management: ['commerce'],
    creative: ['creative', 'arts'],
    research: ['science', 'medical'],
  };

  if (studentDetails.areaOfInterest && interestMapping[studentDetails.areaOfInterest]) {
    interestMapping[studentDetails.areaOfInterest].forEach((category) => {
      scores[category] += 15;
    });
  }

  // Academic strength influence
  if (studentDetails.academicStrength === 'analytical') {
    scores.engineering += 10;
    scores.science += 10;
    scores.commerce += 5;
  } else if (studentDetails.academicStrength === 'practical') {
    scores.engineering += 10;
    scores.medical += 10;
    scores.creative += 5;
  } else if (studentDetails.academicStrength === 'theory') {
    scores.arts += 10;
    scores.science += 5;
    scores.commerce += 5;
  }

  // Career goal influence
  if (studentDetails.careerGoal === 'entrepreneurship') {
    scores.commerce += 15;
    scores.engineering += 5;
  } else if (studentDetails.careerGoal === 'research') {
    scores.science += 20;
    scores.medical += 10;
  } else if (studentDetails.careerGoal === 'higher-studies') {
    scores.science += 10;
    scores.engineering += 10;
  }

  // Sort categories by score
  const sortedCategories = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([category]) => category as StreamCategory);

  const primaryRecommendation = sortedCategories[0];
  const alternativeOptions = sortedCategories.slice(1, 3);

  // Generate explanation
  const primaryStream = streams.find((s) => s.id === primaryRecommendation);
  const explanation = generateExplanation(studentDetails, primaryRecommendation, scores);

  return {
    scores,
    primaryRecommendation,
    alternativeOptions,
    explanation,
  };
};

const generateExplanation = (
  details: StudentDetails,
  recommendation: StreamCategory,
  scores: Record<StreamCategory, number>
): string => {
  const stream = streams.find((s) => s.id === recommendation);
  if (!stream) return '';

  let explanation = `Based on your profile analysis, **${stream.name}** emerges as your ideal career path. `;

  // Add specific reasoning
  if (details.hscSubjects === 'pcm' && recommendation === 'engineering') {
    explanation += `Your PCM background provides a strong foundation for engineering disciplines. `;
  } else if (details.hscSubjects === 'pcb' && recommendation === 'medical') {
    explanation += `Your PCB combination is perfectly aligned with medical studies. `;
  }

  if (details.areaOfInterest) {
    const interestLabels: Record<string, string> = {
      technology: 'technology and innovation',
      medical: 'healthcare and medicine',
      management: 'business and leadership',
      creative: 'creativity and design',
      research: 'research and discovery',
    };
    explanation += `Your interest in ${interestLabels[details.areaOfInterest] || details.areaOfInterest} aligns well with this stream. `;
  }

  if (details.academicStrength) {
    const strengthLabels: Record<string, string> = {
      analytical: 'analytical thinking abilities',
      practical: 'hands-on learning approach',
      theory: 'theoretical understanding',
    };
    explanation += `Your ${strengthLabels[details.academicStrength] || details.academicStrength} will be a valuable asset in this field. `;
  }

  explanation += `\n\nThis stream offers excellent career prospects in ${stream.careers.slice(0, 3).join(', ')}, and more. `;
  explanation += `You can start with courses like ${stream.courses.slice(0, 2).join(' or ')}.`;

  return explanation;
};
