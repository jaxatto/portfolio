import React from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import Link from "@components/Link/Link";
import Icon from "@components/Icon";
import ModeToggle from "@components/ModeToggle";
import { useTheme } from "@providers/Theme";
import { mainLinks } from "@constants/mainLinks";
import styles from "./Header.module.css";
import { content } from "./resources/content";

// Page level header: skip link, brand (hidden on the home page, where the banner introduces me),
// main navigation, and the theme toggle when theme switching is enabled.

const isActive = (pathname: string, url: string) =>
  url === mainLinks.work
    ? pathname === url || pathname.startsWith("/case-studies")
    : pathname === url;

const Header: React.FC = () => {
  const { theme, enabled, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const isHome = pathname === mainLinks.home;

  return (
    <header className={clsx(styles.header, isHome && styles.home)}>
      <a href="#main-content" className={styles["skip-link"]}>
        {content.skipToMain}
      </a>
      {!isHome && (
        <Link to={mainLinks.home} className={styles.brand}>
          <Icon name="automation" className={styles["brand-icon"]} aria-hidden="true" />
          {content.brand}
        </Link>
      )}
      <div className={styles.controls}>
        <nav aria-label="Main">
          <ul className={styles.list}>
            {content.links.map((link) => (
              <li key={link.url}>
                <Link
                  to={link.url}
                  className={styles["nav-link"]}
                  aria-current={isActive(pathname, link.url) ? "page" : undefined}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {enabled && (
          <ModeToggle checked={theme === "dark"} onChange={toggleTheme} />
        )}
      </div>
    </header>
  );
};

export default Header;
