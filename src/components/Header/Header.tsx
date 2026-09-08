import React from 'react';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import Link from '#components/Link/Link';
import styles from './Header.module.css';
import { mainLinks } from '#src/data/constants/mainLinks';

/**
 * Site header component
 * This component renders the header with a skip link, brand, and navigation links
 */

const Header: React.FC = () => {
	const linksList = [
		{ name: 'Work', url: mainLinks.work },
		{ name: 'About', url: mainLinks.about },
		{ name: 'Resume', url: mainLinks.resume },
	];

	useLocation();

	return (
		<header>
			<a href="#main-content" className={clsx(styles['skip-link'], 'sr-only')}>
				Skip to main content
			</a>
			<div className={styles.brand}>
				<span className="material-symbols-rounded icon-32">automation</span>

				<Link to="/" className={styles.link} hasUnderline={false}>
					Jax Engel
				</Link>
			</div>
			<nav>
				<ul className="list-reset">
					{linksList.map((link, index) => (
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
