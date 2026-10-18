import type { StudyImageProps } from './studyImage';

export type StudySectionProps = {
  order?: number;
  title?: string;
  description?: string[];
  descriptionBullets?: string[];
  // Several page crops cut from one source image, shown side by side in a sunken box (D-054).
  panels?: {
    src: string;
    sourceWidth: number; // Pixel size of `src`; each slice is a pixel rectangle inside it
    sourceHeight: number;
    slices: { x: number; y: number; width: number; height: number; alt: string }[];
    caption?: string;
  };
  compare?: { before: StudyImageProps; after: StudyImageProps; caption?: string }; // Before / after pair (D-050)
  items?: { label: string; text: string }[]; // Labeled paragraphs: the label is an h3 above the text
  image?: StudyImageProps[];
};