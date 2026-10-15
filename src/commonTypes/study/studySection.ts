import type { StudyImageProps } from './studyImage';

export type StudySectionProps = {
  order?: number;
  title?: string;
  description?: string[];
  descriptionBullets?: string[];
  image?: StudyImageProps[];
};