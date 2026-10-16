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
            description: [
                'When I joined, Indeed\'s design system was growing rapidly but facing adoption bottlenecks. Engineering teams struggled with inconsistent UI components and outdated documentation, while designers lacked clear contribution pathways. I stepped in to bring systematic clarity, restructure our token system, and streamline documentation so we could scale effectively.',
            ],
            image: [
                {
                    src: contributionsImage,
                    caption: 'Example of component documentation with accessibility and localization guidance. Higher quality image unavailable.',
                    alt: 'A screenshot of a Figma component documentation page, showing detailed information about the component, including accessibility and localization guidance.',
                },
            ],
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
                    src: outcomesImage,
                    caption: 'Comparison before and after the design system implementation. Images obtained online.',
                    alt: 'A before and after demonstration of the Indeed.com home page with the design system applied. The new home page uses the design system and looks more modern and organized. Accessibility is vastly improved.',
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
