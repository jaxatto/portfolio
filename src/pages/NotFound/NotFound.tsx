import React, { useEffect, useState } from 'react';
import Button from '#components/Button';
import Header from '#components/Header';
import Meta from '#components/Meta';
import { mainLinks } from '#constants/mainLinks';
import styles from './NotFound.module.css';

// One is picked at random each time the page shows, after the first render (D-154).
const descriptions = [
  'Well, this wasn’t in the flowchart.',
  'This one didn’t make it past design review.',
  'Looks like this page got cut from the scope.',
  'Still in the backlog. Probably.',
  'We checked the sitemap. It isn’t there either.',
  'Even the design system doesn’t have this one.',
  'This link took a wrong turn at handoff.',
];

const NotFound: React.FC = () => {
  // 404.html is pre-rendered once for every missing path, so the first render always shows the first line.
  // The random pick follows on mount, so the HTML React attaches to matches what it renders.
  const [description, setDescription] = useState(descriptions[0]);
  useEffect(() => {
    setDescription(descriptions[Math.floor(Math.random() * descriptions.length)]);
  }, []);

  return (
    // The page keeps its own dark ground; the shared nav header sits on it, recolored via tokens.
    <div className={styles.page} data-tone="error">
      <Meta
        title="Page not found | Jax Engel"
        metaDescription="This page doesn’t exist. Head back to Jax Engel’s portfolio."
      />
      <Header />
      {/* The skip link in the header lands here. Not a control, so it draws no ring (D-082). */}
      <main id="main-content" tabIndex={-1} className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.copy}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.description}>{description}</p>
          </div>
          <Button
            variant="inverted"
            to={mainLinks.home}
            icon="arrow-right"
            className={styles.button}
          >
            Return to portfolio
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
