import React from 'react';
import ArrowRight from '@assets/icons/arrow-right.svg';
import ArrowTopRight from '@assets/icons/arrow-top-right.svg';
import Person from '@assets/icons/person.svg';
import Cat from '@assets/icons/cat.svg';
import Dog from '@assets/icons/dog.svg';
import Controller from '@assets/icons/controller.svg';


type IconProps = {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
};

const icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>> | undefined> = {
  'arrow-right': ArrowRight,
  'arrow-top-right': ArrowTopRight,
  'person': Person,
  'cat': Cat,
  'dog': Dog,
  'controller': Controller
};

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const SvgIcon = icons[name];
  if (!SvgIcon) return null;
  return <SvgIcon {...props} />;
};

export default Icon;