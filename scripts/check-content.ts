import fs from 'node:fs';
import path from 'node:path';
import { parseStudy } from '../src/utils/content/study';
import { studyLinks } from '../src/constants/studyLinks';

// Validates case study Markdown: frontmatter/structure parse, slug is registered, images exist.
// Usage: npm run check:content

const root = path.resolve(import.meta.dirname, '../src/pages/Studies/pages');
let errors = 0;
const fail = (message: string) => {
	console.error(`✗ ${message}`);
	errors++;
};

for (const folder of fs.readdirSync(root)) {
	const file = path.join(root, folder, 'index.md');
	if (!fs.existsSync(file)) continue;
	const slug = folder.toLowerCase();
	const linkUrl = studyLinks[slug as keyof typeof studyLinks];
	if (!linkUrl)
		fail(`${folder}: "${slug}" is missing from src/constants/studyLinks.ts`);

	try {
		const { content } = parseStudy(
			fs.readFileSync(file, 'utf8'),
			linkUrl ?? '',
			(image) => {
				if (!fs.existsSync(path.join(root, folder, image)))
					fail(`${folder}: missing image ${image}`);
				return image;
			},
		);
		if (!content.header.description.length)
			fail(`${folder}: no intro paragraph`);
		if (!content.sections.length) fail(`${folder}: no ## sections`);
		for (const image of [
			...content.header.image,
			...content.sections.flatMap((s) => s.image ?? []),
		]) {
			if (!image.alt.trim())
				fail(`${folder}: image ${image.src} has no alt text`);
		}
		console.log(`✓ ${folder}: ${content.sections.length} sections`);
	} catch (error) {
		fail(`${folder}: ${(error as Error).message}`);
	}
}
process.exit(errors ? 1 : 0);
