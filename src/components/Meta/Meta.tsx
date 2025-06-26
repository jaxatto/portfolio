import React from 'react';
import { useEffect } from 'react';

// Meta component for setting the document title and meta description
// This component updates the document's title and meta description based on the props provided.
// It is typically used in the main layout or individual pages to improve SEO and user experience.

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