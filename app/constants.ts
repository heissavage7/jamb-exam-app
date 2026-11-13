import { Subject } from './types';

export const subjects: Subject[] = [
  {
    id: 'government',
    name: 'Government',
    icon: '🏛️',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    description: 'Political theory, Nigerian constitution, arms of government, elections & international organizations',
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '📐',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    description: 'Algebra, geometry, trigonometry, calculus, statistics & probability',
  },
  {
    id: 'english',
    name: 'Use of English',
    icon: '📝',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    description: 'Comprehension, lexis & structure, oral English, grammar & idioms',
  },
  {
    id: 'economics',
    name: 'Economics',
    icon: '📊',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    description: 'Micro & macro economics, public finance, international trade & development',
  },
];

export const years = [2020, 2021, 2022, 2023, 2024];

export const EXAM_DURATION = 30 * 60; // 30 minutes in seconds
