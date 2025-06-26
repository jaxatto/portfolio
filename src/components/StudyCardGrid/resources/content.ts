import { studyLinks } from '@constants/studyLinks';
import { StudyCardProps } from '@components/StudyCard';
import primaryImage from '@assets/samples/placeholder-min.png';
import secondaryImage from '@assets/samples/indeed-sample-min.png';
import tertiaryImage from '@assets/samples/actblue-sample-min.png';

export const content: StudyCardProps[] = [
  {
    title: 'Designing an AI-driven tool to accelerate qualitative survey workflows',
    description: ['Product design', 'Enterprise'],
    image: primaryImage,
    imageAlt: 'Design preview for an AI survey workflow tool interface',
    linkUrl: studyLinks.servicenow,
    linkText: 'Read AI study',
    palette: 'primary',
    iconFallback: 'ai',
    count: 1,
  },
  {
    title: "Scaling clarity and consistency across Indeed's hiring platform",
    description: ['Design system', 'Enterprise'],
    image: secondaryImage,
    imageAlt: "Design preview for the Indeed.com hiring platform home page",
    linkUrl: studyLinks.indeed,
    linkText: 'Read system study',
    palette: 'secondary',
    iconFallback: 'component',
    count: 2,
  },
  {
    title: 'Improving data visibility for teams managing critical donation data',
    description: ['Product design', 'Nonprofit'],
    image: tertiaryImage,
    imageAlt: 'Design preview for ActBlue Salesforce integration admin page',
    linkUrl: studyLinks.actblue,
    linkText: 'Read integration study',
    palette: 'tertiary',
    iconFallback: 'clouds',
    count: 3,
  },
];