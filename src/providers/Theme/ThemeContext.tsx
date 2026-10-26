import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
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
  typeof window !== 'undefined' &&
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

// The stored choice is an external store: the server and the first client render read the server
// snapshot (system, light, the HTML that was pre-rendered), and React re-renders with the real values
// before the first paint (D-154). `chosen` keeps a choice that storage refused (private mode).
let chosen: ThemePreference | null = null;
const preferenceListeners = new Set<() => void>();

const subscribePreference = (onChange: () => void) => {
  preferenceListeners.add(onChange);
  window.addEventListener('storage', onChange);
  return () => {
    preferenceListeners.delete(onChange);
    window.removeEventListener('storage', onChange);
  };
};
const getPreference = (): ThemePreference => chosen ?? readStoredPreference();
const getServerPreference = (): ThemePreference => 'system';

const subscribeSystemDark = (onChange: () => void) => {
  if (typeof window.matchMedia !== 'function') return () => {};
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const getServerSystemDark = () => false;

// False on the server and during hydration, true after.
const subscribeNothing = () => () => {};
const getHydrated = () => true;
const getServerHydrated = () => false;

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const preference = useSyncExternalStore(subscribePreference, getPreference, getServerPreference);
  const systemDark = useSyncExternalStore(subscribeSystemDark, prefersDark, getServerSystemDark);
  const synced = useSyncExternalStore(subscribeNothing, getHydrated, getServerHydrated);

  const theme: ThemeId = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference;

  const hasAppliedTheme = useRef(false);

  useEffect(() => {
    // Until the stored choice is read, index.html's pre-paint script owns data-theme.
    if (!synced) return;
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
  }, [preference, theme, synced]);

  const setPreference = useCallback((next: ThemePreference) => {
    chosen = next;
    preferenceListeners.forEach((listener) => listener());
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
