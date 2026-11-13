'use client';

import { subjects } from '../constants';
import { getQuestionCount } from '../data';
import { Subject } from '../types';

interface Props {
  onSelectSubject: (subjectId: string) => void;
}

export default function HomeScreen({ onSelectSubject }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-xl font-bold">
              J
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">JAMB CBT Practice</h1>
              <p className="text-xs text-slate-400">Past Questions & Answers</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Practice Makes <span className="text-green-400">Perfect</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            400+ JAMB UTME past questions across 4 subjects with detailed
            explanations. Simulate the real CBT exam experience.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <Stat value="400+" label="Questions" />
            <Stat value="4" label="Subjects" />
            <Stat value="5" label="Years" />
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-lg font-semibold text-slate-300 mb-4">
            Select a Subject
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                questionCount={getQuestionCount(subject.id)}
                onClick={() => onSelectSubject(subject.id)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 px-4 text-center text-xs text-slate-500">
        JAMB CBT Practice App &bull; Built for Nigerian Students &bull; 2020-2024 Past Questions
      </footer>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-green-400">{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}

function SubjectCard({
  subject,
  questionCount,
  onClick,
}: {
  subject: Subject;
  questionCount: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`${subject.bgColor} ${subject.borderColor} border rounded-2xl p-6 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-slate-900/50 group animate-fade-in`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-3xl">{subject.icon}</span>
          <h4 className={`text-xl font-bold mt-2 ${subject.color}`}>
            {subject.name}
          </h4>
          <p className="text-sm text-slate-400 mt-1 leading-relaxed">
            {subject.description}
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-full">
            {questionCount} Qs
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-slate-400 group-hover:text-slate-300">
        <span>Start Practice</span>
        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}
