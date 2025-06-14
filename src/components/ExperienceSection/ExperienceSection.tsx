import React from 'react';

type ExperienceItem = {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
};

const experience: ExperienceItem[] = [
  {
    title: "Staff Product Designer",
    company: "ServiceNow",
    location: "Remote",
    startDate: "Feb 2024",
    endDate: "Present",
    bullets: [
      "Led design and documentation for an internal component library, then guided teams through a smooth transition to ServiceNow’s customer-facing design system.",
      "Applied deep accessibility expertise, collaborating with consultants and guiding designers on accessible patterns and workflows.",
      "Directed design for an AI-powered internal research tool that reduced manual synthesis and accelerated team access to qualitative insights."
    ]
  },
  {
    title: "Senior Product Designer",
    company: "Albertsons",
    location: "Remote",
    startDate: "Jun 2023",
    endDate: "Sep 2023",
    bullets: [
      "Shaped the design system for a merchandising platform used across 5,000+ stores, delivering reusable components and documentation that improved design consistency.",
      "Collaborated with 20+ product teams to align on system usage and accelerate implementation across enterprise tools."
    ]
  },
  {
    title: "Senior Product Designer",
    company: "ActBlue",
    location: "Remote",
    startDate: "Mar 2022",
    endDate: "May 2023",
    bullets: [
      "Reduced support overhead by $1.5M annually by designing reporting tools and third-party integrations for the entity admin platform.",
      "Owned the design system and led accessibility efforts, improving consistency and inclusive design across product teams."
    ]
  },
  {
    title: "Senior Product Designer",
    company: "Routable",
    location: "Remote",
    startDate: "Nov 2021",
    endDate: "Mar 2022",
    bullets: [
      "Designed B2B invoicing tools for financial power users, streamlining bulk workflows and reducing task time through features like batch actions and invoice grouping.",
      "Conducted user interviews with small business clients and used insights to simplify key flows, improving usability and reducing support tickets."
    ]
  },
  {
    title: "Senior Product Designer",
    company: "FireHydrant",
    location: "Remote",
    startDate: "Nov 2020",
    endDate: "Nov 2021",
    bullets: [
      "Designed core features and workflows for a B2B incident response platform used by enterprise engineering teams at companies like Peloton, Spotify, and Snapchat.",
      "Built the in-house design system to unify product experiences and speed up design and engineering delivery across teams."
    ]
  },
  {
    title: "UX Designer",
    company: "Indeed",
    location: "Remote",
    startDate: "Feb 2020",
    endDate: "Oct 2020",
    bullets: [
      "Designed and documented a global atomic design system adopted across B2B and B2C products for web and mobile.",
      "Collaborated with product and engineering to embed accessibility, responsiveness, and localization into scalable UI patterns used by over 100 designers."
    ]
  },
  {
    title: "Senior UX Engineer",
    company: "Visa",
    location: "Austin, TX",
    startDate: "Nov 2015",
    endDate: "Feb 2020",
    bullets: [
      "Designed and developed an atomic design system for enterprise SaaS tools used in fraud management, transaction search, and analytics.",
      "Managed front-end component libraries, reviewed code, and collaborated with engineering teams to deliver scalable, accessible interfaces.",
      "Led usability testing and cross-functional workshops to align global product teams around consistent UX standards."
    ]
  }
];

const ExperienceSection: React.FC = () => (
  <ul>
    {experience.map((job) => (
      <li key={`${job.title}-${job.company}-${job.startDate}`}>
        <strong>{job.title}</strong><br />
        {job.company} | {job.location} |{' '}
        <span>
          {job.startDate}
          <span aria-hidden="true"> &mdash; </span>
          <span className="sr-only"> to </span>
          {job.endDate}
        </span>
        <ul>
          {job.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
);

export default ExperienceSection;