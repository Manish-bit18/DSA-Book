import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Chapter from '../pages/Chapter';
import Level from '../pages/Level';
import PatternProblems from '../pages/PatternProblems';
import ProblemDetails from '../pages/ProblemDetails';
import Search from '../pages/Search';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/chapter/:chapterId" element={<Chapter />} />
        <Route path="/chapter/:chapterId/level/:levelId" element={<Level />} />
        <Route path="/chapter/:chapterId/level/:levelId/pattern/:patternId" element={<PatternProblems />} />
        <Route path="/chapter/:chapterId/level/:levelId/problem/:problemId" element={<ProblemDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
