'use client';

import { subjects, years } from '../constants';
import { getQuestionCount } from '../data';

interface Props {
  subjectId: string;
  onSelectYear: (year: number) => void;
  onBack: () => void;
}

export default function YearSelect({ subjectId, onSelectYear, onBack }: Props) {
  const subject = subjects.find((s) => s.id === subjectId)!;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-bold">{subject.icon} {subject.name}</h1>
            <p className="text-xs text-slate-400">Select exam year</p>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Practice All */}
          <button
            onClick={() => onSelectYear(0)}
            className={`w-full ${subject.bgColor} ${subject.borderColor} border rounded-2xl p-6 mb-6 text-left transition-all hover:scale-[1.01] group`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-xl font-bold ${subject.color}`}>
                  📚 Practice All Years
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  All {getQuestionCount(subjectId)} questions from 2020-2024
                </p>
              </div>
              <svg className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Or select a specific year
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {years.map((year) => {
              const count = getQuestionCount(subjectId, year);
              return (
                <button
                  key={year}
                  onClick={() => onSelectYear(year)}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-left transition-all hover:bg-slate-800 hover:border-slate-600 group animate-fade-in"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white">{year}</h4>
                      <p className="text-sm text-slate-400">{count} questions</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center group-hover:bg-slate-600/50 transition-colors">
                      <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
