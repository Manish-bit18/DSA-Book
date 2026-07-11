import { getChapterData, getPatterns } from '../services/apiService';

let cachedPatterns = null;

export async function getPatternById(patternId) {
  if (!cachedPatterns) {
    cachedPatterns = await getPatterns();
  }
  return cachedPatterns.find((p) => p.id === patternId) || null;
}

export async function loadChapterData(chapterId) {
  return getChapterData(chapterId);
}

export function getLevelByIdFromChapter(chapterData, levelId) {
  if (!chapterData) return null;
  const items = chapterData.patterns || chapterData.levels;
  if (!items) return null;
  return items.find((l) => l.id === levelId) || null;
}

export function getAllProblemsFromLevels(levels) {
  if (!levels) return [];
  return [];
}

export function getProblemByIdFromLevel(level, problemId) {
  if (!level || !level.problems) return null;
  return level.problems.find((p) => p.id === problemId) || null;
}

export function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case 'easy': return 'text-green-400';
    case 'medium': return 'text-yellow-400';
    case 'hard': return 'text-red-400';
    default: return 'text-surface-400';
  }
}

export function calculateChapterProgress(problems, statusMap) {
  if (!problems || problems.length === 0) return 0;
  const solved = problems.filter((p) => statusMap[p.id] === 'SOLVED').length;
  return Math.round((solved / problems.length) * 100);
}
