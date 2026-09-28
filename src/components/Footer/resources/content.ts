import { contactInfo } from "@constants/contactInfo";
import copy from "./content.json";

export const content = {
  ...copy,
  email: { ...copy.email, label: contactInfo.email.label, src: contactInfo.email.src },
  linkedin: { ...copy.linkedin, src: contactInfo.linkedin.src },
  resume: { ...copy.resume, src: contactInfo.resume.src },
  github: { ...copy.github, src: contactInfo.github.src },
};
