// src/utils/url.ts

export function getSafeHref(href?: string, fallback = '/'): string {
	if (!href) return fallback;

	// Allow safe relative paths and standard external protocols
	if (href.startsWith('/') && !href.startsWith('//')) return href;
	if (href.startsWith('mailto:') || href.startsWith('tel:')) return href;

	try {
		const parsed = new URL(href, window.location.origin);

		// Validate protocols to guard against javascript: or invalid schemes
		if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
			return fallback;
		}

		// Return relative path for same-origin links
		if (parsed.origin === window.location.origin) {
			return parsed.pathname + parsed.search + parsed.hash;
		}

		return parsed.href;
	} catch {
		return fallback;
	}
}
