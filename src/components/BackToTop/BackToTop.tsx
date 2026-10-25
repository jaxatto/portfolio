import React, { useEffect, useState } from 'react';
import Icon from '#components/Icon';
import Tooltip from '#components/Tooltip';
import styles from './BackToTop.module.css';

// General-purpose floating "Back to top" button for long pages. Layout renders it when a page passes
// `backToTop`: a round button fixed 64px from the viewport corner (24px on phones) that
// appears after about one screen of scrolling. When the footer scrolls into view the button rides up with
// it, so it never covers the footer. It is a button, not a hash link, so the URL doesn't change. Click scrolls to the top (instantly with reduced motion) and moves focus to the page
// root (`#top`, set on Layout) so Tab continues at the skip link. While hidden it is also out of the tab
// order and the accessibility tree. See docs/decisions.md D-096.

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [lift, setLift] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight);
      // How far the footer has come up into the viewport; the button lifts by that much.
      const footerTop = document.querySelector('footer')?.getBoundingClientRect().top ?? window.innerHeight;
      setLift(Math.max(0, Math.round(window.innerHeight - footerTop)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
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
    <Tooltip label="Back to top">
      <button
        type="button"
        className={styles.button}
        data-visible={visible}
        aria-label="Back to top"
        style={{ '--lift': `${lift}px` } as React.CSSProperties}
        hidden={!visible}
        onClick={handleClick}
      >
        <Icon name="arrow-up" className={styles.icon} aria-hidden="true" />
      </button>
    </Tooltip>
  );
};

export default BackToTop;
