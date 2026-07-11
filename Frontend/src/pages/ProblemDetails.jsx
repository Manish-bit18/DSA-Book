import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ExternalLink, Building2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import DifficultyBadge from '../components/DifficultyBadge';
import StatusBadge from '../components/StatusBadge';
import StarRating from '../components/StarRating';
import Button from '../components/Button';
import { loadChapterData, getLevelByIdFromChapter, getProblemByIdFromLevel, getPatternById } from '../utils/helpers';
import { getChapterById, getCompanies } from '../services/apiService';
import { ProblemStatus } from '../services/storageService';

export default function ProblemDetails() {
  const { chapterId, levelId, problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [chapterMeta, setChapterMeta] = useState(null);
  const [pattern, setPattern] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('NOT_STARTED');

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [meta, companiesData] = await Promise.all([
          getChapterById(chapterId),
          getCompanies(),
        ]);
        setCompanies(companiesData);

        if (!meta) { setError('Chapter not found'); setLoading(false); return; }
        setChapterMeta(meta);

        const data = await loadChapterData(chapterId);
        if (!data) { setError('Chapter data not available'); setLoading(false); return; }

        const levelData = getLevelByIdFromChapter(data, levelId);
        if (!levelData) { setError('Level not found'); setLoading(false); return; }

        const problemData = getProblemByIdFromLevel(levelData, problemId);
        if (!problemData) { setError('Problem not found'); setLoading(false); return; }
        setProblem(problemData);
        setStatus(ProblemStatus.getStatus(problemData.lcNumber ?? problemData.leetcodeNumber));

        if (problemData.patternId) {
          const p = await getPatternById(problemData.patternId);
          setPattern(p);
        }
      } catch {
        setError('Failed to load problem');
      }
      setLoading(false);
    }
    load();
  }, [chapterId, levelId, problemId]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    ProblemStatus.setStatus(problem.lcNumber ?? problem.leetcodeNumber, newStatus);
  };

  if (loading) return <Loading />;
  if (error) return (
    <>
      <Navbar title="Error" backPath={`/chapter/${chapterId}/level/${levelId}`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </div>
    </>
  );

  const problemCompanies = problem.companyIds
    ? problem.companyIds.map((id) => companies.find((c) => c.id === id)).filter(Boolean)
    : [];

  return (
    <>
      <Navbar
        title={problem.title}
        subtitle={`LC #${problem.lcNumber} · ${chapterMeta?.title}`}
        backPath={`/chapter/${chapterId}/level/${levelId}/pattern/${problem.patternId}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-3xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <DifficultyBadge difficulty={problem.difficulty} />
            <StatusBadge status={status} onChange={handleStatusChange} />
          </div>

          {pattern && (
            <div className="p-4 rounded-xl border border-surface-800/60 bg-surface-900/80">
              <p className="text-[10px] font-semibold text-surface-500 uppercase tracking-widest mb-1">Pattern</p>
              <p className="text-sm text-surface-200 font-medium">{pattern.name}</p>
            </div>
          )}

          {problemCompanies.length > 0 && (
            <div className="p-4 rounded-xl border border-surface-800/60 bg-surface-900/80">
              <div className="flex items-center gap-2 mb-2.5">
                <Building2 size={14} className="text-accent-400" />
                <p className="text-[10px] font-semibold text-surface-500 uppercase tracking-widest">Asked By</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {problemCompanies.map((c) => (
                  <span key={c.id} className="px-2.5 py-1 text-xs font-medium bg-surface-800 text-surface-300 rounded-md border border-surface-700/60">
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 rounded-xl border border-surface-800/60 bg-surface-900/80">
            <p className="text-[10px] font-semibold text-surface-500 uppercase tracking-widest mb-3">Importance Ratings</p>
            <div className="flex items-center gap-8">
              <div>
                <p className="text-xs text-surface-400 mb-1">Service</p>
                <StarRating rating={problem.serviceRating || 0} />
              </div>
              <div>
                <p className="text-xs text-surface-400 mb-1">Product</p>
                <StarRating rating={problem.productRating || 0} />
              </div>
            </div>
          </div>

          <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="primary">
              <ExternalLink size={16} />
              Open in LeetCode
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}
