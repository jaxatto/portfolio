import { contactInfo } from "@constants/contactInfo";
import copy from "./content.json";

export const content = {
  ...copy,
  email: { ...copy.email, label: contactInfo.email.label, src: contactInfo.email.src },
  linkedin: { ...copy.linkedin, src: contactInfo.linkedin.src },
};
