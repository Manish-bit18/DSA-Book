import { STORAGE_KEYS } from '../utils/constants';

function toStatusKey(lcNumber) {
  return String(lcNumber);
}

const ProblemStatus = {
  getStatuses() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROBLEM_STATUS);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  getStatus(lcNumber) {
    const statuses = this.getStatuses();
    return statuses[toStatusKey(lcNumber)] || 'NOT_STARTED';
  },

  setStatus(lcNumber, status) {
    const statuses = this.getStatuses();
    statuses[toStatusKey(lcNumber)] = status;
    try {
      localStorage.setItem(STORAGE_KEYS.PROBLEM_STATUS, JSON.stringify(statuses));
    } catch (e) {
      console.error('Failed to save status:', e);
    }
  },

  resetAll() {
    try {
      localStorage.removeItem(STORAGE_KEYS.PROBLEM_STATUS);
    } catch (e) {
      console.error('Failed to reset statuses:', e);
    }
  },
};

const SOLVED_TS_KEY = STORAGE_KEYS.PROBLEM_STATUS + '-timestamps';

const SolvedTimestamps = {
  getAll() {
    try {
      const data = localStorage.getItem(SOLVED_TS_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  get(lcNumber) {
    return this.getAll()[String(lcNumber)] || null;
  },

  set(lcNumber) {
    const all = this.getAll();
    all[String(lcNumber)] = new Date().toISOString();
    try {
      localStorage.setItem(SOLVED_TS_KEY, JSON.stringify(all));
    } catch (e) {
      console.error('Failed to save timestamp:', e);
    }
  },

  remove(lcNumber) {
    const all = this.getAll();
    delete all[String(lcNumber)];
    try {
      localStorage.setItem(SOLVED_TS_KEY, JSON.stringify(all));
    } catch (e) {
      console.error('Failed to save timestamp:', e);
    }
  },

  resetAll() {
    try {
      localStorage.removeItem(SOLVED_TS_KEY);
    } catch (e) {
      console.error('Failed to reset timestamps:', e);
    }
  },
};

const Settings = {
  get() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : { theme: 'dark', showDifficulty: true };
    } catch {
      return { theme: 'dark', showDifficulty: true };
    }
  },

  set(settings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  },
};

export { ProblemStatus, SolvedTimestamps, Settings };
