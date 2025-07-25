import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '@pages/NotFound';
import StudyTemplate from '@pages/Studies/components/StudyTemplate';
import indeedContent from '@pages/Studies/pages/Indeed/content';
import indeedMeta from '@pages/Studies/pages/Indeed/meta';
import actblueContent from '@pages/Studies/pages/ActBlue/content';
import actblueMeta from '@pages/Studies/pages/ActBlue/meta';
import servicenowContent from '@pages/Studies/pages/ServiceNow/content';
import servicenowMeta from '@pages/Studies/pages/ServiceNow/meta';

// Map slugs to their content/meta modules
const studies = {
  indeed: {
    content: indeedContent,
    meta: indeedMeta,
  },
  actblue: {
    content: actblueContent,
    meta: actblueMeta,
  },
  servicenow: {
    content: servicenowContent,
    meta: servicenowMeta,
  },
};

const StudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: keyof typeof studies }>();
  const study = slug ? studies[slug] : undefined;

  if (!study) return <NotFound />;

  return <StudyTemplate meta={study.meta} content={study.content} />;
};

export default StudyPage;