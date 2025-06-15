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
} & React.RefAttributes<HTMLAnchorElement>;

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, href, newTab, className, iconName, children, ...props }, ref) => {
    const content = (
      <>
        {children}
        {iconName && <Icon name={iconName} className={styles.icon} />}
      </>
    );

    const linkClass = className ? `${styles.link} ${className}` : styles.link;

    if (to) {
      return (
        <RouterLink to={to} className={linkClass} {...props} ref={ref as any}>
          {content}
        </RouterLink>
      );
    }

    // Validate external href
    const safeHref = href && (
      (href.startsWith('/') && !href.startsWith('//')) ||
      href.startsWith('https://jaxengeldesign.com')
    ) ? href : '/';

    return (
      <a
        href={safeHref}
        className={linkClass}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
        {...props}
        ref={ref}
      >
        {content}
      </a>
    );
  }
);

export default Link;