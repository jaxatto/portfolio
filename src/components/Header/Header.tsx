import React from 'react';
import clsx from 'clsx';
import Link from '#components/Link';
import Icon from '#components/Icon';
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

	return (
		<header>
			<a href="#main-content" className={clsx(styles['skip-link'], 'sr-only')}>
				Skip to main content
			</a>

			<Link to="/" className={styles.brand} hasUnderline={false}>
				<Icon name="automation" />
				Jax Engel
			</Link>

			<nav>
				<ul className="list-reset">
					{linksList.map((link, index) => (
						<li key={index}>
							<Link
								to={link.url}
								className={styles['nav-link']}
								activeClassName={styles['nav-link-active']}
								hasUnderline={false}
							>
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
