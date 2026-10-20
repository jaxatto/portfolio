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
            'Campaign admins needed to sync donor data from ActBlue into Salesforce. Setup ran entirely through support tickets, and admins could not see what was syncing or why it failed.',
            'I was the sole designer, embedded with product and engineering. I led a complete rebuild of the integration, from setup and configuration to sync visibility and error recovery.',
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
                alt: 'The original ActBlue notifications screen, only visible to staff. It shows a dense table of event notifications with timestamps, results, order numbers and donor names, and a retry button.',
            },
            after: {
                src: afterImage,
                alt: 'The redesigned Salesforce integration page in ActBlue. It has a banner confirming the connection, a Connected status, and connection details for event types, historical data progress and advanced configuration.',
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
                    label: 'Designing Integration Flows',
                    text: 'I led design for the full flow, from setup and configuration to sync visibility, error handling and long-term management. Early diagrams, flows and edge case maps let engineering plan the backend in parallel with design.',
                },
                {
                    label: 'Building Setup & Feedback Patterns',
                    text: 'I designed step-by-step setup, clear feedback states and flexible UI patterns that work for teams of one and for presidential campaigns. I built them with ActBlue\'s existing design system, Blueprint, and contributed new patterns back to it.',
                },
                {
                    label: 'Collaborating with Product & Engineering',
                    text: 'I worked closely with the product manager and the engineering manager. We ran workshops and built the FigJam board together. I validated ideas and edge cases with engineers throughout. I handed off Figma prototypes and CSS samples, plus an annotated flow that supported QA.',
                },
            ],
            image: [
                {
                    src: flowImage,
                    caption: 'The full flow, annotated for developers and used to support QA.',
                    alt: 'A Figma overview of the full Salesforce integration flow. It has groups of screens for connecting to production and sandbox, setup pending, connected, settings, historical data, disconnect and staff settings.',
                },
            ],
        },
        {
            order: 3,
            title: 'Outcomes',
            description: [
                'Admins could set up the integration on their own, see what was syncing and fix issues without going through support. Setup that once took days or weeks of back and forth with support, or never finished, now takes minutes. The only wait is the data sync, which depends on the volume of data.',
                'Support teams saw a sharp drop in setup issues and manual intervention. **Internal estimates put the savings at over $1.5 million per year in reduced support costs.** The patterns, flows and documentation from this work have since been reused for other integrations and internal tools.',
            ],
            // The three final screens are slices of one 2180 x 559 image, in the spread box (D-069).
            panels: {
                src: finalScreensImage,
                sourceWidth: 2180,
                sourceHeight: 559,
                framed: true,
                slices: [
                    { x: 0, y: 0, width: 700, height: 559, alt: 'The Connect to Salesforce setup in four steps, with authorization complete and the package installation step open.' },
                    { x: 740, y: 0, width: 700, height: 559, alt: 'The Integrations page with cards for Webhooks, Google Sheets, Salesforce and other services, each with its connection status.' },
                    { x: 1480, y: 0, width: 700, height: 559, alt: 'The Salesforce integration settings, with cards for event types, historical data and disconnecting, and staff-only cards for notifications.' },
                ],
                caption: 'Final screens from the integration flow.',
            },
        },
        {
            order: 4,
            title: 'Deliverables',
            descriptionBullets: [
                'Figma prototypes covering setup, sync settings and error states',
                'CSS samples for developers',
                'System diagrams, flows and edge case maps for planning and engineering alignment',
                'Documentation for edge cases, failure scenarios and recovery paths',
                'Reusable UI patterns now used by other integrations and internal tools',
            ],
        },
        {
            order: 5,
            title: 'Opportunities',
            description: [
                'Time and a focus on a targeted MVP were the main constraints. Looking back, I would add or change four things:',
            ],
            items: [
                {
                    label: 'Per-Integration Analytics',
                    text: 'I would add a dashboard for each integration that shows sync successes and failures. Admins could then diagnose problems and fix them without contacting support.',
                },
                {
                    label: 'Design Iteration',
                    text: 'The Connected status is visually subtle. I would make it more prominent.',
                },
                {
                    label: 'Notification History',
                    text: 'The full notification list from the earlier design moved to a future release. It gives admins a detailed record of every sync, and I would bring it back.',
                },
                {
                    label: 'Clear Path to Help',
                    text: 'I would add a clear call to action for getting help. Some syncs will still fail and some admins will still need a person, so support should be easy to reach from the integration page.',
                },
            ],
        },
    ],
};

export default content;
