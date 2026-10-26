import React from 'react';
import Icon from '#components/Icon';
import Tooltip from '#components/Tooltip';
import type { IconName } from '#constants/iconNames';
import styles from './IconLink.module.css';

// An icon-only external link: a real accessible name (sr-only text) plus a tooltip (D-103), in a 40px
// target like the nav's mode toggle. Opens in a new tab.

type IconLinkProps = {
  href: string;
  icon: IconName;
  label: string;
  /** Extra screen reader text after the label, e.g. "PDF". */
  detail?: string;
};

const IconLink: React.FC<IconLinkProps> = ({ href, icon, label, detail }) => (
  <Tooltip label={label} offset={2}>
    <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
      <Icon name={icon} aria-hidden="true" />
      <span className="sr-only">
        {label} ({detail ? `${detail}, ` : ''}opens in a new tab)
      </span>
    </a>
  </Tooltip>
);

export default IconLink;
