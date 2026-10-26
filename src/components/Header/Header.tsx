import React from 'react';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import ModeToggle from '#components/ModeToggle';
import RoleLines from '#components/RoleLines';
import { DesignSelection, Caret } from '#components/HeroMarks';
import { useTheme } from '#providers/Theme';
import { mainLinks } from '#constants/mainLinks';
import { roleLines } from '#constants/roleLines';
import typography from '#styles/type.module.css';
import styles from './Header.module.css';

// Page header: skip link, nav row (brand on inner pages, main links, mode toggle) and, on Home only,
// the intro. Copy is inline on purpose (D-003). Layout and treatments: D-016, D-017.

const navLinks = [
  { name: 'Work', url: mainLinks.work },
  { name: 'About', url: mainLinks.about },
  { name: 'Resume', url: mainLinks.resume },
];

// Work stays active on case study pages, which live under /case-studies.
// GitHub Pages serves a route at /about/, so the trailing slash is ignored.
const isActive = (pathname: string, url: string) => {
  const path = pathname.replace(/(.)\/$/, '$1');
  return url === mainLinks.work ? path === url || path.startsWith('/case-studies') : path === url;
};

type HeaderProps = {
  label?: string[]; // Lines for the left slot instead of the brand link (Home always shows the role)
};

const Header: React.FC<HeaderProps> = ({ label }) => {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const isHome = pathname === mainLinks.home;
  const slotLabel = label ?? (isHome ? roleLines : undefined);

  return (
    <header className={styles.header}>
      <a href="#main-content" className={styles['skip-link']}>
        Skip to main content
      </a>

      <div className={styles.bar}>
        {/* Left slot: the brand on inner pages; on Home the greeting carries the name, so the slot
				    holds the role instead. A page can pass `label` to do the same (Resume, D-097). */}
        {slotLabel ? (
          <p className={clsx(typography.bodyLg, styles.role)}>
            <RoleLines lines={slotLabel} />
          </p>
        ) : (
          <div className={clsx(typography.headingMd, styles.identity)}>
            <Link to={mainLinks.home} className={clsx(typography.headingMd, styles.brand)}>
              Jax Engel
            </Link>
            {/* Soft tagline after a dot (D-099). Outside the link: only the name goes home. */}
            <span className={styles.brandRole}>
              <RoleLines lines={['Designer & Engineer']} />
            </span>
          </div>
        )}
        <div className={styles.controls}>
          <nav aria-label="Main">
            <ul className={styles.list}>
              {navLinks.map((link) => (
                <li key={link.url}>
                  <Link
                    to={link.url}
                    className={clsx(typography.bodyLg, styles['nav-link'])}
                    aria-current={isActive(pathname, link.url) ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ModeToggle checked={theme === 'dark'} onChange={toggleTheme} />
        </div>
      </div>

      {isHome && (
        <div className={styles.intro}>
          {/* The "design" selection box (with a resizing cursor) and the "build" chip are decorative: the
					    box parts are aria-hidden and empty, so the sentence reads cleanly to assistive tech. */}
          <h1 className={clsx(typography.titleMd, styles.heading)}>
            <strong className={styles.greeting}>Hi, I’m Jax!</strong>{' '}
            {/* Mobile only: the role as a byline under the greeting (display:none above 640px, so
						    assistive tech hears it once). See D-018. */}
            <span className={clsx(typography.bodyMd, styles.byline)}>
              <RoleLines lines={roleLines} />
            </span>{' '}
            I <DesignSelection>design</DesignSelection> and{' '}
            <span className={styles.build}>
              build
              <Caret />
            </span>{' '}
            accessible products and the systems behind them.
          </h1>
        </div>
      )}
    </header>
  );
};

export default Header;
