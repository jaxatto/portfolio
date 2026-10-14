import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ModeToggle from '#components/ModeToggle';
import { useTheme } from '#providers/Theme';
import { mainLinks } from '#constants/mainLinks';
import styles from './Header.module.css';

// Page header: skip link, nav row (brand on inner pages, main links, mode toggle) and, on Home only,
// the intro. Copy is inline on purpose (D-003). Layout and treatments: D-016, D-017.

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

type HeaderProps = {
	hideModeToggle?: boolean; // 404 keeps its own fixed colors, so theme choice does nothing there
};

const Header: React.FC<HeaderProps> = ({ hideModeToggle = false }) => {
	const { theme, enabled, toggleTheme } = useTheme();
	const { pathname } = useLocation();
	const isHome = pathname === mainLinks.home;

	return (
		<header className={styles.header}>
			<a href="#main-content" className={styles['skip-link']}>
				Skip to main content
			</a>

			<div className={styles.bar}>
				{/* Left slot: the brand on inner pages; on Home the greeting carries the name, so the slot
				    holds the role instead. TODO(jax): role line is provisional (content pass). */}
				{isHome ? (
					<p className={styles.role}>Staff Product Designer</p>
				) : (
					<Link to={mainLinks.home} className={styles.brand}>
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
					{enabled && !hideModeToggle && <ModeToggle checked={theme === 'dark'} onChange={toggleTheme} />}
				</div>
			</div>

			{isHome && (
				<div className={styles.intro}>
					{/* TODO(jax): H1 and treatments are provisional, to be reviewed with the content pass. */}
					{/* The "design" selection box (with a resizing cursor) and the "build" chip are decorative: the
					    box parts are aria-hidden and empty, so the sentence reads cleanly to assistive tech. */}
					<h1 className={styles.heading}>
						<strong className={styles.greeting}>Hi, I’m Jax!</strong>{' '}
						{/* Mobile only: the role as a byline under the greeting (display:none above 640px, so
						    assistive tech hears it once). See D-018. */}
						<span className={styles.byline}>Staff Product Designer</span> I{' '}
						<span className={styles.design}>
							<span className={styles.selection} aria-hidden="true">
								<i className={styles['handle-tl']} />
								<i className={styles['handle-tr']} />
								<i className={styles['handle-bl']} />
								<i className={styles['handle-br']} />
								<span className={styles.pointer}>
									<svg
										className={styles['pointer-arrow']}
										width="14"
										height="19"
										viewBox="0 0 14 19"
										focusable="false"
									>
										<path d="M0.6 0.6V17.2L5.1 12.6H12.4L0.6 0.6Z" className={styles['pointer-fill']} />
									</svg>
								</span>
							</span>
							design
						</span>{' '}
						and{' '}
						<span className={styles.build}>build</span> accessible products and the systems
						behind them.
					</h1>
				</div>
			)}
		</header>
	);
};

export default Header;
