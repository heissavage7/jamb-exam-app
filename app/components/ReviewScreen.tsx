'use client';

import { useState } from 'react';
import { Question } from '../types';
import { subjects } from '../constants';

interface Props {
  subjectId: string;
  year: number;
  questions: Question[];
  answers: Record<number, string>;
  onBack: () => void;
  onHome: () => void;
}

export default function ReviewScreen({
  subjectId,
  year,
  questions,
  answers,
  onBack,
  onHome,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<'all' | 'correct' | 'wrong' | 'unanswered'>('all');
  const [showExplanation, setShowExplanation] = useState(true);

  const subject = subjects.find((s) => s.id === subjectId)!;

  const filteredIndices = questions
    .map((q, i) => {
      const userAns = answers[i];
      if (filter === 'correct' && userAns === q.answer) return i;
      if (filter === 'wrong' && userAns && userAns !== q.answer) return i;
      if (filter === 'unanswered' && !userAns) return i;
      if (filter === 'all') return i;
      return -1;
    })
    .filter((i) => i >= 0);

  const displayIndex = Math.min(currentIndex, filteredIndices.length - 1);
  const qIndex = filteredIndices[displayIndex] ?? 0;
  const currentQ = questions[qIndex];
  const userAnswer = answers[qIndex];
  const isCorrect = userAnswer === currentQ?.answer;

  if (!currentQ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-slate-400 mb-4">No questions match this filter</p>
          <button onClick={() => setFilter('all')} className="text-blue-400 hover:underline">
            Show all questions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-sm font-bold">{subject.icon} Answer Review</h1>
                <p className="text-xs text-slate-400">{year === 0 ? 'All Years' : year}</p>
              </div>
            </div>
            <span className="text-xs text-slate-400">
              {displayIndex + 1}/{filteredIndices.length}
            </span>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {([
              ['all', 'All', ''],
              ['correct', 'Correct', 'text-green-400'],
              ['wrong', 'Wrong', 'text-red-400'],
              ['unanswered', 'Skipped', 'text-yellow-400'],
            ] as const).map(([key, label, color]) => (
              <button
                key={key}
                onClick={() => { setFilter(key); setCurrentIndex(0); }}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  filter === key
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
                } ${color}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Question Review */}
      <main className="flex-1 px-4 py-6">
        <div className="max-w-3xl mx-auto animate-fade-in" key={qIndex}>
          {/* Question */}
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-slate-800 text-sm font-bold px-3 py-1 rounded-lg">
              Q{qIndex + 1}
            </span>
            <span className="text-xs text-slate-500">Year: {currentQ.year}</span>
            {userAnswer && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  isCorrect
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {isCorrect ? '✓ Correct' : '✗ Wrong'}
              </span>
            )}
            {!userAnswer && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-yellow-500/20 text-yellow-400">
                — Skipped
              </span>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-5">
            <p className="text-lg leading-relaxed whitespace-pre-line">{currentQ.question}</p>
          </div>

          {/* Options with Correct/Wrong Indicators */}
          <div className="space-y-3 mb-6">
            {(['A', 'B', 'C', 'D'] as const).map((opt) => {
              const isThisCorrect = opt === currentQ.answer;
              const isUserChoice = opt === userAnswer;
              let style = 'bg-slate-900/50 border-slate-800 text-slate-400';
              let iconBg = 'bg-slate-800 text-slate-400';

              if (isThisCorrect) {
                style = 'bg-green-500/10 border-green-500/40 text-green-200';
                iconBg = 'bg-green-500 text-white';
              } else if (isUserChoice && !isThisCorrect) {
                style = 'bg-red-500/10 border-red-500/40 text-red-200 shake-wrong';
                iconBg = 'bg-red-500 text-white';
              }

              return (
                <div
                  key={opt}
                  className={`p-4 rounded-xl border flex items-start gap-3 ${style}`}
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${iconBg}`}
                  >
                    {isThisCorrect ? '✓' : isUserChoice ? '✗' : opt}
                  </span>
                  <span className="pt-1">{currentQ.options[opt]}</span>
                  {isThisCorrect && (
                    <span className="ml-auto text-xs text-green-400 font-medium whitespace-nowrap pt-1">
                      Correct
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation */}
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-sm text-blue-400 hover:text-blue-300 mb-3 flex items-center gap-1"
          >
            <svg
              className={`w-4 h-4 transition-transform ${showExplanation ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {showExplanation ? 'Hide' : 'Show'} Explanation
          </button>
          {showExplanation && (
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 animate-fade-in">
              <p className="text-sm text-blue-200 leading-relaxed">
                💡 {currentQ.explanation}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex(Math.max(0, displayIndex - 1))}
            disabled={displayIndex === 0}
            className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </button>

          <button
            onClick={onHome}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm transition-colors"
          >
            🏠 Home
          </button>

          <button
            onClick={() => setCurrentIndex(Math.min(filteredIndices.length - 1, displayIndex + 1))}
            disabled={displayIndex === filteredIndices.length - 1}
            className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
