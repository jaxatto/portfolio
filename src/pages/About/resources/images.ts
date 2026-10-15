import primaryImage from '@assets/about/primary-image-min.jpg';
import secondaryImage from '@assets/about/secondary-image-min.jpg';
import tertiaryImage from '@assets/about/tertiary-image-min.jpg';
import quaternaryImage from '@assets/about/quaternary-image-min.jpg';

// Order is Kirby, Beau, Midna, Zelda (pose and tone alternate). `alt` only describes the photo;
// the personality lines live in `caption`, which sighted visitors see under each photo.
// TODO(jax): captions are drafts, edit freely (Zelda's is new).
export const images = [
  {
    src: secondaryImage,
    name: 'Kirby',
    palette: 'primary',
    caption: 'A very lazy rescue.',
    alt: 'A black dog named Kirby with a white chest and a pink bandana looks up and to the side with a big open-mouthed smile.',
    iconFallback: 'paw',
    altFallback: 'A paw icon as fallback for the image of Kirby the dog.',
  },
  {
    src: tertiaryImage,
    name: 'Beau',
    palette: 'secondary',
    caption: 'A little punk rock. Also a rescue.',
    alt: 'A gray cat named Beauregard looks straight at the camera with wide golden eyes, sitting on a cream quilt and wearing a black collar with a tiny Christmas tree charm.',
    iconFallback: 'paw',
    altFallback: 'A paw icon as fallback for the image of Beauregard the cat.',
  },
  {
    src: primaryImage,
    name: 'Midna',
    palette: 'tertiary',
    caption: 'The most chaotic rescue. Secretly does all of my code.',
    alt: 'A tortoiseshell cat named Midna naps with her eyes closed on a couch, curled up next to a blue fleece blanket.',
    iconFallback: 'cat',
    altFallback: 'A cat icon as fallback for the image of Midna the cat.',
  },
  {
    src: quaternaryImage,
    name: 'Zelda',
    palette: 'quaternary',
    caption: 'Usually asleep somewhere hidden.',
    alt: 'A black cat named Zelda lies on a gray fleece blanket and looks at the camera with yellow-green eyes.',
    iconFallback: 'cat',
    altFallback: 'A cat icon as fallback for the image of Zelda the cat.',
  },
] as const;
