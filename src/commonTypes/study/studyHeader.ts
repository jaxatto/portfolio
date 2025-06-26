import type { ChipData } from '@components/ChipGroup';

export type StudyHeaderProps = {
  title: string;
  roleDetails: { role: string; startDate: string; endDate?: string }[];
  chips: ChipData[];
  description: string;
  image: { src: string; alt: string; caption?: string }[];
};