'use client';

import { Question } from '../types';
import { subjects } from '../constants';

interface Props {
  subjectId: string;
  year: number;
  questions: Question[];
  answers: Record<number, string>;
  onReview: () => void;
  onRetry: () => void;
  onHome: () => void;
}

export default function ResultsScreen({
  subjectId,
  year,
  questions,
  answers,
  onReview,
  onRetry,
  onHome,
}: Props) {
  const subject = subjects.find((s) => s.id === subjectId)!;
  const totalQuestions = questions.length;

  let correct = 0;
  let wrong = 0;
  let unanswered = 0;

  questions.forEach((q, i) => {
    if (!answers[i]) {
      unanswered++;
    } else if (answers[i] === q.answer) {
      correct++;
    } else {
      wrong++;
    }
  });

  const score = Math.round((correct / totalQuestions) * 100);
  const grade = score >= 70 ? 'A' : score >= 60 ? 'B' : score >= 50 ? 'C' : score >= 40 ? 'D' : 'F';
  const gradeColor =
    grade === 'A'
      ? 'text-green-400'
      : grade === 'B'
      ? 'text-blue-400'
      : grade === 'C'
      ? 'text-yellow-400'
      : grade === 'D'
      ? 'text-orange-400'
      : 'text-red-400';

  const message =
    score >= 70
      ? '🎉 Excellent! You are well prepared!'
      : score >= 50
      ? '👍 Good effort! Keep practicing!'
      : '💪 Don\'t give up! Review the answers and try again.';

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-lg font-bold">
            {subject.icon} {subject.name} — Results
          </h1>
          <p className="text-xs text-slate-400">{year === 0 ? 'All Years' : year}</p>
        </div>
      </header>

      <main className="flex-1 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Score Circle */}
          <div className="flex flex-col items-center mb-8 animate-fade-in">
            <div className="relative w-40 h-40 mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#1e293b" strokeWidth="10" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke={score >= 70 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444'}
                  strokeWidth="10"
                  strokeDasharray={`${(score / 100) * 314} 314`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{score}%</span>
                <span className={`text-lg font-bold ${gradeColor}`}>Grade {grade}</span>
              </div>
            </div>
            <p className="text-slate-400 text-center">{message}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <StatCard
              label="Correct"
              value={correct}
              color="text-green-400"
              bgColor="bg-green-500/10"
              icon="✓"
            />
            <StatCard
              label="Wrong"
              value={wrong}
              color="text-red-400"
              bgColor="bg-red-500/10"
              icon="✗"
            />
            <StatCard
              label="Skipped"
              value={unanswered}
              color="text-yellow-400"
              bgColor="bg-yellow-500/10"
              icon="—"
            />
          </div>

          {/* Summary Bar */}
          <div className="bg-slate-900 rounded-xl p-4 mb-8 border border-slate-800">
            <div className="flex gap-1 h-3 rounded-full overflow-hidden">
              <div
                className="bg-green-500 transition-all"
                style={{ width: `${(correct / totalQuestions) * 100}%` }}
              />
              <div
                className="bg-red-500 transition-all"
                style={{ width: `${(wrong / totalQuestions) * 100}%` }}
              />
              <div
                className="bg-slate-700 transition-all"
                style={{ width: `${(unanswered / totalQuestions) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-400">
              <span>{correct}/{totalQuestions} correct</span>
              <span>{Math.round((correct / totalQuestions) * 400)}/400 JAMB Score (est.)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onReview}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold transition-colors flex items-center justify-center gap-2"
            >
              📖 Review Answers & Explanations
            </button>
            <button
              onClick={onRetry}
              className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold transition-colors flex items-center justify-center gap-2"
            >
              🔄 Retry This Exam
            </button>
            <button
              onClick={onHome}
              className="w-full py-3.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-400 transition-colors flex items-center justify-center gap-2"
            >
              🏠 Back to Subjects
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  bgColor,
  icon,
}: {
  label: string;
  value: number;
  color: string;
  bgColor: string;
  icon: string;
}) {
  return (
    <div className={`${bgColor} rounded-xl p-4 text-center`}>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
        <span className={color}>{icon}</span> {label}
      </div>
    </div>
  );
}
