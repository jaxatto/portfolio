import headerImage from './images/example-min.png';
import contextImage from './images/example-min.png';
import contributionsImage from './images/example-min.png';
import outcomesImage from './images/example-min.png';
import deliverablesImage from './images/example-min.png';
import type { ChipData } from '@components/ChipGroup';

export const content = {
    header: {
        title: 'Project title',
        roleDetails: [
            {
                role: 'Role name',
                startDate: '2020',
                endDate: '2021',
            },
        ],
        description: [
            'Sample description of the project, highlighting key aspects of the work done, the impact it had, and the skills utilized.'
        ],
        chips: [
            { label: 'Example', theme: 'tertiary' },
            { label: 'Example', theme: 'tertiary' },
            { label: 'Example', theme: 'secondary' },
            { label: 'Example', theme: 'secondary' },
            { label: 'Example', theme: 'secondary' },
            { label: 'Example', theme: 'primary' },
            { label: 'Example', theme: 'primary' },
        ] as ChipData[],
        image: [
            { 
                src: headerImage, 
                caption: 'Image caption describing the image content.',
                alt: 'Detailed description of the image, explaining what it shows and its relevance to the project.',
            },
        ],
    },
    sections: [
        {
            order: 1,
            title: 'Context',
            titleEmoji: '🧭',
            description: [
                'Sample paragraph providing context for the project, including the problem it aimed to solve, the target audience, and any relevant background information.',
                'Additional context can be provided here, such as the project\'s goals, challenges faced, and the overall environment in which it was developed.',
            ],
            descriptionBullets: [],
            image: [],
        },
        {
            order: 2,
            title: 'Contrubitions',
            titleEmoji: '🛠️',
            description: [
                'Sample paragraph providing context for the project, including the problem it aimed to solve, the target audience, and any relevant background information.',
                'Additional context can be provided here, such as the project\'s goals, challenges faced, and the overall environment in which it was developed.',
            ],
            descriptionBullets: [],
            image: [
                { 
                    src: contributionsImage, 
                    caption: 'Image caption describing the image content.',
                    alt: 'Detailed description of the image, explaining what it shows and its relevance to the project.',
                },
            ],
        },
        {
            order: 3,
            title: 'Outcomes',
            titleEmoji: '📈',
            description: [
                'Sample paragraph providing context for the project, including the problem it aimed to solve, the target audience, and any relevant background information.',
                'Additional context can be provided here, such as the project\'s goals, challenges faced, and the overall environment in which it was developed.',
            ],
            descriptionBullets: [],
            image: [
                { 
                    src: outcomesImage, 
                    caption: 'Image caption describing the image content.',
                    alt: 'Detailed description of the image, explaining what it shows and its relevance to the project.',
                },
            ],
        },
        {
            order: 4,
            title: 'Deliverables',
            titleEmoji: '📦',
            description: [],
            descriptionBullets: [
                'Bullet point example of a deliverable, such as a design system component library.',
                'Another bullet point example of a deliverable, such as documentation for design handoff.',
                'Bullet point example of a deliverable, such as accessibility annotations in design files.',
                'Bullet point example of a deliverable, such as a triage workflow for component requests.',
                'Bullet point example of a deliverable, such as mentorship for junior designers.',
            ],
            image: [],
        },
    ],
};