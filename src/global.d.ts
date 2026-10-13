declare module '*.module.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.module.css' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

// Build-time env flags read via import.meta.env. Declared by hand instead of
// `vite/client` types, which also redeclare *.svg and would conflict with the svgr typing above.
interface ImportMetaEnv {
  /** 'true' enables the theme switcher; see .env and src/providers/Theme. */
  readonly VITE_THEME_SWITCHING?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
