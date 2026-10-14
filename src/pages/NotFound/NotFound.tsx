import React, { useState } from 'react';
import Link from '@components/Link';
import Header from '@components/Header';
import Meta from '@components/Meta';
import { content } from '@pages/NotFound/resources/content';
import styles from './NotFound.module.scss';

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
  <div className={styles.wrapper}>
    <div className={styles.main}>
      <div className={styles.copy}>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
      <Link to={content.button.src} styleAs='button' iconName='arrow-right' className={styles['button-404']}>{content.button.label}</Link>
    </div>
  </div>
  </div>
  );
};

export default NotFound;
