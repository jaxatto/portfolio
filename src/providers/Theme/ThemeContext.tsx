import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { themeColor } from '#tokens/themeColor';

// Theme ids map to `[data-theme="<id>"]` blocks in the generated theme.css.
// Add new ids here (and to the token pipeline) to support more themes later.
export const THEMES = ['light', 'dark'] as const;
export type ThemeId = (typeof THEMES)[number];
export type ThemePreference = ThemeId | 'system';

const THEME_STORAGE_KEY = 'theme';

// The browser bar color per theme, generated from the surface token (src/tokens/themeColor.ts).
const THEME_COLORS: Record<ThemeId, string> = themeColor;

const isThemeId = (value: unknown): value is ThemeId => THEMES.includes(value as ThemeId);

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
  setPreference: (preference: ThemePreference) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preference, setPreferenceState] = useState<ThemePreference>(readStoredPreference);
  const [systemDark, setSystemDark] = useState(prefersDark);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const theme: ThemeId = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference;

  const hasAppliedTheme = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    // Fade colors on later switches only (not first paint). The `theme-fading` rule lives in
    // styles/main.css and is skipped for prefers-reduced-motion.
    let timer: number | undefined;
    if (hasAppliedTheme.current) {
      root.classList.add('theme-fading');
      timer = window.setTimeout(() => root.classList.remove('theme-fading'), 900);
    }
    hasAppliedTheme.current = true;
    // Always the theme being shown, so the CSS needs no prefers-color-scheme blocks (D-128).
    root.setAttribute('data-theme', theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[theme]);
    return () => window.clearTimeout(timer);
  }, [preference, theme]);

  const setPreference = useCallback((next: ThemePreference) => {
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
  }, []);

  const toggleTheme = useCallback(
    () => setPreference(theme === 'dark' ? 'light' : 'dark'),
    [theme, setPreference],
  );

  const value = useMemo(
    () => ({ preference, theme, setPreference, toggleTheme }),
    [preference, theme, setPreference, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
