import type { StudyImageProps } from './studyImage';
import type { StudyCompareData, StudyPanelsData } from './studySection';

// One chip on a study header (rendered as a code-style chip).
export type ChipData = {
  label: string;
  theme?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
};

export type StudyHeaderProps = {
  title: string;
  subtitle?: string; // One line under the h1: what the study is about
  roleDetails: { role: string; location?: string; startDate: string; endDate?: string }[];
  chips: ChipData[];
  description: string[];
  image?: StudyImageProps[];
  compare?: StudyCompareData; // Before / after pair in place of the hero image
  panels?: StudyPanelsData; // A spread of screens in place of the hero image (D-077)
};