import spreadImage from './images/screens-hero-min.jpg';
import contextImage from './images/journey-map-min.jpg';
import beforeImage from './images/themeweaver-before-min.jpg';
import afterImage from './images/themeweaver-after-min.jpg';
import deliverablesImage from './images/figma-board-min.jpg';
import type { ChipData } from '@commonTypes/study/studyHeader';

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
            'Researchers across the organization collect thousands of open-ended responses from surveys, workshops and interviews. Assigning each response a theme by hand, known as coding, takes 10 hours or more per 100 responses, so the work often gets deprioritized.',
            'I was the sole designer on a short project to improve an internal research tool that uses AI to extract insights from qualitative data. I joined after the first prototype was built to shape the experience, support implementation and validate real research use cases.',
        ],
        chips: [
            { label: 'Internal Tools' },
            { label: 'Enterprise' },
            { label: 'AI/ML' },
            { label: 'UX Architecture' },
            { label: 'User Research' },
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
                'ServiceNow is an enterprise cloud platform that automates workflows across IT, HR and customer service. Its 22,000+ employees rely on internal tools such as the employee intranet. Every internal tool uses Oolong, the design system I worked on in my primary role.',
                'This project began as an effort to quickly improve the insights gained from user research. A researcher built the first prototype with AI. The goal was a workflow that is faster, easier to navigate and usable by non-experts as well as trained researchers.',
                'Researchers define a set of themes, and the AI assigns them to responses. This is called coding, and a fully coded dataset has a theme on every response. With the Hybrid strategy, the tool recommends that researchers code about 10% of their responses. For 1,000 responses, that means coding 100, which saves a lot of time. **The AI codes the rest with an estimated 95% accuracy, against an estimated 70% for AI-only.**',
                'Early testing of the prototype showed that users were unsure how best to use the tool and how it differed from the company\'s internal ChatGPT.',
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
                    text: 'I mapped the journey from upload to coded dataset to make each step clear. From the map I simplified the interaction model and reworked how guidance appears.',
                },
                {
                    label: 'Designing Responsive Screens',
                    text: 'I used low-fidelity layouts to move the conversation to content and flow, then built high-fidelity designs with Oolong components to match the corporate design language. I annotated responsive layouts in Figma so engineering could build them.',
                },
                {
                    label: 'Partnering on Implementation',
                    text: 'I worked with the research team to get my designs implemented and to gather feedback on them. That feedback led us to prioritize the responsive layouts that users asked for.',
                },
            ],
        },
        {
            order: 3,
            title: 'Outcomes',
            description: [
                'The prototype had no clear path or end point. The redesign adds a five-step progress bar, so users can see where they are and what comes next. The strategy screen sets AI-only against Hybrid and recommends Hybrid as the most accurate. Testing showed that users understood the tool and liked it. They also saw how it differs from general chat tools, which are not trained for research coding.',
                'Leadership reviewed the designs, **approved future work and assigned more resources to the tool**. I designed draft features for those enhancements before my engagement ended.',
            ],
            // Three screen widths from one 1600 x 1225 sheet, each cropped to the same height (D-077).
            panels: {
                src: spreadImage,
                sourceWidth: 1600,
                sourceHeight: 1225,
                framed: true,
                slices: [
                    { x: 0, y: 0, width: 801, height: 661, weight: 4, alt: 'The desktop screen for selecting columns to analyze. It has a five-step progress bar, a form for open-ended, quantitative and segment columns, and a preview of the column data.' },
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
                    alt: 'A dark Figma board with annotated screens for the upload step and the post-upload data check. It includes mocks of the upload loading states and a collapsed table.',
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
                    text: 'Researchers write their own themes before the AI does any work. I would have the AI suggest a starting set from the responses and let researchers accept, edit or replace them. That would speed up setup.',
                },
                {
                    label: 'Live Feedback on Results',
                    text: 'I would let researchers correct AI-coded responses as they review. Those corrections would add to the training the AI gets from the responses researchers code up front, and improve its accuracy over time.',
                },
            ],
        },
    ],
};

export default content;
