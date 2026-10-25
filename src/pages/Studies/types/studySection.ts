import type { StudyImageProps } from './studyImage';

export type StudyPanelsData = {
  src: string;
  sourceWidth: number; // Pixel size of `src`; each slice is a pixel rectangle inside it
  sourceHeight: number;
  // `weight` is the panel's share of the row (default 1). Equal weights give equal widths; weights in
  // proportion to each slice's width / height give equal heights at different widths (D-077).
  slices: { x: number; y: number; width: number; height: number; alt: string; weight?: number }[];
  caption?: string;
  framed?: boolean; // The spread: full column, the study's tint, even 32px padding (D-069)
};

export type StudyCompareData = {
  before: StudyImageProps;
  after: StudyImageProps;
  caption?: string;
  aspectRatio?: string; // Each shot's box, `width / height`; default 1200 / 740 (D-077)
};

export type StudySectionProps = {
  order?: number;
  title?: string;
  description?: string[];
  descriptionBullets?: string[];
  // Several page crops cut from one source image, shown side by side in a sunken box (D-054).
  panels?: StudyPanelsData;
  compare?: StudyCompareData; // Before / after pair (D-050)
  items?: { label: string; text: string }[]; // Labeled paragraphs: the label is an h3 above the text
  image?: StudyImageProps[];
};