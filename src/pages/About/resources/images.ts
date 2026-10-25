import primaryImage from '#assets/about/primary-image-min.jpg?size';
import secondaryImage from '#assets/about/secondary-image-min.jpg?size';
import tertiaryImage from '#assets/about/tertiary-image-min.jpg?size';
import quaternaryImage from '#assets/about/quaternary-image-min.jpg?size';

// Order is Kirby, Beau, Midna, Zelda (pose and tone alternate). `alt` only describes the photo;
// the personality lines live in `caption`, which sighted visitors see under each photo.
// Captions are Jax's flavor text.
export const images = [
  {
    ...secondaryImage,
    name: 'Kirby',
    palette: 'primary',
    caption: 'Sweet and cuddly boy.',
    alt: 'A black dog named Kirby with a white chest and a pink bandana looks up and to the side with a big open-mouthed smile.',
    iconFallback: 'paw',
    altFallback: 'A paw icon as fallback for the image of Kirby the dog.',
  },
  {
    ...tertiaryImage,
    name: 'Beau',
    palette: 'secondary',
    caption: 'Menace to society.',
    alt: 'A gray cat named Beauregard looks straight at the camera with wide golden eyes, sitting on a cream quilt and wearing a black collar with a tiny Christmas tree charm.',
    iconFallback: 'paw',
    altFallback: 'A paw icon as fallback for the image of Beauregard the cat.',
  },
  {
    ...primaryImage,
    name: 'Midna',
    palette: 'tertiary',
    caption: 'Thinking evil thoughts.',
    alt: 'A tortoiseshell cat named Midna naps with her eyes closed on a couch, curled up next to a blue fleece blanket.',
    iconFallback: 'cat',
    altFallback: 'A cat icon as fallback for the image of Midna the cat.',
  },
  {
    ...quaternaryImage,
    name: 'Zelda',
    palette: 'quaternary',
    caption: 'Having zero thoughts.',
    alt: 'A black cat named Zelda sits on a gray-blue blanket, her paws stretched out in front of her, and glances off to the side with yellow-green eyes.',
    iconFallback: 'cat',
    altFallback: 'A cat icon as fallback for the image of Zelda the cat.',
  },
] as const;
