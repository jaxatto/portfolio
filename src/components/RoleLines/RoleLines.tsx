import React from 'react';
import styles from './RoleLines.module.css';

// The role as stacked lines (D-098). A leading "& " is toned down so the line reads as a continuation.
// Each line is its own span, so assistive tech reads one phrase. The parent sets type and layout.

const RoleLines: React.FC<{ lines: string[] }> = ({ lines }) => (
  <>
    {lines.map((line) => (
      <span key={line}>
        {line.startsWith('& ') ? (
          <>
            <span className={styles.amp}>&amp;</span> {line.slice(2)}
          </>
        ) : (
          line
        )}
      </span>
    ))}
  </>
);

export default RoleLines;
