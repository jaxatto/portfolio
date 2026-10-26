import { studyLinks } from '#constants/studyLinks';

// Resume roles, newest first. The PDF carries the full bullets. The site shows one short summary per role (D-124).
// Dates keep the month (the PDF does). Visa is one entry with the promotion on a second line.

export type ResumeRole = {
  title: string;
  company: string;
  logo: string; // key into resources/logos.ts
  location: string;
  startDate: string;
  endDate?: string;
  promotion?: string; // second soft line under the dates (Visa)
  summary: string; // TODO(jax): drafts condensed from the PDF bullets (D-124). Edit freely.
  studyHref?: string; // case study for this role
  studyName?: string; // visually hidden part of the link name
};

export const roles: ResumeRole[] = [
  {
    title: 'Senior Design Engineer',
    company: 'Spectrum',
    logo: 'spectrum',
    location: 'Remote',
    startDate: 'Sep 2026',
    endDate: 'Present',
    summary:
      'Applying design tokens to the Nova eCommerce design system, in Figma and in code, and helping product designers move onto the new components.',
  },
  {
    title: 'Senior UX Engineer',
    company: 'Toyota',
    logo: 'toyota',
    location: 'Plano, TX (hybrid)',
    startDate: 'Oct 2025',
    endDate: 'Sep 2026',
    summary:
      'Architected the enterprise token framework and the Figma-to-code pipeline for PRIME, and supported the product teams adopting it.',
    studyHref: studyLinks.toyota,
    studyName: 'Toyota',
  },
  {
    title: 'Staff UI/UX Designer',
    company: 'ServiceNow',
    logo: 'servicenow',
    location: 'Remote',
    startDate: 'Feb 2024',
    endDate: 'Oct 2025',
    summary:
      'Led design of an AI insights platform for qualitative research and launched a shared component library with accessibility built in.',
    studyHref: studyLinks.servicenow,
    studyName: 'ServiceNow',
  },
  {
    title: 'Senior Product Designer',
    company: 'Albertsons',
    logo: 'albertsons',
    location: 'Remote',
    startDate: 'Jun 2023',
    endDate: 'Sep 2023',
    summary:
      'Shaped reusable components and documentation for a merchandising platform, and drove adoption across teams.',
  },
  {
    title: 'Senior Product Designer',
    company: 'ActBlue',
    logo: 'actblue',
    location: 'Remote',
    startDate: 'Mar 2022',
    endDate: 'May 2023',
    summary:
      'Redesigned admin and integration flows, partnered with engineers on sync logic, and led accessibility work that other teams adopted.',
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
    summary:
      'Streamlined bulk invoicing for financial power users and reduced support volume by improving the key invoicing flows.',
  },
  {
    title: 'Senior Product Designer',
    company: 'FireHydrant',
    logo: 'firehydrant',
    location: 'Remote',
    startDate: 'Nov 2020',
    endDate: 'Nov 2021',
    summary:
      'Architected incident management workflows for enterprise engineering teams, from role assignment to postmortem documentation.',
  },
  {
    title: 'UX Designer',
    company: 'Indeed',
    logo: 'indeed',
    location: 'Remote',
    startDate: 'Feb 2020',
    endDate: 'Oct 2020',
    summary:
      'Designed shared UI patterns and wrote component documentation with accessibility, localization and responsiveness built in, for assets used by over 100 designers.',
    studyHref: studyLinks.indeed,
    studyName: 'Indeed',
  },
  {
    title: 'Senior UX Engineer',
    company: 'Visa',
    logo: 'visa',
    location: 'Austin, TX',
    startDate: 'Nov 2015',
    endDate: 'Feb 2020',
    promotion: 'Promoted from UX Engineer, Nov 2015 – Nov 2017',
    summary:
      'Helped build the front-end framework library hundreds of developers used globally, and redesigned fraud investigation and transaction reporting tools for enterprise clients.',
  },
];
