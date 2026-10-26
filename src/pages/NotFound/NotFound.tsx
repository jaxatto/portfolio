import React, { useSyncExternalStore } from 'react';
import clsx from 'clsx';
import Button from '#components/Button';
import Header from '#components/Header';
import Meta from '#components/Meta';
import { mainLinks } from '#constants/mainLinks';
import typography from '#styles/type.module.css';
import styles from './NotFound.module.css';

// One is picked at random each time the page shows, after the first render (D-159).
const descriptions = [
  'Well, this wasn’t in the flowchart.',
  'This one didn’t make it past design review.',
  'Looks like this page got cut from the scope.',
  'Still in the backlog. Probably.',
  'We checked the sitemap. It isn’t there either.',
  'Even the design system doesn’t have this one.',
  'This link took a wrong turn at handoff.',
];

// 404.html is pre-rendered once for every missing path, so the server and the first client render show
// the first line. The random pick follows, once per visit, so the HTML React attaches to matches.
let picked: number | null = null;
const subscribeNothing = () => () => {};
const pick = () => (picked ??= Math.floor(Math.random() * descriptions.length));

const NotFound: React.FC = () => {
  const description = descriptions[useSyncExternalStore(subscribeNothing, pick, () => 0)];

  return (
    // The page keeps its own dark ground; the shared nav header sits on it, recolored via tokens.
    <div className={styles.page} data-tone="inverse">
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
            <p className={clsx(typography.bodyLg, styles.description)}>{description}</p>
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
