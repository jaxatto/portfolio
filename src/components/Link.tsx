import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './Link.module.scss';
import Icon from './Icon';

type LinkProps = {
  to?: string;
  href?: string;
  newTab?: boolean;
  className?: string;
  iconName?: string;
  children: React.ReactNode;
};

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
  return (
    <a
      href={href}
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