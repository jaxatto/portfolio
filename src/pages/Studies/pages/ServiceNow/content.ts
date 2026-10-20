import spreadImage from './images/screens-hero-min.jpg';
import contextImage from './images/journey-map-min.jpg';
import contributionsImage from './images/screen-evolution-min.jpg';
import beforeImage from './images/themeweaver-before-min.jpg';
import afterImage from './images/themeweaver-after-min.jpg';
import deliverablesImage from './images/figma-board-min.jpg';
import type { ChipData } from '@components/ChipGroup';

const content = {
    header: {
        title: 'ServiceNow AI Research Tool',
        roleDetails: [
            {
                role: 'Staff UI/UX Engineer',
                location: 'Remote',
                startDate: '2024',
                endDate: '2025',
            },
        ],
        description: [
            'Researchers across the organization collect thousands of open-ended responses from surveys, workshops and interviews. Coding them into themes by hand takes 10 hours or more per 100 responses, so the work often gets deprioritized.',
            'I was the sole designer on a short project to improve an internal research tool that uses AI to extract insights from qualitative data. I joined after the first prototype was built to shape the experience, support implementation and validate real research use cases.',
        ],
        chips: [
            { label: 'Enterprise', theme: 'tertiary' },
            { label: 'AI/ML', theme: 'tertiary' },
            { label: 'UX Architecture', theme: 'secondary' },
            { label: 'User Research', theme: 'secondary' },
        ] as ChipData[],
        compare: {
            before: {
                src: beforeImage,
                alt: 'The prototype\'s strategy screen: a dark header, a short paragraph describing two workflows, and a dropdown for choosing between Hybrid and AI Only.',
            },
            after: {
                src: afterImage,
                alt: 'The redesigned strategy screen: a five-step progress bar and two side-by-side cards, AI-only and Hybrid, each with a list of what it does. Hybrid is marked as recommended and most accurate.',
            },
            aspectRatio: '1440 / 1230',
            caption: 'The prototype\'s strategy selection screen and the redesign.',
        },
    },
    sections: [
        {
            order: 1,
            title: 'Context',
            description: [
                'ServiceNow is an enterprise cloud platform that automates workflows across IT, HR and customer service. It also runs its own products internally, such as the employee intranet for its 22,000+ employees. My primary role was on Oolong, the design system for that intranet.',
                'This project began as an effort by the Digital Technology group to quickly improve the insights gained from user research. A researcher built the first prototype with AI, and it had been through a round of testing when I joined. The goal was a workflow that is faster, easier to navigate and usable by non-experts as well as trained researchers.',
                'Users upload responses, define a few themes and get a fully coded dataset back. The AI suggests themes with an estimated 95% accuracy rate. The results were promising. Users were unsure how best to use the tool and how it differed from uploading a CSV to the company\'s internal ChatGPT.',
            ],
            image: [
                {
                    src: contextImage,
                    caption: 'User journey map showing branching paths, repeated states and decision points across the flow.',
                    alt: 'A flowchart of the research analysis flow, with yellow steps, orange groups of options, diamond decision points, and loops back to earlier steps.',
                },
            ],
        },
        {
            order: 2,
            title: 'Contributions',
            items: [
                {
                    label: 'Simplifying the Core Flow',
                    text: 'I mapped the journey from upload to coded dataset to bring clarity to how the tool is used. From the map I simplified the interaction model and reworked how guidance appears.',
                },
                {
                    label: 'Designing Responsive Screens',
                    text: 'I used low-fidelity layouts to move the conversation to content and flow, then built high-fidelity designs with Oolong components to match the corporate design language. I annotated responsive layouts in Figma so engineering could build them.',
                },
                {
                    label: 'Partnering on Implementation',
                    text: 'I worked with the research team to get my designs implemented and to gather feedback on them. Testing led us to question our assumptions and to prioritize the responsive layouts that users asked for.',
                },
            ],
            image: [
                {
                    src: contributionsImage,
                    caption: 'Four steps of the flow, from the first prototype (left) to wireframes (middle) and the final designs (right).',
                    alt: 'A grid of screens in four rows and three columns. The rows are upload, preview, column selection and strategy selection. The left column is the first prototype, the middle column is wireframes and the right column is the final design.',
                },
            ],
        },
        {
            order: 3,
            title: 'Outcomes',
            description: [
                'The prototype had no clear path or end point. The redesign adds a five-step progress bar, so users can see where they are and what comes next. It gives the main action more weight than the rest and explains each strategy, with Hybrid recommended. Question names that were truncated now show in full. Testing showed that users understood the tool and liked it.',
                'Leadership reviewed the designs, approved future work and assigned more resources to the tool. I designed draft features for those enhancements before my engagement ended.',
            ],
            // Three screen widths from one 1600 x 1225 sheet, each cropped to the same height (D-077).
            panels: {
                src: spreadImage,
                sourceWidth: 1600,
                sourceHeight: 1225,
                framed: true,
                slices: [
                    { x: 0, y: 0, width: 801, height: 661, weight: 4, alt: 'The desktop screen for selecting columns to analyze: a progress bar with five steps, a form for open-ended, quantitative and segment columns, and a preview of the column data.' },
                    { x: 801, y: 0, width: 427, height: 705, weight: 2, alt: 'The same screen at tablet width, with the column form above the data preview.' },
                    { x: 1229, y: 0, width: 371, height: 1225, weight: 1, alt: 'The same screen at phone width, with links that jump between the column selection and the data preview.' },
                ],
                caption: 'Responsive screens for selecting columns from research data to analyze.',
            },
        },
        {
            order: 4,
            title: 'Deliverables',
            descriptionBullets: [
                'Revised user journey with key states and branching paths',
                'Wireframes exploring a simpler layout and flow',
                'High-fidelity designs built with Oolong styles and components',
                'Responsive layouts annotated with interaction and content behavior in Figma',
                'Ongoing design support for research, engineering and content',
            ],
            image: [
                {
                    src: deliverablesImage,
                    caption: 'Figma board with annotated mocks for the upload and interaction states.',
                    alt: 'A dark Figma board with annotated screens for the upload step and the post-upload data check, including mocks of the upload loading states and a collapsed table.',
                },
            ],
        },
        {
            order: 5,
            title: 'Opportunities',
            description: [
                'The prototype\'s technical limits shaped what we could build. Looking back, I would add two things:',
            ],
            items: [
                {
                    label: 'AI Suggestions Upfront',
                    text: 'Researchers define their themes before the AI does any work. I would have the AI suggest a starting set from the responses, and let researchers accept, edit or replace them.',
                },
                {
                    label: 'Live Feedback on Results',
                    text: 'I would let researchers correct AI-coded responses as they review, so those corrections can improve accuracy over time.',
                },
            ],
        },
    ],
};

export default content;
