import type { StudyImageProps } from './studyImage';
import type { StudyCompareData, StudyPanelsData } from './studySection';

// One chip on a study header. The color comes from the study's palette (D-052).
export type ChipData = {
  label: string;
};

export type StudyHeaderProps = {
  title: string;
  roleDetails: { role: string; location?: string; startDate: string; endDate?: string }[];
  chips: ChipData[];
  description: string[];
  image?: StudyImageProps[];
  compare?: StudyCompareData; // Before / after pair in place of the hero image
  panels?: StudyPanelsData; // A spread of screens in place of the hero image (D-077)
};
