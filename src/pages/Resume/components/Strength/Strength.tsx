import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Icon from '#components/Icon';
import palettes from '#styles/palette.module.css';
import styles from './Strength.module.css';

// A strength with its proof (D-124): a card in a study's color with the same hover as the work cards
// (tint, lift and the growing link line; D-111). The whole card is the link (the stretched ::after), so the
// h3 stays a real heading.

type StrengthProps = {
  title: string;
  proof: string;
  to: string;
  linkText: string;
  palette: 'brand' | 'primary' | 'secondary' | 'tertiary' | 'quaternary';
};

const Strength: React.FC<StrengthProps> = ({ title, proof, to, linkText, palette }) => (
  <li className={`${styles.card} ${palettes[palette]}`}>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.proof}>{proof}</p>
    <RouterLink to={to} className={styles.link}>
      <span className={styles.linkText}>{linkText}</span>
      <Icon name="arrow-right" className={styles.icon} aria-hidden="true" />
    </RouterLink>
  </li>
);

export default Strength;
