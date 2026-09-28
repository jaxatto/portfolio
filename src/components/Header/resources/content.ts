import { mainLinks } from "@constants/mainLinks";
import copy from "./content.json";

export const content = {
  ...copy,
  links: copy.links.map(({ name, page }) => ({
    name,
    url: mainLinks[page as keyof typeof mainLinks],
  })),
};
