import React from "react";
import { useLocation } from "react-router-dom";
import Link from "@components/Link/Link";
import ModeToggle from "@components/ModeToggle";
import { useTheme } from "@providers/Theme";
import styles from "./Header.module.scss";
import { content } from "./resources/content";

// Page level header component
// This component renders the header with a skip link, brand, byline, and navigation links

const Header: React.FC = () => {
  const { theme, enabled, toggleTheme } = useTheme();
  useLocation(); // Using useLocation to ensure the component re-renders on route changes

  return (
    <header>
      <a href="#main-content" className={styles["skip-link"]}>
        {content.skipToMain}
      </a>
      <div className={styles.brand}>
        <Link to="/" className={styles.link}>
          {content.brand}
        </Link>
      </div>
      <div className={styles.controls}>
        <nav>
          <ul>
            {content.links.map((link, index) => (
              <li key={index}>
                <Link to={link.url}>{link.name}</Link>
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
