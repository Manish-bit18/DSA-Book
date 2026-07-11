import { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import ProblemTable from '../components/ProblemTable';
import Loading from '../components/Loading';
import { getChapters, getPatterns, getCompanies, getAllProblems } from '../services/apiService';
import { ProblemStatus } from '../services/storageService';

export default function Search() {
  const [allProblems, setAllProblems] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [patternOptions, setPatternOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ difficulty: '', patternId: '', companyId: '', status: '' });
  const [chapterFilter, setChapterFilter] = useState('');

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      try {
        const [chaptersData, patternsData, companiesData, problems] = await Promise.all([
          getChapters(),
          getPatterns(),
          getCompanies(),
          getAllProblems(),
        ]);
        setChapters(chaptersData);
        setPatternOptions(patternsData.map((p) => ({ value: p.id, label: p.name })));
        setCompanyOptions(companiesData.map((c) => ({ value: c.id, label: c.name })));
        setAllProblems(problems);
      } catch {
        setAllProblems([]);
      }
      setLoading(false);
    }
    loadAll();
  }, []);

  const setFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearAll = () => {
    setFilters({ difficulty: '', patternId: '', companyId: '', status: '' });
    setSearchQuery('');
    setChapterFilter('');
  };

  const displayedProblems = useMemo(() => {
    const allStatuses = ProblemStatus.getStatuses();

    return allProblems.filter((p) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.title.toLowerCase().includes(q);
        const matchesLc = String(p.lcNumber).includes(q);
        const matchesPattern = p.patternId?.toLowerCase().includes(q);
        if (!matchesName && !matchesLc && !matchesPattern) return false;
      }

      if (chapterFilter && p.chapterId !== chapterFilter) return false;
      if (filters.difficulty && p.difficulty !== filters.difficulty) return false;
      if (filters.patternId && p.patternId !== filters.patternId) return false;
      if (filters.companyId && (!p.companyIds || !p.companyIds.includes(filters.companyId))) return false;
      if (filters.status && (allStatuses[String(p.lcNumber)] || 'NOT_STARTED') !== filters.status) return false;

      return true;
    });
  }, [allProblems, searchQuery, filters, chapterFilter]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length + (chapterFilter ? 1 : 0);

  const difficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ];

  const chapterOptions = chapters.map((c) => ({ value: c.id, label: c.title }));
  const statusOptions = [
    { value: 'NOT_STARTED', label: 'Not Started' },
    { value: 'ATTEMPTING', label: 'Attempting' },
    { value: 'SOLVED', label: 'Solved' },
  ];

  return (
    <>
      <Navbar title="Search Problems" backPath="/" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="LC # or Problem name..." />

        <div className="flex flex-wrap gap-2">
          <FilterDropdown
            label="Done"
            value={filters.status}
            options={statusOptions}
            onChange={(v) => setFilter('status', v)}
            placeholder="Done"
          />
          <FilterDropdown
            label="Difficulty"
            value={filters.difficulty}
            options={difficultyOptions}
            onChange={(v) => setFilter('difficulty', v)}
            placeholder="Difficulty"
          />
          <FilterDropdown
            label="Pattern"
            value={filters.patternId}
            options={patternOptions}
            onChange={(v) => setFilter('patternId', v)}
            placeholder="Pattern"
          />
          <FilterDropdown
            label="Importance"
            value={filters.companyId}
            options={companyOptions}
            onChange={(v) => setFilter('companyId', v)}
            placeholder="Importance"
          />
          <FilterDropdown
            label="Chapter"
            value={chapterFilter}
            options={chapterOptions}
            onChange={setChapterFilter}
            placeholder="Chapter"
          />
          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
              className="px-3 py-2 text-xs font-medium text-surface-400 hover:text-surface-100 bg-surface-800 hover:bg-surface-700 border border-surface-700/80 rounded-lg transition-all"
            >
              Clear ({activeFilterCount})
            </button>
          )}
        </div>

        <div className="text-xs text-surface-500 font-medium">
          {loading ? 'Loading...' : `Showing ${displayedProblems.length} of ${allProblems.length} problem${allProblems.length !== 1 ? 's' : ''}`}
        </div>

        {loading ? <Loading /> : <ProblemTable problems={displayedProblems} />}
      </div>
    </>
  );
}
