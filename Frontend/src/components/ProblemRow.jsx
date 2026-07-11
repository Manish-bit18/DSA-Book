import { motion } from 'framer-motion';
import { CheckSquare, Square, ExternalLink } from 'lucide-react';
import DifficultyBadge from './DifficultyBadge';
import StatusBadge from './StatusBadge';
import StarRating from './StarRating';

const lcNum = (p) => p.leetcodeNumber ?? p.lcNumber;

const companyImportance = (p) => p.serviceImportance ?? p.serviceRating ?? 0;

const productImp = (p) => p.productImportance ?? 0;

const patternLabel = (p) => {
  if (p.patternName) return p.patternName;
  if (p.patternId) return p.patternId.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return '';
};

const REVISION_DAYS = 7;

function fmtDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function fmtRelative(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  const now = new Date();
  const diff = Math.floor((d - now) / (1000 * 60 * 60 * 24));
  if (diff < 0) return 'Overdue';
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff <= 7) return `In ${diff} days`;
  return fmtDate(iso);
}

function revisionDue(solvedIso) {
  if (!solvedIso) return null;
  const d = new Date(solvedIso);
  d.setDate(d.getDate() + REVISION_DAYS);
  return d.toISOString();
}

export default function ProblemRow({ problem, status, onStatusChange, index, solvedTimestamp }) {
  const isSolved = status === 'SOLVED';
  const solvedDate = isSolved ? solvedTimestamp : null;
  const revisionDate = solvedDate ? revisionDue(solvedDate) : null;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.015 }}
      className={`group transition-all ${
        isSolved
          ? 'bg-surface-900/30 hover:bg-surface-850/40'
          : 'bg-surface-900 hover:bg-surface-850/50'
      }`}
    >
      <td className="py-3 px-3">
        <button
          onClick={() => onStatusChange(lcNum(problem), isSolved ? 'NOT_STARTED' : 'SOLVED')}
          className="flex items-center justify-center text-surface-500 hover:text-green-400 transition-all hover:scale-110 active:scale-90"
          title={isSolved ? 'Mark as not started' : 'Mark as solved'}
        >
          {isSolved ? (
            <CheckSquare size={17} className="text-green-400" strokeWidth={2} />
          ) : (
            <Square size={17} className="group-hover:text-surface-300" strokeWidth={1.5} />
          )}
        </button>
      </td>
      <td className="py-3 px-3">
        <span className="text-xs font-mono text-surface-500 font-medium">{lcNum(problem)}</span>
      </td>
      <td className="py-3 px-3">
        <a
          href={problem.leetcodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-surface-100 hover:text-accent-400 transition-colors"
        >
          {problem.title}
          <ExternalLink size={11} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-surface-500" />
        </a>
      </td>
      <td className="py-3 px-3 whitespace-nowrap">
        <DifficultyBadge difficulty={problem.difficulty} />
      </td>
      <td className="py-3 px-3">
        <span className="text-xs text-surface-400 font-medium">{patternLabel(problem)}</span>
      </td>
      <td className="py-3 px-3 whitespace-nowrap">
        <StarRating rating={companyImportance(problem)} />
      </td>
      <td className="py-3 px-3 whitespace-nowrap">
        <StatusBadge
          status={status}
          onChange={(newStatus) => onStatusChange(lcNum(problem), newStatus)}
        />
      </td>
      <td className="py-3 px-3 whitespace-nowrap">
        {solvedDate ? (
          <span className="text-xs text-surface-400 font-medium">{fmtDate(solvedDate)}</span>
        ) : (
          <span className="text-xs text-surface-600/60">—</span>
        )}
      </td>
      <td className="py-3 px-3 whitespace-nowrap">
        {revisionDate ? (
          <span className={`text-xs font-medium ${
            new Date(revisionDate) < new Date()
              ? 'text-red-400'
              : 'text-surface-400'
          }`}>{fmtRelative(revisionDate)}</span>
        ) : (
          <span className="text-xs text-surface-600/60">—</span>
        )}
      </td>
    </motion.tr>
  );
}