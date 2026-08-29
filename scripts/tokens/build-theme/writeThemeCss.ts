import fs from 'node:fs';
import path from 'node:path';

export function writeThemeCss(cssContent: string, distDir: string) {
	if (!fs.existsSync(distDir)) {
		fs.mkdirSync(distDir, { recursive: true });
	}

	const outputPath = path.join(distDir, 'variables.css');
	fs.writeFileSync(outputPath, cssContent, 'utf-8');
	return outputPath;
}
