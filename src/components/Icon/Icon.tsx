import React from 'react';
import ArrowRight from '@assets/icons/arrow-right.svg';
import ArrowTopRight from '@assets/icons/arrow-top-right.svg';
import Person from '@assets/icons/person.svg';
import Cat from '@assets/icons/cat.svg';
import Paw from '@assets/icons/paw.svg';
import Controller from '@assets/icons/controller.svg';
import PencilRuler from '@assets/icons/pencil-ruler.svg';
import Clouds from '@assets/icons/clouds.svg';
import Component from '@assets/icons/component.svg';
import Ai from '@assets/icons/ai.svg';
import Download from '@assets/icons/download.svg';
import Image from '@assets/icons/image.svg';

// Icon component to render SVG icons based on the provided name
// Usage: <Icon name="arrow-right" />

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
  'paw': Paw,
  'controller': Controller,
  'pencil-ruler': PencilRuler,
  'clouds': Clouds,
  'component': Component,
  'ai': Ai,
  'download': Download,
  'image': Image,
};

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const SvgIcon = icons[name];
  if (!SvgIcon) return null;
  return <SvgIcon {...props} />;
};

export default Icon;