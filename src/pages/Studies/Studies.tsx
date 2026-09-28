import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '@pages/NotFound';
import StudyTemplate from '@pages/Studies/components/StudyTemplate';
import { studies } from './studies';

const StudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = slug && Object.hasOwn(studies, slug) ? studies[slug] : undefined;

  if (!study) return <NotFound />;

  return <StudyTemplate meta={study.meta} content={study.content} />;
};

export default StudyPage;
