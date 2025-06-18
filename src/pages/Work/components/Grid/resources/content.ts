import { CardProps } from '@pages/Work/components/Card';
import primaryImage from '@assets/samples/placeholder-min.png';
import secondaryImage from '@assets/samples/indeed-sample-min.png';
import tertiaryImage from '@assets/samples/actblue-sample-min.png';

export const content: CardProps[] = [
    {
    title: 'Designing an AI-driven tool to accelerate qualitative survey workflows',
    description: ['Product design', 'Enterprise'],
    image: primaryImage,
    imageAlt: 'Design preview for an AI survey workflow tool interface',
    linkUrl: '/case-study/servicenow',
    linkText: 'Read AI study',
    palette: 'primary',
    layout: 'horizontal',
    iconFallback: 'ai',
  },
  {
    title: "Scaling clarity and consistency across Indeed's hiring platform",
    description: ['Design system', 'Enterprise'],
    image: secondaryImage,
    imageAlt: "Design preview for the Indeed.com hiring platform home page",
    linkUrl: '/case-study/indeed',
    linkText: 'Read system study',
    palette: 'secondary',
    layout: 'vertical',
    iconFallback: 'component',
  },
  {
    title: 'Improving data visibility for teams managing critical donation data',
    description: ['Product design', 'Nonprofit'],
    image: tertiaryImage,
    imageAlt: 'Design preview for ActBlue Salesforce integration admin page',
    linkUrl: '/case-study/actblue',
    linkText: 'Read integration study',
    palette: 'tertiary',
    layout: 'vertical',
    iconFallback: 'clouds',
  },
];