import type { ChipData } from '@components/ChipGroup';
import type { StudyImageProps } from './studyImage';

export type StudyHeaderProps = {
  title: string;
  roleDetails: { role: string; location?: string; startDate: string; endDate?: string }[];
  chips: ChipData[];
  description: string[];
  image: StudyImageProps[];
};