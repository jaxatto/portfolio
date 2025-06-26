import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '@pages/NotFound';
import StudyTemplate from '@pages/Studies/components/StudyTemplate';
import indeedContent from './pages/Indeed/resources/content';
import indeedMeta from './pages/Indeed/resources/meta';
// import actblueContent from './pages/ActBlue/resources/content';
// import actblueMeta from './pages/ActBlue/resources/meta';

// Map slugs to their content/meta modules
const studies = {
  indeed: {
    content: indeedContent,
    meta: indeedMeta,
  },
  // actblue: {
  //   content: actblueContent,
  //   meta: actblueMeta,
  // },
};

const StudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: keyof typeof studies }>();
  const study = slug ? studies[slug] : undefined;

  if (!study) return <NotFound />;

  return <StudyTemplate meta={study.meta} content={study.content} />;
};

export default StudyPage;