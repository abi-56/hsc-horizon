import { QuizQuestion } from '@/types/student';

export const quizQuestions: QuizQuestion[] = [
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
    question: "In a group project, you usually prefer to:",
    options: [
      { text: "Handle the technical/coding part", category: "engineering" },
      { text: "Do research and compile data", category: "science" },
      { text: "Work on the presentation design", category: "creative" },
      { text: "Lead the team and manage tasks", category: "commerce" },
    ],
  },
  {
    id: 4,
    question: "What type of book/content interests you most?",
    options: [
      { text: "Technology trends and innovations", category: "engineering" },
      { text: "Medical discoveries or biology", category: "medical" },
      { text: "Psychology and human behavior", category: "arts" },
      { text: "Business success stories", category: "commerce" },
    ],
  },
  {
    id: 5,
    question: "How do you prefer to learn new things?",
    options: [
      { text: "Hands-on practice and building things", category: "engineering" },
      { text: "Conducting experiments and observing", category: "science" },
      { text: "Reading and discussing with others", category: "arts" },
      { text: "Creating visual projects and art", category: "creative" },
    ],
  },
  {
    id: 6,
    question: "What motivates you the most?",
    options: [
      { text: "Creating something that makes life easier", category: "engineering" },
      { text: "Making a difference in someone's health", category: "medical" },
      { text: "Understanding why people think the way they do", category: "arts" },
      { text: "Financial success and leadership", category: "commerce" },
    ],
  },
  {
    id: 7,
    question: "Which subject did you enjoy most in school?",
    options: [
      { text: "Mathematics and Physics", category: "engineering" },
      { text: "Biology and Chemistry", category: "medical" },
      { text: "History, Civics, or Literature", category: "arts" },
      { text: "Economics and Accounting", category: "commerce" },
    ],
  },
  {
    id: 8,
    question: "Your ideal work environment would be:",
    options: [
      { text: "A tech company with latest gadgets", category: "engineering" },
      { text: "A hospital or research laboratory", category: "medical" },
      { text: "A creative studio or media house", category: "creative" },
      { text: "A corporate office or own startup", category: "commerce" },
    ],
  },
  {
    id: 9,
    question: "When you imagine your future, you see yourself:",
    options: [
      { text: "Developing cutting-edge technology", category: "engineering" },
      { text: "Contributing to scientific discoveries", category: "science" },
      { text: "Creating art that inspires people", category: "creative" },
      { text: "Running a successful business", category: "commerce" },
    ],
  },
  {
    id: 10,
    question: "What do you value most in a career?",
    options: [
      { text: "Innovation and solving complex problems", category: "engineering" },
      { text: "Helping others and making an impact", category: "medical" },
      { text: "Self-expression and creativity", category: "creative" },
      { text: "Understanding society and human nature", category: "arts" },
    ],
  },
];
