import React from 'react';
import clsx from 'clsx';
import styles from './Chip.module.css';

// The code-style chip from the About hero (D-040): Roboto Mono, a container color with its paired text
// color. Used on About, the study headers and Resume skills.
// `palette` picks one of the four container pairs (white text in dark, D-028). Without it the chip is the
// primary pair and a page can set `--chip-bg` and `--chip-fg` through `className` (the studies do, D-052).
// Chips are plain labels, so they render as a list: <ChipList> holds <Chip>s.

type ChipPalette = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

export const chipPalettes: readonly ChipPalette[] = ['primary', 'secondary', 'tertiary', 'quaternary'];

type ChipProps = {
  palette?: ChipPalette;
  className?: string;
  children: React.ReactNode;
};

export const Chip: React.FC<ChipProps> = ({ palette, className, children }) => (
  <li className={clsx(styles.chip, palette && styles[palette], className)}>{children}</li>
);

export const ChipList: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => <ul className={clsx(styles.list, className)}>{children}</ul>;

export default Chip;
