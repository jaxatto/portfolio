import React from 'react';
import Link from '@components/Link/Link';
import styles from './Header.module.scss';

const defaultLinks = [
    { name: 'Work', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Resume', url: '/resume' }
];

const Header: React.FC = () => {
    return (
        <header>
            <a href="#main-content" className={styles['skip-link']}>
                Skip to main content
            </a>
            <span className="sr-only">Screen reader only welcome message: Hello! This is the personal portfolio site for Jax Engel. I'm so glad you're trying my site with a screen reader or are checking out my code. I would love to get your feedback. Please send me an email to hello@jaxengeldesign.com.</span>
            <div className={styles.brand}>
                <Link to='/' className={styles.link}>Jax Engel</Link>
                <span className={styles.byline} aria-hidden="true">Product Design · Accessibility · Systems</span>
                <span className="sr-only">My portfolio will cover my expertise in product design, accessibility, and design systems.</span>
            </div>
            <nav>
                <ul>
                    {defaultLinks.map((link, index) => (
                        <li key={index}>
                            <Link to={link.url}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;