import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function LevelCard({ level, chapterId, progress, problemCount }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        to={`/chapter/${chapterId}/level/${level.id}`}
        className="block group"
      >
        <div className="p-4 rounded-xl border border-surface-800/60 bg-surface-900/80 hover:border-surface-700 hover:bg-surface-850 transition-all duration-200 hover:shadow-[0_0_12px_-4px_rgba(59,130,246,0.06)]">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-surface-100 text-sm group-hover:text-accent-400 transition-colors leading-snug">
                {level.title}
              </h3>
              {level.subtitle && (
                <p className="text-xs text-surface-400 mt-0.5">{level.subtitle}</p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-surface-500 font-medium">{problemCount || 0} problem{(problemCount || 0) !== 1 ? 's' : ''}</span>
                {progress > 0 && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-surface-700" />
                    <span className="text-xs font-medium text-green-400">{progress}% done</span>
                  </>
                )}
              </div>
              {progress > 0 && (
                <div className="mt-2.5 w-24 h-1 bg-surface-800/80 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent-500 to-accent-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              )}
            </div>
            <div className="p-1.5 rounded-lg text-surface-500 group-hover:text-accent-400 group-hover:bg-accent-500/5 transition-all shrink-0">
              <ChevronRight size={16} strokeWidth={2} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
