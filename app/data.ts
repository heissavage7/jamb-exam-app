import { Question } from './types';

import governmentData from '../government-questions.json';
import mathematicsData from '../mathematics-questions.json';
import englishData from '../english-questions.json';
import economicsData from '../economics-questions.json';

const questionBank: Record<string, Question[]> = {
  government: governmentData as Question[],
  mathematics: mathematicsData as Question[],
  english: englishData as Question[],
  economics: economicsData as Question[],
};

export function getQuestions(subject: string, year: number): Question[] {
  const allQuestions = questionBank[subject] || [];
  return allQuestions.filter((q) => q.year === year);
}

export function getAllQuestions(subject: string): Question[] {
  return questionBank[subject] || [];
}

export function getYearsForSubject(subject: string): number[] {
  const allQuestions = questionBank[subject] || [];
  const yearsSet = new Set(allQuestions.map((q) => q.year));
  return Array.from(yearsSet).sort();
}

export function getQuestionCount(subject: string, year?: number): number {
  if (year) {
    return getQuestions(subject, year).length;
  }
  return getAllQuestions(subject).length;
}
