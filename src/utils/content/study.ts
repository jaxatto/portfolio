import type { StudyHeaderProps } from '@commonTypes/study/studyHeader';
import type { StudyImageProps } from '@commonTypes/study/studyImage';
import type { StudyMetaProps } from '@commonTypes/study/studyMeta';
import type { StudySectionProps } from '@commonTypes/study/studySection';
import {
	parseSections,
	splitFrontmatter,
	type MarkdownBlock,
} from './markdown';

// Builds the props consumed by StudyTemplate from a case study Markdown file.
// See src/pages/Studies/pages/<Study>/index.md for the format.

type StudyFrontmatter = {
	title: string;
	seo: { title: string; description: string; keywords?: string[] };
	roles: { role: string; startDate: string; endDate?: string }[];
	chips: StudyHeaderProps['chips'];
};

export type ParsedStudy = {
	meta: StudyMetaProps & { keywords: string[] };
	content: { header: StudyHeaderProps; sections: StudySectionProps[] };
};

const EMOJI_PREFIX =
	/^(\p{Extended_Pictographic}[\p{Extended_Pictographic}‍️]*)\s+(.*)$/u;

const splitHeading = (heading: string) => {
	const match = heading.match(EMOJI_PREFIX);
	return match
		? { titleEmoji: match[1], title: match[2] }
		: { titleEmoji: undefined, title: heading };
};

export const parseStudy = (
	source: string,
	linkUrl: string,
	resolveImage: (path: string) => string,
): ParsedStudy => {
	const { data, body } = splitFrontmatter<StudyFrontmatter>(source);
	const [intro, ...rest] = parseSections(body);

	const toImages = (blocks: MarkdownBlock[]): StudyImageProps[] =>
		blocks.flatMap((block) =>
			block.type === 'image'
				? [
						{
							src: resolveImage(block.src),
							alt: block.alt,
							...(block.caption !== undefined && { caption: block.caption }),
							...(block.attrs.corners && { corners: block.attrs.corners }),
						},
					]
				: [],
		);
	const toParagraphs = (blocks: MarkdownBlock[]) =>
		blocks.flatMap((block) => (block.type === 'paragraph' ? [block.text] : []));
	const toBullets = (blocks: MarkdownBlock[]) =>
		blocks.flatMap((block) => (block.type === 'list' ? block.items : []));

	return {
		meta: {
			title: data.seo.title,
			description: data.seo.description,
			keywords: data.seo.keywords ?? [],
			linkUrl,
		},
		content: {
			header: {
				title: data.title,
				roleDetails: data.roles.map(({ role, startDate, endDate }) => ({
					role,
					startDate: String(startDate),
					endDate: endDate === undefined ? '' : String(endDate),
				})),
				description: toParagraphs(intro.blocks),
				chips: data.chips,
				image: toImages(intro.blocks),
			},
			sections: rest.map((section, index) => ({
				order: index + 1,
				...splitHeading(section.heading ?? ''),
				description: toParagraphs(section.blocks),
				descriptionBullets: toBullets(section.blocks),
				image: toImages(section.blocks),
			})),
		},
	};
};
