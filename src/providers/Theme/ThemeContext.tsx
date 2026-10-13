import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

// Theme ids map to `[data-theme="<id>"]` blocks in the generated theme.css.
// Add new ids here (and to the token pipeline) to support more themes later.
export const THEMES = ['light', 'dark'] as const;
export type ThemeId = (typeof THEMES)[number];
export type ThemePreference = ThemeId | 'system';

export const THEME_STORAGE_KEY = 'theme';
const PREVIEW_STORAGE_KEY = 'themePreview';

// Theme switching is off by default (VITE_THEME_SWITCHING in .env). While off, the site is
// pinned to light so OS dark mode does not restyle half-migrated components. `?themePreview=1`
// turns it on for the current browser. Keep the inline script in index.html in sync.
const isThemeSwitchingEnabled = (): boolean => {
	try {
		const param = new URLSearchParams(window.location.search).get(
			'themePreview',
		);
		if (param === '1') window.localStorage.setItem(PREVIEW_STORAGE_KEY, '1');
		if (param === '0') window.localStorage.removeItem(PREVIEW_STORAGE_KEY);
		if (window.localStorage.getItem(PREVIEW_STORAGE_KEY) === '1') return true;
	} catch {
		// Storage unavailable; fall through to the build-time flag.
	}
	return import.meta.env.VITE_THEME_SWITCHING === 'true';
};
const THEME_COLORS: Record<ThemeId, string> = {
	light: '#ffffff',
	dark: '#0f172b',
};

const isThemeId = (value: unknown): value is ThemeId =>
	THEMES.includes(value as ThemeId);

const readStoredPreference = (): ThemePreference => {
	try {
		const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
		return isThemeId(stored) ? stored : 'system';
	} catch {
		return 'system';
	}
};

const prefersDark = () =>
	typeof window.matchMedia === 'function' &&
	window.matchMedia('(prefers-color-scheme: dark)').matches;

interface ThemeContextValue {
	/** What the user chose; 'system' follows the OS. */
	preference: ThemePreference;
	/** The theme actually being shown. */
	theme: ThemeId;
	/** False while dark mode is gated; the UI should hide theme controls. */
	enabled: boolean;
	setPreference: (preference: ThemePreference) => void;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [enabled] = useState(isThemeSwitchingEnabled);
	const [preference, setPreferenceState] = useState<ThemePreference>(() =>
		enabled ? readStoredPreference() : 'light',
	);
	const [systemDark, setSystemDark] = useState(prefersDark);

	useEffect(() => {
		if (typeof window.matchMedia !== 'function') return;
		const query = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = (event: MediaQueryListEvent) =>
			setSystemDark(event.matches);
		query.addEventListener('change', onChange);
		return () => query.removeEventListener('change', onChange);
	}, []);

	const theme: ThemeId =
		preference === 'system' ? (systemDark ? 'dark' : 'light') : preference;

	useEffect(() => {
		const root = document.documentElement;
		if (preference === 'system') {
			root.removeAttribute('data-theme');
		} else {
			root.setAttribute('data-theme', preference);
		}
		document
			.querySelector('meta[name="theme-color"]')
			?.setAttribute('content', THEME_COLORS[theme]);
		document
			.querySelector('meta[name="color-scheme"]')
			?.setAttribute('content', 'light dark');
	}, [preference, theme]);

	const setPreference = useCallback(
		(next: ThemePreference) => {
			if (!enabled) return;
			setPreferenceState(next);
			try {
				if (next === 'system') {
					window.localStorage.removeItem(THEME_STORAGE_KEY);
				} else {
					window.localStorage.setItem(THEME_STORAGE_KEY, next);
				}
			} catch {
				// Storage can be unavailable (private mode); the choice still applies for this visit.
			}
		},
		[enabled],
	);

	const toggleTheme = useCallback(
		() => setPreference(theme === 'dark' ? 'light' : 'dark'),
		[theme, setPreference],
	);

	const value = useMemo(
		() => ({ preference, theme, enabled, setPreference, toggleTheme }),
		[preference, theme, enabled, setPreference, toggleTheme],
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

export const useTheme = (): ThemeContextValue => {
	const context = useContext(ThemeContext);
	if (!context) throw new Error('useTheme must be used within a ThemeProvider');
	return context;
};
