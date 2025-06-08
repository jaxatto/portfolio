import React from 'react';
import { Link } from 'react-router-dom';

const defaultLinks = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Resume', url: '/resume' }
];

const Header: React.FC = () => {
    return (
        <header>
            <Link to="/">Jax Engel</Link>
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