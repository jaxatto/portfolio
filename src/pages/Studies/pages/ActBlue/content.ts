import beforeImage from './images/actblue-before-min.jpg';
import afterImage from './images/actblue-after-min.jpg';
import contextImage from './images/figjam-min.jpg';
import flowImage from './images/flow-min.jpg';
import finalScreensImage from './images/final-screens-min.jpg';
import type { ChipData } from '@components/ChipGroup';

const content = {
    header: {
        title: 'ActBlue Salesforce Integration',
        roleDetails: [
            {
                role: 'Senior Product Designer',
                location: 'Remote',
                startDate: '2022',
                endDate: '2023',
            },
        ],
        description: [
            'Campaign admins needed to sync donor data from ActBlue into Salesforce, but setup ran entirely through support tickets and admins could not see what was syncing or why it failed.',
            'I led design on a complete rebuild of the integration, from setup and configuration to sync visibility and error recovery.',
        ],
        chips: [
            { label: 'B2B', theme: 'tertiary' },
            { label: 'Nonprofit', theme: 'tertiary' },
            { label: 'Product Design', theme: 'secondary' },
            { label: 'Systems Thinking', theme: 'secondary' },
        ] as ChipData[],
        compare: {
            before: {
                src: beforeImage,
                alt: 'The original ActBlue notifications screen, only visible to staff: a dense table of event notifications with timestamps, results, order numbers and donor names, and a retry button.',
            },
            after: {
                src: afterImage,
                alt: 'The redesigned Salesforce integration page in ActBlue: a banner confirming the connection, a Connected status, and connection details for event types, historical data progress and advanced configuration.',
            },
            caption: 'The original screen for checking that a notification sent, and the redesigned integration page.',
        },
    },
    sections: [
        {
            order: 1,
            title: 'Context',
            description: [
                'ActBlue is a fundraising platform for political campaigns and nonprofits. Admins sync donor data from ActBlue into Salesforce, their CRM. Those admins range from teams of one to presidential campaigns.',
                'Most were not hired for technical work. In many cases a volunteer with limited time and context did the setup. The new experience had to work for all of them without overwhelming anyone.',
                'Small mistakes could break the sync silently, and users had no way to recover. Most only learned of a problem when Salesforce was missing data.',
                'I worked with product, support and implementation teams to find the problem. We reviewed past tickets, talked with support staff, walked through broken setups and mapped the full sync flow.',
            ],
            image: [
                {
                    src: contextImage,
                    caption: 'FigJam board from our workshops, with wireframes and discovery exercises. Developers used it to organize the backend.',
                    alt: 'A FigJam board of wireframes and discovery exercises for the integration, with user flows, component sketches and notes on user needs.',
                },
            ],
        },
        {
            order: 2,
            title: 'Contributions',
            items: [
                {
                    label: 'Integration Flows & Architecture',
                    text: 'I led design for the full flow, from setup and configuration to sync visibility, error handling and long-term management. Early diagrams, flows and edge case maps let engineering plan the backend in parallel with design.',
                },
                {
                    label: 'Setup & Feedback Patterns',
                    text: 'I designed step-by-step setup, clear feedback states and flexible UI patterns that work for teams of one and for presidential campaigns.',
                },
                {
                    label: 'Design System',
                    text: 'I built with ActBlue\'s existing design system, Blueprint, and contributed new patterns back to it.',
                },
                {
                    label: 'Close Collaboration',
                    text: 'I worked closely with the product manager and the engineering manager. We ran workshops and built the FigJam board together. Mine was the first design work on the team, so collaborating with a designer was new to them.',
                },
                {
                    label: 'Handoff',
                    text: 'I validated ideas and edge cases with engineers throughout the project. I handed off Figma prototypes and CSS samples, plus a fully annotated flow that supported QA.',
                },
            ],
            image: [
                {
                    src: flowImage,
                    caption: 'The full flow with annotations for developers. It was instrumental for QA.',
                    alt: 'A Figma overview of the full Salesforce integration flow: groups of screens for connecting to production and sandbox, setup pending, connected, settings, historical data, disconnect and staff settings.',
                },
            ],
        },
        {
            order: 3,
            title: 'Outcomes',
            description: [
                'Admins could set up the integration on their own, see what was syncing and fix issues without going through support. Support teams saw a sharp drop in setup issues and manual intervention. Internal estimates put the savings at over $1.5 million per year in reduced support costs.',
                'The patterns, flows and docs from this work have since been reused for other integrations and internal tools.',
            ],
            image: [
                {
                    src: finalScreensImage,
                    caption: 'Selection of final screens from the workflow.',
                    alt: 'Three final screens: the four-step Connect to Salesforce setup, the Integrations page with cards for Webhooks, Google Sheets, Salesforce and other services, and the Salesforce integration settings with staff-only cards.',
                },
            ],
        },
        {
            order: 4,
            title: 'Deliverables',
            descriptionBullets: [
                'Figma prototypes covering setup, sync settings and error states',
                'CSS samples for developers',
                'System diagrams and flow maps for planning and engineering alignment',
                'Documentation for edge cases, failure scenarios and recovery paths',
                'Reusable UI patterns now used by other integrations and internal tools',
            ],
        },
        {
            order: 5,
            title: 'Opportunities',
            description: [
                'Looking back at this project, I would change four things:',
            ],
            items: [
                {
                    label: 'Per-Integration Analytics',
                    text: 'I would add a dashboard for each integration showing successes and failures. Admins could then troubleshoot more on their own.',
                },
                {
                    label: 'Design Iteration',
                    text: 'The Connected chip is subtle and the image next to the description is a little off. I would give both another pass.',
                },
                {
                    label: 'Notification History',
                    text: 'The full list of notifications from the prior design moved to a future state. I still think it has value and would bring it back.',
                },
                {
                    label: 'A Clear Path to Help',
                    text: 'I would add a clear call to action for getting help. Even with these improvements, things do not always work as expected and users may still need assistance.',
                },
            ],
        },
    ],
};

export default content;
