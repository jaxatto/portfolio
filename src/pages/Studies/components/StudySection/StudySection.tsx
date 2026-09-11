import React from 'react';
import clsx from 'clsx';
import StudyImage from '#pages/Studies/components/StudyImage';
import type { StudySectionProps } from '#data/commonTypes/study/studySection';
import styles from './StudySection.module.css';

const StudySection: React.FC<{
	section: StudySectionProps;
	className?: string;
}> = ({ section, className }) => {
	const image =
		section.image && section.image.length > 0 ? section.image[0] : undefined;
	return (
		<>
			<section className={className} data-order={section.order}>
				<h2 className={styles['section-title']}>
					{section.titleEmoji && (
						<span aria-hidden="true">{section.titleEmoji}</span>
					)}{' '}
					{section.title}
				</h2>
				{section.description?.map((desc, i) => (
					<p key={i} className={styles['section-paragraph']}>
						{desc}
					</p>
				))}
				{section.descriptionBullets?.length ? (
					<ul className={styles['section-list']}>
						{section.descriptionBullets.map((bullet, i) => (
							<li key={i}>{bullet}</li>
						))}
					</ul>
				) : null}
			</section>
			{image?.src && (
				<StudyImage
					src={image.src}
					alt={image.alt || ''}
					caption={image.caption}
					className={clsx(styles['section-image'], 'break-out-pop')}
					corners={image.corners}
				/>
			)}
		</>
	);
};

export default StudySection;
