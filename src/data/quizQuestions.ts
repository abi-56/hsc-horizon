import { QuizQuestion } from '@/types/student';

/** Universal questions asked to all students */
const universalQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "When facing a problem, what's your first instinct?",
    options: [
      { text: "Break it down logically and find a systematic solution", category: "engineering" },
      { text: "Research and gather all available information first", category: "science" },
      { text: "Think about how it affects people emotionally", category: "arts" },
      { text: "Consider the practical business implications", category: "commerce" },
    ],
  },
  {
    id: 2,
    question: "Which activity sounds most exciting to you?",
    options: [
      { text: "Building an app or creating a new gadget", category: "engineering" },
      { text: "Helping someone recover from an illness", category: "medical" },
      { text: "Designing a poster or editing a video", category: "creative" },
      { text: "Starting a small business venture", category: "commerce" },
    ],
  },
  {
    id: 3,
    question: "How do you prefer to learn new things?",
    options: [
      { text: "Hands-on practice and building things", category: "engineering" },
      { text: "Conducting experiments and observing", category: "science" },
      { text: "Reading and discussing with others", category: "arts" },
      { text: "Creating visual projects and art", category: "creative" },
    ],
  },
  {
    id: 4,
    question: "What motivates you the most?",
    options: [
      { text: "Creating something that makes life easier", category: "engineering" },
      { text: "Making a difference in someone's health", category: "medical" },
      { text: "Understanding why people think the way they do", category: "arts" },
      { text: "Financial success and leadership", category: "commerce" },
    ],
  },
  {
    id: 5,
    question: "What do you value most in a career?",
    options: [
      { text: "Innovation and solving complex problems", category: "engineering" },
      { text: "Helping others and making an impact", category: "medical" },
      { text: "Self-expression and creativity", category: "creative" },
      { text: "Understanding society and human nature", category: "arts" },
    ],
  },
];

/** Questions specific to PCM / Science stream */
const pcmQuestions: QuizQuestion[] = [
  {
    id: 101,
    question: "Which area of technology excites you the most?",
    relevantTo: ['pcm', 'science'],
    options: [
      { text: "Building software and mobile applications", category: "engineering" },
      { text: "Robotics and automation systems", category: "engineering" },
      { text: "Mathematical modeling and data analysis", category: "science" },
      { text: "Designing user interfaces and experiences", category: "creative" },
    ],
  },
  {
    id: 102,
    question: "How do you feel about advanced mathematics?",
    relevantTo: ['pcm', 'science'],
    options: [
      { text: "Love it — I enjoy solving complex equations", category: "engineering" },
      { text: "I prefer applied math in real-world scenarios", category: "science" },
      { text: "I'd rather use statistics for business decisions", category: "commerce" },
      { text: "I prefer subjects that don't rely heavily on math", category: "arts" },
    ],
  },
  {
    id: 103,
    question: "Which project would you choose for a science fair?",
    relevantTo: ['pcm'],
    options: [
      { text: "Build a working robot or drone", category: "engineering" },
      { text: "Develop a physics simulation model", category: "science" },
      { text: "Create a mobile app to solve a social problem", category: "engineering" },
      { text: "Design an interactive data visualization", category: "creative" },
    ],
  },
  {
    id: 104,
    question: "What kind of company would you like to work for?",
    relevantTo: ['pcm'],
    options: [
      { text: "A tech giant like Google or Microsoft", category: "engineering" },
      { text: "A space research organization like ISRO", category: "science" },
      { text: "My own startup company", category: "commerce" },
      { text: "A creative design agency", category: "creative" },
    ],
  },
  {
    id: 105,
    question: "Which skill would you most like to master?",
    relevantTo: ['pcm'],
    options: [
      { text: "Programming in multiple languages", category: "engineering" },
      { text: "Advanced physics and quantum computing", category: "science" },
      { text: "Product management and business strategy", category: "commerce" },
      { text: "3D modeling and animation", category: "creative" },
    ],
  },
];

/** Questions specific to PCB / Medical stream */
const pcbQuestions: QuizQuestion[] = [
  {
    id: 201,
    question: "What aspect of biology fascinates you the most?",
    relevantTo: ['pcb'],
    options: [
      { text: "Human anatomy and how the body works", category: "medical" },
      { text: "Genetics and DNA research", category: "science" },
      { text: "Plant biology and agriculture", category: "science" },
      { text: "Psychology and brain behavior", category: "arts" },
    ],
  },
  {
    id: 202,
    question: "How do you react in emergency medical situations?",
    relevantTo: ['pcb'],
    options: [
      { text: "Stay calm and take charge of the situation", category: "medical" },
      { text: "Prefer to analyze and understand what happened", category: "science" },
      { text: "Focus on comforting the affected person", category: "arts" },
      { text: "Think about preventive measures for the future", category: "engineering" },
    ],
  },
  {
    id: 203,
    question: "Which medical career appeals to you most?",
    relevantTo: ['pcb'],
    options: [
      { text: "Surgeon or specialist doctor", category: "medical" },
      { text: "Medical researcher developing new treatments", category: "science" },
      { text: "Healthcare administrator or hospital manager", category: "commerce" },
      { text: "Medical illustrator or health communicator", category: "creative" },
    ],
  },
  {
    id: 204,
    question: "What would you research if given a lab for a week?",
    relevantTo: ['pcb'],
    options: [
      { text: "New drug formulations for diseases", category: "medical" },
      { text: "Gene editing and CRISPR technology", category: "science" },
      { text: "Biotech business opportunities", category: "commerce" },
      { text: "Bio-art and science communication", category: "creative" },
    ],
  },
  {
    id: 205,
    question: "Which challenge would you most want to solve?",
    relevantTo: ['pcb'],
    options: [
      { text: "Eradicating a major disease like cancer", category: "medical" },
      { text: "Understanding climate change through biology", category: "science" },
      { text: "Making healthcare affordable for everyone", category: "commerce" },
      { text: "Raising health awareness through media", category: "creative" },
    ],
  },
];

/** Questions specific to Commerce stream */
const commerceQuestions: QuizQuestion[] = [
  {
    id: 301,
    question: "Which business topic interests you the most?",
    relevantTo: ['commerce'],
    options: [
      { text: "Stock market, investments, and financial planning", category: "commerce" },
      { text: "Marketing strategies and brand building", category: "creative" },
      { text: "Accounting, auditing, and taxation", category: "commerce" },
      { text: "Business analytics and technology", category: "engineering" },
    ],
  },
  {
    id: 302,
    question: "If you could start a business, it would be in:",
    relevantTo: ['commerce'],
    options: [
      { text: "FinTech — combining finance and technology", category: "engineering" },
      { text: "Consulting and advisory services", category: "commerce" },
      { text: "E-commerce and online retail", category: "commerce" },
      { text: "Creative agency or media production", category: "creative" },
    ],
  },
  {
    id: 303,
    question: "Which role in a company suits you best?",
    relevantTo: ['commerce'],
    options: [
      { text: "CEO or Managing Director", category: "commerce" },
      { text: "Chief Financial Officer (CFO)", category: "commerce" },
      { text: "Chief Technology Officer (CTO)", category: "engineering" },
      { text: "Creative Director", category: "creative" },
    ],
  },
  {
    id: 304,
    question: "How do you approach financial decisions?",
    relevantTo: ['commerce'],
    options: [
      { text: "Analyze data and calculate risks carefully", category: "commerce" },
      { text: "Use technology tools for data-driven decisions", category: "engineering" },
      { text: "Trust intuition and market trends", category: "creative" },
      { text: "Consider ethical and social impact", category: "arts" },
    ],
  },
  {
    id: 305,
    question: "What would you do with ₹10 lakh?",
    relevantTo: ['commerce'],
    options: [
      { text: "Invest in stocks and mutual funds", category: "commerce" },
      { text: "Start a tech-based side business", category: "engineering" },
      { text: "Fund a creative project or content channel", category: "creative" },
      { text: "Support a social cause or NGO", category: "arts" },
    ],
  },
];

/** Questions specific to Humanities / Arts stream */
const humanitiesQuestions: QuizQuestion[] = [
  {
    id: 401,
    question: "Which form of expression resonates with you most?",
    relevantTo: ['humanities'],
    options: [
      { text: "Writing — essays, poetry, or journalism", category: "arts" },
      { text: "Visual art — painting, photography, or film", category: "creative" },
      { text: "Public speaking and debate", category: "arts" },
      { text: "Social activism and community work", category: "arts" },
    ],
  },
  {
    id: 402,
    question: "Which career path excites you the most?",
    relevantTo: ['humanities'],
    options: [
      { text: "Lawyer or human rights advocate", category: "arts" },
      { text: "Psychologist or counselor", category: "arts" },
      { text: "Filmmaker or content creator", category: "creative" },
      { text: "Entrepreneur in social enterprise", category: "commerce" },
    ],
  },
  {
    id: 403,
    question: "What type of book would you most enjoy reading?",
    relevantTo: ['humanities'],
    options: [
      { text: "Political theory and philosophy", category: "arts" },
      { text: "Biographies of creative leaders", category: "creative" },
      { text: "Psychology and human behavior", category: "arts" },
      { text: "Business and leadership stories", category: "commerce" },
    ],
  },
  {
    id: 404,
    question: "If you could host a TV show, it would be about:",
    relevantTo: ['humanities'],
    options: [
      { text: "Investigative journalism and current affairs", category: "arts" },
      { text: "Art, design, and culture", category: "creative" },
      { text: "Science documentaries for general audience", category: "science" },
      { text: "Startup stories and business insights", category: "commerce" },
    ],
  },
  {
    id: 405,
    question: "What social issue would you dedicate your career to?",
    relevantTo: ['humanities'],
    options: [
      { text: "Education reform and literacy", category: "arts" },
      { text: "Mental health awareness", category: "arts" },
      { text: "Digital divide and tech accessibility", category: "engineering" },
      { text: "Environmental sustainability through media", category: "creative" },
    ],
  },
];

/**
 * Get 10 quiz questions tailored to the student's chosen subject and interests.
 * Returns 5 universal + 5 subject-specific questions.
 */
export const getQuizQuestions = (hscSubjects: string): QuizQuestion[] => {
  let subjectSpecific: QuizQuestion[];

  switch (hscSubjects) {
    case 'pcm':
      subjectSpecific = pcmQuestions;
      break;
    case 'pcb':
      subjectSpecific = pcbQuestions;
      break;
    case 'commerce':
      subjectSpecific = commerceQuestions;
      break;
    case 'humanities':
      subjectSpecific = humanitiesQuestions;
      break;
    default:
      subjectSpecific = pcmQuestions;
  }

  // 5 universal + 5 subject-specific = 10 total
  return [...universalQuestions, ...subjectSpecific.slice(0, 5)];
};

/** Legacy export for backward compatibility */
export const quizQuestions = [...universalQuestions, ...pcmQuestions.slice(0, 5)];
