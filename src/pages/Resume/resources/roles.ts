import { studyLinks } from '@constants/studyLinks';

// Resume roles, newest first. Copy follows the resume PDF, revised for the site's copy rules.
// Dates keep the month (the PDF does). Visa is one entry with the promotion on a second line.

export type ResumeRole = {
  title: string;
  company: string;
  logo: string; // key into resources/logos.ts
  type?: string; // "Contract" where the PDF says so
  location: string;
  startDate: string;
  endDate?: string;
  promotion?: string; // second soft line under the dates (Visa)
  bullets: string[];
  studyHref?: string; // case study for this role
  studyName?: string; // visually hidden part of the link name
};

export const roles: ResumeRole[] = [
  {
    title: 'Senior Design Engineer',
    company: 'Spectrum',
    logo: 'spectrum',
    type: 'Contract',
    location: 'Remote',
    startDate: 'Sep 2026',
    endDate: 'Present',
    bullets: [
      'Migrate and refactor components in Nova, the eCommerce design system, in Figma and in code to apply design tokens.',
      'Support product designers as they move their work onto the tokenized components.',
      'Ship token-based components to production while product teams adopt them.',
    ],
  },
  {
    title: 'Senior UX Engineer',
    company: 'Toyota',
    logo: 'toyota',
    type: 'Contract',
    location: 'Plano, TX (hybrid)',
    startDate: 'Oct 2025',
    endDate: 'Sep 2026',
    bullets: [
      'Architected an enterprise design token framework and an automated pipeline from Figma to multi-platform production code.',
      'Designed the token taxonomy, rollout strategy and adoption roadmap. The system can now grow from supply-chain products into other enterprise applications.',
      'Supported 40 product teams on the React design system with component adoption, integration fixes and release coordination.',
      'Authored technical specifications and maintained Zeroheight documentation. Contributed to accessible component design and code.',
    ],
    studyHref: studyLinks.toyota,
    studyName: 'Toyota',
  },
  {
    title: 'Staff UI/UX Designer',
    company: 'ServiceNow',
    logo: 'servicenow',
    type: 'Contract',
    location: 'Remote',
    startDate: 'Feb 2024',
    endDate: 'Oct 2025',
    bullets: [
      'Led the design of an AI-driven insights platform that centralizes qualitative research, so teams share knowledge and skip redundant studies.',
      'Built accessibility into reusable patterns and design documentation for designers across the org.',
      'Launched a shared component library that cut repetitive UI design by 60%.',
    ],
    studyHref: studyLinks.servicenow,
    studyName: 'ServiceNow',
  },
  {
    title: 'Senior Product Designer',
    company: 'Albertsons',
    logo: 'albertsons',
    type: 'Contract',
    location: 'Remote',
    startDate: 'Jun 2023',
    endDate: 'Sep 2023',
    bullets: [
      'Shaped reusable components and documentation for a merchandising platform serving 5,000 stores.',
      'Drove adoption across 20 teams by aligning on shared patterns and guiding implementation in enterprise tools.',
    ],
  },
  {
    title: 'Senior Product Designer',
    company: 'ActBlue',
    logo: 'actblue',
    location: 'Remote',
    startDate: 'Mar 2022',
    endDate: 'May 2023',
    bullets: [
      'Redesigned core admin and integration flows to simplify reporting and setup. Helped cut support costs by an estimated $1.5M a year.',
      'Partnered with engineers to scope complex integration logic, with error handling and sync visibility across third-party systems.',
      'Led accessibility efforts and documented inclusive patterns that several product teams adopted.',
    ],
    studyHref: studyLinks.actblue,
    studyName: 'ActBlue',
  },
  {
    title: 'Senior Product Designer',
    company: 'Routable',
    logo: 'routable',
    location: 'Remote',
    startDate: 'Nov 2021',
    endDate: 'Mar 2022',
    bullets: [
      'Streamlined bulk invoicing for financial power users with batch actions and grouping that reduced task time.',
      'Reduced support volume by improving key invoicing flows based on interviews with small business clients.',
    ],
  },
  {
    title: 'Senior Product Designer',
    company: 'FireHydrant',
    logo: 'firehydrant',
    location: 'Remote',
    startDate: 'Nov 2020',
    endDate: 'Nov 2021',
    bullets: [
      'Architected incident management workflows for enterprise engineering teams (Spotify, Peloton, Snapchat) that reduce cognitive load during high-severity outages.',
      'Designed workflows for role assignment, communication handoff and postmortem documentation.',
    ],
  },
  {
    title: 'UX Designer',
    company: 'Indeed',
    logo: 'indeed',
    location: 'Remote',
    startDate: 'Feb 2020',
    endDate: 'Oct 2020',
    bullets: [
      'Designed shared UI patterns that teams adopted across B2B and B2C products on web and mobile.',
      'Wrote component documentation with accessibility, localization and responsiveness built in, for assets used by over 100 designers.',
    ],
    studyHref: studyLinks.indeed,
    studyName: 'Indeed',
  },
  {
    title: 'Senior UX Engineer',
    company: 'Visa',
    logo: 'visa',
    location: 'Austin, TX',
    startDate: 'Nov 2017',
    endDate: 'Feb 2020',
    promotion: 'Promoted from UX Engineer, Nov 2015 – Nov 2017',
    bullets: [
      'Helped build the front-end framework library that hundreds of developers across Visa used globally.',
      'Redesigned fraud investigation tools for enterprise clients. Led usability testing and alignment workshops that contributed to a 20% reduction in case resolution SLAs.',
      'Designed transaction reporting and tokenization workflows for e-commerce and omni-channel merchants, balancing regulatory needs with a streamlined experience.',
    ],
  },
];
