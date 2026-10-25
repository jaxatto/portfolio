import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import Icon from '#components/Icon';
import type { IconName } from '#constants/iconNames';
import styles from './TextLink.module.css';

// Figma "Link": bold text with optional trailing icon and the animated hover line (D-104).
// Internal routes use `to`; everything else uses `href`. `newTab` adds the safe rel attributes.

type TextLinkProps = {
  to?: string;
  href?: string;
  newTab?: boolean;
  icon?: IconName;
  size?: 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
};

const TextLink: React.FC<TextLinkProps> = ({
  to,
  href,
  newTab,
  icon,
  size = 'md',
  className,
  children,
}) => {
  const classes = clsx(
    styles.link,
    icon && styles.withIcon,
    size === 'lg' && styles.large,
    className,
  );
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} className={styles.icon} aria-hidden="true" />}
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
      className={classes}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
    >
      {content}
    </a>
  );
};

export default TextLink;
