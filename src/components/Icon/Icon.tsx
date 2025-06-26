import React from 'react';
import { IconName } from '@constants/iconNames';
import Ai from '@assets/icons/ai.svg';
import ArrowRight from '@assets/icons/arrow-right.svg';
import ArrowTopRight from '@assets/icons/arrow-top-right.svg';
import Cat from '@assets/icons/cat.svg';
import Clouds from '@assets/icons/clouds.svg';
import Component from '@assets/icons/component.svg';
import Controller from '@assets/icons/controller.svg';
import Dog from '@assets/icons/dog.svg';
import Download from '@assets/icons/download.svg';
import Image from '@assets/icons/image.svg';
import Paw from '@assets/icons/paw.svg';
import PencilRuler from '@assets/icons/pencil-ruler.svg';
import Person from '@assets/icons/person.svg';

const icons: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  'ai': Ai,
  'arrow-right': ArrowRight,
  'arrow-top-right': ArrowTopRight,
  'cat': Cat,
  'clouds': Clouds,
  'component': Component,
  'controller': Controller,
  'dog': Dog,
  'download': Download,
  'image': Image,
  'paw': Paw,
  'pencil-ruler': PencilRuler,
  'person': Person,
};

type IconProps = {
  name: string; // Accept any string
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
};

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const SvgIcon = icons[name as IconName] || icons['person']; // Fallback to 'person' icon if not found
  return <SvgIcon {...props} />;
};

export default Icon;
