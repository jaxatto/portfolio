import React from 'react';
import clsx from 'clsx';
import Image from '#components/Image';
import type { StudyImageProps } from '#data/commonTypes/study/studyImage';
import styles from './StudyImage.module.css';

const StudyImage: React.FC<StudyImageProps> = ({
	src,
	alt,
	caption,
	className,
	corners,
}) => (
	<div className={clsx(styles['study-image'], className)}>
		<Image
			src={src}
			alt={alt}
			imgClassName={clsx(styles.image, corners === 'square' && styles.square)}
			fallbackClassName={styles['image-fallback-wrapper']}
		/>
		{caption && (
			<p className={clsx(styles['image-caption'], 'caption-md')}>{caption}</p>
		)}
	</div>
);

export default StudyImage;
