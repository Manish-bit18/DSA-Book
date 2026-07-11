import { CheckSquare } from 'lucide-react';
import ProblemRow from './ProblemRow';
import EmptyState from './EmptyState';
import Loading from './Loading';
import { useProblems } from '../hooks/useProblems';

function getLc(p) {
  return p.lcNumber ?? p.leetcodeNumber;
}

export default function ProblemTable({ problems = [], loading = false }) {
  const { statusMap, updateStatus, getTimestamp } = useProblems(problems);

  if (loading) {
    return <Loading message="Loading problems..." />;
  }

  if (!problems || problems.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-surface-800/50 bg-surface-900 shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-surface-800/50 bg-surface-850/80">
            <th className="py-3.5 px-3 text-left w-10">
              <span className="flex items-center justify-center text-surface-500">
                <CheckSquare size={13} />
              </span>
            </th>
            <th className="py-3.5 px-3 text-left text-[11px] font-semibold text-surface-500 uppercase tracking-widest whitespace-nowrap w-16">
              LC#
            </th>
            <th className="py-3.5 px-3 text-left text-[11px] font-semibold text-surface-500 uppercase tracking-widest whitespace-nowrap">
              Problem
            </th>
            <th className="py-3.5 px-3 text-left text-[11px] font-semibold text-surface-500 uppercase tracking-widest whitespace-nowrap w-24">
              Difficulty
            </th>
            <th className="py-3.5 px-3 text-left text-[11px] font-semibold text-surface-500 uppercase tracking-widest whitespace-nowrap w-28">
              Pattern
            </th>
            <th className="py-3.5 px-3 text-left text-[11px] font-semibold text-surface-500 uppercase tracking-widest whitespace-nowrap w-32">
              Company Importance
            </th>
            <th className="py-3.5 px-3 text-left text-[11px] font-semibold text-surface-500 uppercase tracking-widest whitespace-nowrap w-24">
              Status
            </th>
            <th className="py-3.5 px-3 text-left text-[11px] font-semibold text-surface-500 uppercase tracking-widest whitespace-nowrap w-24">
              Last Solved
            </th>
            <th className="py-3.5 px-3 text-left text-[11px] font-semibold text-surface-500 uppercase tracking-widest whitespace-nowrap w-24">
              Revision Due
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-800/30">
          {problems.map((problem, index) => (
            <ProblemRow
              key={problem.id}
              problem={problem}
              status={statusMap[getLc(problem)] || 'NOT_STARTED'}
              onStatusChange={updateStatus}
              index={index}
              solvedTimestamp={getTimestamp(getLc(problem))}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
