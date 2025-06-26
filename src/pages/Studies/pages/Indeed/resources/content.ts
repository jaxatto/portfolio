import headerImage from './images/accessbility-annotations-min.png';
// import contextImage from './images/name-min.png';
import contributionsImage from './images/documentation-sample-min.png';
import outcomesImage from './images/home-before-after-min.png';
// import deliverablesImage from './images/name-min.png';
import type { ChipData } from '@components/ChipGroup';

const content = {
    header: {
        title: 'Indeed Design System',
        roleDetails: [
            {
                role: 'UX Designer',
                startDate: '2020',
                endDate: '',
            },
        ],
        description: [
            'I joined Indeed as a UX Designer to support their internal design system team during a period of rapid growth. Over the course of several months, I helped evolve the system\'s component library, improved adoption workflows, and guided cross-functional teams on scalable, accessible UI implementation.',
        ],
        chips: [
            { label: 'B2B', theme: 'tertiary' },
            { label: 'B2B2C', theme: 'tertiary' },
            { label: 'PeopleTech', theme: 'tertiary' },
            { label: 'Design Systems', theme: 'secondary' },
            { label: 'Accessibility', theme: 'secondary' },
            { label: 'Documentation', theme: 'secondary' },
            { label: 'Collaboration', theme: 'secondary' },
            { label: 'Figma', theme: 'primary' },
            { label: 'Notion', theme: 'primary' },
        ] as ChipData[],
        image: [
            { 
                src: headerImage, 
                caption: 'Collaborated on accessibility documentation for design handoff to engineering.',
                alt: 'Sample of accessibility annotations in a Figma design file, showing how to annotate designs for developers.',
            },
        ],
    },
    sections: [
        {
            order: 1,
            title: 'Context',
            titleEmoji: '🧭',
            description: [
                'The internal design system was in active development and supporting a wide range of consumer and business products. I stepped in to strengthen component quality, shape contribution processes, and help teams align on consistent patterns during a pivotal time in the system\'s maturity as a rebrand was underway.',
            ],
            descriptionBullets: [],
            image: [],
        },
        {
            order: 2,
            title: 'Contrubitions',
            titleEmoji: '🛠️',
            description: [
                'I led hands-on updates to the Figma library—refining components for consistency, accessibility, and themeability. I partnered with engineers to ensure parity between design and code, and created detailed documentation to support usage across teams.',
                'To improve efficiency, I introduced a lightweight triage workflow for incoming component requests and contributions. This clarified ownership and reduced friction for designers contributing back to the system.',
                'I also mentored a junior designer new to systems work, helping them develop review skills and take ownership of key parts of the library.',
            ],
            descriptionBullets: [],
            image: [
                { 
                    src: contributionsImage, 
                    caption: 'Example of component documentation with accessibility and localization guidance.',
                    alt: 'A screenshot of a Figma component documentation page, showing detailed information about the component, including accessibility and localization guidance.',
                },
            ],
        },
        {
            order: 3,
            title: 'Outcomes',
            titleEmoji: '📈',
            description: [
                'By the time I transitioned off the team, the system was more maintainable, better documented, and easier to adopt. System usage had expanded across different product areas, and the contribution process was more approachable for new designers and engineers. The team I supported was better positioned to scale the system going forward.',
            ],
            descriptionBullets: [],
            image: [
                { 
                    src: outcomesImage, 
                    caption: 'System in use across Indeed.com\'s job seeker platform.',
                    alt: 'A before and after demonstration of the Indeed.com home page with the design system applied. The new home page uses the design system and looks more modern and organized. Accessibility is vastly improved.',
                },
            ],
        },
        {
            order: 4,
            title: 'Deliverables',
            titleEmoji: '📦',
            description: [],
            descriptionBullets: [
                'Updated and documented Figma component library',
                'Contribution triage process and review workflows',
                'Collaboration with engineering on implementation specs',
                'Adoption support for internal product teams',
                'Mentorship and onboarding for junior design team members',
            ],
            image: [],
        },
    ],
};

export default content;