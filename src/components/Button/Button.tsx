import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import Icon from '#components/Icon';
import type { IconName } from '#constants/iconNames';
import { blockMailtoOnLocalhost } from '#src/utils/mailto';
import styles from './Button.module.css';

// The site's button: `filled` (primary action), `outline` (secondary) and `inverted` (on a saturated ground).
// Internal routes use `to`, files and mail use `href` (`newTab` adds the safe rel). The icon is decorative.

type ButtonProps = {
  variant?: 'filled' | 'outline' | 'inverted';
  to?: string;
  href?: string;
  newTab?: boolean;
  icon?: IconName;
  iconPosition?: 'start' | 'end';
  className?: string;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  to,
  href,
  newTab,
  icon,
  iconPosition = 'end',
  className,
  children,
}) => {
  const classes = clsx(styles.button, styles[variant], className);
  const glyph = icon && <Icon name={icon} className={styles.icon} aria-hidden="true" />;
  const content = (
    <>
      {iconPosition === 'start' && glyph}
      {children}
      {iconPosition === 'end' && glyph}
    </>
  );

  if (to) {
    return (
      <RouterLink to={to} className={classes}>
        {content}
      </RouterLink>
    );
  }

  return (
    <a
      href={href}
      onClick={blockMailtoOnLocalhost(href)}
      className={classes}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
    >
      {content}
    </a>
  );
};

export default Button;
