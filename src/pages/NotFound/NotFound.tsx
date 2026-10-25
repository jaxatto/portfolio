import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '#components/Icon';
import Header from '@components/Header';
import Meta from '@components/Meta';
import { content } from '@pages/NotFound/resources/content';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  // Picked once per visit (state initializer), so it doesn't change on re-render.
  const [description] = useState(
    () => content.descriptions[Math.floor(Math.random() * content.descriptions.length)],
  );

  return (
    // The page keeps its own dark ground; the shared nav header sits on it, recolored via tokens.
    <div className={styles.page}>
      <Meta
        title="Page not found | Jax Engel"
        metaDescription="This page doesn’t exist. Head back to Jax Engel’s portfolio."
      />
      <Header />
      {/* The skip link in the header lands here. Not a control, so it draws no ring (D-082). */}
      <main id="main-content" tabIndex={-1} className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.copy}>
            <h1 className={styles.title}>{content.title}</h1>
            <p className={styles.description}>{description}</p>
          </div>
          <Link to={content.button.src} className={styles.button}>
            {content.button.label}
            <Icon name="arrow-right" className={styles.icon} aria-hidden="true" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
