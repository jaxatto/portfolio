import React from 'react';
import { IconName } from '@constants/iconNames';
import ArrowRight from '@assets/icons/arrow-right.svg';
import ArrowTopRight from '@assets/icons/arrow-top-right.svg';
import ArrowUp from '@assets/icons/arrow-up.svg';
import Cat from '@assets/icons/cat.svg';
import Controller from '@assets/icons/controller.svg';
import Download from '@assets/icons/download.svg';
import FileArrowDown from '@assets/icons/file-arrow-down.svg';
import Github from '@assets/icons/github.svg';
import Image from '@assets/icons/image.svg';
import Linkedin from '@assets/icons/linkedin.svg';
import Moon from '@assets/icons/moon.svg';
import Paw from '@assets/icons/paw.svg';
import Sun from '@assets/icons/sun.svg';

const icons: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  'arrow-right': ArrowRight,
  'arrow-top-right': ArrowTopRight,
  'arrow-up': ArrowUp,
  'cat': Cat,
  'controller': Controller,
  'download': Download,
  'file-arrow-down': FileArrowDown,
  'github': Github,
  'image': Image,
  'linkedin': Linkedin,
  'moon': Moon,
  'paw': Paw,
  'sun': Sun,
};

type IconProps = {
  name: string; // Accept any string
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
};

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const SvgIcon = icons[name as IconName] || icons['image']; // Fallback to the image glyph if the name is unknown
  return <SvgIcon {...props} />;
};

export default Icon;
