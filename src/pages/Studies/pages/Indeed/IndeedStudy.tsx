import React from 'react';
import StudyTemplate from '@pages/Studies/components/StudyTemplate';
import { content } from './resources/content';
import { meta } from './resources/meta';

const IndeedStudy: React.FC = () => (
  <StudyTemplate meta={meta} content={content} />
);

export default IndeedStudy;