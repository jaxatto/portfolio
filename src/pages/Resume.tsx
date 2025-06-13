import React from 'react';
import Layout from '../components/Layout';

const Resume: React.FC = () => (
  <Layout>
    <section id='resume'>
      <h2>Resume</h2>
      <p>
        {/* Add your resume details or a link to your PDF resume here */}
        Download my <a href='/resume.pdf' target='_blank' rel='noopener noreferrer'>resume (PDF)</a>.
      </p>
      <ul>
        <li><strong>Experience:</strong> Web Developer at XYZ Corp (2022–Present)</li>
        <li><strong>Education:</strong> B.S. in Computer Science, ABC University</li>
        <li><strong>Skills:</strong> React, TypeScript, CSS, UI/UX Design</li>
      </ul>
    </section>
  </Layout>
);

export default Resume;