import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import ChapterCard from '../components/ChapterCard';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import metadata from '../data/metadata.json';
import { getChapters, getChapterData } from '../services/apiService';

export default function Home() {
  const [chapters, setChapters] = useState([]);
  const [chapterInfo, setChapterInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const chaptersList = await getChapters();
      setChapters(chaptersList);

      const info = {};

      for (const ch of chaptersList) {
        const data = await getChapterData(ch.id);
        if (data) {
          const patterns = data.patterns || [];
          const problems = patterns.reduce((sum, p) => sum + (p.problems?.length || 0), 0);
          info[ch.id] = { patterns: patterns.length, problems };
        }
      }

      setChapterInfo(info);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <Loading message="Loading chapters..." />;

  const totalPatterns = Object.values(chapterInfo).reduce((sum, info) => sum + (info.patterns || 0), 0);
  const totalProblems = Object.values(chapterInfo).reduce((sum, info) => sum + (info.problems || 0), 0);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="p-2.5 rounded-2xl bg-accent-500/[0.08] ring-1 ring-accent-500/20">
              <BookOpen size={28} className="text-accent-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-surface-100 tracking-tight">{metadata.appName}</h1>
              <p className="text-surface-400 text-sm">{metadata.tagline}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-800/60 border border-surface-700/60">
              <span className="text-xs text-surface-400 font-medium">Chapters</span>
              <span className="text-sm font-semibold text-surface-100">{chapters.length}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-800/60 border border-surface-700/60">
              <span className="text-xs text-surface-400 font-medium">Patterns</span>
              <span className="text-sm font-semibold text-surface-100">{totalPatterns}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-800/60 border border-surface-700/60">
              <span className="text-xs text-surface-400 font-medium">Problems</span>
              <span className="text-sm font-semibold text-accent-400">{totalProblems}</span>
            </div>
          </div>
          <p className="text-surface-500 text-sm mt-4 max-w-2xl leading-relaxed">
            {metadata.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {chapters.map((chapter) => {
            const info = chapterInfo[chapter.id] || { patterns: 0 };
            return (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                totalPatterns={info.patterns}
                totalProblems={info.problems}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}