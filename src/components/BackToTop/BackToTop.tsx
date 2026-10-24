import React from 'react';
import Icon from '#components/Icon';
import styles from './BackToTop.module.css';

// General-purpose "Back to top" control for long pages. Layout renders it before the footer when a page
// opts in (`backToTop`). It is a button, not a hash link, so it works without changing the URL.
// It scrolls to the top (instantly with reduced motion) and moves focus to the page root (`#top`, set on
// Layout) so keyboard users continue from the skip link and nav instead of staying at the footer.
// Look: the line-link style (D-090) with an up arrow. See docs/decisions.md D-096.

const BackToTop: React.FC<{ className?: string }> = ({ className }) => {
  const handleClick = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    document.getElementById('top')?.focus({ preventScroll: true });
  };

  return (
    <button type="button" className={[styles.button, className].filter(Boolean).join(' ')} onClick={handleClick}>
      Back to top
      <Icon name="arrow-up" className={styles.icon} aria-hidden="true" />
    </button>
  );
};

export default BackToTop;
