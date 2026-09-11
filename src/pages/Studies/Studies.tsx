import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '#pages/NotFound';
import StudyTemplate from '#pages/Studies/components/StudyTemplate';

import indeedHeaderImage from './pages/Indeed/images/accessbility-annotations-min.png';
import indeedContributionsImage from './pages/Indeed/images/documentation-sample-min.png';
import indeedOutcomesImage from './pages/Indeed/images/home-before-after-min.png';
import type { ChipData } from '#components/ChipGroup';
import { studyLinks } from '#data/constants/studyLinks';
import actblueHeaderImage from './pages/ActBlue/images/header-min.png';
import actblueContextImage from './pages/ActBlue/images/figjam-min.png';
import actblueContributionsImage from './pages/ActBlue/images/handoff-min.png';
import actblueOutcomesImage from './pages/ActBlue/images/grid-min.png';
import actblueDeliverablesImage from './pages/ActBlue/images/responsive-specs-min.png';
import servicenowHeaderImage from './pages/ServiceNow/images/header-min.png';
import servicenowContextImage from './pages/ServiceNow/images/workflow-min.png';
import servicenowContributionsImage from './pages/ServiceNow/images/screens-min.png';
import servicenowOutcomesImage from './pages/ServiceNow/images/annotations-min.png';
import servicenowDeliverablesImage from './pages/ServiceNow/images/footer-min.png';

// import indeedContextImage from './images/name-min.png';
// import indeedDeliverablesImage from './images/name-min.png';

const indeedContent = {
	header: {
		title: 'Indeed Design System',
		roleDetails: [
			{
				role: 'UX Designer',
				startDate: '2020',
				endDate: '',
			},
		],
		description: [
			"I joined Indeed as a UX Designer to support their internal design system team during a period of rapid growth. Over the course of several months, I helped evolve the system's component library, improved adoption workflows, and guided cross-functional teams on scalable, accessible UI implementation.",
		],
		chips: [
			{ label: 'B2B', theme: 'tertiary' },
			{ label: 'B2B2C', theme: 'tertiary' },
			{ label: 'PeopleTech', theme: 'tertiary' },
			{ label: 'Design Systems', theme: 'secondary' },
			{ label: 'Accessibility', theme: 'secondary' },
			{ label: 'Documentation', theme: 'secondary' },
			{ label: 'Collaboration', theme: 'secondary' },
			{ label: 'Figma', theme: 'primary' },
			{ label: 'Notion', theme: 'primary' },
		] as ChipData[],
		image: [
			{
				src: indeedHeaderImage,
				caption:
					'Collaborated on accessibility documentation for design handoff to engineering.',
				alt: 'Sample of accessibility annotations in a Figma design file, showing how to annotate designs for developers.',
			},
		],
	},
	sections: [
		{
			order: 1,
			title: 'Context',
			titleEmoji: '🧭',
			description: [
				"The internal design system was in active development and supporting a wide range of consumer and business products. I stepped in to strengthen component quality, shape contribution processes, and help teams align on consistent patterns during a pivotal time in the system's maturity as a rebrand was underway.",
			],
			descriptionBullets: [],
			image: [],
		},
		{
			order: 2,
			title: 'Contributions',
			titleEmoji: '🛠️',
			description: [
				'I led hands-on updates to the Figma library—refining components for consistency, accessibility, and themeability. I partnered with engineers to ensure parity between design and code, and created detailed documentation to support usage across teams.',
				'To improve efficiency, I introduced a lightweight triage workflow for incoming component requests and contributions. This clarified ownership and reduced friction for designers contributing back to the system.',
				'I also mentored a junior designer new to systems work, helping them develop review skills and take ownership of key parts of the library.',
			],
			descriptionBullets: [],
			image: [
				{
					src: indeedContributionsImage,
					caption:
						'Example of component documentation with accessibility and localization guidance.',
					alt: 'A screenshot of a Figma component documentation page, showing detailed information about the component, including accessibility and localization guidance.',
				},
			],
		},
		{
			order: 3,
			title: 'Outcomes',
			titleEmoji: '📈',
			description: [
				'By the time I transitioned off the team, the system was more maintainable, better documented, and easier to adopt. System usage had expanded across different product areas, and the contribution process was more approachable for new designers and engineers. The team I supported was better positioned to scale the system going forward.',
			],
			descriptionBullets: [],
			image: [
				{
					src: indeedOutcomesImage,
					caption: "System in use across Indeed.com's job seeker platform.",
					alt: 'A before and after demonstration of the Indeed.com home page with the design system applied. The new home page uses the design system and looks more modern and organized. Accessibility is vastly improved.',
				},
			],
		},
		{
			order: 4,
			title: 'Deliverables',
			titleEmoji: '📦',
			description: [],
			descriptionBullets: [
				'Updated and documented Figma component library',
				'Contribution triage process and review workflows',
				'Collaboration with engineering on implementation specs',
				'Adoption support for internal product teams',
				'Mentorship and onboarding for junior design team members',
			],
			image: [],
		},
	],
};

const indeedMeta = {
	title: 'UX Design Systems Work at Indeed – Jax Engel',
	description:
		'Led design system updates at Indeed, improving component quality, documentation, and team workflows to support scalable, accessible UI across internal tools.',
	keywords: [],
	linkUrl: studyLinks.indeed,
};

const actblueContent = {
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
			"Campaign admins needed to sync donor data from ActBlue into Salesforce, but the original integration was clunky, confusing, and handled entirely through support tickets. Users couldn't set it up themselves, and even when it worked, they had no idea what was syncing or why things failed.",
			'I joined the team to lead design on a complete rebuild of this system, rethinking the end-to-end experience for transparency, reliability, and maintainability.',
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
				src: actblueHeaderImage,
				caption:
					'Original screen for validating if a notification sent successfully. Only visible to staff',
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
				"Even small mistakes could silently break things, and there was no way for users to recover on their own. Most didn't even know there was a problem until Salesforce was missing data.",
				"Our users came from a mix of backgrounds, and most weren't hired for technical work. In many cases, the person setting things up was a volunteer with limited time and context.",
				'The new experience needed to support a wide range of campaign setups without overwhelming people. That meant clearer guidance, better visibility into sync status, and smart guardrails to help people get it right the first time.',
			],
			descriptionBullets: [],
			image: [
				{
					src: actblueContextImage,
					caption:
						'Figjam wireframes and discovery exercises throughout the project lifecycle. Developers were able to use this to organize the backend.',
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
					src: actblueContributionsImage,
					caption:
						'Full flow with annotations for developers. This was instrumental for QA.',
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
					src: actblueOutcomesImage,
					caption:
						'Selection of final screens from the workflow from beginning to end.',
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
					src: actblueDeliverablesImage,
					caption: 'Responsive flows annotated for implementation handoff.',
					alt: 'A screenshot of a Figma design file showing responsive flows for the ActBlue Salesforce integration with annotations for implementation handoff.',
				},
			],
		},
	],
};

const actblueMeta = {
	title: "Redesigning ActBlue's Salesforce Integration – Jax Engel",
	description:
		"Led end-to-end design of ActBlue's Salesforce integration, improving setup, sync visibility, and error handling to support flexible campaign workflows and reduce support costs by $1.5M annually.",
	keywords: [],
	linkUrl: studyLinks.actblue,
};

const servicenowContent = {
	header: {
		title: 'ServiceNow AI Research Tool',
		roleDetails: [
			{
				role: 'Staff UI/UX Designer',
				startDate: '2024',
				endDate: 'Present',
			},
		],
		description: [
			'Researchers across the organization were collecting thousands of open-ended responses from surveys, workshops, and interviews. Turning that input into something useful took many hours of manual effort and often got deprioritized.',
			'This project is an internal tool that uses AI to group similar responses and suggest themes with an estimated 95% accuracy rate. I joined the project after the initial prototype was built to help shape the user experience, support implementation, and validate real research use cases.',
		],
		chips: [
			{ label: 'Internal Tools', theme: 'tertiary' },
			{ label: 'Enterprise', theme: 'tertiary' },
			{ label: 'AI/ML', theme: 'tertiary' },
			{ label: 'UX Architecture', theme: 'secondary' },
			{ label: 'Documentation', theme: 'secondary' },
			{ label: 'User Research', theme: 'secondary' },
			{ label: 'Wireframing', theme: 'secondary' },
			{ label: 'Figma', theme: 'primary' },
		] as ChipData[],
		image: [
			{
				src: servicenowHeaderImage,
				caption:
					'Prototype screen for selecting a theming strategy before processing survey input.',
				alt: 'Screenshot of the prototype showing a form with two strategy options for how AI themes will be generated and labeled.',
			},
		],
	},
	sections: [
		{
			order: 1,
			title: 'Context',
			titleEmoji: '🧭',
			description: [
				'The first version of the tool was already functional when I joined. I partnered with the original creator to shape the experience around real research workflows, explore the core flow, and identify ways to reduce friction.',
				'Open-ended feedback needs to be coded into themes before it can be analyzed. This process is usually manual and time consuming, often taking 10 hours or more to process just 100 responses. With multiple projects and thousands of inputs, researchers were often overwhelmed.',
				'This tool simplifies that process. Users upload responses, define a few themes, and get a fully coded dataset in return. The goal was to make the workflow faster, easier to navigate, and usable by non-experts, not just trained researchers.',
			],
			descriptionBullets: [],
			image: [
				{
					src: servicenowContextImage,
					caption:
						'Final journey map showing branching paths, repeated states, and decision points across the flow.',
					alt: 'User journey map illustrating multiple flow paths, repeat states, and decision points throughout the research analysis experience.',
				},
			],
		},
		{
			order: 2,
			title: 'Contributions',
			titleEmoji: '🛠️',
			description: [
				"I helped bring structure to an early concept by framing how the experience should adapt to real research scenarios, where inputs are messy and processes aren't always linear.",
				'From there, I simplified the interaction model and reworked how guidance showed up in the tool, making it more focused and less interruptive. I used low-fidelity layouts to shift the conversation toward content and flow, then moved into high-fidelity designs using the internal design system to bring it into the corporate design language.',
				'This work helped the team realign the prototype around actual research behavior and set the foundation for what is now being prepped for user testing.',
			],
			descriptionBullets: [],
			image: [
				{
					src: servicenowContributionsImage,
					caption:
						'Screens showing early layout restructuring and simplified task flow.',
					alt: 'Series of early screen designs including wireframes and mid-fidelity layouts, focused on simplifying the user flow and task structure.',
					corners: 'square',
				},
			],
		},
		{
			order: 3,
			title: 'Outcomes',
			titleEmoji: '📈',
			description: [
				"The updated design helped shape how the team talks about the tool and how it's being built. Several of the interaction and flow changes have already made it into the working prototype.",
				'A demo of the tool, including early flow updates, was presented to senior leadership and received strong support. While design fidelity is currently limited by the prototype platform, the long-term plan is to move to a more flexible system that can better reflect the intended experience.',
				"We're now preparing for user testing. The research will help validate the current flow, guide content updates, and inform the next round of design improvements.",
			],
			descriptionBullets: [],
			image: [
				{
					src: servicenowOutcomesImage,
					caption:
						'Updated Figma designs with notes on layout logic, interaction behavior, and responsive patterns.',
					alt: 'Figma board showing updated high-fidelity designs, responsive layouts, and interaction notes organized by screen type and use case.',
				},
			],
		},
		{
			order: 4,
			title: 'Deliverables',
			titleEmoji: '📦',
			description: [],
			descriptionBullets: [
				'Revised user journey covering key states and branching paths',
				'Wireframes exploring improved layout and flow',
				'High-fidelity designs using design system styles and components',
				'Responsive layouts with annotated interaction and content behavior in Figma',
				'Ongoing design support and collaboration with research, engineering, and content',
			],
			image: [
				{
					src: servicenowDeliverablesImage,
					caption:
						'Final proposal for the strategy selection screen, designed with Horizon system components.',
					alt: 'High-fidelity mockup of the final strategy selection screen, designed with internal system components and updated layout structure.',
				},
			],
		},
	],
};

const servicenowMeta = {
	title: "Improving ServiceNow's AI Research Tool – Jax Engel",
	description:
		'Led UX design for an internal AI research tool at ServiceNow, improving flow, layout, and in-tool guidance to support real research workflows and prepare the product for testing and future scaling.',
	keywords: [],
	linkUrl: studyLinks.servicenow,
};

// Map slugs to their study content and metadata
const studies = {
	indeed: {
		content: indeedContent,
		meta: indeedMeta,
	},
	actblue: {
		content: actblueContent,
		meta: actblueMeta,
	},
	servicenow: {
		content: servicenowContent,
		meta: servicenowMeta,
	},
};

const StudyPage: React.FC = () => {
	const { slug } = useParams<{ slug: keyof typeof studies }>();
	const study = slug ? studies[slug] : undefined;

	if (!study) return <NotFound />;

	return <StudyTemplate meta={study.meta} content={study.content} />;
};

export default StudyPage;
