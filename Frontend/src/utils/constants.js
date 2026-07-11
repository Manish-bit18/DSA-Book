export const STATUS = {
  NOT_STARTED: 'NOT_STARTED',
  ATTEMPTING: 'ATTEMPTING',
  SOLVED: 'SOLVED',
};

export const DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
};

export const DIFFICULTY_COLORS = {
  easy: 'bg-green-500/10 text-green-400 border-green-500/30',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  hard: 'bg-red-500/10 text-red-400 border-red-500/30',
};

export const STATUS_COLORS = {
  NOT_STARTED: 'bg-surface-700 text-surface-300 border-surface-600',
  ATTEMPTING: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  SOLVED: 'bg-green-500/10 text-green-400 border-green-500/30',
};

export const STORAGE_KEYS = {
  PROBLEM_STATUS: 'dsa-book-problem-status',
  SETTINGS: 'dsa-book-settings',
};

export const ROUTES = {
  HOME: '/',
  CHAPTER: '/chapter/:chapterId',
  LEVEL: '/chapter/:chapterId/level/:levelId',
  PROBLEM: '/chapter/:chapterId/level/:levelId/problem/:problemId',
  SEARCH: '/search',
  SETTINGS: '/settings',
};
