declare module '*.module.scss' {
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