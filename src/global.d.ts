declare module '*.module.css' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

// `import photo from './photo.jpg?size'`: the URL plus the pixel size, from scripts/vite-image-size.ts.
declare module '*?size' {
  const value: { src: string; width: number; height: number };
  export default value;
}

declare module '*.svg' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
