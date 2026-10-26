import React from 'react';
import { useEffect } from 'react';

// Keeps the title and description current on client-side navigation. Crawlers get each route's own
// tags from scripts/prerender.ts (D-122).

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
