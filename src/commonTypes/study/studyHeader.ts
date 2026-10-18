import type { ChipData } from '@components/ChipGroup';
import type { StudyImageProps } from './studyImage';

export type StudyHeaderProps = {
  title: string;
  subtitle?: string; // One line under the h1: what the study is about
  roleDetails: { role: string; location?: string; startDate: string; endDate?: string }[];
  chips: ChipData[];
  description: string[];
  image?: StudyImageProps[];
  compare?: { before: StudyImageProps; after: StudyImageProps; caption?: string }; // Before / after pair in place of the hero image
};