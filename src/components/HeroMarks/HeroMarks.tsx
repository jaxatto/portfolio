import React from 'react';
import styles from './HeroMarks.module.css';

// Decorative marks from the Home hero (D-017), shared with other page headers (D-041).
// Both are aria-hidden and empty, so they never change how the text reads.

// A design-tool selection box with corner handles and a pointer, drawn around the children.
export const DesignSelection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
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
		{children}
	</span>
);

// A blinking terminal caret, placed at the end of a code-style chip.
export const Caret: React.FC = () => <span className={styles.caret} aria-hidden="true" />;
