import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Work from '#pages/Work';
import About from '#pages/About';
import Resume from '#pages/Resume';
import StudyPage from '#pages/Studies';
import SkillsLab from '#pages/Lab';
import NotFound from '#pages/NotFound';
import ScrollToTop from '#components/ScrollToTop';
import FocusOnRouteChange from '#components/FocusOnRouteChange';

const App: React.FC = () => (
  <Router>
    <ScrollToTop />
    <FocusOnRouteChange />
    <Routes>
      <Route path="/" element={<Work />} />
      <Route path="/about" element={<About />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/case-studies/:slug" element={<StudyPage />} />
      <Route path="/lab/skills" element={<SkillsLab />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
