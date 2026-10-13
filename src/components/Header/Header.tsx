import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Icon from '#components/Icon';
import ModeToggle from '#components/ModeToggle';
import Image from '#components/Image';
import { useTheme } from '#providers/Theme';
import { mainLinks } from '#constants/mainLinks';
import profileImg from '#assets/jax-engel-min.png';
import styles from './Header.module.css';

// Page header: skip link, nav bar (brand, main links, mode toggle) and, on Home only, the intro.
// Copy is inline on purpose (D-003): short page copy stays next to its markup.

const navLinks = [
	{ name: 'Work', url: mainLinks.work },
	{ name: 'About', url: mainLinks.about },
	{ name: 'Resume', url: mainLinks.resume },
];

// Work stays active on case study pages, which live under /case-studies.
const isActive = (pathname: string, url: string) =>
	url === mainLinks.work
		? pathname === url || pathname.startsWith('/case-studies')
		: pathname === url;

const Header: React.FC = () => {
	const { theme, enabled, toggleTheme } = useTheme();
	const { pathname } = useLocation();
	const isHome = pathname === mainLinks.home;

	return (
		<header className={styles.header}>
			<a href="#main-content" className={styles['skip-link']}>
				Skip to main content
			</a>

			{/* Decorative blurred ring behind the top-left corner. Sits behind page content. */}
			<div className={styles.decor} aria-hidden="true">
				<div className={styles['decor-ring']} />
			</div>

			<div className={clsx(styles.bar, isHome && styles['bar-home'])}>
				{!isHome && (
					<Link to={mainLinks.home} className={styles.brand}>
						<Icon name="automation" className={styles['brand-icon']} aria-hidden="true" />
						Jax Engel
					</Link>
				)}
				<div className={styles.controls}>
					<nav aria-label="Main">
						<ul className={styles.list}>
							{navLinks.map((link) => (
								<li key={link.url}>
									<Link
										to={link.url}
										className={styles['nav-link']}
										aria-current={isActive(pathname, link.url) ? 'page' : undefined}
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					{/* Hidden until theme switching is enabled (D-011). */}
					{enabled && <ModeToggle checked={theme === 'dark'} onChange={toggleTheme} />}
				</div>
			</div>

			{isHome && (
				<div className={styles.intro}>
					<div className={styles['intro-content']}>
						<div className={styles.photo}>
							<span className={styles['photo-circle']} aria-hidden="true" />
							<Image
								src={profileImg}
								alt="Jax Engel is a feminine-looking person with chin length brown hair and brown eyes. She is outside in the sunshine, wearing a maroon hooded sweater."
								iconFallback="person"
								className={styles['photo-frame']}
								imgClassName={styles['photo-img']}
							/>
							<span className={styles.emoji} aria-hidden="true">
								👋
							</span>
						</div>
						<div className={styles.copy}>
							<h1 className={styles.heading}>Hello, I’m Jax!</h1>
							{/* TODO(jax): hero line is generic; discuss a more specific version (scale, domain, outcomes). */}
							<p className={styles.description}>
								I design product experiences that are accessible, scalable, and built on
								systems-level thinking.
							</p>
						</div>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
