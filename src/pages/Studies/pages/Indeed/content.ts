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
            'Indeed had no cohesive design system, and deliverables across the organization were inconsistent.',
            'I built and documented components for Indeed\'s new enterprise design system, used by 100+ designers. My focus was applying WCAG accessibility standards to our components and embedding localization guidance directly into our design and code.',
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
            caption: 'The job search results page before and after the design system.',
        },
    },
    sections: [
        {
            order: 1,
            title: 'Context',
            description: [
                'Indeed is a job search platform that connects job seekers and employers. Different teams owned different parts of it. The consumer-facing side covered job search, company search, resumes, applications, messaging and more. The employer side was where hiring managers connected with candidates and set up job posts. The mobile app was separate again, with its own teams.',
                'When I joined, Indeed was refreshing its brand, moving its main color from light blue to dark blue and away from orange. The prior Sketch-based Indeed Component Library (ICL) was strict, inconsistent and avoided by designers.',
                'A new Indeed Design System (IDS) was replacing it, built fully in Figma. The design org owned IDS as a central system. I was one of three designers on that team, with a lead and a junior designer. The goal was one hybrid, responsive system for desktop and mobile, in the new look.',
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
                    text: 'I built general-purpose components for the new library in Figma, aimed at that hybrid, responsive goal.',
                },
                {
                    label: 'Documenting Components',
                    text: 'Each component came with documentation for usage, accessibility and localization. A page such as Button covers a description, when to use it, its options, WCAG success criteria with the solutions applied, and localization guidance.',
                },
                {
                    label: 'Supporting Team Adoption',
                    text: 'I supported team adoption by sharing my Figma, design systems and accessibility expertise with other designers. I mentored them, contributed to onboarding sessions and answered daily system triage questions.',
                },
            ],
        },
        {
            order: 3,
            title: 'Localization',
            description: [
                'Indeed is owned by a Japanese company. Its major markets are Japan, Germany and the US, so every component had to work in Japanese, German and English. My component docs also covered right-to-left (RTL) languages, including Arabic and Hebrew.',
                'For each component I wrote localization guidance and examples, covering label length and fixed and content-based widths. I also developed guidelines for designing around RTL, including swapped action order and mirrored icons.',
            ],
        },
        {
            order: 4,
            title: 'Outcomes',
            description: [
                'I shipped 20 components, each designed, documented and handed off to engineering. I collaborated with engineering and design teams to streamline component handoffs and reduce UI redundancy across production apps.',
                'The components and documentation I built gave those teams a shared reference for usage, accessibility and localization. That helped them ship accessible features faster while keeping the system consistent.',
            ],
            image: [
                { 
                    src: headerImage, 
                    caption: 'Accessibility annotations for design handoff, documented in collaboration with engineering.',
                    alt: 'Sample of accessibility annotations in a Figma design file, showing how to annotate designs for developers.',
                    variant: 'banner' as const,
                },
            ],
        },
        {
            order: 5,
            title: 'Deliverables',
            descriptionBullets: [
                'A documented Figma component library',
                'Detailed documentation for each component, covering usage, accessibility and localization',
                'WCAG accessibility standards, applied to each component in collaboration with other teams and documented with the solutions',
                'Localization and RTL design guidelines',
                'Onboarding and mentoring support for other designers',
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
                    label: 'Token Architecture & Automation',
                    text: 'Our team used basic variables and had not adopted design tokens. Today I would start by designing and implementing a token architecture. It would give design and code one shared set of named decisions for color, type and spacing. Then I would automate the sync from Figma Variables into production code with Style Dictionary and GitHub Actions.',
                },
                {
                    label: 'Production Analytics',
                    text: 'I would track how teams use each component in production and find outdated UI that needs replacing. That data would show which components to improve first, which to retire, and where teams need more support. I would also measure the system\'s effect on engineering efficiency and translate it into cost savings.',
                },
            ],
        },
    ],
};

export default content;
