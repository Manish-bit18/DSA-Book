import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutList, Type, Link2, SquareStack, Container, Hash,
  Search, Repeat, GitBranch, GitFork, GitPullRequest,
  Layers, Share2, Zap, Cpu, TreePine, Binary, BookOpen,
  Sigma, Wrench, Sparkles,
} from 'lucide-react';

const iconMap = {
  LayoutList, Type, Link2, SquareStack, Container, Hash,
  Search, Repeat, GitBranch, GitFork, GitPullRequest,
  Layers, Share2, Zap, Cpu, TreePine, Binary,
  Sigma, Wrench, Sparkles,
};

export default function ChapterCard({ chapter, totalPatterns, totalProblems }) {
  const Icon = iconMap[chapter.icon] || BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/chapter/${chapter.id}`} className="block group">
        <div className="relative p-4 rounded-xl border border-surface-800/60 bg-surface-900/80 hover:border-surface-700 hover:bg-surface-850 transition-all duration-200 hover:shadow-[0_0_15px_-3px_rgba(59,130,246,0.07)]">
          <div className="flex items-start mb-3">
            <div className="p-2 rounded-lg bg-accent-500/[0.06] group-hover:bg-accent-500/[0.1] ring-1 ring-accent-500/10 transition-all">
              <Icon size={18} className="text-accent-400" />
            </div>
          </div>
          <h3 className="font-semibold text-surface-100 text-sm group-hover:text-accent-400 transition-colors mb-1.5 leading-snug">
            {chapter.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-surface-500">
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-surface-600" />
              {totalPatterns || 0} pattern{(totalPatterns || 0) !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-surface-600" />
              {totalProblems || 0} problem{(totalProblems || 0) !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}