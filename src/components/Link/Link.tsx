import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { getSafeHref } from '#utils/sanitizeHref';
import Icon from '#components/Icon';
import styles from './Link.module.scss';

export type LinkProps = {
	to?: string;
	href?: string;
	newTab?: boolean;
	className?: string;
	iconName?: string;
	iconPosition?: 'right' | 'left';
	styleAs?: 'link' | 'button';
	hasUnderline?: boolean;
	children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>; // Inherit native anchor props like aria-label, onClick, etc.

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
	(
		{
			to,
			href,
			newTab,
			className,
			iconName,
			iconPosition = 'right',
			styleAs = 'link',
			hasUnderline = true,
			children,
			...props
		},
		ref,
	) => {
		const icon = iconName ? (
			<Icon name={iconName} className={styles.icon} />
		) : null;

		const content = (
			<>
				{iconPosition === 'left' && icon}
				{children}
				{iconPosition === 'right' && icon}
			</>
		);

		const baseClass = clsx(styles.link, className, {
			[styles.button]: styleAs === 'button',
			[styles.underline]: hasUnderline && styleAs === 'link',
		});

		// Internal navigation (React Router)
		if (to) {
			return (
				<NavLink
					to={to}
					className={({ isActive }) =>
						clsx(baseClass, isActive && styles.active)
					}
					ref={ref}
					{...props}
				>
					{content}
				</NavLink>
			);
		}

		// External / Standard anchor navigation
		const safeHref = getSafeHref(href);

		return (
			<a
				href={safeHref}
				className={baseClass}
				target={newTab ? '_blank' : undefined}
				rel={newTab ? 'noopener noreferrer' : undefined}
				{...props}
				aria-label={
					props['aria-label'] ||
					(newTab ? `${children} (opens in a new tab)` : undefined)
				}
				ref={ref}
			>
				{content}
			</a>
		);
	},
);

Link.displayName = 'Link';

export default Link;
