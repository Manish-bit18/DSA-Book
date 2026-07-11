import { useState, useMemo, useCallback } from 'react';
import { ProblemStatus } from '../services/storageService';

export function useSearchFilters(problems = []) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    difficulty: '',
    patternId: '',
    status: '',
    companyId: '',
  });

  const setFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ difficulty: '', patternId: '', status: '', companyId: '' });
    setSearchQuery('');
  }, []);

  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const lc = p.leetcodeNumber ?? p.lcNumber;
        const matchesName = p.title.toLowerCase().includes(q);
        const matchesLc = String(lc).includes(q);
        const matchesPattern = (p.patternName || p.patternId || '').toLowerCase().includes(q);
        if (!matchesName && !matchesLc && !matchesPattern) return false;
      }

      if (filters.difficulty && p.difficulty !== filters.difficulty) return false;
      if (filters.patternId && (p.patternId !== filters.patternId && p.patternName !== filters.patternId)) return false;
      if (filters.companyId && (!p.companyNames || !p.companyNames.some((c) => c.toLowerCase().includes(filters.companyId.toLowerCase())))) return false;
      if (filters.status && ProblemStatus.getStatus(p.lcNumber ?? p.leetcodeNumber) !== filters.status) return false;

      return true;
    });
  }, [problems, searchQuery, filters]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilter,
    clearFilters,
    filteredProblems,
    activeFilterCount,
  };
}