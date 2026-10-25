import { mainLinks } from '#constants/mainLinks';

export const content = {
  title: '404',
  // One is picked at random each time the page shows. TODO(jax): provisional copy, edit freely.
  descriptions: [
    'Well, this wasn’t in the flowchart.',
    'This one didn’t make it past design review.',
    'Looks like this page got cut from the scope.',
    'Still in the backlog. Probably.',
    'We checked the sitemap. It isn’t there either.',
    'Even the design system doesn’t have this one.',
    'This link took a wrong turn at handoff.',
  ],
  button: {
    label: 'Return to portfolio',
    src: mainLinks.home,
  },
};
