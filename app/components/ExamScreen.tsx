'use client';

import { useState, useEffect, useCallback } from 'react';
import { Question } from '../types';
import { subjects, EXAM_DURATION } from '../constants';

interface Props {
  subjectId: string;
  year: number;
  questions: Question[];
  onFinish: (answers: Record<number, string>) => void;
  onBack: () => void;
}

export default function ExamScreen({ subjectId, year, questions, onFinish, onBack }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(EXAM_DURATION);
  const [showNav, setShowNav] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  const subject = subjects.find((s) => s.id === subjectId)!;
  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onFinish(answers);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [answers, onFinish]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const selectAnswer = useCallback((option: string) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: option }));
  }, [currentIndex]);

  const goToQuestion = (index: number) => {
    setCurrentIndex(index);
    setShowNav(false);
  };

  const handleSubmit = () => {
    if (answeredCount < totalQuestions) {
      setShowConfirmSubmit(true);
    } else {
      onFinish(answers);
    }
  };

  const timerColor = timeRemaining < 300 ? 'text-red-400' : timeRemaining < 600 ? 'text-yellow-400' : 'text-green-400';

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      {/* Top Bar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{subject.icon}</span>
              <div>
                <span className="text-sm font-semibold">{subject.name}</span>
                <span className="text-xs text-slate-400 ml-2">
                  {year === 0 ? 'All Years' : year}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`font-mono text-lg font-bold ${timerColor}`}>
                ⏱ {formatTime(timeRemaining)}
              </div>
              <button
                onClick={() => setShowNav(!showNav)}
                className="relative bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-sm transition-colors"
              >
                {currentIndex + 1}/{totalQuestions}
                {answeredCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {answeredCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Question Navigation Overlay */}
      {showNav && (
        <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm" onClick={() => setShowNav(false)}>
          <div
            className="absolute right-0 top-0 h-full w-80 bg-slate-900 border-l border-slate-800 p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Questions</h3>
              <span className="text-xs text-slate-400">
                {answeredCount}/{totalQuestions} answered
              </span>
            </div>
            <div className="question-grid">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToQuestion(i)}
                  className={`w-full aspect-square rounded-lg text-sm font-semibold flex items-center justify-center transition-all ${
                    i === currentIndex
                      ? 'bg-blue-500 text-white ring-2 ring-blue-400'
                      : answers[i]
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              className="w-full mt-6 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Submit Exam ({answeredCount}/{totalQuestions})
            </button>
          </div>
        </div>
      )}

      {/* Question Body */}
      <main className="flex-1 px-4 py-6">
        <div className="max-w-3xl mx-auto animate-fade-in" key={currentIndex}>
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question Number */}
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-slate-800 text-sm font-bold px-3 py-1 rounded-lg">
              Q{currentIndex + 1}
            </span>
            <span className="text-xs text-slate-500">Year: {currentQ.year}</span>
          </div>

          {/* Question Text */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6">
            <p className="text-lg leading-relaxed whitespace-pre-line">{currentQ.question}</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {(['A', 'B', 'C', 'D'] as const).map((opt) => {
              const isSelected = answers[currentIndex] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => selectAnswer(opt)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3 ${
                    isSelected
                      ? 'bg-blue-500/15 border-blue-500/50 text-blue-100'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-600 hover:bg-slate-800/50 text-slate-300'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      isSelected
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {opt}
                  </span>
                  <span className="pt-1">{currentQ.options[opt]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 font-semibold transition-colors"
          >
            Submit
          </button>

          <button
            onClick={() => setCurrentIndex(Math.min(totalQuestions - 1, currentIndex + 1))}
            disabled={currentIndex === totalQuestions - 1}
            className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-40 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full animate-fade-in">
            <h3 className="text-xl font-bold mb-2">Submit Exam?</h3>
            <p className="text-slate-400 mb-1">
              You have answered <span className="text-green-400 font-bold">{answeredCount}</span> out
              of <span className="font-bold">{totalQuestions}</span> questions.
            </p>
            <p className="text-yellow-400 text-sm mb-6">
              ⚠️ {totalQuestions - answeredCount} question(s) unanswered
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Continue Exam
              </button>
              <button
                onClick={() => onFinish(answers)}
                className="flex-1 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 font-semibold transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
