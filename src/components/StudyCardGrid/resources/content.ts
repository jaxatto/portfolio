import { studyLinks } from '@constants/studyLinks';
import { StudyCardProps } from '@components/StudyCard';
import primaryImage from '@assets/samples/servicenow-sample-min.png';
import secondaryImage from '@assets/samples/indeed-sample-min.png';
import tertiaryImage from '@assets/samples/actblue-sample-min.png';
import placeholderImage from '@assets/samples/placeholder-min.png';
import cards from './content.json';

// Card copy lives in content.json; this attaches links and bundled images.
// Cards marked `draft` (a case study that is not published yet) are left out.
const images: Record<string, string> = {
  toyota: placeholderImage,
  servicenow: primaryImage,
  indeed: secondaryImage,
  actblue: tertiaryImage,
};

export const content: StudyCardProps[] = cards
  .filter((card) => !('draft' in card && card.draft))
  .map(({ study, ...card }, index) => ({
    ...card,
    image: images[study],
    linkUrl: studyLinks[study as keyof typeof studyLinks],
    palette: card.palette as StudyCardProps['palette'],
    size: card.size as StudyCardProps['size'],
    count: index + 1,
  }));
