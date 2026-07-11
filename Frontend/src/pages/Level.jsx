import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import { getLevelData } from '../services/apiService';

export default function Level() {
  const { chapterId, levelId } = useParams();
  const [level, setLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const levelData = await getLevelData(chapterId, levelId);
        if (!levelData) { setError('Level not found'); setLoading(false); return; }
        setLevel(levelData);
      } catch {
        setError('Failed to load level');
      }
      setLoading(false);
    }
    load();
  }, [chapterId, levelId]);

  if (loading) return <Loading />;
  if (error) return (
    <>
      <Navbar title="Error" backPath={`/chapter/${chapterId}`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </div>
    </>
  );

  const patterns = level?.patterns || [];

  return (
    <>
      <Navbar
        title={level?.title || 'Patterns'}
        subtitle={`${patterns.length} pattern${patterns.length !== 1 ? 's' : ''}`}
        backPath={`/chapter/${chapterId}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {patterns.map((pattern, index) => (
            <motion.div
              key={pattern.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
            >
              <Link
                to={`/chapter/${chapterId}/level/${levelId}/pattern/${pattern.id}`}
                className="block group"
              >
                <div className="p-4 rounded-xl border border-surface-800/60 bg-surface-900/80 hover:border-surface-700 hover:bg-surface-850 transition-all duration-200 hover:shadow-[0_0_12px_-4px_rgba(59,130,246,0.06)]">
                  <div className="flex items-start justify-between mb-2.5">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="p-1.5 rounded-lg bg-accent-500/[0.06] ring-1 ring-accent-500/10 shrink-0">
                        <BookOpen size={14} className="text-accent-400" />
                      </div>
                      <h3 className="font-semibold text-surface-100 text-sm group-hover:text-accent-400 transition-colors leading-snug truncate">
                        {pattern.name}
                      </h3>
                    </div>
                  </div>

                  {pattern.description && (
                    <p className="text-xs text-surface-500 leading-relaxed mb-3 line-clamp-2">
                      {pattern.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-xs text-surface-500">
                    <span className="text-surface-600 font-medium">{pattern.problems?.length || 0}</span>
                    <span>problem{(pattern.problems?.length || 0) !== 1 ? 's' : ''}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-end">
                    <span className="text-xs font-medium text-surface-500 group-hover:text-accent-400 transition-colors flex items-center gap-1">
                      View Problems
                      <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}