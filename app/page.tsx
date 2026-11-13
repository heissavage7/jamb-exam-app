'use client';

import { useState, useCallback } from 'react';
import HomeScreen from './components/HomeScreen';
import YearSelect from './components/YearSelect';
import ExamScreen from './components/ExamScreen';
import ResultsScreen from './components/ResultsScreen';
import ReviewScreen from './components/ReviewScreen';
import { getQuestions, getAllQuestions } from './data';
import { Question, Screen } from './types';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  const handleSelectSubject = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setScreen('years');
  };

  const handleSelectYear = (year: number) => {
    setSelectedYear(year);
    const qs = year === 0 ? getAllQuestions(selectedSubject) : getQuestions(selectedSubject, year);
    setQuestions(qs);
    setUserAnswers({});
    setScreen('exam');
  };

  const handleFinishExam = useCallback((answers: Record<number, string>) => {
    setUserAnswers(answers);
    setScreen('results');
  }, []);

  const handleRetry = () => {
    setUserAnswers({});
    setScreen('exam');
  };

  const handleHome = () => {
    setScreen('home');
    setSelectedSubject('');
    setSelectedYear(0);
    setQuestions([]);
    setUserAnswers({});
  };

  switch (screen) {
    case 'home':
      return <HomeScreen onSelectSubject={handleSelectSubject} />;

    case 'years':
      return (
        <YearSelect
          subjectId={selectedSubject}
          onSelectYear={handleSelectYear}
          onBack={handleHome}
        />
      );

    case 'exam':
      return (
        <ExamScreen
          subjectId={selectedSubject}
          year={selectedYear}
          questions={questions}
          onFinish={handleFinishExam}
          onBack={() => setScreen('years')}
        />
      );

    case 'results':
      return (
        <ResultsScreen
          subjectId={selectedSubject}
          year={selectedYear}
          questions={questions}
          answers={userAnswers}
          onReview={() => setScreen('review')}
          onRetry={handleRetry}
          onHome={handleHome}
        />
      );

    case 'review':
      return (
        <ReviewScreen
          subjectId={selectedSubject}
          year={selectedYear}
          questions={questions}
          answers={userAnswers}
          onBack={() => setScreen('results')}
          onHome={handleHome}
        />
      );

    default:
      return <HomeScreen onSelectSubject={handleSelectSubject} />;
  }
}
