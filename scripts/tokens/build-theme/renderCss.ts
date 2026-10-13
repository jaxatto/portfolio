type RenderThemeCssOptions = {
	primitiveVars: string[];
	staticSemanticVars: string[];
	lightSemanticVars: string[];
	darkSemanticVars: string[];
};

export function renderThemeCss({
	primitiveVars,
	staticSemanticVars,
	lightSemanticVars,
	darkSemanticVars,
}: RenderThemeCssOptions) {
	return `/**
 * Do not edit directly.
 * Generated automatically from primitives.ts and defaultTheme.ts
 */

:root {
  /* ========================================== */
  /* Primitive Tokens (Raw Values)             */
  /* ========================================== */
${primitiveVars.join('\n')}

  /* ========================================== */
  /* Semantic Static Tokens                     */
  /* ========================================== */
${staticSemanticVars.join('\n')}

  /* ========================================== */
  /* Semantic Light Mode Colors (Default)       */
  /* ========================================== */
${lightSemanticVars.join('\n')}
}

/* ============================================== */
/* Semantic Dark Mode Overrides                   */
/* ============================================== */
[data-theme="dark"] {
${darkSemanticVars.join('\n')}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${darkSemanticVars.join('\n')}
  }
}
`;
}
