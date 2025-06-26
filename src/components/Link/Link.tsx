import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Icon from '@components/Icon';
import styles from './Link.module.scss';

// Link component for navigation
// It supports both internal and external links, with options for new tab, icon, and styling
// Usage: <Link to="/path" newTab iconName="arrow-right">Link Text</Link>

type LinkProps = {
  to?: string;
  href?: string;
  newTab?: boolean;
  className?: string;
  iconName?: string;
  iconPosition?: 'right' | 'left';
  styleAs?: 'link' | 'button';
  children: React.ReactNode;
} & React.RefAttributes<HTMLAnchorElement>;

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      to,
      href,
      newTab,
      className,
      iconName,
      iconPosition = 'right',
      styleAs = 'link',
      children,
      ...props
    },
    ref
  ) => {
    const location = typeof window !== 'undefined' ? useLocation() : undefined;

    const icon = iconName ? <Icon name={iconName} className={styles.icon} /> : null;

    const content =
      iconPosition === 'right' ? (
        <>
          {children}
          {icon}
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      );

    // Add styles.button if styleAs is 'button'
    const linkClass = [
      styles.link,
      styleAs === 'button' ? styles.button : '',
      className
    ].filter(Boolean).join(' ');

    if (to) {
      const isCurrent = location && location.pathname === to;
      return (
        <RouterLink
          to={to}
          className={linkClass}
          aria-current={isCurrent ? 'page' : undefined}
          {...props}
          ref={ref as any}
        >
          {content}
        </RouterLink>
      );
    }

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