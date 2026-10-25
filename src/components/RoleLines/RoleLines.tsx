import React from 'react';
import styles from './RoleLines.module.css';

// The role as stacked lines (D-098). Every "&" is toned down in light and white in dark (D-099), so a line
// that starts with one reads as a continuation. Each line is its own span, so assistive tech reads one
// phrase. The parent sets type and layout.

export const Amp: React.FC = () => <span className={styles.amp}>&amp;</span>;

const withAmp = (line: string) =>
  line.split('&').flatMap((part, i) => (i === 0 ? [part] : [<Amp key={i} />, part]));

const RoleLines: React.FC<{ lines: string[] }> = ({ lines }) => (
  <>
    {lines.map((line) => (
      <span key={line}>{withAmp(line)}</span>
    ))}
  </>
);

export default RoleLines;
