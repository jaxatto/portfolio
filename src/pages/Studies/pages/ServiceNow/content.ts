import heroImage from './images/screens-hero-min.jpg';
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
            'I was the sole designer on short project to improve an internal research tool that uses AI to extract insights from qualitative data. I joined after the first prototype was built to shape the experience, support implementation and validate real research use cases.',
        ],
        chips: [
            { label: 'Enterprise', theme: 'tertiary' },
            { label: 'AI/ML', theme: 'tertiary' },
            { label: 'UX Architecture', theme: 'secondary' },
            { label: 'User Research', theme: 'secondary' },
        ] as ChipData[],
        // Three screen widths from one 1600 x 1225 sheet, each cropped to the same height (D-077).
        panels: {
            src: heroImage,
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
    sections: [
        {
            order: 1,
            title: 'Context',
            description: [
                'ServiceNow is an enterprise cloud platform that automates workflows across IT, HR and customer service. The company also used its own products, such as the employee intranet, to serve its 22,000+ employees. My primary role at ServiceNow was working on the design system for this employee hub. ',
                'This project came about as Digital Technology (DT) group effort to rapidly improve insights gained from user research. The goal was a workflow that is faster, easier to navigate and usable by non-experts as well as trained researchers. A researcher built the first prototype with AI and had gone through a round of testing on the feature when I joined the project.',
                'In the tool, users upload responses, define a few themes and get a fully coded dataset back. The AI suggests themes with an estimated 95% accuracy rate. While the results were great, users were confused on how to best use the tool and how it differed from just uploading a CSV to the internal ChatGPT variant.',
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
                    label: 'Structuring the Core Flow',
                    text: 'I framed how the experience adapts to real research, where inputs are messy and the process is rarely linear. The journey map captures the branching paths, repeated states and decision points.',
                },
                {
                    label: 'Simplifying Interaction & Guidance',
                    text: 'I simplified the interaction model and reworked how guidance appears, so the tool is more focused and less interruptive. I used low-fidelity layouts to move the conversation to content and flow, then built high-fidelity designs with Oolong components to match the corporate design language.',
                },
                {
                    label: 'Collaborating with Research & Leadership',
                    text: 'I worked with the tool\'s creator throughout and kept leadership involved as the direction took shape. Several of my interaction and flow changes were built into the working prototype.',
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
                'My role was short and targeted. Leadership reviewed the designs and defined the roadmap, and the future looked good for the tool, with more enhancements planned. Several of my interaction and flow changes were built into the working prototype, and I designed draft features for the next enhancements.',
                'Early testing of the prototype showed that users did not understand what the tool did. It also showed that the Hybrid option was the most accurate, because it uses themes the user confirms. The redesigned strategy screen puts the two options side by side and marks Hybrid as recommended. We tested before and after the redesign.',
            ],
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
