import { contactInfo } from "@constants/contactInfo";
import copy from "./content.json";

export const content = { ...copy, buttonHref: contactInfo.resume.src };
