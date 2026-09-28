import { contactInfo } from "@constants/contactInfo";
import copy from "./content.json";

export const content = {
  heading: copy.heading,
  description: copy.description,
  button: copy.button,
  byline: copy.byline,
  resumeHref: contactInfo.resume.src,
  email: {
    label: contactInfo.email.label,
    src: contactInfo.email.src,
  },
  linkedin: {
    label: copy.linkedinLabel,
    src: contactInfo.linkedin.src,
  },
};
