import { useEffect } from 'react';

export type MetaProps = {
  title?: string;
  metaDescription?: string;
};

const Meta: React.FC<MetaProps> = ({ title, metaDescription }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    if (metaDescription) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', metaDescription);
    }
  }, [title, metaDescription]);

  return null;
};

export default Meta;