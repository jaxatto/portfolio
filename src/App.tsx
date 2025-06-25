import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Work from '@pages/Work';
import About from '@pages/About';
import Resume from '@pages/Resume';
import IndeedStudy from '@pages/Studies/Indeed';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path='/' element={<Work />} />
      <Route path='/about' element={<About />} />
      <Route path='/resume' element={<Resume />} />
      <Route path='/case-studies/indeed' element={<IndeedStudy />} />
    </Routes>
  </Router>
);

export default App;