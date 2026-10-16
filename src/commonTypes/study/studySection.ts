import type { StudyImageProps } from './studyImage';

export type StudySectionProps = {
  order?: number;
  title?: string;
  description?: string[];
  descriptionBullets?: string[];
  compare?: { before: StudyImageProps; after: StudyImageProps; caption?: string }; // Before / after pair (D-050)
  items?: { label: string; text: string }[]; // Labeled paragraphs: the label is an h3 above the text
  image?: StudyImageProps[];
};