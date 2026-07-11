const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api';

async function fetchJson(url) {
  const res = await fetch(`${API_BASE}${url}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getChapters() {
  return fetchJson('/chapters');
}

export async function getChapterById(chapterId) {
  return fetchJson(`/chapters/${chapterId}`);
}

export async function getChapterData(chapterId) {
  return fetchJson(`/chapters/${chapterId}/data`);
}

export async function getPatterns() {
  return fetchJson('/patterns');
}

export async function getCompanies() {
  return fetchJson('/companies');
}

export async function getLevelData(_chapterId, levelId) {
  return fetchJson(`/level/${levelId}`);
}

export async function getProblemsByLevel(_chapterId, _levelId) {
  return fetchJson('/problems');
}

export async function getAllProblems() {
  return fetchJson('/problems');
}
