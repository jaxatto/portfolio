import React from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import App from './App';
import { ThemeProvider } from '#providers/Theme';

// Build-time entry: renders one route to an HTML string for scripts/prerender.ts (D-159). The tree
// matches src/index.tsx apart from the router. The prerender call waits for the lazy route chunk.
export async function render(url: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <ThemeProvider>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </ThemeProvider>,
  );
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString('utf8');
}
