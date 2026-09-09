import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { getSafeHref } from '#utils/sanitizeHref';
import styles from './Link.module.css';

export type LinkProps = {
	to?: string;
	href?: string;
	newTab?: boolean;
	className?: string;
	activeClassName?: string;
	styleAs?: 'link' | 'button';
	hasUnderline?: boolean;
	children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
	(
		{
			to,
			href,
			newTab,
			className,
			activeClassName,
			styleAs = 'link',
			hasUnderline = true,
			children,
			...props
		},
		ref,
	) => {
		const baseClass = clsx(styles.link, className, {
			[styles.button]: styleAs === 'button',
			[styles.underline]: hasUnderline && styleAs === 'link',
		});

		// Internal navigation (React Router)
		if (to) {
			return (
				<NavLink
					{...props}
					to={to}
					className={({ isActive }) =>
						clsx(baseClass, isActive && activeClassName)
					}
					ref={ref}
				>
					{children}
				</NavLink>
			);
		}

		// External / Standard anchor navigation
		const safeHref = getSafeHref(href);

		return (
			<a
				{...props}
				href={safeHref}
				className={baseClass}
				target={newTab ? '_blank' : undefined}
				rel={newTab ? 'noopener noreferrer' : undefined}
				ref={ref}
				aria-label={
					props['aria-label'] ||
					(newTab ? `${children} (opens in a new tab)` : undefined)
				}
			>
				{children}
			</a>
		);
	},
);

Link.displayName = 'Link';

export default Link;
