import primaryImage from '@assets/about/primary-image-min.jpg';
import secondaryImage from '@assets/about/secondary-image-min.png';
import tertiaryImage from '@assets/about/tertiary-image-min.png';
import quaternaryImage from '@assets/about/quaternary-image-min.jpg';

export const images = [
  {
    src: primaryImage,
    alt: 'A tortoiseshell cat named Midna naps with her eyes closed on a couch, curled up next to a blue fleece blanket. Midna is the most chaotic rescue tortoiseshell cat. She secretly does all of my code, too.',
    iconFallback: 'cat',
    altFallback: 'A cat icon as fallback for the image of Midna the cat.',
  },
  {
    src: secondaryImage,
    alt: 'A black dog named Kirby lies on a couch with its head resting on a brightly colored video game controller. Kirby is a very lazy rescue dog.',
    iconFallback: 'controller',
    altFallback: 'A controller icon as fallback for the image of Kirby the dog.',
  },
  {
    src: tertiaryImage,
    alt: 'A gray cat named Beauregard sits upright on a bed, wearing a pink bow collar with a fish-shaped name tag. The bow has little black skulls on it, because Beau is a little punk rock. Beau is also a rescue.',
    iconFallback: 'paw',
    altFallback: 'A paw icon as fallback for the image of Beauregard the cat.',
  },
  {
    src: quaternaryImage,
    // TODO(jax): add a one-line personality note for Zelda like the others have.
    alt: 'A black cat named Zelda sleeps belly-up on a blue and gray rug beside a torn cardboard shipping box.',
    iconFallback: 'cat',
    altFallback: 'A cat icon as fallback for the image of Zelda the cat.',
  },
];
