import type { ChipData } from '#componentsChipGroup';
import type { StudyImageProps } from './studyImage';

export type StudyHeaderProps = {
	title: string;
	roleDetails: { role: string; startDate: string; endDate?: string }[];
	chips: ChipData[];
	description: string[];
	image: StudyImageProps[];
};
