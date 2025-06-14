import React from 'react';

type SkillListProps = {
  items: string[];
  className?: string;
};

export const designSkills = [
  "Design Systems",
  "Accessibility",
  "UX/UI Design",
  "Prototyping & Wireframing",
  "Design Documentation",
  "Cross-Functional Collaboration",
  "Product Discovery",
  "User Research & Testing",
  "Mentorship & Leadership",
  "Agile Workflows",
  "Communication & Problem Solving"
];

export const toolSkills = [
  "Figma & FigJam",
  "HTML/CSS",
  "React",
  "GitHub & Copilot",
  "Storybook",
  "Jira & Confluence",
  "Notion",
  "Miro",
  "Adobe CC"
];

const SkillList: React.FC<SkillListProps> = ({ items, className }) => (
  <ul className={className}>
    {items.map((item, idx) => (
      <li key={item}>
        {item}
        {idx < items.length - 1 && (
          <span aria-hidden="true"> · </span>
        )}
      </li>
    ))}
  </ul>
);

export default SkillList;