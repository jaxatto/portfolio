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
            'I architected and documented production-ready component libraries and token workflows for Indeed\'s enterprise design system. My focus was unifying cross-functional adoption across 100+ designers. I also embedded WCAG accessibility standards directly into our design and code.',
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
            caption: 'Comparison before and after the design system implementation. Images obtained online.',
        },
    },
    sections: [
        {
            order: 1,
            title: 'Context',
            description: [
                'When I joined, Indeed\'s design system was growing rapidly but facing adoption bottlenecks. Engineering teams struggled with inconsistent UI components and outdated documentation, while designers lacked clear contribution pathways. I stepped in to bring systematic clarity, restructure our token system, and streamline documentation so we could scale effectively.',
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
                caption: 'Example of component documentation with accessibility and localization guidance. Higher quality image unavailable.',
            },
        },
        {
            order: 2,
            title: 'Contributions',
            items: [
                {
                    label: 'Evolving Component Architecture',
                    text: 'I worked within the existing system to mature Figma components, align token structures with production code, and update accessibility documentation.',
                },
                {
                    label: 'Improving Contribution Pathways',
                    text: 'I contributed to the design system\'s governance by establishing clearer review loops and contribution guidelines for engineering and design teams.',
                },
                {
                    label: 'Team Support & Enablement',
                    text: 'I supported team adoption by mentoring junior designers, running onboarding sessions, and answering daily system triage questions.',
                },
            ],
        },
        {
            order: 3,
            title: 'Outcomes',
            description: [
                'I helped streamline component handoffs, unify multi-brand token structures, and significantly reduce UI redundancy across production apps. The updated documentation and contribution models I built enabled our engineering and design teams to ship accessible features faster while keeping the system consistent.',
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
            order: 4,
            title: 'Deliverables',
            descriptionBullets: [
                'System and documentation improvement library',
                'Contribution models and review loops',
                'Collaboration with cross-functional teams',
                'Triage support for enterprise teams',
                'Mentorship and onboarding for junior design team members',
            ],
        },
        {
            order: 5,
            title: 'Opportunities',
            description: [
                'Looking back at this 2020 project through the lens of modern design systems architecture, my approach would evolve significantly today:',
            ],
            items: [
                {
                    label: 'Automated Token Pipelines',
                    text: 'I would build automated pipelines using Style Dictionary and GitHub Actions to sync design decisions directly from Figma Variables into production code repositories in real time.',
                },
                {
                    label: 'Production Analytics',
                    text: 'I would instrument telemetry on production components to track usage metrics, identify deprecated UI instances, and measure true engineering efficiency.',
                },
            ],
        },
    ],
};

export default content;
