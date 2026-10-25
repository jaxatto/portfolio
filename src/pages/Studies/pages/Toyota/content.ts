import proposalImage from './images/token-proposal-min.jpg';
import variablesImage from './images/figma-variables-min.jpg';
import ecosystemImage from './images/ecosystem-diagram-min.jpg';
import sprintImage from './images/sprint-board-min.jpg';
import type { ChipData } from '@commonTypes/study/studyHeader';

const content = {
    header: {
        title: 'Toyota PRIME Token System',
        roleDetails: [
            {
                role: 'Senior UX Engineer',
                location: 'Plano, TX (Hybrid)',
                startDate: '2025',
                endDate: '2026',
            },
        ],
        description: [
            'I led token architecture, the Figma component library and technical planning for PRIME, Toyota Motor North America\'s design system. I built a multi-brand token framework in TypeScript and an automated pipeline that syncs it with Figma variables.',
            'The framework defines 680 primitive and theme tokens and 120 component tokens. It supports SCaFT and Toyota today and is set up to add Lexus and more.',
        ],
        image: [
            {
                src: variablesImage,
                variant: 'banner' as const,
                caption: 'The Figma variable collections: a theme collection with light and dark values, and primitives for the shared core, SCaFT and Toyota.',
                alt: 'The Figma variables panel in dark mode. The collections are theme, _primitives, _primitives-scaft and _primitives-toyota. The theme collection lists color variables for content, surface and border, each with a light and a dark value that points to a primitive.',
            },
        ],
        chips: [
            { label: 'Design Systems' },
            { label: 'Design Tokens' },
            { label: 'Automation' },
            { label: 'Multi-Brand' },
        ] as ChipData[],
    },
    sections: [
        {
            order: 1,
            title: 'Context',
            description: [
                'I joined Toyota as a UX Engineer to apply my design and code expertise to PRIME. PRIME is an existing React design system with 80+ components in production. It served one organization, Supply Chain and Fulfillment (SCaFT). The goal was to expand it globally across multiple brands in marketing, dealer tooling and manufacturing.',
                'My role in the token effort was to scale the system beyond PRIME. Consumers could be React, Angular and Swift applications, so the framework could not depend on PRIME\'s React components.',
                'Two things complicated the plan. Design introduced tokens as a best practice before the business had set its scaling goals. Engineering then dropped a planned migration from MUI v5 to shadcn/ui partway through the project, which changed the implementation plans.',
                'With codebases shifting and budgets unsettled, I took technical ownership of the token framework and the automation between Figma and code.',
            ],
            image: [
                {
                    src: proposalImage,
                    caption: 'Part of my proposal to leadership on investing in tokens, what they do for the team, and how they support Toyota\'s business goals.',
                    alt: 'Five Figma boards comparing the token systems of GitHub Primer, IBM Carbon, Google Material 3, Salesforce Lightning 2 and the Atlassian Design System. Beside them are four proposal pages: Design Tokens, Value Proposal, Lift and Level of Effort, and a color token proof of concept.',
                },
            ],
        },
        {
            order: 2,
            title: 'Contributions',
            items: [
                {
                    label: 'Figma Library Architecture',
                    text: 'I integrated multi-brand tokens into the existing Figma libraries and kept refactors to a minimum. Binding tokens to assets was expected to make migration easier for product teams and simplify developer handoff.',
                },
                {
                    label: 'Token Architecture & Taxonomy',
                    text: 'I wrote the token framework in TypeScript for engineering teams to build on. PRIME already used TypeScript, so the framework fit the team\'s stack. I chose it over Style Dictionary for type safety, code generation and easy fit with frontend toolchains. It replaces third-party plugins such as Tokens Studio.',
                },
                {
                    label: 'Figma-to-Code Automation',
                    text: 'Engineering doubted that Figma and code could stay aligned, so I built a CLI in Node.js and TypeScript, with AI agents. It uses Figma\'s REST API to pull library snapshots and compare variables with the TypeScript definitions. It then creates, updates or deletes Figma variables to match the code. I used it to build the token system.',
                },
                {
                    label: 'Developer Handoff Pipeline',
                    text: 'I designed and planned an automated pipeline that would read tokenized components. It would write Markdown specs with component logic, token maps and CSS snippets for developers and AI coding agents.',
                },
                {
                    label: 'Project Leadership',
                    text: 'I ran sprint planning for five contributing designers and held alignment meetings with engineering throughout the year, until I handed the work off. I wrote 12 epics and 200+ stories, creating and importing the stories in bulk with Python and AI.',
                },
            ],
            image: [
                {
                    src: ecosystemImage,
                    variant: 'column' as const,
                    caption: 'Tokens would fit into the existing multi-library ecosystem and carry across React, Angular and Swift applications.',
                    alt: 'A diagram of the PRIME ecosystem. Figma and code libraries for tokens, components, assets, data visualization, data tables and SCaFT sit in one group. Arrows lead to SCaFT tools such as GPS and Pipeline. They also reach Angular apps such as Toyota.com and Dealer Daily, and React apps such as Smart Path and PCO.',
                },
            ],
        },
        {
            order: 3,
            title: 'Outcomes',
            description: [
                'Leadership approved the token proposal and approved it again as priorities evolved.',
                'I architected the multi-brand token framework and the automation that syncs it with Figma. I applied the tokens to Figma components manually and through automation where possible. When I left, 15 components were mapped and 3 more were in development. The coded components were in progress.',
                'In the short term, 40 SCaFT product teams were expected to adopt the tokens across 10 web apps, with more as themes expand. The framework gives design and engineering one source of truth, and new brands and themes can be added to it. Once the tokens are fully applied, they are expected to reduce the manual upkeep between design and code.',
            ],
            image: [
                {
                    src: sprintImage,
                    variant: 'column' as const,
                    caption: 'A sprint planning board for the contributing designers, with the sprint goal and each person\'s tickets.',
                    alt: 'A FigJam board for Sprint 75, 07/29 to 08/11. A sprint goal panel on the left reads Align with dev on expectation of dev hand-off documentation. Five colored columns hold one designer\'s tickets each, with story points per person. Sticky notes below cover token work and assignments.',
                },
            ],
        },
        {
            order: 4,
            title: 'Deliverables',
            descriptionBullets: [
                'Token research and accessibility audits for color and themes, used to structure dark mode and multi-theme support',
                'Figma libraries bound to multi-brand and dark mode variables',
                'A TypeScript token taxonomy for multiple brands and modes',
                'A CLI that syncs, compares and audits Figma variables',
                'A designed and planned handoff pipeline for Markdown and CSS specs',
                '12 epics, 200+ stories, technical documentation and sprint plans for adoption',
            ],
        },
        {
            order: 5,
            title: 'Opportunities',
            description: ['Looking back, I would change two things.'],
            items: [
                {
                    label: 'Plan for Shifting Priorities',
                    text: 'Priorities shifted several times. Answers I needed often took more than a month, and some never came. I would define fallback plans from day one, so the team keeps shipping small, useful pieces while direction settles.',
                },
                {
                    label: 'Engineering Prioritization',
                    text: 'Engineers were busy with other work, so conversations about the tokens kept moving down the list. Stakeholders also turned over, so each conversation had to start again. I would ask for a named engineering sponsor early, so the work had a clear owner.',
                },
            ],
        },
    ],
};

export default content;
