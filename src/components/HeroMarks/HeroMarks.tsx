import React from 'react';
import NameTag from '#components/NameTag';
import styles from './HeroMarks.module.css';

// Decorative marks from the Home hero (D-017), shared with other page headers (D-041).
// Both are aria-hidden and empty, so they never change how the text reads.

// A design-tool selection box with corner handles and a pointer, drawn around the children.
// `corner` is the handle the pointer drags: bottom-right on Home, top-right on About.
export const DesignSelection: React.FC<{
	children: React.ReactNode;
	corner?: 'bottom-right' | 'top-right';
}> = ({ children, corner = 'bottom-right' }) => (
	<span className={styles.design}>
		<span
			className={`${styles.selection} ${corner === 'top-right' ? styles['corner-tr'] : ''}`}
			aria-hidden="true"
		>
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
		{children}
	</span>
);

// A Figma-style multiplayer cursor with a name label, for tagging a photo or a card (D-043). The
// colors come from `--tag-bg` and `--tag-fg` set by the parent. Decorative: the name is also in the
// photo's alt text, so it is aria-hidden here.
export const CursorTag: React.FC<{ name: string; className?: string }> = ({ name, className }) => (
	<span className={`${styles.tag} ${className ?? ''}`} aria-hidden="true">
		<svg className={styles['tag-arrow']} width="14" height="19" viewBox="0 0 14 19" focusable="false">
			<path d="M0.6 0.6V17.2L5.1 12.6H12.4L0.6 0.6Z" />
		</svg>
		<NameTag corner="top-left" className={styles['tag-label']}>
			{name}
		</NameTag>
	</span>
);

// A blinking terminal caret, placed at the end of a code-style chip.
export const Caret: React.FC = () => <span className={styles.caret} aria-hidden="true" />;
