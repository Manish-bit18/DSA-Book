import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Eye, Lightbulb, BookOpen, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import ProblemTable from '../components/ProblemTable';
import FilterDropdown from '../components/FilterDropdown';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import { getChapterData } from '../services/apiService';
import { useSearchFilters } from '../hooks/useSearchFilters';

const infoCardIcons = {
  Goal: Target,
  'Recognition Clues': Eye,
  Concepts: Lightbulb,
  Prerequisites: BookOpen,
  'Common Mistakes': AlertTriangle,
};

export default function PatternProblems() {
  const { chapterId, patternId } = useParams();
  const [pattern, setPattern] = useState(null);
  const [chapterTitle, setChapterTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    searchQuery, setSearchQuery,
    filters, setFilter, clearFilters,
    filteredProblems, activeFilterCount,
  } = useSearchFilters(pattern?.problems || []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getChapterData(chapterId);
        if (!data) { setError('Chapter not found'); setLoading(false); return; }

        setChapterTitle(data.title || '');

        const found = (data.patterns || []).find((p) => p.id === patternId);
        if (!found) { setError('Pattern not found'); setLoading(false); return; }
        setPattern(found);
      } catch {
        setError('Failed to load pattern');
      }
      setLoading(false);
    }
    load();
  }, [chapterId, patternId]);

  if (loading) return <Loading />;
  if (error) return (
    <>
      <Navbar title="Error" backPath={`/chapter/${chapterId}`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </div>
    </>
  );

  const difficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ];

  const statusOptions = [
    { value: 'NOT_STARTED', label: 'Not Started' },
    { value: 'ATTEMPTING', label: 'Attempting' },
    { value: 'SOLVED', label: 'Solved' },
  ];

  const infoCards = [
    { label: 'Recognition Clues', value: pattern?.recognitionClues },
    { label: 'Prerequisites', value: pattern?.prerequisites },
    { label: 'Common Mistakes', value: pattern?.commonMistakes },
  ];

  return (
    <>
      <Navbar
        title={pattern?.name || 'Pattern'}
        subtitle={chapterTitle}
        backPath={`/chapter/${chapterId}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {pattern?.description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-surface-400 leading-relaxed"
          >
            {pattern.description}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
        >
          {infoCards.filter((c) => c.value && c.value.length > 0).map((card) => {
            const Icon = infoCardIcons[card.label];
            const items = Array.isArray(card.value) ? card.value : [];
            return (
              <div
                key={card.label}
                className="p-3 rounded-xl border border-surface-800/60 bg-surface-900/80"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  {Icon && <Icon size={13} className="text-accent-400 shrink-0" />}
                  <p className="text-[10px] font-semibold text-surface-500 uppercase tracking-widest">
                    {card.label}
                  </p>
                </div>
                <ul className="space-y-1">
                  {items.map((item, i) => (
                    <li key={i} className="text-xs text-surface-300 flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-surface-600 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="LC # or Problem name..." />
          </div>
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
              label="Importance"
              value={filters.companyId}
              options={[]}
              onChange={(v) => setFilter('companyId', v)}
              placeholder="Importance"
            />
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 text-xs font-medium text-surface-400 hover:text-surface-100 bg-surface-800 hover:bg-surface-700 border border-surface-700/80 rounded-lg transition-all"
              >
                Clear ({activeFilterCount})
              </button>
            )}
          </div>
        </div>

        <div className="text-xs text-surface-500 font-medium">
          Showing {filteredProblems.length} of {pattern?.problems?.length || 0} problem{pattern?.problems?.length !== 1 ? 's' : ''}
        </div>

        <ProblemTable problems={filteredProblems} />
      </div>
    </>
  );
}