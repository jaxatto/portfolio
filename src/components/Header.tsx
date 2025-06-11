import React from 'react';
import Link from './Link';
import styles from './Header.module.scss';

const defaultLinks = [
    { name: 'Work', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Resume', url: '/resume' }
];

const Header: React.FC = () => {
    return (
        <header>
            <div className={styles.brand}>
                <Link to="/" className={styles.link}>Jax Engel</Link>
                <span className={styles.byline}>Product Design · Accessibility · Systems</span>
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