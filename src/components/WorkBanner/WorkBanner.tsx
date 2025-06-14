import React from 'react';
import Image from '@components/Image';
import profileImg from '@assets/jax-engel-min.png';
import styles from './WorkBanner.module.scss';

const WorkBanner: React.FC = () => (
  <section className={styles['banner-wrapper']}>
    <div className={styles.banner}>
      <div className={styles['image-wrapper']}>
        <Image
          src={profileImg}
          alt="Jax Engel is a feminine-looking person with short length brown hair and brown eyes. In this photo she is outside in the sunshine, wearing a maroon hooded sweater."
          iconFallback="person"
          imgClassName={styles['image-main']}
          fallbackClassName={styles['image-fallback']}
        />
        <span className={styles.bubble} aria-hidden="true">👋</span>
      </div>                    
      <div className={styles.text}>
        <h1 className='heading-large'>Hello, I'm Jax!</h1>
        <p className='body-large' aria-hidden="true">
          I design product experiences that are{' '}
          <span className={styles.underline}>accessible</span>, scalable, and built on{' '}
          <span className={styles.underline}>systems-level thinking</span>.
        </p>
        <p className="sr-only">
          I design product experiences that are accessible, scalable, and built on systems-level thinking.
        </p>
      </div>
    </div>
  </section>
);

export default WorkBanner;
