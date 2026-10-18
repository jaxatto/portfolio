import headerImage from './images/accessibility-annotations-min.jpg';
// import contextImage from './images/name-min.png';
import contributionsImage from './images/documentation-sample-min.jpg';
import beforeImage from './images/indeed-before-min.jpg';
import afterImage from './images/indeed-after-min.jpg';
// import deliverablesImage from './images/name-min.png';
import type { ChipData } from '@components/ChipGroup';

const content = {
    header: {
        title: 'Indeed Design System',
        roleDetails: [
            {
                role: 'UX Designer',
                location: 'Remote',
                startDate: '2020',
                endDate: '',
            },
        ],
        description: [
            'I built and documented components for Indeed\'s new enterprise design system, used by 100+ designers. My focus was embedding WCAG accessibility standards and localization guidance directly into our design and code.',
        ],
        chips: [
            { label: 'B2C', theme: 'tertiary' },
            { label: 'PeopleTech', theme: 'tertiary' },
            { label: 'Design Systems', theme: 'secondary' },
            { label: 'Accessibility', theme: 'secondary' },
        ] as ChipData[],
        compare: {
            before: {
                src: beforeImage,
                alt: 'The Indeed job search results page before the design system: dense text, a left filter column and an email alert box.',
            },
            after: {
                src: afterImage,
                alt: 'The Indeed job search results page with the design system applied: rounded job cards with tags, a job detail panel and clear actions.',
            },
            caption: 'Comparison before and after the design system implementation.',
        },
    },
    sections: [
        {
            order: 1,
            title: 'Context',
            description: [
                'Indeed.com was split across teams that each owned their own pages: Job Search, company landing pages, company search, the Employer side, Resume, Application, Messaging and more. The mobile app teams had their own splits too. No cohesive design system existed, and deliverables across the organization were very inconsistent.',
                'When I joined, Indeed was refreshing its brand, moving its main color from light blue to dark blue and away from orange. The prior Sketch-based Indeed Component Library (ICL) was strict, inconsistent, and avoided by designers. A new Indeed Design System (IDS) built fully in Figma was replacing it. We aimed for a hybrid system that worked on desktop and mobile and responded to screen size.',
            ],
            // The three documentation pages are slices of one 1600 x 1036 image (D-054).
            panels: {
                src: contributionsImage,
                sourceWidth: 1600,
                sourceHeight: 1036,
                slices: [
                    { x: 4, y: 4, width: 507, height: 1032, alt: 'Button component documentation page in Figma, with its description, when to use it and options.' },
                    { x: 545, y: 4, width: 507, height: 1032, alt: 'Accessibility documentation page for the button, listing WCAG success criteria and the solutions applied.' },
                    { x: 1085, y: 4, width: 507, height: 1032, alt: 'Localization documentation page for the button, covering label length, fixed and content widths, and right-to-left layouts.' },
                ],
                caption: 'Documentation pages for the Button component, with accessibility and localization guidance.',
            },
        },
        {
            order: 2,
            title: 'Contributions',
            items: [
                {
                    label: 'Building the Component Library',
                    text: 'I built Figma components for the new library and documented their accessibility guidance.',
                },
                {
                    label: 'Establishing Contribution Pathways',
                    text: 'I contributed to the design system\'s governance by establishing review loops and contribution guidelines for engineering and design teams.',
                },
                {
                    label: 'Team Support & Enablement',
                    text: 'I supported team adoption by mentoring junior designers, running onboarding sessions, and answering daily system triage questions.',
                },
            ],
        },
        {
            order: 3,
            title: 'Localization',
            description: [
                'Indeed is owned by a Japanese company and has major markets in Japan, Germany and the US, so every component had to work in all three languages. Arabic and Hebrew also had to work. For each component I wrote localization guidance and examples, covering label length, fixed and content-based widths, and right-to-left (RTL) layouts, including swapping the order of actions and mirroring icons.',
            ],
        },
        {
            order: 4,
            title: 'Outcomes',
            description: [
                'I helped streamline component handoffs and reduce UI redundancy across production apps. The documentation and contribution models I built helped engineering and design teams ship accessible features faster while keeping the system consistent.',
            ],
            image: [
                { 
                    src: headerImage, 
                    caption: 'Collaborated on accessibility documentation for design handoff to engineering.',
                    alt: 'Sample of accessibility annotations in a Figma design file, showing how to annotate designs for developers.',
                    variant: 'banner' as const,
                },
            ],
        },
        {
            order: 5,
            title: 'Deliverables',
            description: [
                'A documented Figma component library with localization and RTL guidance, contribution and review guidelines, a component triage workflow, and onboarding sessions for junior designers.',
            ],
        },
        {
            order: 6,
            title: 'Opportunities',
            description: [
                'Looking back at this 2020 project, I would change two things:',
            ],
            items: [
                {
                    label: 'Automated Token Pipelines',
                    text: 'Design tokens were a new idea in 2020. Today I would build automated pipelines using Style Dictionary and GitHub Actions to sync design decisions directly from Figma Variables into production code repositories in real time.',
                },
                {
                    label: 'Production Analytics',
                    text: 'I would instrument telemetry on production components to track usage metrics, identify deprecated UI instances, and measure engineering efficiency.',
                },
            ],
        },
    ],
};

export default content;
