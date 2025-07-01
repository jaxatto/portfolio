import type { StudyImageProps } from './studyImage';

export type StudySectionProps = {
  order?: number;
  title?: string;
  titleEmoji?: string;
  description?: string[];
  descriptionBullets?: string[];
  image?: StudyImageProps[];
};