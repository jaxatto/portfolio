export type StudySectionProps = {
  title?: string;
  titleEmoji?: string;
  description?: string[];
  descriptionBullets?: string[];
  image?: Array<{ src: string; alt?: string; caption?: string }>;
  order?: number;
};