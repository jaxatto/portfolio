import React from 'react';
import { useLocation } from 'react-router-dom';
import Link from '@components/Link/Link';
import styles from './Header.module.scss';
import { content } from './resources/content';

const Header: React.FC = () => {
    useLocation(); // still needed for rerender on route change if Link uses it internally

    return (
        <header>
            <a href="#main-content" className={styles['skip-link']}>
                {content.skipToMain}
            </a>
            <span className="sr-only">{content.screenReaderWelcome}</span>
            <div className={styles.brand}>
                <Link
                    to="/"
                    className={styles.link}
                >
                    {content.brand}
                </Link>
                <span className={styles.byline} aria-hidden="true">{content.byline}</span>
                <span className="sr-only">{content.screenReaderByline}</span>
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