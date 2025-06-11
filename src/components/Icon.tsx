import React from 'react';
import ArrowRight from '../assets/icons/arrow-right.svg?react';
import ArrowTopRight from '../assets/icons/arrow-top-right.svg?react';

const icons = {
  "arrow-right": ArrowRight,
  "arrow-top-right": ArrowTopRight,
};

type IconProps = React.ComponentProps<'svg'> & {
  name: keyof typeof icons;
};

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const SvgIcon = icons[name];
  if (!SvgIcon) return null;
  return <SvgIcon {...props} />;
};

export default Icon;