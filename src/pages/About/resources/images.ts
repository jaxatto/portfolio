import content from './content.json';
import primaryImage from '@assets/about/primary-image-min.png';
import secondaryImage from '@assets/about/secondary-image-min.png';
import tertiaryImage from '@assets/about/tertiary-image-min.png';

// Alt text and fallbacks live in content.json; this only maps file names to bundled images.
const sources: Record<string, string> = {
  'primary-image-min.png': primaryImage,
  'secondary-image-min.png': secondaryImage,
  'tertiary-image-min.png': tertiaryImage,
};

export const images = content.images.items.map(({ file, ...rest }) => ({
  ...rest,
  src: sources[file],
}));
