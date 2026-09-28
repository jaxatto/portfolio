import { studyLinks } from '@constants/studyLinks';
import { parseStudy, type ParsedStudy } from '#utils/content/study';

// Case studies are Markdown files: ./pages/<Study>/index.md with images in ./pages/<Study>/images/.
// The folder name (lowercased) is the URL slug and must exist in constants/studyLinks.

const sources = import.meta.glob('./pages/*/index.md', {
	query: '?raw',
	import: 'default',
	eager: true,
}) as Record<string, string>;

const images = import.meta.glob('./pages/*/images/*', {
	query: '?url',
	import: 'default',
	eager: true,
}) as Record<string, string>;

export const studies: Record<string, ParsedStudy> = Object.fromEntries(
	Object.entries(sources).map(([file, source]) => {
		const folder = file.split('/')[2];
		const slug = folder.toLowerCase();
		const linkUrl = studyLinks[slug as keyof typeof studyLinks];
		if (!linkUrl) throw new Error(`Add "${slug}" to constants/studyLinks for ${file}`);

		const resolveImage = (path: string) => {
			const url = images[`./pages/${folder}/${path}`];
			if (!url) throw new Error(`Image "${path}" not found for study "${folder}"`);
			return url;
		};
		return [slug, parseStudy(source, linkUrl, resolveImage)];
	}),
);
