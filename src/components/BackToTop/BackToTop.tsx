import React, { useEffect, useState } from 'react';
import Icon from '#components/Icon';
import styles from './BackToTop.module.css';

// General-purpose "Back to top" pill for long pages (D-096, D-108). Layout renders it when a page passes
// `backToTop`. It sits at the top middle of the screen, 16px down, and shows only while the reader is
// scrolling back up from further than one and a half screens below the top. Scrolling down or being near
// the top hides it. It is a button, not a hash link, so the URL doesn't change. Click scrolls to the top
// (instantly with reduced motion) and moves focus to the page root (`#top`, set on Layout) so Tab
// continues at the skip link. Hidden, it is also out of the tab order and the accessibility tree.

const SHOW_AFTER_SCREENS = 1.5;

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < window.innerHeight * SHOW_AFTER_SCREENS) setVisible(false);
      else if (delta < -4) setVisible(true);
      else if (delta > 4) setVisible(false);
      if (Math.abs(delta) > 4) lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const handleClick = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    document.getElementById('top')?.focus({ preventScroll: true });
  };

  return (
    <button type="button" className={styles.button} data-visible={visible} onClick={handleClick}>
      <Icon name="arrow-up" className={styles.icon} aria-hidden="true" />
      Back to top
    </button>
  );
};

export default BackToTop;
