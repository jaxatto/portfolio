import React from 'react';
import clsx from 'clsx';
import type { ColorGroup } from '#tokens/types';
import palettes from '#styles/palette.module.css';
import styles from './Chip.module.css';

// The code-style chip from the About hero (D-040): Roboto Mono, a container color with its paired text
// color. Used on About, the study headers and Resume skills.
// `palette` picks one of the four container pairs (white text in dark, D-028). Without it the chip follows the
// palette of the section it sits in (a study page, D-052) and is the primary pair outside one (D-119).
// Chips are plain labels, so they render as a list: <ChipList> holds <Chip>s.

type ChipPalette = Exclude<ColorGroup, 'brand'>;

export const chipPalettes: readonly ChipPalette[] = ['primary', 'secondary', 'tertiary', 'quaternary'];

type ChipProps = {
  palette?: ChipPalette;
  className?: string;
  children: React.ReactNode;
};

export const Chip: React.FC<ChipProps> = ({ palette, className, children }) => (
  <li className={clsx(styles.chip, palette && [palettes[palette], styles.tinted], className)}>{children}</li>
);

export const ChipList: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => <ul className={clsx(styles.list, className)}>{children}</ul>;

export default Chip;
