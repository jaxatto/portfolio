export type StudyImageProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  // 'banner': 3:1 crop from tablet up, 16:9 on phones. 'frame': the image sits in a sunken box,
  // padded at the top and sides and cropped by the box's bottom edge (D-050).
  variant?: 'default' | 'banner' | 'frame';
  corners?: 'round' | 'square' | string; // Allow any string for flexibility
};