import headerImage from './images/header-min.png';
import contextImage from './images/figjam-min.png';
import contributionsImage from './images/handoff-min.png';
import outcomesImage from './images/grid-min.png';
import deliverablesImage from './images/responsive-specs-min.png';
import type { ChipData } from '@components/ChipGroup';

const content = {
    header: {
        title: 'ActBlue Salesforce Integration',
        roleDetails: [
            {
                role: 'Senior Product Designer',
                startDate: '2022',
                endDate: '2023',
            },
        ],
        description: [
            'Campaign admins needed to sync donor data from ActBlue into Salesforce, but the original integration was clunky, confusing, and handled entirely through support tickets. Users couldn\'t set it up themselves, and even when it worked, they had no idea what was syncing or why things failed. I joined the team to lead design on a complete rebuild of this system, rethinking the end-to-end experience for transparency, reliability, and maintainability.',
        ],
        chips: [
            { label: 'B2B', theme: 'tertiary' },
            { label: 'Nonprofit', theme: 'tertiary' },
            { label: 'FinTech', theme: 'tertiary' },
            { label: 'Product Design', theme: 'secondary' },
            { label: 'Systems Thinking', theme: 'secondary' },
            { label: 'UX Architecture', theme: 'secondary' },
            { label: 'Wireframing', theme: 'secondary' },
            { label: 'Agile', theme: 'secondary' },
            { label: 'Figma', theme: 'primary' },
            { label: 'Notion', theme: 'primary' },
        ] as ChipData[],
        image: [
            { 
                src: headerImage, 
                caption: 'Original screen for validating if a notification sent successfully. Only visible to staff',
                alt: 'A screenshot of a Figma design file showing the original screen for validating notification success.',
            },
        ],
    },
    sections: [
        {
            order: 1,
            title: 'Context',
            titleEmoji: '🧭',
            description: [
                'I worked with product, support, and implementation teams to dig into the problem. We reviewed past tickets, spoke with support staff, walked through broken setups, and mapped out the full sync flow.',
                'Even small mistakes could silently break things, and there was no way for users to recover on their own. Most didn\'t even know there was a problem until Salesforce was missing data.',
                'Our users came from a mix of backgrounds, and most weren\'t hired for technical work. In many cases, the person setting things up was a volunteer with limited time and context.',
                'The new experience needed to support a wide range of campaign setups without overwhelming people. That meant clearer guidance, better visibility into sync status, and smart guardrails to help people get it right the first time.',
            ],
            descriptionBullets: [],
            image: [
                { 
                    src: contextImage, 
                    caption: 'Figjam wireframes and discovery exercises throughout the project lifecycle. Developers were able to use this to organize the backend.',
                    alt: 'A screenshot of a Figjam board showing wireframes and discovery exercises for the ActBlue Salesforce integration project. The board includes user flows, component sketches, and notes on user needs.',
                },
            ],
        },
        {
            order: 2,
            title: 'Contributions',
            titleEmoji: '🛠️',
            description: [
                'I led design for the full integration flow, from setup and configuration to sync visibility, error handling, and long-term management.',
                'Early diagrams, flows, and edge case maps helped engineering plan backend systems in parallel with design. This grounded our decisions in real user behavior and gave us a shared foundation to work from.',
                'I designed clear feedback states, step-by-step setup, and flexible UI patterns that worked across a wide range of campaign needs. Throughout the project, I collaborated closely with engineers to validate ideas, sort out edge cases, and keep handoff smooth.',
                'The patterns we built here have since been reused across other integrations and internal tools.',
            ],
            descriptionBullets: [],
            image: [
                { 
                    src: contributionsImage, 
                    caption: 'Full flow with annotations for developers. This was instrumental for QA.',
                    alt: 'A screenshot of a Figma design file showing the full flow of the ActBlue Salesforce integration with annotations for developers.',
                },
            ],
        },
        {
            order: 3,
            title: 'Outcomes',
            titleEmoji: '📈',
            description: [
                'The redesigned integration gave admins more control and visibility. People could set things up on their own, understand what was syncing, and fix issues without going through support.',
                'As a result, support teams saw a sharp drop in setup issues and manual intervention. Based on internal estimates, the new experience is saving over $1.5 million per year in reduced support costs.',
                'The patterns, flows, and docs from this work also became a model for other integrations and helped level up internal tooling across the org.',
            ],
            descriptionBullets: [],
            image: [
                { 
                    src: outcomesImage, 
                    caption: 'Selection of final screens from the workflow from beginning to end.',
                    alt: 'Four final screens from the ActBlue Salesforce integration workflow, showing the integrations options, setup, sync status, and management screens.',
                    corners: 'square',
                },
            ],
        },
        {
            order: 4,
            title: 'Deliverables',
            titleEmoji: '📦',
            description: [],
            descriptionBullets: [
                'End-to-end Figma prototype covering setup, sync settings, and error states',
                'System diagrams and flow maps used for planning and engineering alignment',
                'Documentation for edge cases, failure scenarios, and recovery paths',
                'Reusable UI patterns that now support other integrations and internal tools',
            ],
            image: [
                { 
                    src: deliverablesImage, 
                    caption: 'Responsive flows annotated for implementation handoff.',
                    alt: 'A screenshot of a Figma design file showing responsive flows for the ActBlue Salesforce integration with annotations for implementation handoff.',
                },
            ],
        },
    ],
};

export default content;