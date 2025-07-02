import React from 'react';
import { useLocation } from 'react-router-dom';
import Link from '@components/Link/Link';
import styles from './Header.module.scss';
import { content } from './resources/content';

// Page level header component
// This component renders the header with a skip link, brand, byline, and navigation links

const Header: React.FC = () => {
    useLocation(); // Using useLocation to ensure the component re-renders on route changes

    return (
        <header>
            <a href="#main-content" className={styles['skip-link']}>
                {content.skipToMain}
            </a>
            <div className={styles.brand}>
                <Link
                    to="/"
                    className={styles.link}
                >
                    {content.brand}
                </Link>
                <span className={styles.byline}>
                    {Array.isArray(content.byline)
                        ? content.byline.map((line, i) => (
                            <span key={i}>{line}</span>
                          ))
                        : content.byline}
                </span>
            </div>
            <nav>
                <ul>
                    {content.links.map((link, index) => (
                        <li key={index}>
                            <Link to={link.url}>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;