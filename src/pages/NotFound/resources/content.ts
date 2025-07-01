import { mainLinks } from '@constants/mainLinks';
import { contactInfo } from '@constants/contactInfo';

export const content = {
  title: '404',
  description: 'Well, this wasn’t in the flowchart.',
  button: {
    label: 'Return to portfolio',
    src: mainLinks.home,
  },
  subtext: {
    preText: 'Something broken? Let me know at',
    label: contactInfo.email.label,
    endText: `.`,
    srOnly: '(opens email client)',
    src: contactInfo.email.src,
  },
};