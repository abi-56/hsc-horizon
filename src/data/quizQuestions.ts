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
  {
    id: 6,
    question: "Which project would you choose for a fair?",
    options: [
      { text: "Build a working robot or drone", category: "engineering" },
      { text: "Create a health awareness campaign", category: "medical" },
      { text: "Design an interactive art installation", category: "creative" },
      { text: "Develop a business plan for a startup", category: "commerce" },
    ],
  },
  {
    id: 7,
    question: "What kind of company would you like to work for?",
    options: [
      { text: "A tech giant like Google or Microsoft", category: "engineering" },
      { text: "A hospital or research organization", category: "medical" },
      { text: "A creative design or media agency", category: "creative" },
      { text: "A financial or consulting firm", category: "commerce" },
    ],
  },
  {
    id: 8,
    question: "Which skill would you most like to master?",
    options: [
      { text: "Programming and software development", category: "engineering" },
      { text: "Scientific research methodology", category: "science" },
      { text: "Creative writing or visual storytelling", category: "arts" },
      { text: "Business strategy and leadership", category: "commerce" },
    ],
  },
  {
    id: 9,
    question: "What type of challenge excites you?",
    options: [
      { text: "Solving a complex technical puzzle", category: "engineering" },
      { text: "Discovering something new about nature", category: "science" },
      { text: "Expressing ideas through art or media", category: "creative" },
      { text: "Building a successful organization", category: "commerce" },
    ],
  },
  {
    id: 10,
    question: "Where do you see yourself in 10 years?",
    options: [
      { text: "Leading a tech innovation team", category: "engineering" },
      { text: "Working in healthcare or research", category: "medical" },
      { text: "Making an impact through creative work", category: "creative" },
      { text: "Running my own business", category: "commerce" },
    ],
  },
];

/**
 * Get 10 quiz questions for the assessment.
 */
export const getQuizQuestions = (_hscSubjects?: string): QuizQuestion[] => {
  return universalQuestions;
};

/** Legacy export for backward compatibility */
export const quizQuestions = universalQuestions;
