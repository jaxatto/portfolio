import { load } from 'js-yaml';

// Minimal Markdown reader for site content. Supported blocks:
//   ## Heading            starts a section
//   paragraph text        consecutive lines are joined with a space
//   - bullet              one list item per line
//   ![alt](path "caption"){key=value}  image (quoted title is the caption; optional attributes)
// Anything fancier should be added here deliberately, not worked around in content.

export type MarkdownBlock =
	| { type: 'paragraph'; text: string }
	| { type: 'list'; items: string[] }
	| {
			type: 'image';
			src: string;
			alt: string;
			caption?: string;
			attrs: Record<string, string>;
	  };

export type MarkdownSection = {
	/** Text after `## `; null for content before the first heading. */
	heading: string | null;
	blocks: MarkdownBlock[];
};

export const splitFrontmatter = <T = Record<string, unknown>>(
	source: string,
): { data: T; body: string } => {
	const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	if (!match) return { data: {} as T, body: source };
	return { data: (load(match[1]) ?? {}) as T, body: match[2] };
};

const IMAGE = /^!\[(.*)\]\(([^\s)]+)(?:\s+"(.*)")?\)(?:\{([^}]*)\})?$/;

const parseAttrs = (raw = ''): Record<string, string> =>
	Object.fromEntries(
		raw
			.split(/\s+/)
			.filter(Boolean)
			.map((pair) => pair.split('=') as [string, string]),
	);

export const parseSections = (body: string): MarkdownSection[] => {
	const sections: MarkdownSection[] = [{ heading: null, blocks: [] }];
	let paragraph: string[] = [];
	let list: string[] = [];

	const current = () => sections[sections.length - 1];
	const flush = () => {
		if (paragraph.length) {
			current().blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
			paragraph = [];
		}
		if (list.length) {
			current().blocks.push({ type: 'list', items: list });
			list = [];
		}
	};

	for (const raw of body.split(/\r?\n/)) {
		const line = raw.trim();
		const heading = line.match(/^##\s+(.*)$/);
		const image = line.match(IMAGE);
		const bullet = line.match(/^-\s+(.*)$/);

		if (!line) {
			flush();
		} else if (heading) {
			flush();
			sections.push({ heading: heading[1], blocks: [] });
		} else if (image) {
			flush();
			current().blocks.push({
				type: 'image',
				alt: image[1],
				src: image[2],
				...(image[3] !== undefined && { caption: image[3] }),
				attrs: parseAttrs(image[4]),
			});
		} else if (bullet) {
			if (paragraph.length) flush();
			list.push(bullet[1]);
		} else {
			if (list.length) flush();
			paragraph.push(line);
		}
	}
	flush();
	return sections;
};
