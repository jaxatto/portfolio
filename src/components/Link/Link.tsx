import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Icon from '@components/Icon';
import styles from './Link.module.scss';

type LinkProps = {
  to?: string;
  href?: string;
  newTab?: boolean;
  className?: string;
  iconName?: string;
  children: React.ReactNode;
};

// Simple URL validation: allow only relative URLs or https URLs to your domain
function isSafeUrl(url: string): boolean {
  return (
    (url.startsWith('/') && !url.startsWith('//')) ||
    url.startsWith('https://jaxengeldesign.com')
  );
}

const Link: React.FC<LinkProps> = ({ to, href, newTab, className, iconName, children, ...props }) => {
  const content = (
    <>
      {children}
      {iconName && <Icon name={iconName} className={styles.icon} />}
    </>
  );

  const linkClass = className ? `${styles.link} ${className}` : styles.link;

  if (to) {
    return (
      <RouterLink to={to} className={linkClass} {...props}>
        {content}
      </RouterLink>
    );
  }

  // Validate external href
  const safeHref = href && isSafeUrl(href) ? href : '/';

  return (
    <a
      href={safeHref}
      className={linkClass}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {content}
    </a>
  );
};

export default Link;