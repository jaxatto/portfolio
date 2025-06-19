import { SkillCardProps } from "@pages/Resume/components/SkillCard";

export const focus = {
    heading: "Focus areas",
    description: "Spaces where I excel at solving real problems.",
    theme: "tertiary" as SkillCardProps["theme"],
    list: [
        "B2B",
        "SaaS",
        "FinTech",
        "PeopleTech",
        "DesignOps"
    ]
};

export const skills = {
    heading: "Skills and expertise",
    description: "How I approach product design: clear structure, flexible process, and collaboration that sticks.",
    theme: "secondary" as SkillCardProps["theme"],
    list: [
        "UX/UI Design",
        "Accessibility",
        "Design Systems",
        "Discovery",
        "Prototyping",
        "Documentation",
        "Agile",
        "Collaboration",
        "Research",
    ]
};

export const tools = {
    heading: "Tools and technology",
    description: "The tools I use to design, prototype, and collaborate.",
    theme: "primary" as SkillCardProps["theme"],
    list: [
        "Figma",
        "HTML/CSS",
        "React",
        "Miro",
        "Notion",
        "Confluence",
        "GitHub",
        "Storybook",
        "Adobe CC"
    ]
};