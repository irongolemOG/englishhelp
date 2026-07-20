export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Examiner";

export interface LiteraryDevice {
  id: string;
  name: string;
  definition: string;
  simpleExplanation: string;
  advancedExplanation: string;
  purpose: string;
  whyAuthorsUseIt: string;
  psychologicalEffect: string;
  readerEffect: string;
  emotionalEffect: string;
  commonExamUses: string[];
  commonMistakes: string[];
  differenceFromSimilar: string;
  literaryExample: string;
  everydayExample: string;
  realExamples: {
    quote: string;
    source: string;
    difficulty: Difficulty;
  }[];
  interactiveExercise: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  practiceSentence: string;
  ibLevel7Analysis: string;
  memoryTrick: string;
  difficultyLevel: Difficulty;
  frequencyInExams: "Low" | "Medium" | "High";
  relatedDevices: string[];
  tags: string[];
  commonIn: string[];
}

export type VocabCategory = 
  | "Analysis verbs"
  | "Interpretation verbs"
  | "Evaluation verbs"
  | "Tone words"
  | "Mood words"
  | "Authorial choice vocabulary"
  | "Structure vocabulary"
  | "Poetry vocabulary"
  | "Sentence starters"
  | "Conclusion phrases"
  | "Transition phrases";

export interface VocabularyItem {
  id: string;
  word: string;
  category: VocabCategory;
  meaning: string;
  whenToUse: string;
  whenNotToUse: string;
  examples: string[];
  synonyms: string[];
  commonMistakes: string;
  replaces: string[]; // Words this provides a stronger alternative for, e.g., ["shows", "display"]
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  commonSymbols: string[];
  colours: string[];
  images: string[];
  typicalTechniques: string[];
  questionsExaminersAsk: string[];
  typicalArguments: string[];
}

export interface LessonContent {
  type: "text" | "analogy" | "visual" | "example" | "mistake" | "examiner" | "takeaway" | "memoryTrick" | "summary" | "quiz" | "task" | "level7";
  content: string;
  metadata?: any;
}

export interface Lesson {
  id: string;
  level: number;
  title: string;
  overview: string;
  learningObjectives: string[];
  prerequisites: string[];
  content: LessonContent[];
}

export interface Flashcard {
  id: string;
  device: string;
  definition: string;
  purpose: string;
  example: string;
  ibAnalysis: string;
  difficulty: Difficulty;
}
