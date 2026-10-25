import React from 'react';
import clsx from 'clsx';
import styles from './NameTag.module.css';

// The name tag (D-105, D-107): the Figma multiplayer-cursor tag. A violet label with white bold Inter,
// rounded with one square corner, the corner that points at what it names. The tooltip and the pet photo
// tags on About both render this, so there is one definition. Recolor it with `--tag-bg` and `--tag-fg`
// (the primary pair by default). Decorative wrappers set aria-hidden themselves.

export type NameTagCorner = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';

type NameTagProps = {
  corner: NameTagCorner;
  className?: string;
  children: React.ReactNode;
};

const NameTag: React.FC<NameTagProps> = ({ corner, className, children }) => (
  <span className={clsx(styles.label, styles[corner], className)}>{children}</span>
);

export default NameTag;
