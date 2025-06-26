import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Work from '@pages/Work';
import About from '@pages/About';
import Resume from '@pages/Resume';
import StudyPage from '@pages/Studies';
import NotFound from '@pages/NotFound';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path='/' element={<Work />} />
      <Route path='/about' element={<About />} />
      <Route path='/resume' element={<Resume />} />
      <Route path="/case-studies/:slug" element={<StudyPage />} />  
      <Route path="*" element={<NotFound />} />  
    </Routes>
  </Router>
);

export default App;