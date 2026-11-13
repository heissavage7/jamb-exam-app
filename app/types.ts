// Type definitions for the JAMB Exam App

export interface Question {
  year: number;
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: string;
  explanation: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

export interface ExamState {
  subject: string | null;
  year: number | null;
  currentQuestion: number;
  answers: Record<number, string>;
  showResults: boolean;
  timeRemaining: number;
  isTimerRunning: boolean;
}

export type Screen = 'home' | 'years' | 'exam' | 'results' | 'review';
