import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Work from '#pages/Work';
import ScrollToTop from '#components/ScrollToTop';
import FocusOnRouteChange from '#components/FocusOnRouteChange';
import Header from '#components/Header';

// NOTE: Home ships in the entry bundle because most visits land there. Every other route is its own
// chunk, so a visitor downloads only the page they open (D-151).
const About = React.lazy(() => import('#pages/About'));
const Resume = React.lazy(() => import('#pages/Resume'));
const StudyPage = React.lazy(() => import('#pages/Studies'));
const NotFound = React.lazy(() => import('#pages/NotFound'));

// Shown while a route chunk loads. The real Header keeps the page from going blank between the
// static shell in index.html and the page.
const RouteFallback: React.FC = () => (
  <>
    <Header />
    <main id="main-content" tabIndex={-1} />
  </>
);

const App: React.FC = () => (
  <Router>
    <ScrollToTop />
    <FocusOnRouteChange />
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/case-studies/:slug" element={<StudyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;
