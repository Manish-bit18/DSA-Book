import { useState, useEffect, useCallback } from 'react';
import { ProblemStatus, SolvedTimestamps } from '../services/storageService';
import { STORAGE_KEYS } from '../utils/constants';

function getLc(p) {
  return p.lcNumber ?? p.leetcodeNumber;
}

export function useProblems(problems = []) {
  const [statusMap, setStatusMap] = useState(() => {
    const allStatuses = ProblemStatus.getStatuses();
    const map = {};
    problems.forEach((p) => {
      const key = getLc(p);
      map[key] = allStatuses[String(key)] || 'NOT_STARTED';
    });
    return map;
  });

  const [tsMap, setTsMap] = useState(() => {
    const existing = SolvedTimestamps.getAll();
    const allStatuses = ProblemStatus.getStatuses();
    const copy = { ...existing };
    let dirty = false;
    problems.forEach((p) => {
      const key = String(getLc(p));
      if (allStatuses[key] === 'SOLVED' && !copy[key]) {
        copy[key] = new Date().toISOString();
        dirty = true;
      }
    });
    if (dirty) {
      try {
        localStorage.setItem(STORAGE_KEYS.PROBLEM_STATUS + '-timestamps', JSON.stringify(copy));
      } catch (e) {}
    }
    return copy;
  });

  useEffect(() => {
    setStatusMap((prev) => {
      const allStatuses = ProblemStatus.getStatuses();
      const newMap = { ...prev };
      problems.forEach((p) => {
        const key = getLc(p);
        if (!(key in newMap)) {
          newMap[key] = allStatuses[String(key)] || 'NOT_STARTED';
        }
      });
      return newMap;
    });
    setTsMap(SolvedTimestamps.getAll());
  }, [problems]);

  const updateStatus = useCallback((lcNumber, status) => {
    ProblemStatus.setStatus(lcNumber, status);
    if (status === 'SOLVED') {
      SolvedTimestamps.set(lcNumber);
      setTsMap((prev) => ({ ...prev, [String(lcNumber)]: new Date().toISOString() }));
    } else if (status === 'NOT_STARTED') {
      SolvedTimestamps.remove(lcNumber);
      setTsMap((prev) => {
        const next = { ...prev };
        delete next[String(lcNumber)];
        return next;
      });
    }
    setStatusMap((prev) => ({ ...prev, [lcNumber]: status }));
  }, []);

  const getStatus = useCallback(
    (lcNumber) => statusMap[lcNumber] || 'NOT_STARTED',
    [statusMap]
  );

  const getTimestamp = useCallback(
    (lcNumber) => tsMap[String(lcNumber)] || null,
    [tsMap]
  );

  const solvedCount = Object.values(statusMap).filter((s) => s === 'SOLVED').length;
  const attemptingCount = Object.values(statusMap).filter((s) => s === 'ATTEMPTING').length;

  return {
    statusMap,
    updateStatus,
    getStatus,
    getTimestamp,
    solvedCount,
    attemptingCount,
  };
}
