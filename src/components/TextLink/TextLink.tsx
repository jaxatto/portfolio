import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import Icon from '#components/Icon';
import type { IconName } from '#constants/iconNames';
import { blockMailtoOnLocalhost } from '#src/utils/mailto';
import typography from '#styles/type.module.css';
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
    typography.bodyMd,
    styles.link,
    icon && styles.withIcon,
    size === 'lg' && styles.large,
    className,
  );
  const iconEl = icon && <Icon name={icon} className={styles.icon} aria-hidden="true" />;
  // The icon rides with the last word, so a wrapped link never strands it at the far edge. A single word
  // (the footer email) keeps its own break rules.
  const lastSpace = typeof children === 'string' ? children.lastIndexOf(' ') : -1;
  const content =
    typeof children === 'string' && icon && lastSpace !== -1 ? (
      <>
        {`${children.slice(0, lastSpace)} `}
        <span className={styles.tail}>
          {children.slice(lastSpace + 1)}
          {iconEl}
        </span>
      </>
    ) : (
      <>
        {children}
        {iconEl}
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

export default TextLink;
