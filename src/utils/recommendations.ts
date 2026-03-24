import { StudentDetails, StreamCategory, QuizResult } from '@/types/student';
import { streams } from '@/data/streams';

export const calculateRecommendation = (
  studentDetails: StudentDetails,
  quizAnswers: Record<number, StreamCategory>
): QuizResult => {
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

  // Add weights based on HSC stream
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

  // Sort categories by score
  const sortedCategories = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([category]) => category as StreamCategory);

  const primaryRecommendation = sortedCategories[0];
  const alternativeOptions = sortedCategories.slice(1, 3);

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

  if (details.hscStream === 'science' && (recommendation === 'engineering' || recommendation === 'medical' || recommendation === 'science')) {
    explanation += `Your Science background provides a strong foundation for this stream. `;
  } else if (details.hscStream === 'commerce' && recommendation === 'commerce') {
    explanation += `Your Commerce background aligns perfectly with this stream. `;
  } else if (details.hscStream === 'arts' && (recommendation === 'arts' || recommendation === 'creative')) {
    explanation += `Your Arts background is well-suited for this stream. `;
  }


  explanation += `\n\nThis stream offers excellent career prospects in ${stream.careers.slice(0, 3).join(', ')}, and more. `;
  explanation += `You can start with courses like ${stream.courses.slice(0, 2).join(' or ')}.`;

  return explanation;
};
