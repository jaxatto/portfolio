import React from 'react';

const defaultLinks = [
    { name: 'Projects', url: '#projects' },
    { name: 'Skills', url: '#skills' },
    { name: 'Contact', url: '#contact' }
];

const Header: React.FC = () => {
    return (
        <header>
            <h1>Jax Engel Portfolio</h1>
            <nav>
                <ul>
                    {defaultLinks.map((link, index) => (
                        <li key={index}>
                            <a href={link.url}>{link.name}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;