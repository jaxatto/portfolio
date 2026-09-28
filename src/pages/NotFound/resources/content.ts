import { mainLinks } from '@constants/mainLinks';
import { contactInfo } from '@constants/contactInfo';
import copy from './content.json';

export const content = {
  ...copy,
  button: { ...copy.button, src: mainLinks.home },
  subtext: {
    ...copy.subtext,
    label: contactInfo.email.label,
    src: contactInfo.email.src,
  },
};
